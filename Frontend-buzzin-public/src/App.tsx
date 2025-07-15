import { Routes, Route } from "react-router-dom";
import Home from "./views/Home"
import OurStory from "./views/OurStory";
import WhatsOn from "./views/WhatsOn";
import AllThingsCulture from "./views/AllThingsCulture";
import Event from "./views/Event";
import Post from './views/Post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AllThingsCulture" element={<AllThingsCulture />} />
      <Route path="/OurStory" element={<OurStory />} />
      <Route path="/WhatsOn" element={<WhatsOn />} />
      <Route path="/events/:id" element={<Event />} />
      <Route path="/posts/:id" element={<Post />} />
    </Routes>
  );
}

export default App;

// Theme colours; 
// buzzin   --color-buzzin-lime-300: #c1ff72;
// buzzin   --color-buzzin-purple-500: #8c52ff;
// buzzin   --color-buzzin-