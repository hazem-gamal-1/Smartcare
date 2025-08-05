// hooks/useHandleNavigation.ts
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";

export function useHandleNavigation() {
  const router = useRouter();
  const currentPage = usePathname();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();

  const handleNavigation = (itemId: string) => {
    if (itemId !== currentPage) {
      if (itemId === "/about" || itemId === "/" || itemId === "/contact") {
        router.push(itemId);
      } else {
        if (isSignedIn) {
          router.push(itemId);
        } else {
          openSignUp(); // or openSignIn() depending on your flow
        }
      }
    }
  };

  return { handleNavigation };
}
