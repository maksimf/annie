import { PropsWithChildren } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Database } from "@/types/supabase";
import Link from "next/link";
import Image from "next/image";

type Provider = {
  id: number;
  name: string | null;
  slug: string | null;
  number_of_photos: number | null;
  status: Database["public"]["Enums"]["provider_status"] | null;
  description: string | null;
};

type Props = {
  providers: Provider[];
  kind: "acts" | "venues";
};

const ListProviders: React.FC<PropsWithChildren<Props>> = ({
  providers,
  kind,
}) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-fr">
      {providers
        .filter((provider) => provider.status === "ready")
        .map(
          ({
            id,
            name,
            description,
            slug,
            number_of_photos: numberOfPhotos,
          }) => (
            <Link key={id} href={`/${kind}/${id}`}>
              <div className="flex h-full">
                <div className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer">
                  {(numberOfPhotos || 0) > 0 ? (
                    <div className="overflow-hidden" ref={emblaRef}>
                      <div className="flex">
                        {Array.from<number>({
                          length: numberOfPhotos || 0,
                        }).map((_, i) => (
                          <div
                            className="flex-grow-0 flex-shrink-0 basis-full"
                            key={`${kind}-${id}-photo-${i}`}
                          >
                            <Image
                              src={`/images/${kind}/${slug}/image${i + 1}.jpg`}
                              width={400}
                              height={300}
                              alt={name || "Entertainer"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[300px] bg-slate-500"></div>
                  )}
                  <div className="flex flex-col justify-between flex-1">
                    <div className="mt-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {name}
                      </h5>
                      <p className="font-normal text-gray-700">{description}</p>
                    </div>
                    <div className="font-semibold text-indigo-600 hover:text-indigo-500 mt-2">
                      Learn more →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
    </div>
  );
};

export default ListProviders;
