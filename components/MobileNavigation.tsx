"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { avatarPlaceholderUrl, navItems } from "@/constants"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Separator } from "./ui/separator"
import Link from "next/link"
import { cn } from "@/lib/utils"
import FileUploader from "./FileUploader"
import { Button } from "./ui/button"

interface MobileNavigationProps {
  fullName: string;
  email: string;
  avatar: string;
  ownerId: string;
  accountId: string;
}

const MobileNavigation = ({ avatar, email, fullName, accountId, ownerId }: MobileNavigationProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg" alt="logo"
        width={120} height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg" alt="Search"
            width={30} height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user ">
              <Image
                src={avatar} alt="avatar"
                className="header-user-avatar"
                width={44} height={44}
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ icon, name, url }) => {
                const isActive = pathname === url;
                return <Link key={name} className="lg:w-full" href={url}>
                  <li className={cn('mobile-nav-item', isActive && "shad-active")}>
                    <Image
                      src={icon} alt={name}
                      width={24} height={24}
                      className={cn("nav-icon", isActive && "nav-icon-active")}
                    />
                    <p className="block">{name}</p>
                  </li>
                </Link>;
              })}
            </ul>
          </nav>
          <Separator className="mb-4 bg-light-200/20" />
          <div className="flex flex-col gap-5 pb-5 justify-between">
            <FileUploader />
            <Button type="submit" className="mobile-sign-out-button">
              <Image src="/assets/icons/logout.svg"
                alt="logout" width={24} height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    </header>
  )
}

export default MobileNavigation
