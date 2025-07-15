import React from "react";
import { FaThLarge, FaList, FaRegCalendarAlt } from "react-icons/fa";
import CalendarModal from "./CalendarModal";

import type { ViewModeButtonsProps } from "../../../types/post.types";

const ViewModeButtons: React.FC<ViewModeButtonsProps> = ({
  viewMode,
  setViewMode,
  showCalendar,
  setShowCalendar,
}) => {
  const iconBaseStyle =
    "text-3xl transition-transform transform hover:scale-110 duration-150";

  const getIconColor = (active: boolean) =>
    active ? "text-buzzin-purple-700" : "text-buzzin-purple-300";

  return (
    <div className="flex flex-col w-full ">
      <div className="hidden md:flex justify-between items-center my-6">

        <h2 className="text-xl md:text-2xl font-bold font-Montserrat-VariableFont text-buzzin-purple-500">
          Find your Event
        </h2>

        <div className="flex items-center gap-4 text-gray-800">
          <span className="font-bold font-Montserrat-VariableFont text-lg text-gray-800">
            Filter View:
          </span>

          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid View"
            className={`${iconBaseStyle} ${getIconColor(viewMode === "grid")}`}
          >
            <FaThLarge />
          </button>

          <button
            onClick={() => setViewMode("list")}
            aria-label="List View"
            className={`${iconBaseStyle} ${getIconColor(viewMode === "list")}`}
          >
            <FaList />
          </button>

          <button
            onClick={() => setShowCalendar(true)}
            aria-label="Calendar View"
            className={`${iconBaseStyle} ${getIconColor(showCalendar)}`}
          >
            <FaRegCalendarAlt />
          </button>
        </div>

        {showCalendar && (
          <CalendarModal onClose={() => setShowCalendar(false)} />
        )}
      </div>
      <span className="block w-full h-[1px] bg-buzzin-purple-500 mb-6 mt-6 md:mt-0"></span>
    </div>

  );
};

export default ViewModeButtons;
