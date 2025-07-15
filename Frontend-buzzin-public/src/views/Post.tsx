import Header from '../components/ui/Header';
import Footer from "../components/ui/Footer";
import PostDisplay from '../components/post/PostDisplay';

const Event = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header />
      <PostDisplay/>
      <Footer />
    </div>
  );
};

export default Event;