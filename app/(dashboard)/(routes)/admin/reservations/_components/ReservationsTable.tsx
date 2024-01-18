"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { ReservationsColumn } from "@/types";

interface ReservationsHeaderProps {
  reservations: ReservationsColumn[];
}

const ReservationsTable: React.FC<ReservationsHeaderProps> = ({
  reservations,
}) => {
  return (
    <DataTable
      searchKey="Surname"
      searchValue="last name"
      type="reservations"
      columns={columns}
      data={reservations}
    />
  );
};

export default ReservationsTable;
