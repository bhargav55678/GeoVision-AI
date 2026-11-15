import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Satellite, UserPlus } from "lucide-react";

import { useAuth } from "../auth/useAuth";

const Register = () => {
  const { register, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#10141a] px-6 py-10 text-[#dfe2eb]">
      <section className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#111827]/90 p-8 shadow-2xl shadow-cyan-950/30">
        <div className="mb-8 text-center">
          <Satellite className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
            GeoVision AI
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Keep your satellite analysis securely associated with you.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            ["full_name", "Full name", "text"],
            ["email", "Email address", "email"],
            ["password", "Password", "password"],
            ["confirm_password", "Confirm password", "password"],
          ].map(([name, label, type]) => (
            <label key={name} className="block text-sm text-slate-300">
              {label}
              <input
                required
                minLength={name.includes("password") ? 8 : undefined}
                type={type}
                value={form[name]}
                onChange={(event) =>
                  setForm({ ...form, [name]: event.target.value })
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a0e14] px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </label>
          ))}
          <p className="text-xs text-slate-500">
            Passwords require 8+ characters with uppercase, lowercase, and a number.
          </p>
          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-3 font-bold text-[#00363a] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus size={18} />
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link className="text-cyan-400 hover:text-cyan-300" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
