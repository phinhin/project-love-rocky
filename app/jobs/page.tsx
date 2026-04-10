import Link from 'next/link';
import { PixelButton, PixelPanel, StatusLight } from '@/components/pixel-ui';
import { SectionHeading } from '@/components/section-heading';
import { getJobPostings } from '@/lib/jobs';
import type { JobPosting } from '@/lib/jobs';
import { toCompanySlug } from '@/lib/utils';

export const dynamic = 'force-dynamic';

function filterJobs(jobs: JobPosting[], query: string) {
  if (!query) return jobs;
  const normalized = query.toLowerCase();
  return jobs.filter((job) =>
    [job.company, job.title, job.location, job.team ?? '', job.commitment ?? '', job.source]
      .join(' ')
      .toLowerCase()
      .includes(normalized)
  );
}

export default async function JobsPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? '';
  const jobs = filterJobs(await getJobPostings(24).catch(() => []), query);

  return (
    <div className="space-y-8">
      <SectionHeading
        kicker="Aerospace Careers"
        title="Jobs command deck"
        description="This route reads public Greenhouse and Lever boards where available. The default set now spans space and broader aerospace hiring across Rocket Lab, Varda, Relativity, Axiom, Firefly, Stoke, Venus Aerospace, and Red Canyon Software."
      />
      <PixelPanel tone="slate" className="p-5">
        <form className="grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="mb-2 block font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.16em] text-pixelGold">
              Filter by company, title, location, team, or board source
            </span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try avionics, remote, Axiom, propulsion..."
              className="w-full border-2 border-steel bg-[#12192b] px-4 py-3 text-sm uppercase tracking-[0.08em] text-parchment outline-none transition focus:border-pixelCyan"
            />
          </label>
          <button
            type="submit"
            className="border-2 border-pixelCyan bg-[#0f2430] px-4 py-3 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.18em] text-pixelCyan shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Apply Filter
          </button>
        </form>
      </PixelPanel>
      <PixelPanel tone="yellow" className="p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
              <div key={job.id} className="border-2 border-steel bg-panel p-4 shadow-pixelSm">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-pixelPink">
                  <StatusLight color={index % 2 === 0 ? 'pink' : 'yellow'} blink />
                  <Link href={`/companies/${toCompanySlug(job.company)}`} className="font-[family-name:var(--font-pixel)] underline decoration-steel underline-offset-4">
                    {job.company}
                  </Link>
                </div>
              <div className="mt-3 text-sm font-bold uppercase leading-7 text-parchment md:text-base">{job.title}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d9d4b8]">{job.location}</div>
              {job.team ? <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-pixelCyan">{job.team}</div> : null}
              {job.commitment ? <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-pixelGold">{job.commitment}</div> : null}
              <div className="mt-5">
                <PixelButton label="View Role" tone="cyan" href={job.url} />
              </div>
            </div>
          ))}
          {!jobs.length ? <div className="text-sm uppercase text-[#d9d4b8]">No jobs were returned. Update JOB_SOURCES_JSON with public boards for the companies you want to track.</div> : null}
        </div>
      </PixelPanel>
    </div>
  );
}
