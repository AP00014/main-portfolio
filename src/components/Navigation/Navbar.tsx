"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, FileText, Code, Mail, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = [
    { name: "Home", href: "/#hero", icon: Home },
    { name: "Projects", href: "/#projects", icon: Code },
    { name: "Timeline", href: "/#timeline", icon: FileText },
    { name: "About", href: "/#about", icon: User },
    { name: "Contact", href: "/#contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          Snergize Studio
        </Link>
        <div className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === "/" && item.href === "/#hero";
            return (
              <Link
                key={item.name}
                href={item.href}
                className="navbar-link"
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && (
                  <span className="navbar-dot" />
                )}
              </Link>
            );
          })}
        </div>
        <div className="navbar-actions">
          <div className="navbar-theme">
            <ThemeToggle />
          </div>
          <MobileMenu items={navItems} currentPath={pathname} />
        </div>
      </div>
    </nav>
  );
}
