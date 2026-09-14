"use client";

import { useRegister } from "@/hooks";
import { PatientRegisterZodSchema } from "@/validation/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import GoogleAuth from "../auth/googleAuth";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";

export default function PatientRegisterForm() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  type FormDefaultValues = z.infer<typeof PatientRegisterZodSchema>;
  const defaultValues: FormDefaultValues = {
    name: "Patient One",
    email: "patient1@health.com",
    contactNumber: "",
    password: "Patient123",
    confirmPassword: "Patient123",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: PatientRegisterZodSchema,
    },
    onSubmit: async ({ value }) => {
      const registerData = {
        name: value.name,
        email: value.email,
        password: value.password,
        patient: {
          contactNumber: value.contactNumber,
        },
      };

      register(registerData, {
        onSuccess: (res) => {
          console.log(res);
          toast.add({
            description: res?.message,
            type: res?.success ? "success" : "error",
          });
          const redirectPath = res?.success ? "/register/verify" : "/register";
          const queryParams = new URLSearchParams({ email: value.email });
          router.push(`${redirectPath}?${queryParams.toString()}`);
        },
        onError: (err) => {
          console.error(err);
          toast.add({
            description:
              err?.message || "An error occurred during registration.",
            type: "error",
          });
        },
      });
    },
  });
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your patient account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to get started with MediCare.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="name">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
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
        <form.Field name="contactNumber">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>Contact Number</FieldLabel>
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
                    type={isPasswordVisible ? "text" : "password"}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    autoComplete="new-password"
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

        <form.Field name="confirmPassword">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    autoComplete="new-password"
                    aria-invalid={isValid}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsConfirmPasswordVisible((visible) => !visible)
                    }
                    className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label={
                      isConfirmPasswordVisible
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                    aria-pressed={isConfirmPasswordVisible}
                  >
                    {isConfirmPasswordVisible ? (
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

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <GoogleAuth />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
