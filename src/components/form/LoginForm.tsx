"use client";

import { useGoogleOAuth, useLogin } from "@/hooks";
import { LoginZodSchema } from "@/validation/auth.validation";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";

export default function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOAuth();

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
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  name={field.name}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    // autoComplete = "off";
                  }}
                />
                {isValid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <Button disabled={loginPending} type="submit" className="w-full mt-2">
          {loginPending ? "Logging in..." : "Login"}
        </Button>
      </form>
      <FieldSeparator className="my-4">OR</FieldSeparator>
      <GoogleLogin
        theme="filled_blue"
        onSuccess={(response: { credential?: string }) => {
          // console.log(response.credential);
          const idToken = response.credential;
          if (!idToken) {
            toast.add({
              title: "Google Login Failed",
              description:
                "No credential received from Google. Please try again.",
              type: "error",
            });
            return;
          }
          // console.log(idToken)
          googleLogin(
            { idToken },
            {
              onSuccess: (res) => {
                toast.add({
                  title: "Google Login Successful",
                  description:
                    res?.message || "You have successfully logged in.",
                  type: "success",
                });
                router.push("/");
              },
              onError: (err) => {
                console.error(err);
                toast.add({
                  title: "Google Login Failed",
                  description: err?.message || "Unable to login with Google.",
                  type: "error",
                });
              },
            },
          );
        }}
        onError={() => {
          toast.add({
            title: "Google Login Failed",
            description: "Unable to login with Google. Please try again.",
            type: "error",
          });
        }}
      />
    </div>
  );
}
