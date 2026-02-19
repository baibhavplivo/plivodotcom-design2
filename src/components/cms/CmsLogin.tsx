import { useRef, useEffect, useState } from "react";
import { login } from "./cms-api";

interface CmsLoginProps {
  onSuccess: () => void;
}

export default function CmsLogin({ onSuccess }: CmsLoginProps) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const input = passwordRef.current;
    const button = buttonRef.current;
    if (!input || !button) return;

    const handleSubmit = async () => {
      const password = input.value.trim();
      if (!password) {
        setError("Please enter a password");
        return;
      }

      setLoading(true);
      setError("");

      try {
        await login(password);
        onSuccess();
      } catch {
        setError("Invalid password");
        setLoading(false);
      }
    };

    const handleClick = () => handleSubmit();
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSubmit();
    };

    button.addEventListener("click", handleClick);
    input.addEventListener("keydown", handleKeydown);

    return () => {
      button.removeEventListener("click", handleClick);
      input.removeEventListener("keydown", handleKeydown);
    };
  }, [onSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-2 font-sora text-2xl font-semibold text-gray-900">
              Plivo
            </div>
            <p className="text-sm text-gray-500">Blog Content Management</p>
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label
              htmlFor="cms-password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="cms-password"
              type="password"
              autoFocus
              placeholder="Enter CMS password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          {/* Submit button */}
          <button
            ref={buttonRef}
            disabled={loading}
            className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Access CMS"}
          </button>
        </div>
      </div>
    </div>
  );
}
