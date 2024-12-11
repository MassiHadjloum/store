'use client'
import { avatarPlaceholderUrl, navItems } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
}

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
  const pathname = usePathname()
  return (
    <aside className="sidebar">
      <Link href="/" >
        <Image src="/assets/icons/logo-full-brand.svg"
          alt="logo" width={160} height={50}
          className="hidden lg:block h-auto" />

        <Image src="/assets/icons/logo-brand.svg"
          alt="logo" width={52} height={52}
          className="lg:hidden" />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ icon, name, url }) => {
            const isActive = pathname === url;
            return <Link key={name} className="lg:w-full" href={url}>
              <li className={cn('sidebar-nav-item', isActive && "shad-active")}>
                <Image
                  src={icon} alt={name}
                  width={24} height={24}
                  className={cn("nav-icon", isActive && "nav-icon-active")}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>;
          })}
        </ul>
      </nav>
      <Image
        src="/assets/images/files-2.png" alt="logo"
        width={506} height={418} className="w-full"
      />
      <div className="sidebar-user-info">
        <Image src={avatarPlaceholderUrl}
          alt="avatar" width={44} height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="sibtitle-2 capitalize">{fullName} </p>
          <p className="caption">{email} </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
