"use client"

import { useState } from "react"
import { Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-6 mt-8">
          <Link
            href="#services"
            className="text-lg font-medium text-blue-600 hover:text-red-500"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-lg font-medium text-blue-600 hover:text-red-500"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="#emergency"
            className="text-lg font-medium text-blue-600 hover:text-red-500"
            onClick={() => setOpen(false)}
          >
            Emergency
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium text-blue-600 hover:text-red-500"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Button className="bg-red-500 hover:bg-red-600 text-white w-full">
            <Phone className="w-4 h-4 mr-2" />
            Emergency Call
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
