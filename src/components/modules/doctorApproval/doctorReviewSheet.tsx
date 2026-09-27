import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useDoctorApprovalActions, useGetAllDoctors } from "@/hooks";
import { useState } from "react";

export default function DoctorReviewSheet({ doctorId }: { doctorId: string }) {
  const { data } = useGetAllDoctors();
  const doctor = data?.data.data.find((doc) => doc.id === doctorId);
  const [reason, setReason] = useState("");
  const [reject, setConfirmReject] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutate: confirmApproval, isPending } = useDoctorApprovalActions();
  const handleReviewAction = ({
    status,
    reason,
  }: {
    status: string;
    reason?: string;
  }) => {
    const payload = {
      doctorId,
      status,
      reason,
    };
    confirmApproval(payload, {
      onSuccess: () => {
        toast.add({
          title: `Doctor ${status.toLowerCase()} successfully`,
          description: `The doctor has been ${status.toLowerCase()}.`,
        });
        setOpen(false);
        setConfirmReject(false);
      },
      onError: (error) => {
        console.error("Error approving/rejecting doctor:", error);
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            Review
          </Button>
        }
      />

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Doctor Review</SheetTitle>
          <SheetDescription>
            Review the details of the doctor with ID: {doctorId}
          </SheetDescription>
        </SheetHeader>

        {doctor ? (
          <div className="space-y-2 p-5">
            <p>
              <strong>Name:</strong> {doctor.name}
            </p>
          </div>
        ) : (
          <p>Doctor not found</p>
        )}

        <SheetFooter>
          {reject ? (
            <div className="p-5">
              <p>
                <strong>Rejection Reason:</strong>
              </p>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Enter rejection reason"
                className="mt-2 w-full border border-gray-300 p-2"
              />

              <div className="flex w-full justify-end gap-2">
                <Button
                  onClick={() =>
                    handleReviewAction({
                      status: "REJECTED",
                      reason,
                    })
                  }
                  disabled={!reason.trim()}
                  variant="destructive"
                  size="lg"
                >
                  {isPending ? "Rejecting..." : "Confirm Reject"}
                </Button>

                <Button
                  onClick={() => setConfirmReject(false)}
                  variant="default"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-end gap-2">
              <Button
                onClick={() => handleReviewAction({ status: "APPROVE" })}
                variant="default"
                size="lg"
              >
                {isPending ? "Approving..." : "Confirm Approve"}
              </Button>

              <Button
                onClick={() => setConfirmReject(true)}
                variant="destructive"
                size="lg"
              >
                Reject
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
