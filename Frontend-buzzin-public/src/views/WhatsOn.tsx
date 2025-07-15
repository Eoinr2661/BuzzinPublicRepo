import Header from '../components/ui/Header';
import Footer from "../components/ui/Footer";
import WhatsOnDisplay from '../components/whats_on/WhatsOnDisplay';

const WhatsOnView = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header />
      <WhatsOnDisplay/>
      <Footer />
    </div>
  );
};

export default WhatsOnView;