"use client";
import { CreateCategoryParams, CreateEventParams, Event } from "@/types";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutBtn = ({ event }: { event: CreateEventParams }) => {
  const url = usePathname();
  const parts = url.split("/");
  const id = parts[parts.length - 2];

  const hasFinished = new Date(event.event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {hasFinished ? (
        <p className="p-2 text-red-400">Tickets are no longer available.</p>
      ) : (
        <>
         <SignedOut>
            <Button asChild className="button rounded-full " size='lg'>
                <Link href='/sign-in'> Get Tickets</Link>
            </Button>
         </SignedOut>
         <SignedIn>
            <Checkout event={event} userId={id} />
         </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutBtn;
