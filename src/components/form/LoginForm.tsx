"use client";

import { useLogin } from "@/hooks";
import { LoginZodSchema } from "@/validation/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleAuth from "../auth/googleAuth";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";

export default function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "patient1@gmail.com",
      password: "Patient123",
    },
    validators: {
      onSubmit: LoginZodSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          console.log(res);
          toast.add({
            title: "Login Successful",
            description: res?.message || "You have successfully logged in.",
            type: "success",
          });
          router.push("/");
        },

        onError: (err) => {
          console.error(err);
          toast.add({
            title: "Login Failed",
            description: err?.message || "Invalid email or password.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  autoComplete="off"
                  aria-invalid={isValid}
                />
                {isValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    type={isPasswordVisible ? "text" : "password"}
                    value={field.state.value}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    autoComplete="current-password"
                    aria-invalid={isValid}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isPasswordVisible}
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {isValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <Button disabled={loginPending} type="submit" className="w-full mt-2">
          {loginPending ? "Logging in..." : "Login"}
        </Button>
      </form>
      <GoogleAuth />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
