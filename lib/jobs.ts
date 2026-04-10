export type JobPosting = {
  id: string;
  company: string;
  title: string;
  location: string;
  team?: string;
  commitment?: string;
  url: string;
  updatedAt: string;
  source: 'greenhouse' | 'lever';
};

type JobSource =
  | { company: string; type: 'greenhouse'; token: string }
  | { company: string; type: 'lever'; token: string };

const DEFAULT_JOB_SOURCES: JobSource[] = [
  { company: 'Rocket Lab', type: 'greenhouse', token: 'rocketlab' },
  { company: 'Varda Space', type: 'greenhouse', token: 'vardaspace' },
  { company: 'Relativity Space', type: 'greenhouse', token: 'relativityspace' },
  { company: 'Axiom Space', type: 'greenhouse', token: 'axiomspace' },
  { company: 'Sierra Space', type: 'greenhouse', token: 'sierraspace' },
  { company: 'Redwire Space', type: 'greenhouse', token: 'redwirespace' },
  { company: 'Red Canyon Software', type: 'lever', token: 'redcanyonsoftware' },
  { company: 'Firefly Aerospace', type: 'lever', token: 'fireflyaerospace' },
  { company: 'ABL Space Systems', type: 'lever', token: 'ablspacesystems' }
];

function getConfiguredJobSources(): JobSource[] {
  const raw = process.env.JOB_SOURCES_JSON;
  if (!raw) return DEFAULT_JOB_SOURCES;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_JOB_SOURCES;
    const normalized = parsed.filter(
      (item) => item && typeof item.company === 'string' && typeof item.type === 'string' && typeof item.token === 'string'
    );
    return normalized.length ? normalized : DEFAULT_JOB_SOURCES;
  } catch {
    return DEFAULT_JOB_SOURCES;
  }
}

async function fetchGreenhouseJobs(source: Extract<JobSource, { type: 'greenhouse' }>): Promise<JobPosting[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${source.token}/jobs`;
  const response = await fetch(url, { next: { revalidate: 1800 } });
  if (!response.ok) return [];
  const json = await response.json();
  const jobs = Array.isArray(json.jobs) ? json.jobs : [];

  return jobs.map((job: any) => ({
    id: `gh-${source.token}-${job.id}`,
    company: source.company,
    title: job.title ?? 'Untitled role',
    location: job.location?.name ?? 'Unknown location',
    url: job.absolute_url ?? `https://job-boards.greenhouse.io/${source.token}/jobs/${job.id}`,
    updatedAt: job.updated_at ?? new Date(0).toISOString(),
    team: Array.isArray(job.departments) ? job.departments.map((dept: any) => dept?.name).filter(Boolean).join(' / ') : undefined,
    source: 'greenhouse'
  }));
}

async function fetchLeverJobs(source: Extract<JobSource, { type: 'lever' }>): Promise<JobPosting[]> {
  const url = `https://jobs.lever.co/${source.token}?mode=json`;
  const response = await fetch(url, { next: { revalidate: 1800 } });
  if (!response.ok) return [];
  const jobs = await response.json();
  if (!Array.isArray(jobs)) return [];

  return jobs.map((job: any) => ({
    id: `lever-${source.token}-${job.id}`,
    company: source.company,
    title: job.text ?? 'Untitled role',
    location: job.categories?.location ?? 'Unknown location',
    commitment: job.categories?.commitment,
    team: job.categories?.team ?? job.categories?.department,
    url: job.hostedUrl ?? job.applyUrl ?? `https://jobs.lever.co/${source.token}/${job.id}`,
    updatedAt: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date(0).toISOString(),
    source: 'lever'
  }));
}

export async function getJobPostings(limit = 24): Promise<JobPosting[]> {
  const sources = getConfiguredJobSources();
  const results = await Promise.all(
    sources.map(async (source) => source.type === 'greenhouse' ? fetchGreenhouseJobs(source) : fetchLeverJobs(source))
  );

  return results
    .flat()
    .filter((job, index, jobs) => jobs.findIndex((candidate) => candidate.url === job.url) === index)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, limit);
}
