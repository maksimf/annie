import { Tables } from "@/types/supabase";
import Breadcrumbs from "./Breadcrumbs";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type Props = {
  entertainer: Tables<"entertainers">;
};

const ShowAct: React.FC<Props> = ({
  entertainer: {
    name,
    number_of_photos: numberOfPhotos,
    id,
    slug,
    description,
    price,
    booking_policy: bookingPolicy,
    website,
    services,
  },
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Breadcrumbs pages={[{ name: "Acts" }, { name: name || "" }]} />
      <div className="mt-4">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {name}
          </h3>
        </div>
        {(numberOfPhotos || 0) > 0 ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {Array.from<number>({
                length: numberOfPhotos || 0,
              }).map((_, i) => (
                <div
                  className="flex-grow-0 flex-shrink-0 basis-full"
                  key={`act-${id}-photo-${i}`}
                >
                  <Image
                    src={`/images/acts/${slug}/image${i + 1}.jpg`}
                    width={400}
                    height={300}
                    alt={name || "Entertainer"}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Price
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {price}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Booking policy
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {bookingPolicy}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Website
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={website || ""}
                  target="_blank"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {website}
                </a>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Services
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <pre className="font-sans">{services}</pre>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ShowAct;
