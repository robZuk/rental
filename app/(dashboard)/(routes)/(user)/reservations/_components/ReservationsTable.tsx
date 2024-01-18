"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { UserReservationsColumn } from "@/types";

interface ReservationsHeaderProps {
  reservations: UserReservationsColumn[];
}

const ReservationsTable: React.FC<ReservationsHeaderProps> = ({
  reservations,
}) => {
  return <DataTable columns={columns} data={reservations} />;
};

export default ReservationsTable;
