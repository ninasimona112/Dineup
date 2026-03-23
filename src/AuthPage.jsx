import React, { useState } from "react";

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ვალიდაცია
    if (!formData.email || !formData.password) {
      setError("გთხოვთ შეავსოთ ყველა ველი");
      setLoading(false);
      return;
    }

    // სიმულაცია API call-ის
    setTimeout(() => {
      const user = {
        email: formData.email,
        name: formData.email.split("@")[0],
      };
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      setLoading(false);
    }, 500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ვალიდაცია
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("გთხოვთ შეავსოთ ყველა ველი");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("პაროლები არ ემთხვევა");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("პაროლი უნდა იყოს მინიმუმ 6 სიმბოლოსგან შედგენილი");
      setLoading(false);
      return;
    }

    // სიმულაცია API call-ის
    setTimeout(() => {
      const user = {
        email: formData.email,
        name: formData.name,
      };
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111111] to-[#1f1f1f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* ლოგო */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#FF6B35] mb-2">
              BiteDeal
            </div>
            <p className="text-gray-600">
              {isLogin ? "უკვე გაქვს ანგარიში?" : "პირველად აქ?"}
            </p>
          </div>

          {/* ტაბები */}
          <div className="flex gap-2 mb-6 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-full font-semibold transition ${
                isLogin
                  ? "bg-[#FF6B35] text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              შესვლა
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-full font-semibold transition ${
                !isLogin
                  ? "bg-[#FF6B35] text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              რეგისტრაცია
            </button>
          </div>

          {/* ფორმა */}
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {/* სახელი (მხოლოდ რეგისტრაციის დროს) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  სახელი
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="თქვენი სახელი"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                />
              </div>
            )}

            {/* ელფოსტა */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ელფოსტა
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              />
            </div>

            {/* პაროლი */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                პაროლი
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="მინიმუმ 6 სიმბოლო"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              />
            </div>

            {/* პაროლის კონფირმაცია (მხოლოდ რეგისტრაციის დროს) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  პაროლის კონფირმაცია
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="გაიმეორეთ პაროლი"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                />
              </div>
            )}

            {/* შეცდომის შეტყობინება */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* ღირთების ღილაკი */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] text-white font-semibold py-3 rounded-lg hover:bg-[#ff5a20] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block animate-spin mr-2">⚙️</span>
                  დამუშავება...
                </span>
              ) : isLogin ? (
                "შესვლა"
              ) : (
                "რეგისტრაცია"
              )}
            </button>
          </form>

          {/* დემო ტიპი */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2 font-semibold">დემო ანგარიში:</p>
            <p>Email: demo@example.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
