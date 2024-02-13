import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LogOutIcon, MenuIcon, StarIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import NavItems from "./NavItems"


const MobileNav = () => {
  return (
    <nav className="md:hidden">
<Sheet>
  <SheetTrigger className="alline-middle">Open</SheetTrigger>
<MenuIcon className="cursor-pointer w-6 h-6" />
  <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
    <StarIcon className="w-6 h-6"/>
    <Separator className="border border-gray-50" />
    <NavItems />
  </SheetContent>
</Sheet>
    </nav>
  )
}

export default MobileNav