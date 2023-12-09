"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
interface ParametersHeaderProps {
  parametersLenght: number;
}
const ParametersHeader: React.FC<ParametersHeaderProps> = ({
  parametersLenght,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4">
      <Heading
        title={`Parameters (${parametersLenght})`}
        description="Manage parameters for your store."
      />
      <Button onClick={() => router.push(`/admin/parameters/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
};

export default ParametersHeader;
