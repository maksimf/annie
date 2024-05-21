import ShowVenue from "@/components/providers/ShowVenue";
import { Database, Tables } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";

type Props = {
  venue: Tables<"venues">;
};

const VenuePage: React.FC<Props> = ({ venue }) => {
  return <ShowVenue venue={venue} />;
};

export default VenuePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );
  const { id } = context.query;

  const venue = await supabase
    .from("venues")
    .select("*")
    .eq("id", id as unknown as string);

  return {
    props: {
      venue: venue.data?.[0],
    },
  };
};
