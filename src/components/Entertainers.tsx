import { Tables } from "@/types/supabase";
import Image from "next/image";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  entertainers: Tables<"entertainers">[];
  selectedEntertainerIds: number[];
  setSelectedEntertainerIds: (ids: number[]) => void;
};

const Entertainers: React.FC<Props> = ({
  entertainers,
  selectedEntertainerIds,
  setSelectedEntertainerIds,
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
      {entertainers
        .filter((entertainer) => entertainer.status === "ready")
        .map(
          ({
            id,
            name,
            description,
            number_of_photos: numberOfPhotos,
            slug,
          }) => (
            <label
              key={id}
              htmlFor={`entairtainer-checkbox-${id}`}
              className="block"
            >
              <div className="flex h-full">
                <div className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:cursor-pointer">
                  <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-500 mb-4">
                    <input
                      id={`entairtainer-checkbox-${id}`}
                      type="checkbox"
                      value={id}
                      name="bordered-checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEntertainerIds([
                            ...selectedEntertainerIds,
                            id,
                          ]);
                        } else {
                          setSelectedEntertainerIds(
                            selectedEntertainerIds.filter((v) => v !== id)
                          );
                        }
                      }}
                    />
                    <div className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {selectedEntertainerIds.includes(id)
                        ? "Selected"
                        : "Select"}
                    </div>
                  </div>
                  {(numberOfPhotos || 0) > 0 ? (
                    <div className="overflow-hidden" ref={emblaRef}>
                      <div className="flex">
                        {Array.from<number>({
                          length: numberOfPhotos || 0,
                        }).map((_, i) => (
                          <div
                            className="flex-grow-0 flex-shrink-0 basis-full"
                            key={`entertainer-${id}-photo-${i}`}
                          >
                            <Image
                              src={`/images/entertainers/${slug}/image${
                                i + 1
                              }.jpg`}
                              width={400}
                              height={300}
                              alt={name || "Entertainer"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[200px] bg-slate-500 mb-5"></div>
                  )}
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              </div>
            </label>
          )
        )}
    </div>
  );
};

export default Entertainers;
