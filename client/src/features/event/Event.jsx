import React, { useEffect, useState } from "react";
import RegistreeForm from "../registree/RegistreeForm";
import PictureSlider from "../../components/Slider";
import { useParams } from "react-router-dom";
import useDataFetching from "../../hooks/useDataFetching";
import { dateFormatter } from "../../Utility/dateFormatter";
import DOMPurify from "dompurify";

const Event = () => {
  const { id } = useParams();
  const { data } = useDataFetching(`event/${id}`);
  const [event, setEvent] = useState();
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(data);
    if (data) {
      setEvent(data.data);
      setImages(data.data.pictures);
    }
  }, [data]);

  return (
    <>
      {event && (
        <div className=" max-w-screen-md m-auto ">
          <div className="pt-5">
            <h3 className="text-primary mx-5 text-lg font-semibold">
              {event.title}
            </h3>
          </div>
          {images.length > 0 && <PictureSlider images={images} />}
          <div className="flex justify-between mx-5 my-3 text-secondary">
            <h1>{event.location}</h1>
            <h1>{dateFormatter(event.date)}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.description),
            }}
          ></div>
          <RegistreeForm />
        </div>
      )}
    </>
  );
};

export default Event;
