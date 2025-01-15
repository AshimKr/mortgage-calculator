import Image from "next/image";
import { useState } from "react";

export default function MortgageCalculator() {
  // States for form data, results, and errors
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "repayment",
  });
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Mortgage amount is required.";
    if (!formData.term) newErrors.term = "Mortgage term is required.";
    if (!formData.rate) newErrors.rate = "Interest rate is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculation function
  const calculateRepayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { amount, term, rate, type } = formData;
    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const months = parseInt(term) * 12;

    let monthlyPayment;
    if (type === "repayment") {
      monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months));
    } else {
      monthlyPayment = principal * monthlyRate;
    }

    setResults({
      monthly: monthlyPayment.toFixed(2),
      total: (monthlyPayment * months).toFixed(2),
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <form className="w-full lg:w-1/2" onSubmit={calculateRepayment}>
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Mortgage Calculator</h1>

          {/* Mortgage Amount */}
          <div className="mb-4">
            <label className="block text-slate-700 font-medium mb-1">Mortgage Amount (£)</label>
            <div className="relative flex items-center">
              <span className="absolute left-0 bg-lime-500 text-slate-700 text-lg h-full flex items-center justify-center px-3 rounded-l">
                £
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full pl-12 p-3 border ${
                  errors.amount ? "border-red-500" : "border-slate-300"
                } rounded-r bg-white text-slate-900 focus:outline-none focus:border-lime-600`}
              />
            </div>
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Mortgage Term */}
          <div className="mb-4">
            <label className="block text-slate-700 font-medium">Mortgage Term (years)</label>
            <input
              type="number"
              name="term"
              value={formData.term}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border ${
                errors.term ? "border-red-500" : "border-slate-300"
              } rounded bg-white text-slate-900 focus:outline-none focus:border-lime-600`}
            />
            {errors.term && <p className="text-red-500 text-sm mt-1">{errors.term}</p>}
          </div>

          {/* Interest Rate */}
          <div className="mb-4">
            <label className="block text-slate-700 font-medium">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              className={`w-full p-3 mt-1 border ${
                errors.rate ? "border-red-500" : "border-slate-300"
              } rounded bg-white text-slate-900 focus:outline-none focus:border-lime-600`}
            />
            {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
          </div>

          {/* Mortgage Type */}
          <div className="mb-6">
            <label className="block text-slate-700 font-medium mb-2">Mortgage Type</label>
            <div className="flex flex-col gap-4">
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                  formData.type === "repayment"
                    ? "bg-slate-100 border-lime-500"
                    : "border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="repayment"
                  checked={formData.type === "repayment"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-lime-500 focus:ring-lime-500"
                />
                <span
                  className={`font-medium ${
                    formData.type === "repayment"
                      ? "text-slate-900"
                      : "text-slate-700"
                  }`}
                >
                  Repayment
                </span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                  formData.type === "interest-only"
                    ? "bg-slate-100 border-lime-500"
                    : "border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="interest-only"
                  checked={formData.type === "interest-only"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-lime-500 focus:ring-lime-500"
                />
                <span
                  className={`font-medium ${
                    formData.type === "interest-only"
                      ? "text-slate-900"
                      : "text-slate-700"
                  }`}
                >
                  Interest Only
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-6 rounded w-full"
          >
            <Image
              src="https://raw.githubusercontent.com/Codesauna/mortgage-repayment-calculator-main/d016392416ac9dde376a3782397e4309d0cccb3e/assets/images/icon-calculator.svg"
              alt="Calculator Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            Calculate Repayments
          </button>
        </form>

        {/* Results Section */}
        <div className="w-full lg:w-1/2 bg-slate-900 text-white rounded-lg p-6 flex flex-col items-center justify-center">
          {results ? (
            <div className="text-start">
              <p className="text-xl mb-3 font-bold">Your results</p>
              <p className="text-sm text-slate-500 mb-10">
                Your results are shown below based on the information you provided. To adjust the results, edit the form and click &quot;calculate repayments&quot; again.
              </p>
              <div className="w-full bg-slate-800 text-white rounded-lg p-4 mb-4">
                <p className="text-md text-slate-500 mb-2">Your monthly repayments</p>
                <p className="text-3xl font-bold text-yellow-500">£{results.monthly}</p>
              </div>
              <div className="w-full bg-slate-800 text-white rounded-lg p-4">
                <p className="text-md text-slate-500 mb-2">Total you&apos;ll repay over the term</p>
                <p className="text-xl font-bold text-yellow-500">£{results.total}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <Image
                src="https://raw.githubusercontent.com/Codesauna/mortgage-repayment-calculator-main/d016392416ac9dde376a3782397e4309d0cccb3e/assets/images/illustration-empty.svg"
                alt="Results placeholder"
                width={128}
                height={128}
                className="mb-4"
              />
              <h1 className="text-slate-300 mb-2">Results shown here</h1>
              <small>Complete the form and click &quot;calculate repayments&quot; to see what your monthly repayments would be.</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
