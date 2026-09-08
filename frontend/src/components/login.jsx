import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "";

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      localStorage.setItem("smartlab_token", data.token);

      onLogin(data.user);
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl px-6 pb-10">
      <form
        onSubmit={handleLogin}
        className="rounded-3xl bg-white p-10 shadow-xl"
      >
        <h2 className="text-4xl font-bold text-gray-800">
          Login
        </h2>

        <p className="mt-2 text-gray-500">
          Sign in to your SmartLab AI account.
        </p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-7 w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 w-full rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
        />

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4">
            <p className="font-medium text-red-600">
              ❌ {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={onSwitchToSignup}
          className="mt-4 w-full rounded-xl border border-blue-200 py-3 font-medium text-blue-600 hover:bg-blue-50"
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;