"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

export default function NavMenu() {
  const { data: session } = useSession();

  return (
    <ul className="flex items-center justify-center gap-6 text-sm">
      <li>
        <Link href="/dashboard" className="hover:text-gray-600">
          Dashboard
        </Link>
      </li>

      {session?.user && (
        <li>
          <Link href="/profile" className="hover:text-gray-600">
            Profile
          </Link>
        </li>
      )}

      {!session?.user && (
        <>
          <li>
            <Link href="/login" className="hover:text-gray-600">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-gray-600">
              Register
            </Link>
          </li>
        </>
      )}

      {session?.user && (
        <li>
          <LogoutButton />
        </li>
      )}

      {session?.user?.image && (
        <li>
          <Image
            height={100}
            width={100}
            src={session.user.image}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </li>
      )}
    </ul>
  );
}
