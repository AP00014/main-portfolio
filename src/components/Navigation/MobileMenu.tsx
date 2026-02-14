"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, type LucideIcon } from "lucide-react";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

interface MobileMenuProps {
  items: NavItem[];
  currentPath: string;
}

export default function MobileMenu({ items, currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 350);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="mobile-menu-wrapper">
      <button
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            setIsOpen(true);
          }
        }}
        className={`mobile-menu-button ${
          isOpen ? "mobile-menu-button-open" : ""
        }`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="mobile-menu-icon" />
        ) : (
          <Menu className="mobile-menu-icon" />
        )}
      </button>
      {(isOpen || isClosing) && (
        <div className={`mobile-menu-panel ${isClosing ? "is-closing" : ""}`}>
          <nav className="mobile-menu-nav">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === "/" && item.href === "/#hero";
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className={`mobile-menu-link ${isActive ? "mobile-menu-link-active" : ""}`}
                >
                  <Icon className="mobile-menu-link-icon" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="mobile-menu-theme">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
