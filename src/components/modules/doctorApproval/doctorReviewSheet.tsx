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
import { useGetAllDoctors } from "@/hooks";
import { useState } from "react";

export default function DoctorReviewSheet({ doctorId }: { doctorId: string }) {
  const { data } = useGetAllDoctors();
  const doctor = data?.data.data.find((doc) => doc.id === doctorId);
  const [reject, setConfirmReject] = useState(false);
  const handleReviewAction = () => {
    setConfirmReject(true);
  };
  return (
    <Sheet>
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
            <div />
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
                rows={4}
                placeholder="Enter rejection reason"
                className="border border-gray-300 p-2 w-full mt-2"
              />
              <div className="flex gap-2 w-full justify-end">
                <Button variant="default" size="lg">
                  Confirm Reject
                </Button>
                <Button
                  onClick={() => setConfirmReject(false)}
                  variant="destructive"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 w-full justify-end">
              <Button variant="default" size="lg">
                Approve
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
