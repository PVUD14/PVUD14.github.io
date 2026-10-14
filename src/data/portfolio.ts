/* =============================================================================
   PORTFOLIO CONTENT — SINGLE SOURCE OF TRUTH
   Edit ONLY this file to change text, links, projects, skills and sections.
   Every block is numbered. Search for "[N]" to jump to it.
   Lines marked  // TODO  need your confirmation before you publish.
   ============================================================================= */

export type SectionId = 'about' | 'seasons' | 'originals' | 'topPicks' | 'skills' | 'achievements'

/* [0] PORTRAIT SWITCH ------------------------------------------------------
   Which photo the site uses: 'hoodie' (white hoodie) or 'suit' (black three-piece).
   After changing it run:  npm run images   (rebuilds portraits and the share image). */
export const portraitSet: 'hoodie' | 'suit' = 'hoodie'

/* [1] PROFILE ---------------------------------------------------------------
   Basic identity, links and the opening-card text. */
export const profile = {
  name: 'PVU Divakar',
  fullName: 'Venkat Udaya Divakar Penumaka', // [1a] shown in the footer only
  headline: 'Information Security Manager · Security Researcher · Platform Builder',
  tagline: 'Research. Disclose. Improve.', // [1b] taken from your GitHub profile
  intro:
    'I run security programs, break things with permission, and build the platforms that make defence repeatable. Incident response, ISMS and offensive research under one roof.',
  location: 'Bangalore, India',
  originalLabel: 'A PVU DIVAKAR ORIGINAL', // [1c] opening studio card
  email: 'pvud14@gmail.com', // [1d] public contact email (shown as an Email button in the footer)
  links: {
    linkedin: 'https://www.linkedin.com/in/p-v-u-divakar/',
    github: 'https://github.com/PVUD14',
    cve: 'https://www.cve.org/CVERecord?id=CVE-2026-103473',
    xefence: 'https://xefence.com',
  },
  resumeUrl: '', // [1e] TODO: put a PDF at public/assets/resume.pdf then set './assets/resume.pdf'
}

/* [2] PROJECTS (the "Originals") -------------------------------------------
   Add a new object to show a new project. status: 'Live' | 'In build' | 'Internal' | 'Published'.
   credit = optional line shown in the project overlay. */
export interface Project {
  id: string
  title: string
  tagline: string
  kind: string
  status: 'Live' | 'In build' | 'Internal' | 'Published'
  tags: string[]
  summary: string
  highlights: string[]
  credit?: string
  link?: { label: string; href: string }
}

/* [2a] Shown on every Xefence platform overlay. */
const XEFENCE_CREDIT = 'Built by PVU Divakar. Platform of Xefence, a Xevyte Technologies brand.'

export const projects: Project[] = [
  {
    id: 'cve-deno',
    title: 'CVE-2026-103473',
    tagline: 'Deno OS command injection, publicly credited.',
    kind: 'Security Research',
    status: 'Published',
    tags: ['CWE-78', 'CVSS 9.2', 'Deno', 'Windows'],
    summary:
      'Finder of an OS command injection in node:child_process affecting Deno 2.7.0 through 2.9.7 on Windows. Assigned by VulnCheck CNA and rated Critical.',
    highlights: [
      'Credited as PVUDivakar, finder, in the official CVE Program record',
      'CVSS v4.0 score 9.2 (Critical), published by VulnCheck',
      'Responsible disclosure, then public advisory',
    ],
    link: { label: 'Official CVE record', href: 'https://www.cve.org/CVERecord?id=CVE-2026-103473' },
  },
  {
    id: 'centra',
    title: 'CENTRA',
    tagline: 'Secure every user, device and access path.',
    kind: 'Identity & Access',
    status: 'Live',
    tags: ['IAM', 'Zero Trust', 'Identity governance', 'Adaptive access'],
    summary:
      'A unified identity and access security platform that combines authentication, authorization, governance and behavioural analytics for human and machine identities across cloud, on-premises and hybrid estates.',
    highlights: [
      'Continuous trust: access decisions use behaviour, device posture, location and network context',
      'Dynamic trust scores that change during the session, with adaptive enforcement',
      'Privileged access governance with least-privilege controls',
    ],
    credit: XEFENCE_CREDIT,
    link: { label: 'CENTRA on Xefence', href: 'https://xefence.com/platforms/centra' },
  },
  {
    id: 'praetor',
    title: 'PRAETOR',
    tagline: 'Endpoint defence and autonomous response.',
    kind: 'Endpoint Security',
    status: 'Live',
    tags: ['EDR', 'Behavioural detection', 'Containment', 'Correlation'],
    summary:
      'An endpoint defence platform that watches process, file, network and user activity, explains what it finds, and can contain threats on its own.',
    highlights: [
      'Behavioural detection that goes beyond signatures',
      'Explainable detections with origin, sequence and impact',
      'Autonomous containment: isolate endpoints, stop processes, restrict traffic',
    ],
    credit: XEFENCE_CREDIT,
    link: { label: 'PRAETOR on Xefence', href: 'https://xefence.com/platforms/praetor' },
  },
  {
    id: 'vaptrix',
    title: 'VAPTrix',
    tagline: 'See your vulnerabilities before attackers do.',
    kind: 'Exposure Management',
    status: 'Live',
    tags: ['VAPT', 'Risk scoring', 'Exposure validation', 'Remediation'],
    summary:
      'Continuously discovers, validates and prioritises security weaknesses across cloud, on-premises and application environments, then tracks the fix.',
    highlights: [
      'Risk ranking by exploitability, asset criticality and business impact, not raw CVSS alone',
      'Exposure validation to cut false positives',
      'Remediation workflows between security and IT teams',
    ],
    credit: XEFENCE_CREDIT,
    link: { label: 'VAPTrix on Xefence', href: 'https://xefence.com/platforms/vaptrix/' },
  },
  {
    id: 'vigil',
    title: 'VIGIL',
    tagline: 'Enterprise visibility without complexity.',
    kind: 'Monitoring & Analytics',
    status: 'Live',
    tags: ['SIEM-style analytics', 'Correlation', 'Threat hunting', 'SOC'],
    summary:
      'Real-time monitoring and security analytics that pulls telemetry from identity, endpoint, network and cloud into one model and surfaces the threats that matter.',
    highlights: [
      'Telemetry aggregation and normalisation into one data model',
      'Correlation across domains to catch multi-stage attacks',
      'Investigation workspace for hunting and timeline review',
    ],
    credit: XEFENCE_CREDIT,
    link: { label: 'VIGIL on Xefence', href: 'https://xefence.com/platforms/vigil' },
  },
  {
    id: 'auton',
    title: 'AUTON',
    tagline: 'Accelerate response with intelligent automation.',
    kind: 'Orchestration & Response',
    status: 'Live',
    tags: ['SOAR', 'Automation', 'Orchestration', 'Playbooks'],
    summary:
      'Security orchestration and automated response that cuts alert overload and manual incident handling with a lightweight, deterministic rule engine.',
    highlights: [
      'Automated actions: prioritise alerts, open tickets, isolate systems, revoke access, escalate',
      'Cross-platform orchestration over endpoint, network, identity and cloud tools',
      'Centralised dashboard for workflows and outcomes',
    ],
    credit: XEFENCE_CREDIT,
    link: { label: 'AUTON on Xefence', href: 'https://xefence.com/platforms/auton' },
  },
]

/* [3] SEASONS & EPISODES (My Journey) --------------------------------------
   Seasons are chapters, episodes are moments inside them.
   Seasons 1 and 2 are your real career timeline (from LinkedIn). Each episode: title = role,
   summary = employer, dates and place, tag = short label. Add roles by copying one line. */
export interface Season {
  number: number
  title: string
  tagline: string
  episodes: { title: string; summary: string; tag: string }[]
}

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Origin',
    tagline: 'From IT operations into security monitoring and response.',
    episodes: [
      { title: 'Executive IT', summary: 'Hyderabad Integrated MSW Energy Solutions · Feb 2020 – Mar 2021 · Hyderabad', tag: 'IT Ops' },
      { title: 'Security Monitoring Engineer', summary: 'Sensen · Mar 2021 – Nov 2021', tag: 'Monitoring' },
      { title: 'Security Consultant', summary: 'Wipro · Dec 2021 – Apr 2023 · Hyderabad', tag: 'Consulting' },
      { title: 'L2 SOC Analyst', summary: 'Futurism Technologies · Apr 2023 – Jun 2023 · Pune', tag: 'SOC' },
      { title: 'Security Engineer', summary: 'Srijan Spectrum · Jul 2023 – Nov 2023 · Hyderabad', tag: 'Engineering' },
    ],
  },
  {
    number: 2,
    title: 'The Defender',
    tagline: 'Incident response, then running the security program at Xevyte.',
    episodes: [
      { title: 'CSIRT Engineer', summary: 'Xevyte Technologies · Nov 2023 – Mar 2025 · Bengaluru', tag: 'IR' },
      { title: 'Information Security Manager', summary: 'Xevyte Technologies · May 2025 – Present · Bengaluru', tag: 'ISMS' },
      { title: 'ISMS and ISO 27001', summary: 'Turning policy into controls that teams actually follow.', tag: 'Governance' },
    ],
  },
  {
    number: 3,
    title: 'The Researcher',
    tagline: 'Finding it before someone else does.',
    episodes: [
      { title: 'OSCP and OSCP+', summary: 'Offensive certifications earned the hard way, Jun 2026.', tag: 'Offensive' },
      { title: 'VAPT in the Field', summary: 'Real assessments, real findings, clear remediation.', tag: 'VAPT' },
      { title: 'CVE-2026-103473', summary: 'A critical Deno command injection, disclosed responsibly.', tag: 'CVE' },
    ],
  },
  {
    number: 4,
    title: 'The Builder',
    tagline: 'Turning field lessons into the Xefence platforms.',
    episodes: [
      { title: 'Identity: CENTRA', summary: 'Zero Trust access that keeps re-checking trust.', tag: 'IAM' },
      { title: 'Endpoint: PRAETOR', summary: 'Detection and containment that explains itself.', tag: 'EDR' },
      { title: 'Exposure: VAPTrix', summary: 'Vulnerabilities ranked by what attackers can really use.', tag: 'VAPT' },
      { title: 'Visibility & Response: VIGIL + AUTON', summary: 'Correlated telemetry, then automated action.', tag: 'SOC' },
    ],
  },
]

/* [4] TOP PICKS (Top 10 row) ----------------------------------------------- */
export const topPicks = [
  { rank: 1, title: 'Incident Response', blurb: 'Runbooks, war rooms, post-mortems.' },
  { rank: 2, title: 'ISO 27001 / ISMS', blurb: 'Programs that survive audits.' },
  { rank: 3, title: 'VAPT / Pentesting', blurb: 'OSCP-grade offensive validation.' },
  { rank: 4, title: 'SIEM, EDR, XDR', blurb: 'Detection that earns trust.' },
  { rank: 5, title: 'Cloud Security', blurb: 'Guardrails for modern stacks.' },
  { rank: 6, title: 'IAM', blurb: 'Least privilege, enforced.' },
  { rank: 7, title: 'Vulnerability Management', blurb: 'Prioritised by real risk.' },
  { rank: 8, title: 'SOC Operations', blurb: 'Triage that scales.' },
  { rank: 9, title: 'Security Research', blurb: 'Find, disclose, improve.' },
  { rank: 10, title: 'AI Security', blurb: 'LLM and AI-assisted defence.' },
]

/* [5] SKILLS ---------------------------------------------------------------
   skillCategories = the genres. skillEvidence = "where it shows up" note per skill. */
export const skillCategories = [
  { genre: 'Defence and Response', skills: ['Incident Response', 'SIEM', 'EDR / XDR', 'SOC Operations', 'Threat Intelligence'] },
  { genre: 'Governance and Risk', skills: ['ISO 27001', 'ISMS', 'Risk Management', 'Audit Readiness', 'Policy and Controls'] },
  { genre: 'Offensive Security', skills: ['VAPT', 'OSCP methodology', 'Web and Network Pentesting', 'Vulnerability Research'] },
  { genre: 'Cloud and Identity', skills: ['Cloud Security', 'IAM', 'DevSecOps', 'Vulnerability Management'] },
  { genre: 'Build and Automate', skills: ['Security Automation', 'Go', 'TypeScript', 'Python', 'AI and LLM Security'] },
]

export const skillEvidence: Record<string, string> = {
  'Incident Response': 'Led response and post-incident improvement.',
  'ISO 27001': 'Core of the ISMS programs I run.',
  VAPT: 'Behind VAPTrix.',
  'Vulnerability Management': 'Behind VAPTrix risk ranking.',
  'Vulnerability Research': 'CVE-2026-103473.',
  IAM: 'Behind CENTRA.',
  'EDR / XDR': 'Behind PRAETOR.',
  SIEM: 'Behind VIGIL.',
  'Security Automation': 'Behind AUTON.',
  'AI and LLM Security': 'AI-assisted detection and correlation across the Xefence platforms.',
  Go: 'Public repo: oss.',
  TypeScript: 'Public repos: website, website-2.',
  Python: 'Public repo: Baby-Pilot.',
}

/* [6] ACHIEVEMENTS & CERTIFICATIONS --------------------------------------- */
export const achievements = [
  {
    title: 'CVE-2026-103473',
    subtitle: 'Critical, CVSS v4.0 9.2',
    detail: 'Deno OS command injection. Finder credit in the official CVE record.',
    href: 'https://www.cve.org/CVERecord?id=CVE-2026-103473',
  },
  {
    title: 'Xefence Platforms',
    subtitle: 'Five platforms, one suite',
    detail: 'CENTRA, PRAETOR, VAPTrix, VIGIL and AUTON: identity, endpoint, exposure, monitoring and response.',
    href: 'https://xefence.com',
  },
]

/* [6a] Certifications (from LinkedIn). name = big label on the card, title = full name,
   year = issue date, href = optional credential link. Newest first. */
export const certifications: { name: string; title: string; issuer: string; year: string; href?: string }[] = [
  { name: 'OSCP', title: 'OffSec Certified Professional', issuer: 'OffSec', year: 'Jun 2026', href: 'https://credentials.offsec.com/005729c4-4417-44cc-a34d-7e55bccaad43#acc.kCGNBeXx' },
  { name: 'OSCP+', title: 'Offensive Security Certified Professional Plus', issuer: 'OffSec', year: 'Jun 2026' },
  { name: 'CISM', title: 'Certified Information Security Manager', issuer: 'ISACA', year: 'Jul 2024' },
  { name: 'SC-200', title: 'Microsoft Security Operations Analyst', issuer: 'Microsoft', year: 'Jun 2023' },
  { name: 'SOC L1', title: 'SOC Analyst Level 1', issuer: 'Cybrary', year: 'Feb 2022' },
  { name: 'NSE 2', title: 'Fortinet Network Security Expert Level 2: Certified Associate', issuer: 'Fortinet', year: 'Aug 2021' },
  { name: 'NSE 1', title: 'Fortinet Network Security Expert Level 1: Certified Associate', issuer: 'Fortinet', year: 'May 2019' },
]

/* [7] INTRO REEL ("Play Intro" highlight slides) ---------------------------- */
export const introSlides = [
  { kicker: 'Who', title: 'Information Security Manager', body: 'Running ISMS, incident response and risk with calm precision.' },
  { kicker: 'Proof', title: 'CISM · OSCP · OSCP+', body: 'Governance and offensive credentials in one profile.' },
  { kicker: 'Research', title: 'CVE-2026-103473', body: 'Critical Deno command injection, credited to PVUDivakar.' },
  { kicker: 'Builder', title: 'Five platforms', body: 'CENTRA, PRAETOR, VAPTrix, VIGIL and AUTON.' },
  { kicker: 'Mission', title: 'Unified security', body: 'Identity, endpoint, exposure, monitoring and response working as one.' },
]

/* [8] VIEWER PROFILES ("Who's watching?") ----------------------------------
   Changes section order only. Valid ids: about, seasons, originals, topPicks, skills, achievements */
export const viewerProfiles: {
  id: string
  name: string
  mark?: string // [8a] optional letter(s) on the profile tile; defaults to the first letter of the name
  blurb: string
  order: SectionId[]
}[] = [
  { id: 'researcher', name: 'Cybersecurity Researcher', mark: 'R', blurb: 'Research and proof first', order: ['about', 'achievements', 'skills', 'originals', 'seasons', 'topPicks'] },
  { id: 'client', name: 'Client', blurb: 'Platforms and outcomes', order: ['about', 'originals', 'topPicks', 'achievements', 'skills', 'seasons'] },
  { id: 'builder', name: 'Builder', blurb: 'The builder story', order: ['about', 'seasons', 'originals', 'achievements', 'topPicks', 'skills'] },
]

/* [9] SIGNATURE QUOTE -------------------------------------------------------
   Shown as a full-width banner right under the hero.
   script = the original text (Sanskrit in Telugu script), transliteration = how to read it aloud.
   TODO: confirm the spelling of the script line. */
export const quote = {
  kicker: 'The Code',
  script: ['యదా అహం ఆగచ్ఛామి,', 'స్పర్ధా సమాప్తా భవతి'],
  transliteration: 'Yadā ahaṃ āgacchāmi, spardhā samāptā bhavati',
}
