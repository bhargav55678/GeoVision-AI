import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn, Satellite } from "lucide-react";

import { useAuth } from "../auth/useAuth";

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/dashboard", {
        replace: true,
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10141a] px-6 text-[#dfe2eb]">
      <section className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#111827]/90 p-8 shadow-2xl shadow-cyan-950/30">
        <div className="mb-8 text-center">
          <Satellite className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
            GeoVision AI
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your mission history.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300">
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a0e14] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input
              required
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
              className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a0e14] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </label>
          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-3 font-bold text-[#00363a] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={18} />
            {submitting ? "Authenticating..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New to GeoVision AI?{" "}
          <Link className="text-cyan-400 hover:text-cyan-300" to="/register">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
