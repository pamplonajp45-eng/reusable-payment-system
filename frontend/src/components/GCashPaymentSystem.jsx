import { useState } from "react";
import {
  Smartphone,
  Lock,
  CheckCircle,
  AlertCircle,
  EthernetPort,
  Server,
} from "lucide-react";

export default function GCashPaymentSystem() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "phonenumber") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 11) return;
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatedForm = () => {
    const newErrors = {};

    //Validation ng amount
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (parseFloat(formData.amount) < 100) {
      newErrors.amount = "Minimum amount is  ₱100";
    }

    //validation ng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    //Validation ng phoneNumber
    if (!phoneNumber) {
      newErrors.phoneNumber = "GCash Mobile Number is required";
    } else if (formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber =
        "Phone number must be 11 digits ( e.g., 09123456789)";
    } else if (formData.phoneNumber.startsWith("09")) {
      newErrors.phoneNumber = "Phone number starts with 09 ";
    }

    //Validation ng description
    if (!description) {
      newErrors.description = "Please put description";
    } else if (formData.description.trim().length < 5) {
      newErrors.description = "Description must be atleaset 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validatedForm()) {
      return;
    }

    setIsProcessing(true);
    setServerMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setServerMessage("Redirecting to Gcash...");

      setTimeout(() => {
        setPaymentSuccess(true);
        setServerMessage(
          `GCash payment of ₱ ${parseFloat(formData.amount).toLocaleString(
            "en-PH",
            { minimumFractionDigits: 2 }
          )} processed succesfully! `
        );
      }, 1500);
      setTimeout(() => {
        setPaymentSuccess(false);
        setFormData({
          amount: "",
          email: "",
          phoneNumber: "",
          description: "",
        });
        setServerMessage("");
      }, 4000);
    } catch (error) {
      setServerMessage("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 text-lg mb-4">{serverMessage}</p>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Transaction Details</p>
            <p className="text-lg font-semibold text-blue-600">
              {formData.description}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            A receipt has been sent to {formData.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-green-300 to-neutral-800 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="bg-green-300 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-12 h-12 text-neutral-800" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            REUSABLE PAYMENT SYSTEM:{" "}
            <small className="text-gray-500">by jeypiidev</small>
          </h1>
          <p className="text-neutral-800">
            Fast, secure, and convenient payment using G-Cash
          </p>
        </div>

        {/**Security Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start">
          <Lock className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800">
              Secure Payment
            </p>
            <p className="text-xs text-blue-600">
              Your payment is protected by GCash
            </p>
          </div>
        </div>

        <div className="space-y-4"></div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your@email.com"
          ></input>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-= mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2">
            GCash Mobile Number
          </label>
          <div className="relative">
            <label className="absolute left-4 top-3.5 text-gray-5 font-medium">
              +63
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full pl-14 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="09123456789"
            ></input>
          </div>
        </div>

        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.phoneNumber}
          </p>
        )}
        {!errors.phoneNumber && formData.phoneNumber && (
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <CheckCircle className=" w-3 h-3 mr-1 text-green-500" />
            You'll complete payment in the GCash app
          </p>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-2">
            Amount (PHP)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-500 font-bold text-lg">
              ₱
            </span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full pl-14 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
              step="0.01"
            ></input>
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.amount}
            </p>
          )}
          {!errors.amount &&
            formData.amount &&
            parseFloat(formData.amount) >= 100 && (
              <p className="text-xs text-gray-500 mt-1">
                You will pay : ₱{" "}
                {parseFloat(formData.amount).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Payment Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Online purchase, Bill Payment"
          ></input>
          {errors.description && (
            <p className="text-red-50 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>

        {serverMessage && !paymentSuccess && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start">
            <Smartphone className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <p className="text-sm text-blue-50">{serverMessage}</p>{" "}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="mt-8 w-full text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-green-800 transition-all disabled:bg-gray-400 bg-green-600 "
        >
          {isProcessing ? (
            <span className=" flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24">
                <circle
                  className=" opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8VOC5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.0=2 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing Payment...
            </span>
          ) : (
            `Pay ( ₱  ${
              formData.amount
                ? parseFloat(formData.amount).toLocaleString("en-PH", {
                    mininumFraction: 2,
                  })
                : "0.00 )"
            } `
          )}
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <p>Powered by PayMongo • Secured GCash Payment </p>
          </div>
        </div>
      </div>
    </div>
  );
}
