import { useEffect, useState } from "react";

import UploadCard from "./components/UploadCard";
import Login from "./components/login";
import Signup from "./components/signup";
import ReportHistory from "./components/ReportHistory";

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkExistingLogin();
  }, []);

  async function checkExistingLogin() {
    const token = localStorage.getItem("smartlab_token");

    if (!token) {
      setCheckingAuth(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("smartlab_token");
        setUser(null);
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Authentication check failed:", error);
      localStorage.removeItem("smartlab_token");
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  }

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem("smartlab_token");
    setUser(null);
    setAuthMode("login");
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="rounded-2xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="text-4xl">🩺</div>

          <p className="mt-3 text-lg font-semibold text-gray-700">
            Loading SmartLab AI...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Checking your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl">
              🩺
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                SmartLab AI
              </h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                Understand your reports
              </p>
            </div>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="rounded-xl border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-16 text-center">

        <div className="mx-auto mb-5 w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          AI-powered report analysis
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-6xl">
          Understand Your
          <span className="text-blue-600"> Blood Reports </span>
          with AI
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Upload diagnostic reports and receive structured,
          easy-to-understand explanations of the laboratory values
          reported in your PDF.
        </p>

        {user && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm">
              🔒 Secure account
            </div>

            <div className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm">
              📄 PDF analysis
            </div>

            <div className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm">
              💡 Simple explanations
            </div>
          </div>
        )}
      </section>

      {/* Authentication */}
      {!user && (
        <>
          {authMode === "login" ? (
            <Login
              onLogin={handleLogin}
              onSwitchToSignup={() => setAuthMode("signup")}
            />
          ) : (
            <Signup
              onLogin={handleLogin}
              onSwitchToLogin={() => setAuthMode("login")}
            />
          )}
        </>
      )}

      {/* Dashboard */}
      {user && (
        <main className="mx-auto max-w-7xl px-6 pb-20">

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">📄</div>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                Upload Reports
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Upload a PDF laboratory report for analysis.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🔎</div>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                Analyze Results
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Extracted values are organized with reference ranges
                and simple explanations.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-3xl">🗂️</div>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                View History
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Revisit reports you've already analyzed.
              </p>
            </div>
          </div>

          <UploadCard />

          <ReportHistory />

          <div className="mt-12 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="text-sm leading-6 text-yellow-800">
              <strong>Important:</strong> SmartLab AI is a software
              demonstration for understanding reported laboratory
              values. It is not a substitute for professional medical
              advice or diagnosis.
            </p>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="font-semibold text-gray-700">
            🩺 SmartLab AI
          </p>

          <p className="mt-2 text-sm text-gray-500">
            AI-assisted laboratory report understanding.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;