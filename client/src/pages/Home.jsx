import React, { useEffect, useState } from "react";
import useDataFetching from "../hooks/useDataFetching";
import Events from "../features/event/Events";
const Home = () => {
  const [events, setEvents] = useState();
  const { data } = useDataFetching("event");
  useEffect(() => {
    if (data) {
      setEvents(data.data);
    }
  }, [data]);
  return (
    <div className=" max-w-screen-xl md:m-auto p-5  bg-background h-full">
      <Events events={events} />
    </div>
  );
};

export default Home;
