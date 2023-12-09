import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import ParametersTable from "./_components/ParametersTable";

import { Parameter } from "../types";
import { Separator } from "@/components/ui/separator";
import ParametersHeader from "./_components/ParametersHeader";

const ParametersPage = async () => {
  const parameters = await prismadb.parameter.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const parametersLength = parameters.length;

  const formattedParameters: Parameter[] = parameters.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    unit: item.unit,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <ParametersHeader parametersLenght={parametersLength} />
      <Separator />
      <ParametersTable parameters={formattedParameters} />
    </>
  );
};

export default ParametersPage;
