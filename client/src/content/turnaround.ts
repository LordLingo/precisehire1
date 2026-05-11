/**
 * Live turnaround stats — update weekly.
 *
 * Pulled from the production reporting dashboard each Monday morning.
 * Keep figures conservative and defensible — these numbers are public proof
 * of the speed claim, not a marketing aspiration.
 *
 * Last updated: 2026-05-11 (Mark)
 */

export interface TurnaroundStats {
  /** ISO date this snapshot was published. */
  updated: string;
  /** Friendly date displayed under the ticker. */
  updatedLabel: string;
  /** Median end-to-end report turnaround for the trailing 7 days. */
  medianThisWeek: string;
  /** Same-day completion rate, trailing 7 days, as a "92%" string. */
  sameDayPctThisWeek: string;
  /** Median end-to-end report turnaround for trailing 30 days. */
  medianTrailing30: string;
  /** Average phone-pickup time for the trailing 7 days, e.g. "11 sec". */
  avgPickupSeconds: string;
  /** Number of reports completed in the trailing 7 days, optional. */
  reportsThisWeek?: number;
}

export const TURNAROUND: TurnaroundStats = {
  updated: "2026-05-11",
  updatedLabel: "Week of May 5–11, 2026",
  medianThisWeek: "3 hr 52 min",
  sameDayPctThisWeek: "92%",
  medianTrailing30: "4 hr 14 min",
  avgPickupSeconds: "11 sec",
  reportsThisWeek: 1248,
};
