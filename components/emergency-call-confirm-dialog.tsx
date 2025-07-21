// components/emergency-call-confirm-dialog.tsx

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { PhoneCall, XCircle } from "lucide-react"; // Importing new icons

type EmergencyCallConfirmDialogProps = {
  triggerLabel: ReactNode;
  triggerIcon?: ReactNode; // Kept for flexibility, though not used here directly
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  phoneNumber: string; // New prop: the emergency number to call
};

export default function EmergencyCallConfirmDialog({
  triggerLabel,
  className,
  size = "default",
  phoneNumber,
}: EmergencyCallConfirmDialogProps) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={size}
          className={`bg-transparent shadow-none hover:bg-transparent border-none p-0 focus:outline-none focus:ring-0 ${className}`}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-md rounded-lg flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900/95 shadow-xl border-t-4 border-red-500 animate-in fade-in zoom-in-90 duration-300">
        <DialogHeader className="w-full">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500 animate-pulse-fast" /> {/* Warning icon */}
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-red-600 dark:text-red-500">
            Confirm Emergency Call
          </DialogTitle>
          <DialogDescription className="text-slate-700 dark:text-slate-300 mt-2 text-center text-md sm:text-lg">
            Are you absolutely sure you want to dial **{phoneNumber}** for emergency services?
            <br />
            Only proceed in a real emergency.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full">
          <DialogClose asChild>
            <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 px-6 py-3 rounded-md font-semibold transition-colors duration-200">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleCall}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 px-6 py-3 rounded-md font-extrabold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            Call Now!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}