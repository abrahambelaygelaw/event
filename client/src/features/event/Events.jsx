import React from "react";
import { useNavigate } from "react-router-dom";

const Events = ({ events }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-center  gap-4 bg-background h-full">
      {events &&
        events.length > 0 &&
        events.map((item) => (
          <div
            key={item._id}
            className="w-[330px]  h-[300px] border-stroke border-2 rounded-lg p-1 relative"
            style={{
              backgroundImage: `url("${
                import.meta.env.VITE_BASE_URL + item.pictures[0]
              }")`,
              backgroundSize: "cover",
            }}
          >
            {" "}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-lg z-0"></div>
            <div className="flex-col flex justify-between h-full relative z-10 p-1 ">
              <span className="bg-primary text-sm max-w-fit text-white p-1 rounded-md ">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <div className="items-end flex flex-col">
                <span className=" font-semibold text-xl">{item.location}</span>
                <h3
                  onClick={() => {
                    navigate(`/events/${item._id}`);
                  }}
                  className="text-primary hover:text-primaryHover cursor-pointer"
                >
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Events;
