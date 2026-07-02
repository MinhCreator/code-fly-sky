"use client";
import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { navbarMetadata } from "@/lib/navbarMetadata";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useLayoutEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      setMenuHeight(mobileMenuRef.current.scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* <!-- Logo --> */}
          <a
            href="#"
            className="flex items-center text-[#4F46E5] hover:text-[#6366F1]"
          >
            <Image
              src="/logov2.svg"
              alt="brand"
              className="w-auto h-auto"
              width={10}
              height={49}
            />
          </a>

          {/* <!-- Mobile Menu Button (Hidden on larger screens) --> */}
          <div className="md:hidden">
            <button
              id="menu-toggle"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="text-gray-800 hover:text-[#4F46E5] focus:outline-none transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* <!-- Desktop Navigation (Hidden on smaller screens) --> */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navbarMetadata.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="hover:text-[#4F46E5] transition-colors duration-300"
                    >
                    {item.icon}
                    {item.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="bg-[#439af7] hover:bg-[#2389f7] text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* <!-- Mobile Menu (Hidden by default) --> */}
        <nav
          id="mobile-menu"
          ref={mobileMenuRef}
          style={{
            height: menuHeight ? `${menuHeight}px` : "0",
            overflow: "hidden",
          }}
          className={`${isMobileMenuOpen ? "" : "hidden"} md:hidden bg-gray-50 border-t border-gray-200 transition-height duration-300 ease-in-out`}
        >
          <ul className="px-4 py-2">
            {navbarMetadata.map((item, index) => (
              <li key={index}>
                {item.icon}
                <a href={item.href} className="block py-2 hover:text-[#4F46E5]">
                  {item.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="block py-2 bg-[#439af7] hover:bg-[#2389f7] text-white rounded-md text-center transition-colors duration-300"
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
