"use client";

import { LoginZodSchema } from "@/validation/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginZodSchema,
    },
    onSubmit: (data) => {
      console.log(data);
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
