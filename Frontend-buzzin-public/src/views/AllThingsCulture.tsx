import Header from '../components/ui/Header';
import Footer from "../components/ui/Footer";
import CultureViewDisplay from '../components/all_things_culture/CultureViewDisplay';

const AllThingsCultureView = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header />
      <CultureViewDisplay/>
      <Footer />
    </div>
  );
};

export default AllThingsCultureView;