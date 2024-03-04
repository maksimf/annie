import { createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/types/supabase";
import React from "react";
import Venues from "@/components/Venues";
import Image from "next/image";
import Head from "next/head";

type Props = {
  venues: Tables<"venues">[];
};

const Index: React.FC<Props> = ({ venues }) => {
  return (
    <main>
      <Head>
        <title>Annie | Venues</title>
      </Head>
      <div className="flex justify-center my-6">
        <Image src="/logo.png" alt="Logo" width={50} height={40} />
      </div>
      <div className="max-w-7xl mx-auto">
        <Venues venues={venues} />
      </div>
    </main>
  );
};

export const getStaticProps = async () => {
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
