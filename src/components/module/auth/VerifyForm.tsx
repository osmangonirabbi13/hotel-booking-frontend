"use client";

import { verifyEmailAction } from "@/app/(CommonLayout)/verify-email/_action";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await verifyEmailAction({ email, otp });

    if (result && !result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    setSuccess("Email verified successfully");
    setLoading(false);

    setTimeout(() => {
      router.push("/login?verified=true");
    }, 1200);
  };

  return (
    <section className="min-h-[calc(100vh-120px)] bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#d8c3a5] bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#1f1f1f]">
            Verify Email
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter the OTP sent to your email address
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              readOnly={!!defaultEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#d6d6d6] bg-white px-4 text-sm text-[#222] outline-none transition focus:border-[#c8a97e] focus:ring-2 focus:ring-[#c8a97e]/20 read-only:bg-[#f7f7f7] read-only:text-gray-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              OTP Code
            </label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="h-12 w-full rounded-xl border border-[#d6d6d6] bg-white px-4 text-sm tracking-[0.3em] text-[#222] outline-none transition focus:border-[#c8a97e] focus:ring-2 focus:ring-[#c8a97e]/20"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-[#c8a97e] text-sm font-semibold text-white transition hover:bg-[#b89363] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Didn’t get the code?{" "}
          <span className="cursor-pointer font-medium text-[#c8a97e] hover:underline">
            Resend OTP
          </span>
        </p>
      </div>
    </section>
  );
}