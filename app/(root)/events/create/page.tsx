import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string
 
  return (
    <>
      <section className="bg-gray-200  bg-cover bg-center py-5 md:py-10 ">
        <h3 className="wrapper h3-bold text-center sm:text-left ">
          Create Event
        </h3>
      </section>
      <div className="wrapper my-8">
<EventForm type='Create' userId={userId}/>

      </div>
    </>
  );
};
export default CreateEvent;

// export default CreateEvent;
// 'use client'
// import { useState } from 'react';
// import { auth } from '@clerk/nextjs';
// import { db } from '@/firebase';
// import EventForm from '@/components/shared/EventForm';

// const CreateEvent = () => {
//   const { sessionClaims } = auth();
//   const userId = sessionClaims?.userId as string;
//   const [eventId, setEventId] = useState<string>('');

//   const handleEventCreation = async (createdEventId: string) => {
//     setEventId(createdEventId);
//   };

//   const createEvent = async (eventData) => {
//     try {
//       // Add your logic to create the event in Firebase
//       const docRef = await db.collection('events').add(eventData);
//       const createdEventId = docRef.id;
//       handleEventCreation(createdEventId);
//     } catch (error) {
//       console.error('Error creating event:', error);
//     }
//   };

//   return (
//     <>
//       <section className="bg-gray-200 bg-dotted-patern bg-cover bg-center py-5 md:py-10 ">
//         <h3 className="wrapper h3-bold text-center sm:text-left ">Create Event</h3>
//       </section>
//       <div className="wrapper my-8">
//         <EventForm type="Create" userId={userId} eventId={eventId} createEvent={createEvent} />
//       </div>
//     </>
//   );
// };

// export default CreateEvent;
