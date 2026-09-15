import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ResourcesWithWeeklyGuides from "./ResourcesWithWeeklyGuides";
import { MVR_BACKGROUND_CHECK_EMPLOYER_GUIDE_POST as post } from "@/content/mvr_background_check_employer_guide_post";

export default function ResourcesWithMVRGuide() {
  return (
    <>
      <section className="border-b border-[#0B1F3A]/10 bg-white">
        <div className="container py-3.5">
          <Link
            href={`/resources/${post.slug}`}
            className="group flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#B7232A]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B7232A]">New guide</span>
              <span className="text-sm font-semibold text-[#0B1F3A]">{post.title}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B7232A] group-hover:gap-2.5 transition-all">
              Read guide <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </section>
      <ResourcesWithWeeklyGuides />
    </>
  );
}
