import { Metadata } from "next";
import prismadb from "@/lib/prismadb";
import OpenModal from "../../_components/OpenModal";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const equipment = await prismadb.equipment.findUnique({
    where: {
      id: id,
    },
  });

  return {
    title: `${equipment?.name}`,
  };
};
function EquipmentModalPage({}) {
  return (
    <div>
      <OpenModal />
    </div>
  );
}

export default EquipmentModalPage;
