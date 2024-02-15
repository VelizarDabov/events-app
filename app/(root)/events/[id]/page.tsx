"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { formatDateTime } from "@/lib/utils";
import { CreateEventParams } from "@/types";
import { Calendar, Locate } from "lucide-react";
import Image from "next/image";
import RenderAll from "@/components/shared/RenderAll";
import Collection from "@/components/shared/Collection";

const EventDetails = ({ params }: { params: { id: string } }) => {
  const [events, setEvents] = useState<CreateEventParams[]>([]);

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
          .filter((event) => event.event.categoryId === params.id); // Filter events based on the categoryId
        setEvents(fetchedEvents);
      } catch (error) {
        console.log("Error-eventsID", error);
      }
    };
    fetchEvents();
  }, [params.id]);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src="https://images.pexels.com/photos/13791400/pexels-photo-13791400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hero image"
            height={1000}
            width={1000}
            className=" hidden md:flex h-full w-full flex-col gap-8 p-5 md:p-10  hover:scale-105 transition duration-300 shadow-xl"
          />
          <div className="flex  w-ful flex-col gap-8 p-5 md:p-10">
            {events.map((event) => (
              <div
                key={event.userId}
                className="flex w-full flex-col gap-8 p-5 md:p-10  hover:scale-105 transition duration-300 shadow-xl"
              >
                <Image
                  src={event.event.imageUrl}
                  alt="event emage"
                  width={300}
                  height={150}
                />
                <div className="flex flex-col gap-6">
                  <h2 className="h2-bold">{event.event.title}</h2>
                  <h3 className="">by {event.event.organization}</h3>
                  <div className="flex flex-col gap-3 sm:flex-row items-center">
                    <div className="flex gap-3">
                      <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                        {event.event.isFree ? "FREE" : `$${event.event.price}`}
                      </p>
                      <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                        {event.event.categoryId}
                      </p>
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
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS FROM THE SAME ORGANIZER */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12 ">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={events}
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
