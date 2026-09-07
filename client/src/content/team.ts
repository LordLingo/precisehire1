/**
 * Support team — placeholder roster.
 *
 * These are stand-in profiles used until the real team headshots and bios
 * are ready. The names, regions, and extensions are illustrative; the photos
 * are AI-generated editorial portraits matched to the cream/navy/red palette.
 *
 * When real team members are onboarded, replace this file in place — the
 * /support page and the homepage preview both read from this single source.
 *
 * Last updated: 2026-05-11
 */

export interface TeamMember {
  /** URL-safe slug used for keys + future deep links. */
  slug: string;
  /** First name + last initial (placeholder convention). */
  name: string;
  /** Functional title, written as the customer would hear it on the phone. */
  role: string;
  /** US state or region the specialist works from. */
  region: string;
  /** Phone extension that routes through the main line. */
  ext: string;
  /** Optional short bio sentence (≈ 1 line). */
  bio: string;
  /** CDN URL for the headshot — square crop, cream backdrop. */
  photo: string;
  /** Years of experience in background screening / HR / compliance. */
  yearsExperience: number;
}

export const TEAM: TeamMember[] = [
  {
    slug: "jenna-m",
    name: "Jenna M.",
    role: "Senior Account Specialist",
    region: "McKinney, TX",
    ext: "",
    bio: "Onboards new staffing clients and runs point on day-to-day account questions. Picks up before the second ring more often than not.",
    photo:
      "/redesign/jenna-m.svg",
    yearsExperience: 9,
  },
  {
    slug: "marcus-t",
    name: "Marcus T.",
    role: "Compliance & Screening Lead",
    region: "McKinney, TX",
    ext: "",
    bio: "Handles FCRA questions, adverse action workflows, and the trickier criminal-record dispositions. Ten-plus years in CRA operations.",
    photo:
      "/redesign/marcus-t.svg",
    yearsExperience: 12,
  },
  {
    slug: "priya-s",
    name: "Priya S.",
    role: "Client Success Specialist",
    region: "McKinney, TX",
    ext: "",
    bio: "Quarterbacks renewals, package design, and the quarterly review calls. The person clients call when they want a real recommendation, not a script.",
    photo:
      "/redesign/priya-s.svg",
    yearsExperience: 7,
  },
  {
    slug: "tyler-r",
    name: "Tyler R.",
    role: "Background Research Analyst",
    region: "McKinney, TX",
    ext: "",
    bio: "Runs the verification desk — employment, education, and professional licenses. The reason your reports clear faster than the industry average.",
    photo:
      "/redesign/tyler-r.svg",
    yearsExperience: 4,
  },
];

/**
 * Coverage hours for the live phone + chat desk.
 * Update both `display` strings if the schedule changes.
 */
export const SUPPORT_HOURS = {
  weekdays: {
    label: "Monday – Friday",
    display: "7:00 AM – 7:00 PM Central",
  },
  saturday: {
    label: "Saturday",
    display: "9:00 AM – 1:00 PM Central (on-call)",
  },
  sunday: {
    label: "Sunday",
    display: "Closed — voicemail returned Monday by 8 AM",
  },
};
