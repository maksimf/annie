import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Request = {
  name: string;
  email: string;
  postcode: string;
  venueIds: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_KEY || ""
    );
    const { name, email, postcode, venueIds } = req.body as unknown as Request;
    const response = await supabase
      .from("leads")
      .insert({
        name,
        email,
        postcode,
      })
      .select("id");

    if (response.error) {
      return res.status(500).json({ status: "error", message: response.error });
    }

    const leadId = response.data[0].id;
    const leadsVenues = venueIds.map((venueId: number) => ({
      lead_id: leadId,
      venue_id: venueId,
    }));

    const leadsVenuesResponse = await supabase
      .from("leads_venues")
      .insert(leadsVenues);

    if (leadsVenuesResponse.error) {
      return res.status(500).json({ status: "error", message: response.error });
    }

    return res.status(201).json({ status: "success" });
  }
}
