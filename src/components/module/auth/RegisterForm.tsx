"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { registerAction } from "@/app/(AuthLayout)/register/_action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {  Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


function InputField({
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  suffix,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string | null;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] text-[#555] font-sans">
        {label}{required && <span className="text-[#999]">*</span>}
      </label>
      <div
        className={`
          flex items-center rounded-full border bg-white px-5 py-0 transition-colors
          ${error
            ? "border-red-300"
            : "border-[#e0e0e0] focus-within:border-[#aaa]"
          }
        `}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="flex-1 bg-transparent py-3 text-sm text-[#1a1a1a] outline-none placeholder:text-transparent font-sans"
        />
        {suffix && <span className="ml-2 shrink-0">{suffix}</span>}
      </div>
      {error && (
        <p className="px-2 text-[11px] text-red-500 font-sans">{error}</p>
      )}
    </div>
  );
}




const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterPayload) => registerAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value as IRegisterPayload)) as any;
        if (!result?.success) {
          setServerError(result?.message || "Registration failed");
        }
      } catch (error: any) {
        setServerError(`Registration failed: ${error.message}`);
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      {/* Name */}
      <form.Field
        name="name"
        validators={{ onChange: registerZodSchema.shape.name }}
      >
        {(field) => (
          <InputField
            label="Name"
            required
            placeholder=""
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : null}
          />
        )}
      </form.Field>

      {/* Email */}
      <form.Field
        name="email"
        validators={{ onChange: registerZodSchema.shape.email }}
      >
        {(field) => (
          <InputField
            label="Email"
            required
            type="email"
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : null}
          />
        )}
      </form.Field>

     

      
      

 
      <form.Field
        name="password"
        validators={{ onChange: registerZodSchema.shape.password }}
      >
        {(field) => (
          <InputField
            label="Password"
            required
            type={showPassword ? "text" : "password"}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : null}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-[#bbb] hover:text-[#777] transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
        )}
      </form.Field>

      {/* Confirm Password */}
      <form.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ["password"],
          onChange: ({ value, fieldApi }) => {
            const password = fieldApi.form.getFieldValue("password");
            if (!value) return "Please confirm your password";
            if (value !== password) return "Passwords do not match";
            return undefined;
          },
        }}
      >
        {(field) => (
          <InputField
            label="Confirm Password"
            required
            type={showConfirmPassword ? "text" : "password"}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={field.state.meta.isTouched ? field.state.meta.errors?.[0] : null}
            suffix={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="text-[#bbb] hover:text-[#777] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
        )}
      </form.Field>

      {serverError && (
        <Alert variant="destructive" className="rounded-full px-5">
          <AlertDescription className="text-xs">{serverError}</AlertDescription>
        </Alert>
      )}

      {/* Submit */}
      <div className="mt-2">
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || isPending}
              className="
                flex w-full items-center justify-center gap-2
                rounded-full bg-[#1a1a1a] py-3.5
                text-sm font-medium tracking-wide text-white
                transition-all hover:bg-[#333] active:scale-[0.99]
                disabled:opacity-40 disabled:cursor-not-allowed
                font-sans
              "
            >
              {isSubmitting || isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          )}
        </form.Subscribe>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="h-px flex-1 bg-[#ebebeb]" />
        <span className="text-[11px] text-[#bbb] font-sans">or continue with</span>
        <div className="h-px flex-1 bg-[#ebebeb]" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
          window.location.href = `${baseUrl}/auth/login/google`;
        }}
        className="
          flex w-full items-center justify-center gap-2.5
          rounded-full border border-[#e0e0e0] bg-white py-3
          text-sm font-medium text-[#1a1a1a]
          transition hover:border-[#bbb] hover:bg-[#fafafa]
          font-sans
        "
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign up with Google
      </button>

      {/* Login link */}
      <p className="text-center text-[12px] text-[#999] font-sans">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#1a1a1a] underline underline-offset-2 hover:text-[#444] transition-colors"
        >
          Log in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;