import { EventProvider } from "../../context/EventProvider";
import EventForm from "./EventForm";
export const Dashboard = () => {
  return (
    <EventProvider>
      <EventForm />
    </EventProvider>
  );
};
export default Dashboard;
