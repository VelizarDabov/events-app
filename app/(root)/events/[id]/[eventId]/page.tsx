"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { formatDateTime } from "@/lib/utils";
import { CreateEventParams } from "@/types";
import { Calendar, Locate } from "lucide-react";
import Image from "next/image";
import Collection from "@/components/shared/Collection";
import { usePathname } from "next/navigation";



const EventDetails = () => {
  const url = usePathname();
  const parts = url.split('/');
  const id = parts[parts.length - 2]; // ID is the second last part of the URL
  const categoryId = parts[parts.length - 1];
  const [events, setEvents] = useState<CreateEventParams[]>([]);
  const [eventsWithSameCategory, setEventsWithSameCategory] = useState<CreateEventParams[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await db.collection("events").get();
        const fetchedEvents: CreateEventParams[] = snapshot.docs
          .map((doc) => {
            const eventData = doc.data();
            return {
              userId: doc.id,
              event: {
                organization:eventData.organization,
                categoryId: eventData.categoryId,
                description: eventData.description,
                endDateTime: eventData.endDateTime.toDate(),
                imageUrl: eventData.imageUrl,
                isFree: eventData.isFree,
                location: eventData.location,
                price: eventData.price,
                startDateTime: eventData.startDateTime.toDate(),
                title: eventData.title,
                url: eventData.url,
              },
              path: doc.ref.path,
            };
          })
          .filter((event) => id === event.userId); // Filter events based on the categoryId
        setEvents(fetchedEvents);
      } catch (error) {
        console.log("Error-eventsID", error);
      }
    };
    const fetchEventsWithSameCategory = async () => {
    try {
      const snapshot = await db.collection("events").get();
      const fetchedEvents: CreateEventParams[] = snapshot.docs
        .map((doc) => {
          const eventData = doc.data();
          return {
            userId: doc.id,
            event: {
              categoryId: eventData.categoryId,
              description: eventData.description,
              endDateTime: eventData.endDateTime.toDate(),
              imageUrl: eventData.imageUrl,
              isFree: eventData.isFree,
              location: eventData.location,
              price: eventData.price,
              startDateTime: eventData.startDateTime.toDate(),
              title: eventData.title,
              url: eventData.url,
            },
            path: doc.ref.path,
          };
        })
        .filter((event) => categoryId === event.event.categoryId && id !== event.userId) ; // Filter events based on the categoryId
      setEventsWithSameCategory(fetchedEvents);
    } catch (error) {
      console.log("Error-eventsID", error);
    }
  };
    fetchEvents();
    fetchEventsWithSameCategory()
  }, []);
useEffect(() =>{

} )
  return (
    <>

      <section className="flex justify-center   bg-gray-100 bg-dotted-pattern bg-contain ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
            {events.map((event) => (
              <>
              <div key={event.userId} className="flex w-full  m-5 object-fit">
              <Image
              src={event.event.imageUrl}
            className="max-h-[100vh] object-contain object-center 2xl:max-h[100vh] "
            width={1000}
            height={1000}
            alt="image"
          />
              {/* <Image
                  src={event.event.imageUrl}
                  alt="event emage"
                  width={300}
                  height={150}
                  className="flex w-full flex-col transition duration-300 shadow-xl"
                /> */}
              </div>

               <div
                key={event.userId}
                className="flex w-full flex-col m-5 gap-8 p-5 md:p-10  bg-white  transition duration-300 shadow-xl"
              >
                <div className="flex w-full flex-col gap-8 p-6 md:p-10">
                  <h2 className="h2-bold">{event.event.title}</h2>
                 
                  <div className="flex flex-col gap-3 sm:flex-row items-center">
                    <div className="flex gap-3 flex-center">
                      <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                        {event.event.isFree ? "FREE" : `$${event.event.price}`}
                      </p>
                      <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                        {event.event.categoryId}
                      </p>
                      <h3 className="ml-2">by {event.event.organization}</h3>
                    </div>
                  </div>
                  {/* <CheckoutButton event={event} /> */}
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-2 md:gap-3">
                      <Calendar
                        width={32}
                        height={32}
                        className="text-orange-400"
                      />
                      <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                        <p>
                          {formatDateTime(event.event.startDateTime).dateOnly} -{" "}
                          {formatDateTime(event.event.startDateTime).timeOnly}
                        </p>
                        <p>
                          {formatDateTime(event.event.endDateTime).dateOnly} -{" "}
                          {formatDateTime(event.event.endDateTime).timeOnly}
                        </p>
                      </div>
                    </div>

                    <div className="p-regular-20 flex items-center gap-3">
                      <Locate
                        width={32}
                        height={32}
                        className="text-orange-400"
                      />
                      <p className="p-medium-16 lg:p-regular-20">
                        {event.event.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="p-bold-20 text-grey-600">
                      What You'll Learn:
                    </p>
                    <p className="p-medium-16 lg:p-regular-18">
                      {event.event.description}
                    </p>
                    <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline cursor-pointer">
                      {event.event.url}
                    </p>
                  </div>
                </div>
              </div>
              </>
                    ))}
                 </div>
               </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12 ">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={eventsWithSameCategory}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default EventDetails;