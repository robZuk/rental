// "use client";

// import { useEffect, useState } from "react";

import EquipmentDialog from "@/components/equipment-dialog";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/types";

interface EquipmentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: Equipment | undefined;
  // onConfirm: () => void;
  // loading: boolean;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({
  open,
  setOpen,
  data,
}) => {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  return (
    <EquipmentDialog open={open} setOpen={setOpen} data={data}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          // disabled={loading}
          variant="outline"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          // disabled={loading}
          variant="destructive"
          onClick={() => setOpen(false)}
        >
          Continue
        </Button>
      </div>
    </EquipmentDialog>
  );
};
