import Header from '../components/ui/Header';
import Footer from "../components/ui/Footer";
import EventDisplay from '../components/event/EventDisplay';

const Event = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header />
      <EventDisplay/>
      <Footer />
    </div>
  );
};

export default Event;