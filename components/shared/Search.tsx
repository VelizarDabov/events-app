"use client";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { db } from "@/firebase";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
interface DataItem {
    id: string; // Assuming doc.id is a string
    categoryId: string; // Assuming categoryId is a string
    title: string; // Assuming title is a string
    // Add other properties as needed
  }
const Search = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchValue) {
          const snapshot = await db
            .collection("events")
            .get();

        const data: DataItem[] = snapshot.docs
  .map((doc) => {
    const { id, ...rest } = doc.data(); // Destructure id from doc.data()
    return { id: doc.id, ...rest } as DataItem; // Include id separately and merge the rest of the properties
  })
  .filter(
    (doc) =>
      doc.categoryId.toLowerCase() === searchValue.toLowerCase() ||
      doc.title.toLowerCase() === searchValue.toLowerCase()
  );

          setSearchResults(data);
        } else {
          setSearchResults([]); // Clear search results if searchValue is empty
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue]);
  return (
  
  <>
  <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
      <SearchIcon className="w-[24px] h-[24px]" />
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
        className="p-regular-16 border-0 bg-gray-100 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      
    </div>
    <div className="w-full h-full">
    {searchResults.map((event) => (
        <div className="group relative flex flex-row min-h-[380px] w-full max-w-[400px] overflow-hidden rounded-xl bg-white  transition-all hover:shadow-lg md:min-h-[43px]  hover:scale-105 duration-300 shadow-xl">
        <Link
     href={`/events/${event.userId}/${event.categoryId}`}
     style={{ backgroundImage: ` url(${event.imageUrl} )`, height: '200px', width:'380',opacity:'50' ,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'}} // Add url() around the imageUrl
     className="flex-center flex-grow bg-gray-200 bg-cover bg-center text-gray-500 "
   >
     <Image src={event.imageUrl} alt="event emage" width={200} height={150} className="  hover:scale-105 duration-300 shadow-xl"/>
   </Link>
    
         <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
           
           <p className="p-medium-16 p-medium-18 text-gray-500">
             {formatDateTime(event.startDateTime).dateTime}
           </p>
           <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
             {" "}
             {event.title}
           </p>
           <div className="flex-between w-full">
             <p className="p-medium-14 md:p-medium-16 text-gray-600">
               {event.organization}
   </p>
           </div>
       </div>
       </div>
        ))}
    </div>
  </>
    
  );
};

export default Search;
