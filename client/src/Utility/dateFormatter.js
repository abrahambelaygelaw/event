import { format } from "date-fns";
export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "MM-dd-yyyy");
  return formattedDate;
};
