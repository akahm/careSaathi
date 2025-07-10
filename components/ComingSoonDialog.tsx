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

type ComingSoonDialogProps = {
  triggerLabel: ReactNode
  triggerIcon?: ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export default function ComingSoonDialog({
  triggerLabel,
  triggerIcon,
  className,
  size = "default",
}: ComingSoonDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} className={className}>
          {triggerIcon}
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-[425px] rounded-lg text-center p-8 bg-white dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white">
            We're Launching Soon!
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-300 mt-2">
            Thank you for trusting us with your loved ones' care. ❤️
            <br />
            Our team is working tirelessly to bring this feature to life. Your patience means everything to us.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <DialogClose asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-red-500 text-white hover:from-blue-600 hover:to-red-600">
              Got It!
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
