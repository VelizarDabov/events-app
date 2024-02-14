import Link from "next/link";
import React from "react";

type CardProps = {
  event: [];
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
    console.log(event)
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[43px]">

        <Link href={`/events/${event.categoryId}`} style={{backgroundImage:`url(${event.imageUrl})`}} className="flex-center flex-grow bg-gray-200 bg-cover bg-center text-gray-500"/>
        <Link  href={`/events/${event.categoryId}`} className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">

<div className="flex gap-2">
 <span className="p-semibold-14 w-min rounded-full bg-green-200 px-4 py-1 text-green-60">
    {event.event.isFree ? 'FREE' : `$${event.event.price}`}
 </span>
 <p className="p-semibold-14 w-min rounded-full px-4 bg-gray-500/10 py-1 text-gray-500">{event.categoryId}</p>
</div>
        </Link>
       
    </div>
  );
};

export default Card;
