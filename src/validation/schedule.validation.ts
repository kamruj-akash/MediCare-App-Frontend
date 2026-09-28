import { z } from "zod";

export const scheduleZodSchema = z
  .object({
    date: z.string().nonempty("Date is required"),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    meetingLink: z.string().url("Meeting link must be a valid URL"),
  })
  .refine(
    (values) => {
      return values.startTime < values.endTime;
    },
    {
      message: "Start time must be before end time",
    },
  );
