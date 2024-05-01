import { createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";
import React, { useState } from "react";
import Venues from "@/components/Venues";
import classNames from "classnames";
import Entertainers from "@/components/Entertainers";
import { useRouter } from "next/router";

type Props = {
  venues: Tables<"venues">[];
  entertainers: Tables<"entertainers">[];
};

const Index: React.FC<Props> = ({ venues, entertainers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [partySize, setPartySize] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);
  const [selectedEntertainerIds, setSelectedEntertainerIds] = useState<
    number[]
  >([]);
  const [inProgress, setInProgress] = useState(false);

  const providersDivRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

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

                providersDivRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <label htmlFor="name" className="text-md block mt-5">
                Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="p-2 rounded w-full"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                required
              />
              <label htmlFor="email" className="text-md block mt-2">
                Email
              </label>
              <input
                type="email"
                placeholder="jane.doe@example.com"
                className="p-2 rounded w-full"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required
              />
              <label htmlFor="postcode" className="text-md block mt-2">
                Postcode
              </label>
              <input
                type="text"
                placeholder="TW9 or TW10"
                className="p-2 rounded w-full"
                name="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                id="postcode"
                required
              />
              <p className="text-sm italic mt-2">
                Note: right now we&apos;re only working in the Richmond area
              </p>
              <label htmlFor="startsAt" className="text-md block mt-2">
                Event starts at
              </label>
              <input
                type="datetime-local"
                className="p-2 rounded w-full"
                id="startsAt"
                value={startsAt}
                onChange={(e) => {
                  setStartsAt(e.target.value);
                }}
                required
              />
              <label htmlFor="startsAt" className="text-md block mt-2">
                Event ends at
              </label>
              <input
                type="datetime-local"
                className="p-2 rounded w-full"
                id="endsAt"
                value={endsAt}
                onChange={(e) => {
                  setEndsAt(e.target.value);
                }}
                required
              />
              <label htmlFor="partySize" className="text-md block mt-2">
                Party size
              </label>
              <input
                type="number"
                placeholder="12"
                className="p-2 rounded w-full"
                name="partySize"
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                id="partySize"
                required
              />
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
        ref={providersDivRef}
      >
        <h2 className="text-3xl mb-2">Venues</h2>
        <Venues
          selectedVenueIds={selectedVenueIds}
          setSelectedVenueIds={setSelectedVenueIds}
          venues={venues}
        />
        <h2 className="text-3xl mb-2 mt-4">Entertainers</h2>
        <Entertainers
          selectedEntertainerIds={selectedEntertainerIds}
          setSelectedEntertainerIds={setSelectedEntertainerIds}
          entertainers={entertainers}
        />
        <div>
          <button
            className="mt-5 px-2 py-4 bg-blue-500 text-white rounded text-xl w-full hover:bg-blue-600 transition-all duration-500"
            disabled={inProgress}
            onClick={async () => {
              try {
                setInProgress(true);
                const response = await fetch("/api/leads", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                    postcode,
                    startsAt,
                    endsAt,
                    partySize,
                    venueIds: selectedVenueIds,
                    entertainerIds: selectedEntertainerIds,
                    venueEmails: venues
                      .filter((venue) => selectedVenueIds.includes(venue.id))
                      .map((venue) => venue.email),
                    entertainerEmails: entertainers
                      .filter((entertainer) =>
                        selectedEntertainerIds.includes(entertainer.id)
                      )
                      .map((entertainer) => entertainer.email),
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
              } finally {
                setInProgress(false);
              }
              router.push("/thanks");
            }}
          >
            {inProgress ? "Sending..." : "Submit"}
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

  const venues = (await supabase.from("venues").select("*")).data;
  const entertainers = (await supabase.from("entertainers").select("*")).data;

  return {
    props: {
      venues,
      entertainers,
    },
  };
};

export default Index;
