import { useState } from "react";
import { Smartphone, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function GCashPaymentSystem() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-t from-green-300 to-neutral-800 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="bg-green-300 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-12 h-12 text-neutral-800" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pay with GCash
          </h1>
          <p className="text-neutral-800">
            Fast, secure, and convenient payment
          </p>
        </div>
        {/**Security Badge */}
        <div className=" bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start">
          <div className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-o" />
          <div>
            <p className="text-sm font-semibold text-blue-800">
              Secure Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
