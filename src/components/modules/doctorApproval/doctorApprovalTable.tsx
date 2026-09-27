import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspendedGetAllDoctors } from "@/hooks";
import DoctorReviewSheet from "./doctorReviewSheet";

export default function DoctorApprovalTable() {
  const { data } = useSuspendedGetAllDoctors();
  const doctors = data.data.data;
  return (
    <Table className="border border-border">
      <TableCaption>All Doctors</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>name</TableHead>
          <TableHead>email</TableHead>
          <TableHead>specialization</TableHead>
          <TableHead className="text-right">licenseNumber</TableHead>
          <TableHead className="text-right">Application Date</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.id}>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>{doctor.specialization}</TableCell>
            <TableCell className="text-right">{doctor.licenseNumber}</TableCell>
            <TableCell className="text-right">
              {new Date(doctor.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              {doctor.verificationStatus}
            </TableCell>
            <TableCell className="text-right">
              <DoctorReviewSheet />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
