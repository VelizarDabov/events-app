import React from "react";
import Card from "./Card";
// interface Event {
//   event: {
//     title: string;
//     description: string;
//     location: string;
//     imageUrl: string;
//     startDateTime: Date;
//     endDateTime: Date;
//     categoryId: string;
//     price: string;
//     isFree: boolean;
//     url: string;
//   };
//   userId: string;
//   path: string;
// }
// type CollectionProps = {
//   data: Event[]
//   emptyTitle: string;
//   emptyStateSubtext: string;
//   limit: number;
//   page: string | number;
//   totalPages?: number;
//   urlParamName?: string;
//   collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
// };
const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}) => {

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col  gap-10 h-full">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
            {data.map((event, index) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={index}>
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-200 py-28 text-center">
          {" "}
          <h3 className="p-bold md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14 "> {emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
