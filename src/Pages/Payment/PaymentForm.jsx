import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import getSecureAxios from "../Shared/secureAxios";

export default function PaymentForm({id,email}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure =getSecureAxios()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error?.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const res = await axiosSecure.post('/create-payment-intent',{
        id
    })

    const clientSecret=res.data.clientSecret

   const result = await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
        card:elements.getElement(CardElement),
        billing_details:{
            name:'torikul',
        },
    },
   })
   if(result.error){
    console.log(result.error.message)
   }else{
    if(result.paymentIntent.status==='succeeded'){
        // console.log('payment succed')
        console.log(result)
    const amount = 500
         const paymentDoc = {
          parcelId:id,
          email:email,
          amount:amount,
          paymentMethod:result?.paymentIntent?.payment_method,
          transactionId:result?.paymentIntent?.id
        };
       const paymentRes = await axiosSecure.post('/payments',paymentDoc)
        if(paymentRes.data.insertedId){
          console.log('payment succesfully')
        }
    }
   }

 console.log(res)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={id}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-0 focus:border-gray-300 cursor-not-allowed w-full"
        />
        <input
          type="text"
          defaultValue={email}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-0 focus:border-gray-300 cursor-not-allowed my-2 w-full"
        />
        <CardElement className="p-2 border rounded bg-white"></CardElement>
        <button
          type="submit"
          className="my-3 mx-auto btn bg-yellow-400"
          disabled={!stripe}
        >
          Submit$5
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
