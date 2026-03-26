"use client";
import { loginAction } from "@/app/(AuthLayout)/login/_action";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ── Reusable input ──────────────────────────────────────────────────────── */
function InputField({
  label,
  required,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  suffix,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string | null;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] text-[#555] font-sans">
        {label}
        {required && <span className="text-[#999]">*</span>}
      </label>
      <div
        className={`
          flex items-center rounded-full border bg-white px-5 transition-colors
          ${error
            ? "border-red-300"
            : "border-[#e0e0e0] focus-within:border-[#aaa]"
          }
        `}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="flex-1 bg-transparent py-3 text-sm text-[#1a1a1a] outline-none font-sans"
        />
        {suffix && <span className="ml-2 shrink-0">{suffix}</span>}
      </div>
      {error && (
        <p className="px-2 text-[11px] text-red-500 font-sans">{error}</p>
      )}
    </div>
  );
}

/* ── Main Form ───────────────────────────────────────────────────────────── */
interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;
        if (!result.success) {
          setServerError(result.message || "Login failed");
        }
      } catch (error: any) {
        setServerError(`Login failed: ${error.message}`);
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
      {/* Email */}
      <form.Field
        name="email"
        validators={{ onChange: loginZodSchema.shape.email }}
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

      {/* Password */}
      <form.Field
        name="password"
        validators={{ onChange: loginZodSchema.shape.password }}
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

      {/* Forgot password */}
      <div className="text-right -mt-1">
        <Link
          href="/forgot-password"
          className="text-[12px] text-[#999] hover:text-[#444] underline underline-offset-2 transition-colors font-sans"
        >
          Forgot password?
        </Link>
      </div>

      {serverError && (
        <Alert variant="destructive" className="rounded-full px-5">
          <AlertDescription className="text-xs">{serverError}</AlertDescription>
        </Alert>
      )}

      {/* Submit */}
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
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        )}
      </form.Subscribe>

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
        Sign in with Google
      </button>

      {/* Register link */}
      <p className="text-center text-[12px] text-[#999] font-sans">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#1a1a1a] underline underline-offset-2 hover:text-[#444] transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;