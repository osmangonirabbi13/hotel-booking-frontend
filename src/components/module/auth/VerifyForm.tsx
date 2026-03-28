"use client";

import { verifyEmailAction } from "@/app/(CommonLayout)/verify-email/_action";
import { useForm } from "@tanstack/react-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultEmail = searchParams.get("email") || "";

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    defaultValues: {
      email: defaultEmail,
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError("");
      setSuccess("");
      
      const result = await verifyEmailAction({ 
        email: value.email, 
        otp: value.otp 
      });

      if (result && !result.success) {
        setServerError(result.message);
      } else {
        setSuccess("Email verified successfully");
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 1500);
      }
    },
  });

  return (
    <section className="min-h-[calc(100vh-120px)] bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#d8c3a5] bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#1f1f1f]">Verify Email</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter the OTP sent to your email address
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Email Field with Nested Children */}
          <form.Field name="email">
            {(field) => (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#333]">
                  Email Address
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  readOnly={!!defaultEmail}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d6d6d6] bg-white px-4 text-sm text-[#222] outline-none transition focus:border-[#c8a97e] focus:ring-2 focus:ring-[#c8a97e]/20 read-only:bg-[#f7f7f7] read-only:text-gray-500"
                />
              </div>
            )}
          </form.Field>

          {/* OTP Field with Nested Children */}
          <form.Field
            name="otp"
            validators={{
              onChange: ({ value }) => 
                value.length !== 6 ? "OTP must be 6 digits" : undefined,
            }}
          >
            {(field) => (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#333]">
                  OTP Code
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  maxLength={6}
                  onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  className="h-12 w-full rounded-xl border border-[#d6d6d6] bg-white px-4 text-sm tracking-[0.3em] text-[#222] outline-none transition focus:border-[#c8a97e] focus:ring-2 focus:ring-[#c8a97e]/20"
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {serverError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {serverError}
            </p>
          )}

          {success && (
            <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-600">
              {success}
            </p>
          )}

          {/* Subscribe with Nested Children */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="h-12 w-full rounded-xl bg-[#c8a97e] text-sm font-semibold text-white transition hover:bg-[#b89363] disabled:cursor-not-allowed disabled:opacity-70 shadow-lg shadow-[#c8a97e]/10"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </form.Subscribe>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Didn’t get the code?{" "}
          <span className="cursor-pointer font-medium text-[#c8a97e] hover:underline transition-all">
            Resend OTP
          </span>
        </p>
      </div>
    </section>
  );
}