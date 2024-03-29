import { Tables } from "@/types/supabase";
import React, { useState } from "react";

type Props = {
  venues: Tables<"venues">[];
  selectedVenueIds: number[];
  setSelectedVenueIds: (ids: number[]) => void;
};

const Venues: React.FC<Props> = ({
  venues,
  selectedVenueIds,
  setSelectedVenueIds,
}) => {
  return (
    <div className="grid grid-rows-3 gap-5">
      {venues.map(({ id, name, description }) => (
        <label key={id} htmlFor={`venue-checkbox-${id}`} className="flex">
          <div className="flex justify-center">
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:cursor-pointer">
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-500 mb-4">
                <input
                  id={`venue-checkbox-${id}`}
                  type="checkbox"
                  value={id}
                  name="bordered-checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedVenueIds([...selectedVenueIds, id]);
                    } else {
                      setSelectedVenueIds(
                        selectedVenueIds.filter((v) => v !== id)
                      );
                    }
                  }}
                />
                <div className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {selectedVenueIds.includes(id) ? "Selected" : "Select"}
                </div>
              </div>
              <div className="w-full h-[200px] bg-slate-500 mb-5"></div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Venues;
