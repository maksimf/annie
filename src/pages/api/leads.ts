import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

type Request = {
  name: string;
  email: string;
  postcode: string;
  venueIds: number[];
  entertainerIds: number[];
  venueEmails: string[];
  entertainerEmails: string[];
  startsAt: string;
  endsAt: string;
  partySize: string;
};

const adminEmails = ["colixer@gmail.com", "apipko@icloud.com"];

const sendEmail = async (to: string, replyTo: string, html: string) => {
  // Use sendgrid to send email to venue and user
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  if (!to || !replyTo) {
    console.error("Missing email addresses");
    return;
  }

  const email = {
    to,
    cc: replyTo,
    bcc: "info@annie.services",
    from: "info@annie.services",
    replyTo,
    subject: "New lead from Annie services",
    html,
  };

  console.log("Sending email", email);

  try {
    const response = await sgMail.send(email);
    const adminEmailResponse = await sgMail.send({
      to: adminEmails,
      from: "info@annie.services",
      subject: "New lead from Annie services",
      html,
    });

    console.log("Email sent", response);
    console.log("Admin email sent", adminEmailResponse);
  } catch (error) {
    console.error("Failed to send email", error);
  }
};

const sendEmailsToProviders = async ({
  providerEmails,
  leadEmail,
  postcode,
  dateTime,
  partySize,
}: {
  providerEmails: string[];
  leadEmail: string;
  postcode: string;
  dateTime: string;
  partySize: string;
}) => {
  return Promise.all(
    providerEmails.map((providerEmail) => {
      return sendEmail(
        providerEmail,
        leadEmail,
        `<p>Hello, Annie is here, we have a lead for you here's the details:</p>` +
          `<ul>` +
          `<li>Email: ${leadEmail}</li>` +
          `<li>Postcode: ${postcode}</li>` +
          `<li>Date and time: ${dateTime}</li>` +
          `<li>Party size: ${partySize}</li>` +
          `</ul>` +
          `<p>If you're interested, please contact the lead directly.</p>` +
          `<p>Thanks, Annie</p>`
      );
    })
  );
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
    const {
      name,
      email,
      postcode,
      startsAt,
      endsAt,
      partySize,
      venueIds,
      entertainerIds,
      venueEmails,
      entertainerEmails,
    } = req.body as unknown as Request;
    const startDate = new Date(startsAt);
    const formattedStartDate = startDate.toLocaleString("en-GB");
    const endDate = new Date(endsAt);
    const formattedEndDate = endDate.toLocaleString("en-GB");

    const dateTime = `Start: ${formattedStartDate}, end: ${formattedEndDate}`;

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

    const leadsEntertainers = entertainerIds.map((entertainerId: number) => ({
      lead_id: leadId,
      entertainer_id: entertainerId,
    }));

    const leadsVenuesResponse = await supabase
      .from("leads_venues")
      .insert(leadsVenues);

    const leadsEntertainersResponse = await supabase
      .from("leads_entertainers")
      .insert(leadsEntertainers);

    await sendEmailsToProviders({
      providerEmails: venueEmails,
      leadEmail: email,
      postcode,
      dateTime,
      partySize,
    });

    await sendEmailsToProviders({
      providerEmails: entertainerEmails,
      leadEmail: email,
      postcode,
      dateTime,
      partySize,
    });

    if (leadsVenuesResponse.error) {
      return res.status(500).json({ status: "error", message: response.error });
    }

    if (leadsEntertainersResponse.error) {
      return res.status(500).json({ status: "error", message: response.error });
    }

    return res.status(201).json({ status: "success" });
  }
}
