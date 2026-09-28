import CreateScheduleForm from "@/components/form/createScheduleForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateScheduleDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus />
        Create Schedule
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-lg font-semibold">
          Create Schedule
        </DialogTitle>

        <DialogDescription className="mt-2 text-sm text-muted-foreground">
          Create a new schedule for the doctor.
        </DialogDescription>

        <CreateScheduleForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
