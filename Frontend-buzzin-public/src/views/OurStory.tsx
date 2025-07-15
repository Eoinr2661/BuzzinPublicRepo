import Header from '../components/ui/Header';
import Footer from "../components/ui/Footer";
import OurStoryDisplay from '../components/our_story/OurStoryDisplay';


const OurStory = () => {
  return (
    <div className='min-h-screen w-full bg-gray-100'>
      <Header />
      <OurStoryDisplay/>
      <Footer />
    </div>
  );
};

export default OurStory;