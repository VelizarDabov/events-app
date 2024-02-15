import { db } from "@/firebase";
import { formatDateTime } from "@/lib/utils";
// import { auth } from "@clerk/nextjs";
import { ArrowBigDown, Edit } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import DeleteConformation from "./DeleteConformation";

type CardProps = {
  event: [];
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
 

  // const { sessionClaims } = auth();
  // const userId = sessionClaims?.userId as string;
  // const isEventCreator = userId === event.userId;
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[43px]">
      <Link
        href={`/events/${event.event.categoryId}`}
        style={{ backgroundImage: `url(${event.event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-200 bg-cover bg-center text-gray-500"
      />
      {/* {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event.userId}/update`}>
            <Edit className="w-[20px] h-[20px]" />
            <DeleteConformation eventId={event.userId} />
          </Link>
        </div>
      )} */}



      {/* DELETE */}
      {/* <Link
        href={`/events/${event.event.categoryId}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      /> */}
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-200 px-4 py-1 text-green-60">
              {event.event.isFree ? "FREE" : `$${event.event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full px-4 bg-gray-500/10 py-1 text-gray-500">
              {event.event.categoryId}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(event.event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {" "}
          {event.event.title}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.event.organization}
          </p>
          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event.event.userId}`}
              className="flex gap-2"
            >
              <p className="text-primary-500 ">Order Details</p>
              <ArrowBigDown className="w-[10px] h-[10px]" />
            </Link>
          )}
        </div>
    </div>
    </div>
  );
};

export default Card;
