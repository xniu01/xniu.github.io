'use client'

import React, { useEffect, useState } from "react";
import { Mail, FileDown, Github, Linkedin, Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// === Academic homepage: Intro + Research (robust build; optional links handled) ===
// Notes:
// - All external links are rendered ONLY when truthy to avoid empty-string issues.
// - Added lightweight runtime "tests" (console assertions) to catch missing/invalid data early.
// - Includes Journal vs. Conference sections, with award highlight in Northwestern purple (#4E2A84).

const PROFILE = {
  name: "Xiaochun (Nora) Niu",
  email: "xiaochun.niu@duke.edu",
  // Public image URL (GitHub raw). Replace with your own domain when ready.
  avatar: "https://raw.githubusercontent.com/xniu01/xniu.github.io/refs/heads/main/xniu.jpg",
  blurb1:
    "I am a postdoctoral researcher in Decision Sciences at the Fuqua School of Business, Duke University, working with Prof. Jiaming Xu. I received my Ph.D. from the Department of Industrial Engineering and Management Sciences at Northwestern University, where I was advised by Prof. Ermin Wei and Prof. Julia Gaudio, and my B.S. in Mathematics from Nanjing University.",
  blurb2:
    "My research interests lie at the intersection of operations research, artificial intelligence, and data analytics. I am developing theoretical foundations and efficient algorithms for data-driven decision-making in large-scale stochastic and networked systems, with applications in business, engineering, and the natural sciences. My recent work has explored topics on sparse flexibility design, community detection and matching in random geometric graphs, and multi-agent learning under heterogeneity.",
} as const;

const LINKS = {
  cv: "https://docs.google.com/viewer?url=https://github.com/xniu01/xniu.github.io/raw/main/Xiaochun_Niu_CV.pdf",
  scholar: "https://scholar.google.com.hk/citations?hl=en&user=fkB0e1IAAAAJ&view_op=list_works&sortby=pubdate",
  // github: "https://github.com/xniu01",
  linkedin: "https://www.linkedin.com/in/xiaochun-niu-8b615b1a0/",
  // May be empty; component guards against empty strings.
} as const;

// === Data ===
const WORKING_PAPERS = [
  {
    year: "2025+",
    title: "Optimality of Random Regular Graphs for Sparse Flexibility Designs",
    authors: ["Weijia Li", "Xiaochun Niu", "Yehua Wei", "Jiaming Xu"],
    venue: "Working Paper",
    links: {},
  },
  {
    year: "2025+",
    title: "Approximate Random Geometric Graph Matching",
    authors: ["Xiaochun Niu", "Tselil Schramm", "Jiaming Xu"],
    venue: "Working Paper",
    links: {},
  },
] as const;

const JOURNAL_PAPERS = [
  {
    year: "2025+",
    title: "Learning with Shared Representations: Statistical Rates and Efficient Algorithms",
    authors: ["Xiaochun Niu", "Lili Su", "Jiaming Xu", "Pengkun Yang"],
    venue: "Submitted",
    note: "Oral presentation at International Workshop on Federated Foundation Models (NeurIPS 2024)",
    links: { arxiv: "https://arxiv.org/abs/2409.04919" },
  },
  {
    year: "2025+",
    title: "Exact Label Recovery in Euclidean Random Graphs",
    authors: ["Julia Gaudio", "Charlie Guan", "Xiaochun Niu", "Ermin Wei"],
    venue: "Major Revision, Annals of Applied Probability",
    links: { arxiv: "https://arxiv.org/abs/2407.11163" },
  },
  {
    year: 2024,
    title: "DISH: A Distributed Hybrid Optimization Method Leveraging System Heterogeneity",
    authors: ["Xiaochun Niu", "Ermin Wei"],
    venue: "IEEE Transactions on Signal Processing",
    note: "Extended abstract in Allerton Conference, 2022",
    links: { arxiv: "https://arxiv.org/abs/2212.02638" },
  },
  {
    year: 2023,
    title: "FedHybrid: A Hybrid Federated Optimization Method for Heterogeneous Clients",
    authors: ["Xiaochun Niu", "Ermin Wei"],
    venue: "IEEE Transactions on Signal Processing",
    links: { arxiv: "https://ieeexplore.ieee.org/document/10026496" },
  },
] as const;

const CONFERENCE_PAPERS = [
  {
    year: 2025,
    title: "Incentive Analysis for Agent Participation in Federated Learning",
    authors: ["Lihui Yi", "Xiaochun Niu", "Ermin Wei"],
    venue: "IEEE Conference on Decision and Control (CDC)",
    links: { arxiv: "https://arxiv.org/abs/2503.09039" },
  },
  {
    year: 2024,
    title: "Exact Community Recovery in the Geometric Stochastic Block Model",
    authors: ["Julia Gaudio", "Xiaochun Niu", "Ermin Wei"],
    venue: "ACM-SIAM Symposium on Discrete Algorithms (SODA)",
    award: "Nemhauser Prize for Best Student Paper, 2024",
    links: { arxiv: "https://arxiv.org/abs/2307.11196" },
  },
  {
    year: 2024,
    title: "Understanding Generalization of Federated Learning via Stability: Heterogeneity Matters",
    authors: ["Zhenyu Sun", "Xiaochun Niu", "Ermin Wei"],
    venue: "International Conference on Artificial Intelligence and Statistics (AISTATS)",
    links: { arxiv: "https://arxiv.org/abs/2306.03824" },
  },
  {
    year: 2022,
    title: "DISH: A Distributed Hybrid Primal-Dual Optimization Framework to Utilize System Heterogeneity",
    authors: ["Xiaochun Niu", "Ermin Wei"],
    venue: "IEEE Conference on Decision and Control (CDC)",
    links: { arxiv: "https://ieeexplore.ieee.org/abstract/document/9993156" },
  },
] as const;

// === Utilities ===
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

function DevChecks() {
  useEffect(() => {
    try {
      // Core checks
      console.assert(typeof PROFILE.name === "string" && PROFILE.name.length > 0, "PROFILE.name required");
      console.assert(typeof PROFILE.email === "string" && PROFILE.email.includes("@"), "PROFILE.email must be valid");
      // Links can be undefined or non-empty strings
      const validUrlOrEmpty = (v: any) => v === undefined || v === null || v === "" || typeof v === "string";
      Object.entries(LINKS).forEach(([k, v]) => {
        console.assert(validUrlOrEmpty(v), `LINKS.${k} must be a string or empty`);
      });
      // Data sanity
      const allPapers = [...JOURNAL_PAPERS, ...CONFERENCE_PAPERS];
      console.assert(allPapers.every(p => typeof p.title === "string" && p.title.length > 0), "Every paper needs a title");
      console.assert(allPapers.every(p => Array.isArray(p.authors) && p.authors.length > 0), "Every paper should list authors");
      // Ensure award appears on the intended paper
      console.assert(
        CONFERENCE_PAPERS.some(p => 'award' in p && p.award && p.award.includes("Nemhauser")),
        "Nemhauser Prize highlight should exist on the SODA 2024 paper"
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("DevChecks failed:", e);
    }
  }, []);
  return null;
}

// Render a safe external link: prefer pdf > arxiv > doi; hide if none.
function paperHref(links?: { pdf?: string; arxiv?: string; doi?: string }) {
  if (!links) return undefined;
  return links.pdf || links.arxiv || links.doi || undefined;
}

function PaperList({ papers }: { papers: ReadonlyArray<{
  year: number | string; title: string; authors: readonly string[]; venue: string; links?: { pdf?: string; arxiv?: string; doi?: string }; note?: string; award?: string;
}> }) {
  const sorted = [...papers].sort((a, b) => {
    const yearA = typeof a.year === 'string' ? parseInt(a.year) || 9999 : a.year;
    const yearB = typeof b.year === 'string' ? parseInt(b.year) || 9999 : b.year;
    return yearB - yearA;
  });
  return (
    <ul className="mt-4 space-y-6">
      {sorted.map((p, i) => {
        const href = paperHref(p.links);
        return (
          <li key={i} className="leading-relaxed">
            <div className="font-medium text-lg">
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                  {p.title}
                </a>
              ) : (
                <span>{p.title}</span>
              )}
            </div>
            <div className="text-sm opacity-80">{p.authors.join(", ")}</div>
            <div className="text-sm opacity-80">{p.venue}{p.year ? `, ${p.year}` : ""}</div>
            {p.note && <div className="text-xs opacity-70 italic mt-1">{p.note}</div>}
            {p.award && (
              <div className="mt-2 font-bold text-lg" style={{ color: "#4E2A84" }}>
                {p.award}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function AcademicHomepage() {
  const { dark, setDark } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <DevChecks />
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#top" className="font-semibold tracking-tight text-lg">
              {PROFILE.name}
            </a>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-base opacity-90">
                <a href="#publications" className="hover:opacity-100">Research</a>
                {LINKS.cv && (
                  <a href={LINKS.cv} target="_blank" rel="noreferrer" className="hover:opacity-100">CV</a>
                )}
              </nav>
              <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Intro */}
      <main id="top" className="max-w-6xl mx-auto px-8 pb-24">
        <section className="flex flex-col md:flex-row items-start gap-0 pt-16">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{PROFILE.name}</h1>
            <div className="mt-3 text-base md:text-lg opacity-90">
              <Mail className="inline w-5 h-5 mr-1" />{""}
              <a className="hover:underline" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </div>
            <p className="mt-6 text-base md:text-lg leading-relaxed opacity-90 max-w-4xl">
              I am a postdoctoral researcher in Decision Sciences at the{" "}
              <a href="https://areas.fuqua.duke.edu/decision-sciences/" target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Fuqua School of Business
              </a>
              , Duke University, working with{" "}
              <a href="https://people.duke.edu/~jx77/" target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Prof. Jiaming Xu
              </a>
              . I received my Ph.D. from the{" "}
              <a href="https://www.mccormick.northwestern.edu/industrial/" target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Department of Industrial Engineering and Management Sciences
              </a>
              {" "}at Northwestern University, where I was advised by{" "}
              <a href="https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/wei-ermin.html" target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Prof. Ermin Wei
              </a>
              {" "}and{" "}
              <a href="https://sites.northwestern.edu/juliagaudio/" target="_blank" rel="noreferrer" className="underline hover:opacity-80">
                Prof. Julia Gaudio
              </a>
              , and my B.S. in Mathematics from Nanjing University. 
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed opacity-90 max-w-4xl">{PROFILE.blurb2}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-base">
              {LINKS.scholar && (
                <a href={LINKS.scholar} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-2">
                  <Globe className="w-5 h-5" /> Google Scholar
                </a>
              )}
              {LINKS.linkedin && (
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-2">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              )}
              {LINKS.cv && (
                <a href={LINKS.cv} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-2">
                  <FileDown className="w-5 h-5" /> CV
                </a>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 md:ml-10 mt-15">
            <img
              src={PROFILE.avatar}
              alt={`${PROFILE.name} portrait`}
              className="w-54 h-72 rounded-2xl object-cover shadow-lg border border-gray-200"
            />
          </div>
        </section>

        {/* Publications */}
        <section className="mt-24" id="publications">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">Preprints and Publications</h2>

          <h3 className="text-2xl font-semibold mb-4">Working Papers</h3>
          <PaperList papers={WORKING_PAPERS} />

          <h3 className="text-2xl font-semibold mb-4 mt-16">Journal Papers</h3>
          <PaperList papers={JOURNAL_PAPERS} />

          <h3 className="text-2xl font-semibold mb-4 mt-16">Conference Papers</h3>
          <PaperList papers={CONFERENCE_PAPERS} />
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="max-w-6xl mx-auto px-8 text-base opacity-80">
          © {new Date().getFullYear()} {PROFILE.name}. Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
        </div>
      </footer>
    </div>
  );
}
