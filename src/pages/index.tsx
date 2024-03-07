import { createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";
import React, { useState } from "react";
import Venues from "@/components/Venues";
import classNames from "classnames";

type Props = {
  venues: Tables<"venues">[];
};

const Index: React.FC<Props> = ({ venues }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl">Welcome to Annie!</h1>
          <div className="mt-10 text-2xl">
            <p>Looking where to have your child birthday party?</p>
            <p>Check out our venues and entairtainers.</p>
            <p className="mt-5">Fill out a short form to get started:</p>
          </div>
          <div>
            <form
              className="max-w-md [&>input]:text-brand-500"
              onSubmit={(e) => {
                e.preventDefault();

                setShowInfo(true);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                className="mt-5 p-2 rounded w-full "
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="mt-5 p-2 rounded w-full"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Postcode: TW9 / TW10"
                className="mt-5 p-2 rounded w-full"
                name="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />
              <p className="text-sm italic mt-2">
                Note: right now we&apos;re only working in the Richmond area
              </p>
              <button
                type="submit"
                className="mt-5 px-2 py-4 bg-blue-500 text-white rounded text-xl w-full hover:bg-blue-600 transition-all duration-500"
              >
                Get started
              </button>
            </form>
          </div>
        </div>
        <div className="w-[600px] h-[400px] bg-yellow-100 text-gray-400 italic flex justify-center items-center">
          Picture of happy kids with their parents
        </div>
      </div>
      <div
        className={classNames("mt-20 mb-10 transition-all duration-500", {
          "opacity-100": showInfo,
          "opacity-0": !showInfo,
        })}
      >
        <h2 className="text-3xl mb-2">Venues</h2>
        <Venues
          selectedVenueIds={selectedVenueIds}
          setSelectedVenueIds={setSelectedVenueIds}
          venues={venues}
        />
        <div>
          <button
            className="mt-5 px-2 py-4 bg-blue-500 text-white rounded text-xl w-full hover:bg-blue-600 transition-all duration-500"
            onClick={async () => {
              try {
                const response = await fetch("/api/venues", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                    postcode,
                    venueIds: selectedVenueIds,
                  }),
                });

                if (response.ok) {
                  // Handle success
                  setShowInfo(true);
                } else {
                  // Handle error
                  console.error("Failed to submit form");
                }
              } catch (error) {
                // Handle error
                console.error("Failed to submit form", error);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );

  const venues = await supabase.from("venues").select("*");

  return {
    props: {
      venues: venues.data,
    },
  };
};

export default Index;
