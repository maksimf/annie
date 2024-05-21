import { createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";
import React, { useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import ListProviders from "@/components/providers/ListProviders";

type Props = {
  venues: Tables<"venues">[];
  entertainers: Tables<"entertainers">[];
};

const Index: React.FC<Props> = ({ venues, entertainers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);
  const [selectedEntertainerIds, setSelectedEntertainerIds] = useState<
    number[]
  >([]);
  const [inProgress, setInProgress] = useState(false);

  const providersDivRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();

  return (
    <div className="mx-4 md:mx-6">
      <div className="w-fit mx-auto">
        <div>
          <h1 className="text-5xl text-center">Welcome to Annie💁‍♀️🪄</h1>
          {/* <div className="mt-10 text-2xl text-center">
            <p>Start by telling Annie your party details:</p>
            <p>
              location, date, what you need
              <br />
              and any other requirements.
            </p>
            <p>You will see matched options right away.</p>
          </div> */}
          <div className="hidden">
            <form
              className="max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();

                setShowInfo(true);

                providersDivRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <label htmlFor="name" className="text-md block mt-5">
                Your name
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
                Your email
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
                Your party postcode
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
              <label htmlFor="eventTime" className="text-md block mt-2">
                Event date and timeframe
              </label>
              <input
                type="text"
                className="p-2 rounded w-full"
                name="eventTime"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                id="eventTime"
                required
                placeholder="2nd of August, 12:00 - 15:00"
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
                min={1}
              />
              <button
                type="submit"
                className="mt-5 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                See my options
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={classNames("mt-20 mb-10 transition-all duration-500", {
          "opacity-100": showInfo,
          "opacity-0": !showInfo,
        })}
        ref={providersDivRef}
      >
        <p className="mb-4">
          Review venues and acts. Shortlist by ticking and send requests in one
          click. We recommend sending requests to 2-3 venues and acts minimum to
          ensure you get a response.
        </p>
        <h2 className="text-3xl mb-2">Venues</h2>
        <ListProviders kind="venues" providers={venues} />
        <h2 className="text-3xl mb-2 mt-4">Acts</h2>
        <ListProviders kind="acts" providers={entertainers} />
        <div>
          <p className="mt-4">
            Now click the Submit button and watch the magic happen as venues and
            entertainers respond confirming their availability and terms.
          </p>
          <button
            className="mt-5 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                    eventTime,
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
