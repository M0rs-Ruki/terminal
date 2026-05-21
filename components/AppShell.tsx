"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Tag from "@/components/Tag";
import { ShellContext } from "@/context/ShellContext";

function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || pathname.startsWith("/blog/");
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = isBlogPath(pathname);
  const [hideIdentityOnMobile, setHideIdentityOnMobile] = useState(false);

  return (
    <ShellContext.Provider value={{ setHideIdentityOnMobile }}>
      <main className="app-shell" role="main">
        <div
          className={`main-content-area${isBlog ? " blog-full-terminal" : ""}`}
        >
          {!isBlog && (
            <section
              className={`identity-pane ${
                isHome && hideIdentityOnMobile ? "hide-on-mobile" : ""
              }`}
              aria-label="Developer identity — Anup Pradhan"
            >
              <Tag />
            </section>
          )}
          <section className="terminal-pane">{children}</section>
        </div>
      </main>
    </ShellContext.Provider>
  );
}
