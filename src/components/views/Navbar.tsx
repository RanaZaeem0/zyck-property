"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation';

import MobNav from "./MobNav";

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/properties/buy", label: "BUY" },
    { href: "/properties/rent", label: "RENT" },
    { href: "/user/properties", label: "SELL" },
    { href: "/pricing", label: "PRICING" },
    { href: "/about", label: "ABOUT US" },
    { href: "/FAQs", label: "FAQS" }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="navbar bg-background lg:px-10 px-4 ">
      {/* Navbar for Small Screens */}
      <div className="flex w-full lg:hidden items-center justify-between">
        <MobNav/>
        <div className="flex justify-center ">
          <Link href="/">
            <Image className="lg:w-28 md:w-28 sm:w-20" src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>
        <div>{children}</div>
      </div>

      {/* Navbar for Large Screens */}
      <div className="hidden lg:flex w-full justify-around">
        {/* Navbar Start */}
        <div className="navbar-start">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} alt="zyck" />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={isActive(link.href) ? 'text-green-500' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex navbar-end justify-end">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;