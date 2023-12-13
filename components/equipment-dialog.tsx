// "use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EquipmentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: Equipment | undefined;
  children?: React.ReactNode;
}

import { Equipment } from "../types";
// import { Equipment } from "@prisma/client";

const EquipmentDialog: React.FC<EquipmentDialogProps> = ({
  open,
  setOpen,
  data,
  children,
}) => {
  //   const onChange = (open: boolean) => {
  //     if (!open) {
  //       onClose();
  //     }
  //   };
  console.log(data);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            {/* {data?.name} */}
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentDialog;
