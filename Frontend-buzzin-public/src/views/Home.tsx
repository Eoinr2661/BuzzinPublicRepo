import Header from '../components/ui/Header';
import Footer from "../components/ui/Footer";
import HomeViewDisplay from '../components/home/HomeViewDisplay';

const HomeView = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header />
      <HomeViewDisplay/>
      <Footer />
    </div>
  );
};

export default HomeView;