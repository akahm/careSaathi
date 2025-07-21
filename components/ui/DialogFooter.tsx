// components/dialogfooter.tsx

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"
import Image from "next/image"

type ComingSoonDialogProps = {
  triggerLabel: ReactNode
  triggerIcon?: ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export default function DialogFooter({
  triggerLabel,
  triggerIcon,
  className,
  size = "default",
}: ComingSoonDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={size}
          className={`bg-transparent shadow-none hover:bg-transparent border-none p-0 focus:outline-none focus:ring-0 ${className}`}
        >
          {triggerIcon}
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-sm flex flex-col items-center justify-center text-cente p-8  dark:bg-slate-900/95">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Image src="/rocket.png" alt="Rocket" width={64} height={64} />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">We're Launching Soon!</DialogTitle>
          <DialogDescription className="text-slate-600 mt-2 text-center">
            Thank you for trusting us with your loved ones' care. ❤️
            <br />
            Our team is working tirelessly to bring this feature to life. Your patience means everything to us.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <DialogClose asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-red-500 text-white hover:from-blue-600 hover:to-red-600 px-8 py-2 rounded-md">
              Got It!
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
