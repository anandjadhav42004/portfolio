import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Calendar, MapPin, ArrowUpRight, Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { experience, education, certifications, skills } from '../data/portfolio';

const flatSkills = [
  'REACT.JS',
  'NEXT.JS',
  'TYPESCRIPT',
  'SAPUI5 & FIORI',
  'ANGULAR',
  'TAILWIND CSS',
  'NODE.JS & EXPRESS',
  'MONGODB',
  'POSTGRESQL & SQL',
  'PYTHON & FASTAPI',
  'SAP BTP & ABAP CLOUD',
  'ODATA V2/V4',
  'TENSORFLOW & XGBOOST',
  'GEMINI AI (LLM)',
  'DOCKER',
  'GIT & GITHUB',
];

export default function MidRow() {
  return (
    <section id="mid-row" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f]">
      
      {/* ═══════════════════════════════════════════════════════════
          SECTION TITLE BAR: WORK EXPERIENCE & INTERNSHIPS
      ═══════════════════════════════════════════════════════════ */}
      <div className="border-b border-[#1f1f1f] bg-[#0d0d0d] px-6 sm:px-12 py-5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-[#d3121f]" />
            <span className="font-anton text-lg tracking-[0.12em] uppercase text-white">
              INDUSTRY WORK EXPERIENCE &amp; INTERNSHIPS
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#d3121f]">
            // 2 INDUSTRY ROLES
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          INTERNSHIP CARDS ROW (SIDE BY SIDE: CURRENT + PREVIOUS)
      ═══════════════════════════════════════════════════════════ */}
      <div className="border-b border-[#1f1f1f]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* 1. HILTI (CURRENT INTERNSHIP) */}
          <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col justify-between bg-gradient-to-br from-[#120506] via-[#0a0a0a] to-[#0a0a0a] relative group">
            <div>
              {/* Badge Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#d3121f]/20 border border-[#d3121f] text-[10px] font-bold tracking-[0.18em] uppercase text-[#ff3344] animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d3121f]" />
                  CURRENT INTERNSHIP (ON-SITE)
                </span>
                <span className="font-anton text-sm text-[#d3121f] tracking-wider">
                  July 2026 – Present
                </span>
              </div>

              {/* Company & Role */}
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide mb-1 group-hover:text-[#d3121f] transition-colors">
                Hilti Manufacturing India Pvt. Ltd.
              </h3>
              <div className="text-sm font-semibold text-[#d3121f] tracking-[0.1em] uppercase mb-4">
                SAP and Information Technology Intern
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#a0a0a0] mb-6 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d3121f]" />
                  Vadodara, Gujarat, India (Plant)
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#d3121f]" />
                  Production Planning &amp; Control (PPC) Team
                </span>
              </div>

              {/* Bullets directly from resume */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5 text-xs text-[#c0c0c0] leading-relaxed">
                  <span className="text-[#d3121f] mt-0.5 text-sm">✦</span>
                  <span>
                    Work in the <strong>Production Planning and Control (PPC)</strong> team on <strong>SAP S/4HANA Cloud</strong> at the Vadodara manufacturing plant.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#c0c0c0] leading-relaxed">
                  <span className="text-[#d3121f] mt-0.5 text-sm">✦</span>
                  <span>
                    Supporting <strong>SAP Production Planning (PP)</strong> processes and actively collaborating with cross-functional business users.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#c0c0c0] leading-relaxed">
                  <span className="text-[#d3121f] mt-0.5 text-sm">✦</span>
                  <span>
                    Hands-on exposure to how enterprise technology, manufacturing operations, and business logic integrate at plant scale.
                  </span>
                </li>
              </ul>
            </div>

            {/* Skills Footnote */}
            <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap gap-1.5">
              {['SAP S/4HANA Cloud', 'Production Planning (PP)', 'PPC Operations', 'Enterprise IT'].map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 border border-[#222] text-[#888]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 2. UPTOSKILLS (COMPLETED INTERNSHIP) */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-[#0a0a0a] relative group">
            <div>
              {/* Badge Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-[#333] text-[10px] font-bold tracking-[0.18em] uppercase text-[#a0a0a0]">
                  COMPLETED INTERNSHIP (REMOTE)
                </span>
                <span className="font-anton text-sm text-[#a0a0a0] tracking-wider">
                  May 2026 – August 2026
                </span>
              </div>

              {/* Company & Role */}
              <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide mb-1 group-hover:text-[#d3121f] transition-colors">
                UptoSkills
              </h3>
              <div className="text-sm font-semibold text-[#d3121f] tracking-[0.1em] uppercase mb-4">
                Backend Developer Intern
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#a0a0a0] mb-6 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d3121f]" />
                  Remote Engineering Team
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#d3121f]" />
                  Node.js &amp; Express Microservices
                </span>
              </div>

              {/* Bullets directly from resume */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5 text-xs text-[#c0c0c0] leading-relaxed">
                  <span className="text-[#d3121f] mt-0.5 text-sm">✦</span>
                  <span>
                    Developed and maintained backend features in a production codebase using <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#c0c0c0] leading-relaxed">
                  <span className="text-[#d3121f] mt-0.5 text-sm">✦</span>
                  <span>
                    Took full ownership of assigned backend modules, resolved critical functional defects, and improved API throughput.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-[#c0c0c0] leading-relaxed">
                  <span className="text-[#d3121f] mt-0.5 text-sm">✦</span>
                  <span>
                    Applied engineering code review feedback and maintained code quality across release cycles.
                  </span>
                </li>
              </ul>
            </div>

            {/* Skills Footnote */}
            <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap gap-1.5">
              {['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Code Reviews'].map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 border border-[#222] text-[#888]">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LOWER 3-COLUMN ROW: EDUCATION / SKILLS / CERTIFICATIONS
      ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">

        {/* ── COL 1: FORMAL EDUCATION (4 cols) ── */}
        <div className="lg:col-span-4 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-6">
              <GraduationCap className="w-4 h-4 text-[#d3121f]" />
              <span>EDUCATION HISTORY</span>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="pb-5 border-b border-[#1f1f1f] last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {edu.degree}
                    </h4>
                    <span className="font-anton text-xs text-[#d3121f] whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-[#a0a0a0]">
                    {edu.institute}
                  </p>
                  <div className="mt-2 inline-block px-2 py-0.5 rounded bg-[#1f1f1f] text-[10px] font-mono font-semibold text-[#ff4d5a]">
                    {edu.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#1f1f1f] mt-8 text-[11px] text-[#6b6b6b] font-mono">
            Enrollment No: 2303031570026
          </div>
        </div>

        {/* ── COL 2: VERIFIED CREDENTIALS & CERTIFICATIONS (4 cols) ── */}
        <div className="lg:col-span-4 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-6">
              <Award className="w-4 h-4 text-[#d3121f]" />
              <span>VERIFIED CREDENTIALS</span>
            </div>

            <div className="space-y-4">
              {certifications.map((c) => (
                <div key={c.id} className="pb-4 border-b border-[#1f1f1f] last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-white hover:text-[#d3121f] transition-colors flex items-center gap-1 group"
                      >
                        <span>{c.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#6b6b6b] group-hover:text-[#d3121f] flex-shrink-0" />
                      </a>
                      <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                        {c.issuer} &bull; {c.skills.join(', ')}
                      </p>
                    </div>
                    <span className="font-anton text-xs text-[#d3121f] whitespace-nowrap">
                      {c.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#1f1f1f] mt-8 text-[11px] text-[#6b6b6b] uppercase tracking-wider">
            All credentials verified on Credly &amp; HackerRank
          </div>
        </div>

        {/* ── COL 3: TECHNICAL SKILLS & QUOTE (4 cols) ── */}
        <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between quote-gradient relative">
          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-4">
              TECHNICAL STACK CHIPS
            </div>

            <div className="flex flex-wrap gap-1.5 mb-8">
              {flatSkills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/90 bg-black/50 border border-white/10 rounded-[4px] px-2.5 py-1 hover:border-[#d3121f] hover:text-[#d3121f] transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="font-anton text-5xl text-[#d3121f] opacity-40 leading-none select-none">
              &ldquo;
            </div>

            <p className="font-inter text-sm text-white font-medium leading-relaxed mb-3">
              Engineering is not just writing code, it is designing reliable systems that solve real-world problems.
            </p>

            <div className="font-allura text-2xl text-white font-normal">
              Anand Jadhav
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <span className="text-[#d3121f]">✦</span>
            <span>OPEN FOR FULL-STACK &amp; SAP ROLES</span>
          </div>
        </div>

      </div>

    </section>
  );
}
