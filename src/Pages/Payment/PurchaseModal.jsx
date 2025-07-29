import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { AiOutlineClose } from "react-icons/ai"; // Icon import
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const PurchaseModal = ({ id, email, isOpen, onClose }) => {
  if (!isOpen) return null;

  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md relative border border-yellow-400">
        {/* ❌ Cancel icon (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <AiOutlineClose />
        </button>

        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
          Purchase Premium
        </h2>
        <p className="mb-6 text-gray-700">
          To view full contact details, please purchase premium access.
        </p>

        <div>
          <Elements stripe={stripePromise}>
            <PaymentForm id={id} email={email} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
