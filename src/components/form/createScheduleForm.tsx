import { useCreateSchedule } from "@/hooks/schedule.hook";
import { scheduleZodSchema } from "@/validation/schedule.validation";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "../ui/toast";

interface CreateScheduleFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateScheduleForm({
  setOpen,
}: CreateScheduleFormProps) {
  const { mutate: createSchedule, isPending } = useCreateSchedule();
  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      meetingLink: "",
    },
    validators: {
      onSubmit: scheduleZodSchema,
    },
    onSubmit: ({ value }) => {
      const startDateTime = new Date(
        `${value.date}T${value.startTime}`,
      ).toISOString();
      const endDateTime = new Date(
        `${value.date}T${value.endTime}`,
      ).toISOString();
      console.log(value);
      const scheduleData = {
        startDateTime,
        endDateTime,
        meetingLink: value.meetingLink,
      };
      createSchedule(scheduleData, {
        onSuccess: () => {
          form.reset();
          setOpen(false);

          toast.add({
            title: "Schedule created successfully",
            type: "success",
          });
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="date">
        {(field) => {
          const isValid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          const selectedDate = field.state.value
            ? new Date(field.state.value)
            : undefined;

          return (
            <Field data-invalid={isValid}>
              <FieldLabel htmlFor={field.name}>Date</FieldLabel>

              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                    >
                      {selectedDate
                        ? format(selectedDate, "dd MMM yyyy")
                        : "Select Date"}
                    </Button>
                  }
                />

                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    disabled={{ before: new Date() }}
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        field.handleChange(format(date, "yyyy-MM-dd"));
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>

              {isValid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <div className="grid grid-cols-2 gap-4 py-2">
        <form.Field name="startTime">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                <Input
                  type="time"
                  id={field.name}
                  step="1"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  defaultValue={field.state.value}
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="endTime">
          {(field) => {
            const isValid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isValid}>
                <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                <Input
                  type="time"
                  id={field.name}
                  step="1"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  defaultValue={field.state.value}
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
            );
          }}
        </form.Field>
      </div>
      <form.Field name="meetingLink">
        {(field) => {
          const isValid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isValid}>
              <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
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
      <Button type="submit" className="w-full mt-4">
        {isPending ? "Creating schedule..." : "Create Schedule"}
      </Button>
    </form>
  );
}
