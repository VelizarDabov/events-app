"use client";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { CreateEventParams } from "@/types";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<CreateEventParams[]>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await db.collection("events").get();
        const fetchedEvents: CreateEventParams[] = snapshot.docs.map((doc) => {
          const eventData = doc.data();

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
              organization:eventData.organization,
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
  // console.log(events);
  return (
    <>
      <section className="bg-gray-200 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, CelebrateL Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              {" "}
              Book and learn helpful tips from 1,234+ mentors in world-class
              companies with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="max-h-[70vh] object-contain object-center 2xl:max-h[50vh] "
            width={1000}
            height={1000}
            alt="image"
          />
        </div>
      </section>

      <section
        className="wrapper my-8 flex flex-col  gap-8 md:gap-12"
        id="events"
      >
        <h2 className="h2-bold">
          {" "}
          Trusted by <br /> Thousands of Events{" "}
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Collection
            data={events}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={2}
          />
        </div>
      </section>
    </>
  );
}
