import { useEffect, useState } from "react";
import EventsSubSection from "./EventsSubSection";
import Hero from "./Hero";
import MailingListSignup from "./MailingListSignUp";
import PostsSubSection from "./PostSubsection";
import { fetchEvents } from "../../api/fetchEventsPaginated";
import { fetchPosts } from "../../api/fetchPostsPaginated";
import LoaderScreenHeight from "../ui/LoaderScreenHeight";
import { Villain } from "./Villain";

import type { EventPost, Post } from "../../../types/post.types";
import MoreButton from "./MoreButton";

const HomeViewDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventPost[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsRes, postsRes] = await Promise.all([
          fetchEvents({ page: 0, perPage: 3 }),
          fetchPosts({ page: 0, perPage: 3, sortBy: "publishedAt", order: "desc" }),
        ]);
        setEvents(eventsRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Failed to load homepage data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoaderScreenHeight text="Loading the Buzz..." />;

  return (
    <main className="min-h-screen flex flex-col justify-start items-start text-center bg-gray-100">
      <Hero />
      <PostsSubSection posts={posts} />
      <MoreButton href="/AllThingsCulture" text="More Posts..."/>
      <EventsSubSection events={events} />
      <MoreButton href="/Whatson" text="More Events..."/>
      <Villain/>
      <MailingListSignup />
    </main>
  );
};

export default HomeViewDisplay;
