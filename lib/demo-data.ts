import type { LaunchCard } from '@/lib/types';

// Realistic upcoming and recent US launches used as fallback when the
// Launch Library API is unavailable or rate-limited.
// All data is based on publicly announced missions.

const now = Date.now();
const h = 3_600_000; // one hour in ms

export const DEMO_UPCOMING: LaunchCard[] = [
  {
    id: 'demo-1',
    name: 'Falcon 9 Block 5 | Starlink Group 11-14',
    provider: 'SpaceX',
    site: 'Cape Canaveral, FL, USA',
    pad: 'Space Launch Complex 40',
    net: new Date(now + 18 * h).toISOString(),
    status: 'GO',
    mission: 'Starlink Group 11-14',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-2',
    name: 'Falcon 9 Block 5 | Cygnus CRS-2 NG-24',
    provider: 'SpaceX',
    site: 'Kennedy Space Center, FL, USA',
    pad: 'Launch Complex 39A',
    net: new Date(now + 36 * h).toISOString(),
    status: 'GO',
    mission: 'Cygnus CRS-2 NG-24 (S.S. Steven R. Nagel)',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-3',
    name: 'Falcon 9 Block 5 | Starlink Group 10-24',
    provider: 'SpaceX',
    site: 'Vandenberg SFB, CA, USA',
    pad: 'Space Launch Complex 4E',
    net: new Date(now + 72 * h).toISOString(),
    status: 'GO',
    mission: 'Starlink Group 10-24',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-4',
    name: 'New Shepard | NS-30',
    provider: 'Blue Origin',
    site: 'Corn Ranch, TX, USA',
    pad: 'Launch Site One',
    net: new Date(now + 96 * h).toISOString(),
    status: 'GO',
    mission: 'NS-30 Crew Flight',
    orbit: 'Suborbital',
    countryCode: 'USA'
  },
  {
    id: 'demo-5',
    name: 'Falcon Heavy | USSF-52',
    provider: 'SpaceX',
    site: 'Kennedy Space Center, FL, USA',
    pad: 'Launch Complex 39A',
    net: new Date(now + 144 * h).toISOString(),
    status: 'TBD',
    mission: 'USSF-52',
    orbit: 'Geostationary Transfer Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-6',
    name: 'Electron | The Sea Goddess',
    provider: 'Rocket Lab',
    site: 'Wallops Island, VA, USA',
    pad: 'Launch Complex 2',
    net: new Date(now + 168 * h).toISOString(),
    status: 'GO',
    mission: 'The Sea Goddess (NRO)',
    orbit: 'Sun-Synchronous Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-7',
    name: 'Vulcan Centaur | CERT-2',
    provider: 'United Launch Alliance',
    site: 'Cape Canaveral, FL, USA',
    pad: 'Space Launch Complex 41',
    net: new Date(now + 240 * h).toISOString(),
    status: 'TBD',
    mission: 'Certification Flight 2',
    orbit: 'Geostationary Transfer Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-8',
    name: 'Falcon 9 Block 5 | Starlink Group 12-7',
    provider: 'SpaceX',
    site: 'Cape Canaveral, FL, USA',
    pad: 'Space Launch Complex 40',
    net: new Date(now + 312 * h).toISOString(),
    status: 'GO',
    mission: 'Starlink Group 12-7',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  }
];

export const DEMO_RECENT: LaunchCard[] = [
  {
    id: 'demo-r1',
    name: 'Falcon 9 Block 5 | Starlink Group 9-12',
    provider: 'SpaceX',
    site: 'Cape Canaveral, FL, USA',
    pad: 'Space Launch Complex 40',
    net: new Date(now - 48 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'Starlink Group 9-12',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r2',
    name: 'Falcon 9 Block 5 | Transporter-13',
    provider: 'SpaceX',
    site: 'Vandenberg SFB, CA, USA',
    pad: 'Space Launch Complex 4E',
    net: new Date(now - 96 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'Transporter-13 (Dedicated SSO Rideshare)',
    orbit: 'Sun-Synchronous Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r3',
    name: 'Atlas V | NROL-107',
    provider: 'United Launch Alliance',
    site: 'Cape Canaveral, FL, USA',
    pad: 'Space Launch Complex 41',
    net: new Date(now - 144 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'NROL-107',
    orbit: 'Geostationary Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r4',
    name: 'Electron | No Time To Fly',
    provider: 'Rocket Lab',
    site: 'Wallops Island, VA, USA',
    pad: 'Launch Complex 2',
    net: new Date(now - 192 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'No Time To Fly (HawkEye 360)',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r5',
    name: 'Falcon Heavy | ViaSat-3 Americas',
    provider: 'SpaceX',
    site: 'Kennedy Space Center, FL, USA',
    pad: 'Launch Complex 39A',
    net: new Date(now - 240 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'ViaSat-3 Americas',
    orbit: 'Geostationary Transfer Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r6',
    name: 'Falcon 9 Block 5 | Dragon CRS-2 SpX-31',
    provider: 'SpaceX',
    site: 'Kennedy Space Center, FL, USA',
    pad: 'Launch Complex 39A',
    net: new Date(now - 288 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'CRS-31 (ISS resupply)',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r7',
    name: 'New Glenn | NG-3',
    provider: 'Blue Origin',
    site: 'Cape Canaveral, FL, USA',
    pad: 'Launch Complex 36',
    net: new Date(now - 360 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'NG-3 Commercial Payload',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  },
  {
    id: 'demo-r8',
    name: 'Firefly Alpha | FLTA006',
    provider: 'Firefly Aerospace',
    site: 'Vandenberg SFB, CA, USA',
    pad: 'Space Launch Complex 2W',
    net: new Date(now - 432 * h).toISOString(),
    status: 'SUCCESS',
    mission: 'Responsive Space Mission',
    orbit: 'Low Earth Orbit',
    countryCode: 'USA'
  }
];
