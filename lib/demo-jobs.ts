import type { JobPosting } from '@/lib/jobs';

export const DEMO_JOBS: JobPosting[] = [
  {
    id: 'demo-job-1',
    company: 'Rocket Lab',
    title: 'Avionics Systems Engineer',
    location: 'Long Beach, CA',
    team: 'Engineering / Avionics',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/rocketlab',
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-2',
    company: 'Rocket Lab',
    title: 'Propulsion Test Engineer',
    location: 'Stennis Space Center, MS',
    team: 'Engineering / Propulsion',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/rocketlab',
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-3',
    company: 'Axiom Space',
    title: 'Flight Operations Engineer',
    location: 'Houston, TX',
    team: 'Mission Operations',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/axiomspace',
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-4',
    company: 'Axiom Space',
    title: 'Structural Analysis Engineer',
    location: 'Houston, TX',
    team: 'Engineering / Structures',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/axiomspace',
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-5',
    company: 'Relativity Space',
    title: 'Software Engineer – Launch Systems',
    location: 'Long Beach, CA',
    team: 'Software / Launch',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/relativityspace',
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-6',
    company: 'Relativity Space',
    title: 'Additive Manufacturing Technician',
    location: 'Long Beach, CA',
    team: 'Manufacturing',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/relativityspace',
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-7',
    company: 'Varda Space',
    title: 'GNC Engineer',
    location: 'El Segundo, CA',
    team: 'Engineering / GNC',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/vardaspace',
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-8',
    company: 'Firefly Aerospace',
    title: 'Vehicle Integration Engineer',
    location: 'Cedar Park, TX',
    team: 'Engineering / Integration',
    commitment: 'Full-time',
    url: 'https://jobs.lever.co/fireflyaerospace',
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    source: 'lever'
  },
  {
    id: 'demo-job-9',
    company: 'Firefly Aerospace',
    title: 'Embedded Systems Engineer',
    location: 'Cedar Park, TX',
    team: 'Avionics',
    commitment: 'Full-time',
    url: 'https://jobs.lever.co/fireflyaerospace',
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    source: 'lever'
  },
  {
    id: 'demo-job-10',
    company: 'Sierra Space',
    title: 'Aerospace Systems Engineer',
    location: 'Louisville, CO',
    team: 'Systems Engineering',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/sierraspace',
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-11',
    company: 'Sierra Space',
    title: 'Thermal Systems Engineer',
    location: 'Louisville, CO',
    team: 'Engineering / Thermal',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/sierraspace',
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-12',
    company: 'Redwire Space',
    title: 'RF / Communications Engineer',
    location: 'Jacksonville, FL',
    team: 'Engineering / RF',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/redwirespace',
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-13',
    company: 'ABL Space Systems',
    title: 'Propulsion Engineer',
    location: 'El Segundo, CA',
    team: 'Propulsion',
    commitment: 'Full-time',
    url: 'https://jobs.lever.co/ablspacesystems',
    updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    source: 'lever'
  },
  {
    id: 'demo-job-14',
    company: 'Red Canyon Software',
    title: 'Flight Software Engineer',
    location: 'Denver, CO',
    team: 'Software / Flight',
    commitment: 'Full-time',
    url: 'https://jobs.lever.co/redcanyonsoftware',
    updatedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    source: 'lever'
  },
  {
    id: 'demo-job-15',
    company: 'Rocket Lab',
    title: 'Mission Manager',
    location: 'Littleton, CO',
    team: 'Mission Management',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/rocketlab',
    updatedAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    source: 'greenhouse'
  },
  {
    id: 'demo-job-16',
    company: 'Axiom Space',
    title: 'EVA Systems Engineer',
    location: 'Houston, TX',
    team: 'Extravehicular Activity',
    commitment: 'Full-time',
    url: 'https://job-boards.greenhouse.io/axiomspace',
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    source: 'greenhouse'
  }
];
