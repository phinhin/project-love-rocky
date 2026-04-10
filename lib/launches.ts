import { z } from 'zod';
import type { LaunchCard } from '@/lib/types';
import { DEMO_UPCOMING, DEMO_RECENT } from '@/lib/demo-data';

const upstreamSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      net: z.string(),
      status: z.object({ name: z.string() }).nullable().optional(),
      image: z.union([
        z.string(),
        z.object({ image_url: z.string().nullable().optional() })
      ]).nullable().optional(),
      mission: z.object({
        name: z.string().nullable().optional(),
        orbit: z.object({ name: z.string().nullable().optional() }).nullable().optional()
      }).nullable().optional(),
      launch_service_provider: z.object({ name: z.string().nullable().optional() }).nullable().optional(),
      pad: z.object({
        name: z.string().nullable().optional(),
        location: z.object({
          name: z.string().nullable().optional(),
          country_code: z.string().nullable().optional()
        }).nullable().optional()
      }).nullable().optional()
    })
  )
});

const API_BASE = process.env.LAUNCH_LIBRARY_API_BASE ?? 'https://ll.thespacedevs.com/2.3.0';
const LIST_REVALIDATE_SECONDS = 300;

function normalizeStatus(status: string | null | undefined) {
  if (!status) return 'UNKNOWN';
  const upper = status.toUpperCase();
  if (upper.includes('GO')) return 'GO';
  if (upper.includes('SUCCESS')) return 'SUCCESS';
  if (upper.includes('HOLD')) return 'HOLD';
  if (upper.includes('FAIL')) return 'FAILURE';
  if (upper.includes('DELAY')) return 'DELAYED';
  if (upper.includes('TBC') || upper.includes('TBD')) return 'TBD';
  return upper;
}

export function mapLaunch(raw: z.infer<typeof upstreamSchema>['results'][number]): LaunchCard {
  return {
    id: raw.id,
    name: raw.name,
    provider: raw.launch_service_provider?.name ?? 'Unknown Provider',
    site: raw.pad?.location?.name ?? 'Unknown Site',
    net: raw.net,
    status: normalizeStatus(raw.status?.name),
    mission: raw.mission?.name ?? undefined,
    imageUrl: raw.image == null ? null : typeof raw.image === 'string' ? raw.image : raw.image.image_url ?? null,
    orbit: raw.mission?.orbit?.name ?? null,
    pad: raw.pad?.name ?? null,
    countryCode: raw.pad?.location?.country_code ?? null
  };
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {};
  if (process.env.LAUNCH_LIBRARY_API_KEY) {
    headers.Authorization = `Token ${process.env.LAUNCH_LIBRARY_API_KEY}`;
  }

  return headers;
}

function isUnitedStatesLaunch(launch: LaunchCard) {
  return launch.countryCode === 'USA';
}

async function fetchLaunchList(pathname: string, limit: number): Promise<LaunchCard[]> {
  // Over-fetch to ensure enough USA launches after filtering (~50% of global launches are USA)
  const fetchLimit = Math.min(Math.ceil(limit * 3), 60);
  const url = new URL(`${API_BASE}${pathname}`);
  url.searchParams.set('limit', String(fetchLimit));
  url.searchParams.set('ordering', 'net');

  const response = await fetch(url.toString(), {
    headers: buildHeaders(),
    next: { revalidate: LIST_REVALIDATE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`Launch API request failed with ${response.status}`);
  }

  const json = await response.json();
  const parsed = upstreamSchema.parse(json);

  return parsed.results
    .map(mapLaunch)
    .filter(isUnitedStatesLaunch)
    .slice(0, limit);
}

export async function getUpcomingLaunches(limit = 8): Promise<LaunchCard[]> {
  try {
    const results = await fetchLaunchList('/launches/upcoming/', limit);
    if (results.length > 0) return results;
    return DEMO_UPCOMING.slice(0, limit);
  } catch {
    return DEMO_UPCOMING.slice(0, limit);
  }
}

export async function getRecentLaunches(limit = 8): Promise<LaunchCard[]> {
  try {
    const results = await fetchLaunchList('/launches/previous/', limit);
    if (results.length > 0) return results;
    return DEMO_RECENT.slice(0, limit);
  } catch {
    return DEMO_RECENT.slice(0, limit);
  }
}

export async function getLaunchById(id: string): Promise<LaunchCard | null> {
  const response = await fetch(`${API_BASE}/launches/${id}/`, {
    headers: buildHeaders(),
    next: { revalidate: LIST_REVALIDATE_SECONDS }
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Launch detail request failed with ${response.status}`);
  }

  const json = await response.json();
  const parsed = upstreamSchema.shape.results.element.parse(json);
  const launch = mapLaunch(parsed);

  return isUnitedStatesLaunch(launch) ? launch : null;
}
