import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import getSecureAxios from "../Shared/secureAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function PaymentForm({ id, email, mobile, buyuser, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = getSecureAxios();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error?.message);
    } else {
      setError("");
    }
    const res = await axiosSecure.post("/create-payment-intent", {
      parcelId: id,
      email: email,
    });

    if (res?.data?.success === false) {
      alert(res?.data?.message);
      onClose()
    }

    if (res?.data) {
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "torikul",
          },
        },
      });
      {
        if (result.paymentIntent.status === "succeeded") {
          const amount = 500;
          const paymentDoc = {
            parcelId: id,
            email: email,
            mobile: mobile,
            buyuser: buyuser,
            amount: amount,
            paymentMethod: result?.paymentIntent?.payment_method,
            transactionId: result?.paymentIntent?.id,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentDoc);
          if (paymentRes.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "You have successfully Payment.",
              icon: "success",
              confirmButtonColor: "#4f46e5",
            });

            onClose();
          }
        }
      }
    } else {
      alert(res?.data?.message);
      onClose();
    }

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
