import { useState } from "react";
import EventSearchFilter from "./EventSearchFilter";
import EventsGrid from "./EventsGrid";
import ViewModeButtons from "./ViewModeButtons";
import PageTitle from "../ui/PageTitle";
import Pagination from "../ui/Pagination";

const WhatsOnDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCalendar, setShowCalendar] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div className="flex flex-col">
      <main className="min-h-screen flex flex-col text-center items-start mx-10 md:mx-16 lg:mx-28 mt-10">
        <PageTitle title="What's On" />
        <EventSearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ViewModeButtons
          viewMode={viewMode}
          setViewMode={setViewMode}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
        />

        <EventsGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          viewMode={viewMode}
          page={page}
          setPage={setPage}
          setTotalPages={setTotalPages}
        />

      </main>
      <Pagination
        currentPage={page}
        totalPages={totalPages - 1}
        onPageChange={setPage}
      />
    </div>

  );
};

export default WhatsOnDisplay;
