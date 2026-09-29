"use client";

import { Input } from "@/components/ui/input";
import TablePagination from "@/components/ui/tablePagination";
import { useDebounce } from "@/hooks/debounce.hook";
import { useGetAllDoctors } from "@/hooks/doctor.hook";
import { GetAllDoctorsParams } from "@/types/doctor";
import { Search } from "lucide-react";
import { useState } from "react";
import DoctorCard from "./doctorCard";
import DoctorsGridSkeleton from "./doctorsGridSkeleton";

export default function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);

  const queryParams: GetAllDoctorsParams = {
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "asc",
    searchTerm: debouncedSearchTerm,
  };

  const { data, isLoading, isError } = useGetAllDoctors(queryParams);
  const doctors = data?.data.data ?? [];
  const totalPages = data?.data.meta.totalPages ?? 1;

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          className="pl-10"
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <DoctorsGridSkeleton />
        ) : isError ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Something went wrong while loading doctors. Please try again.
          </p>
        ) : doctors.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No doctors found
            {debouncedSearchTerm ? ` for "${debouncedSearchTerm}"` : ""}.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>

      {!isLoading && !isError && doctors.length > 0 && (
        <div className="mt-10">
          <TablePagination setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
