import { useState, useEffect } from "react";
import HomePage from "./HomePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#FF6B35] mb-2">BiteDeal</div>
          <p className="text-gray-600">ჩატვირთვა...</p>
        </div>
      </div>
    );
  }

  return <HomePage user={user} onLogin={handleLogin} onLogout={handleLogout} />;
}
