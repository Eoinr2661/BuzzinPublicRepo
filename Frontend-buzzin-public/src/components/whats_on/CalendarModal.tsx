import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { Link } from 'react-router-dom';
import { fetchEventsByDateRange } from '../../api/fetchEventsByDateRange';
import { stripHtmlTags } from '../../utils/StripHTMLTags';
import { getEventsForDate } from '../../utils/GetEventsForDate';
import { CloseCalendarButton } from './calendar_components/CloseCalendarButton';
import { MonthTitle } from './calendar_components/MonthTitle';
import { MonthNavigation } from './calendar_components/MonthNavigationButtons';
import LoaderContainerHeight from '../ui/LoaderContainerHeight';

import type { CalendarModalProps, EventPost } from '../../../types/post.types';



const CalendarModal = ({ onClose, weekStartsOn = 1 }: CalendarModalProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn });
  const endDate = addDays(startDate, 41);

  useEffect(() => {
    setTimeout(() => setModalVisible(true), 10);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const start = format(startDate, 'yyyy-MM-dd');
        const end = format(endDate, 'yyyy-MM-dd');
        const fetchedEvents = await fetchEventsByDateRange(start, end);
        setEvents(fetchedEvents);
      } catch {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentMonth, weekStartsOn]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // This is where the names of the days at the top of the calendar are rendered
  const renderDays = () => {
    const days = [];
    const dayFormat = 'EEEEEE';
    const weekStart = startOfWeek(currentMonth, { weekStartsOn });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center font-semibold text-neutral-600 uppercase text-xs select-none"
          aria-label={format(addDays(weekStart, i), 'EEEE')}
        >
          {/* Day of week header cell (Mon, Tue, Wed) */}
          {format(addDays(weekStart, i), dayFormat)}
        </div>
      );
    }
    // Container for day headers row
    return <div className="grid grid-cols-7 gap-1 mb-2">{days}</div>;
  };

  // individual day cells within the calendar are rendered
  const renderCells = () => {
    const rows = [];
    let day = startDate;
    const today = new Date();

    for (let week = 0; week < 6; week++) {
      const daysInWeek = [];

      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const dayEvents = getEventsForDate(day, events);
        const displayEvents = dayEvents.slice(0, 3);
        const overflowCount = dayEvents.length - displayEvents.length;
        const isToday = isSameDay(day, today);

        daysInWeek.push(
          <div
            key={day.toISOString()}
            tabIndex={0}
            role="button"
            aria-pressed={isToday}
            className={`
            p-1 md:rounded-lg min-h-[100px] flex flex-col
            ${isToday ? 'bg-buzzin-purple-200' : isCurrentMonth ? 'bg-gray-50' : 'bg-gray-200 text-gray-300'}
          hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer shadow-sm`}
          >
            <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-black' : 'text-neutral-500'}`}>
              {format(day, 'd')}
            </div>

            {/* Container for event pills inside the day cell */}
            <div className="flex flex-col gap-[2px] overflow-y-auto max-h-[72px]">
              {displayEvents.length > 0 ? (
                displayEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    rel="noopener noreferrer"
                    className="block w-full"
                    title={stripHtmlTags(event.eventTitle)}
                  >
                    {/* event pill */}
                    <div className="bg-buzzin-lime-300 hover:bg-buzzin-lime-400 text-black text-[10px] truncate rounded px-1 py-[1px]">
                      {stripHtmlTags(event.eventTitle)}
                    </div>
                  </Link>
                ))
              ) : (
                <span className="text-[10px] text-gray-300 select-none">&nbsp;</span>
              )}

              {overflowCount > 0 && (
                <span className="text-[10px] text-gray-500 italic">+{overflowCount} more</span>
              )}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={week} className="grid grid-cols-7 gap-[3px] md:gap-1 mb-1">
          {daysInWeek}
        </div>
      );
    }

    // Full grid of calendar cells
    return <div>{rows}</div>;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    // Background covering
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50
    transition-opacity duration-300 ease-in-out
    ${modalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="calendar-modal-title"
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={` bg-white rounded-2xl p-2 md:p-6 max-h-[100vh] overflow-auto relative shadow-lg 
        w-[95vw] md:w-[95vw] max-w-[1200px] transform transition-transform duration-300 ease-in-out
        ${modalVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        style={{ willChange: 'transform, opacity' }}
      >

        <CloseCalendarButton onClick={handleClose} />
        <MonthTitle currentMonth={currentMonth} />
        <MonthNavigation prevMonth={prevMonth} nextMonth={nextMonth} />

        {/* (days + cells) */}
        {renderDays()}
        <div className="overflow-x-auto relative">
          <div className="md:min-w-[700px]">
            {renderCells()}
          </div>

          {/* Loading Screen overlay */}
          {loading && (
            <div
              className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center text-lg text-gray-600"
              style={{ pointerEvents: 'none' }}
            >
              <LoaderContainerHeight text='Loading Events...' />
            </div>
          )}
        </div>

        {/* Error message below calendar grid */}
        {error && (
          <div className="text-center text-red-600 py-4">{error}</div>
        )}

      </div>
      {/* End of Modal Container */}
    </div>
    // end of "background" div. 
  );

};

export default CalendarModal;
