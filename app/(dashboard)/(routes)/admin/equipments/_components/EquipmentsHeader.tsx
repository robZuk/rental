"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
interface EquipmentsHeaderProps {
  equipmentsLength: number;
}
const EquipmentsHeader: React.FC<EquipmentsHeaderProps> = ({
  equipmentsLength,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4 pt-4">
      <Heading
        title={`Equipments (${equipmentsLength})`}
        description="Manage equipments for your store."
      />
      <Button onClick={() => router.push(`/admin/equipments/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
};

export default EquipmentsHeader;
