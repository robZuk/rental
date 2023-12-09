import React from "react";
import prismadb from "@/lib/prismadb";
import { ParameterForm } from "./_components/parameter-form";

const ParameterPage = async ({
  params,
}: {
  params: { parameterId: string };
}) => {
  const parameter = await prismadb.parameter.findUnique({
    where: {
      id: params.parameterId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-2 pt-6">
        <ParameterForm initialData={parameter} />
      </div>
    </div>
  );
};

export default ParameterPage;
