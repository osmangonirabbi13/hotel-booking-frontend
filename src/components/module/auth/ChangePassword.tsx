"use client";

import { changePasswordAction } from "@/app/(DashboardLayout)/(commonProtectedLayout)/change-password/_action";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const result = await changePasswordAction({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      });

      if (result && !result.success) {
        setServerError(result.message);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {serverError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {serverError}
          </div>
        )}

        {/* Current Password Field */}
        <form.Field
          name="currentPassword"
          validators={{
            onChange: ({ value }) => (!value ? "Current password is required" : undefined),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {field.state.meta.errors && (
                <em className="text-xs text-red-500 mt-1 block">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* New Password Field */}
        <form.Field
          name="newPassword"
          validators={{
            onChange: ({ value }) =>
              value.length < 8 ? "Password must be at least 8 characters" : undefined,
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {field.state.meta.errors && (
                <em className="text-xs text-red-500 mt-1 block">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        {/* Confirm Password Field */}
        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["newPassword"],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue("newPassword")) {
                return "Passwords do not match";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {field.state.meta.errors && (
                <em className="text-xs text-red-500 mt-1 block">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}