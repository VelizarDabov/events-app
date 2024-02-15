"use client";
import { db } from "@/firebase";
import { formatDateTime } from "@/lib/utils";
import { CreateEventParams } from "@/types";
import { Calendar, Locate } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EventDetails = () => {
  const [events, setEvents] = useState<CreateEventParams[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await db.collection("events").get();
        const fetchedEvents: CreateEventParams[] = snapshot.docs.map((doc) => {
          const eventData = doc.data();
          console.log(eventData);
          return {
            userId: doc.id,
            event: {
              categoryId: eventData.categoryId,
              description: eventData.description,
              endDateTime: eventData.endDateTime.toDate(), // Convert Firestore timestamp to JavaScript Date object
              imageUrl: eventData.imageUrl,
              isFree: eventData.isFree,
              location: eventData.location,
              price: eventData.price,
              startDateTime: eventData.startDateTime.toDate(), // Convert Firestore timestamp to JavaScript Date object
              title: eventData.title,
              url: eventData.url,
            },
            path: doc.ref.path,
          };
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.log("Error-eventsID", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w7xl">
        <Image src='https://images.pexels.com/photos/13791400/pexels-photo-13791400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="hero image" height={1000} width={1000}   className="h-full min-h-[300px] object-cover object-center rounded-md transform hover:scale-105 transition duration-300 shadow-xl"/>
        <div className="flex w-ful flex-col gap-8 p-5 md:p-10">
          {events.map((event) => (
            <div
              key={event.userId}
              className="flex w-full flex-col gap-8 p-5 md:p-10  hover:scale-105 transition duration-300 shadow-xl"
            >
              <div className="flex flex-col gap-6">
                <h2 className="h2-bold">{event.event.title}</h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <div className='flex gap-2 md:gap-3'>
              <Calendar width={32} height={32} className="text-orange-400" />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(event.event.startDateTime).dateOnly} - {' '}
                  {formatDateTime(event.event.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(event.event.endDateTime).dateOnly} -  {' '}
                  {formatDateTime(event.event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Locate width={32} height={32} className="text-orange-400" />
              <p className="p-medium-16 lg:p-regular-20">{event.event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.event.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.event.url}</p>
          </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
