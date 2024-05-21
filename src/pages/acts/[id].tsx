import ShowAct from "@/components/providers/ShowAct";
import { Database, Tables } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";

type Props = {
  entertainer: Tables<"entertainers">;
};

const ActPage: React.FC<Props> = ({ entertainer }) => {
  return <ShowAct entertainer={entertainer} />;
};

export default ActPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );
  const { id } = context.query;

  const entertainer = await supabase
    .from("entertainers")
    .select("*")
    .eq("id", id as unknown as string);

  return {
    props: {
      entertainer: entertainer.data?.[0],
    },
  };
};
