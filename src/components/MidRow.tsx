import React from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Database, ShieldCheck, Cloud, Cpu, ArrowUpRight } from 'lucide-react';
import { experience, certifications } from '../data/portfolio';

const skillsList = [
  'REACT.JS',
  'NEXT.JS',
  'TYPESCRIPT',
  'NODE.JS & EXPRESS',
  'POSTGRESQL & PRISMA',
  'MONGODB',
  'PYTHON & FASTAPI',
  'SAP BTP',
  'ABAP CLOUD (RAP)',
  'SAPUI5 / FIORI',
  'SWIFTUI (IOS)',
  'REST & ODATA V4',
  'DOCKER',
  'GIT & GITHUB CI/CD',
  'DATA STRUCTURES & ALGORITHMS',
];

const workflowSteps = [
  {
    num: '01',
    title: 'SYSTEM DESIGN & SCHEMAS',
    desc: 'Architecting relational database entities, API contracts, OData services, and scalable component hierarchies.',
    icon: Search,
  },
  {
    num: '02',
    title: 'FULL-STACK IMPLEMENTATION',
    desc: 'Developing typed React & Next.js user interfaces connected to high-performance Node.js / Python microservices.',
    icon: Code2,
  },
  {
    num: '03',
    title: 'ENTERPRISE INTEGRATION',
    desc: 'Integrating SAP BTP cloud connectors, ABAP Cloud core data services, and AI/ML predictive pipelines.',
    icon: Database,
  },
  {
    num: '04',
    title: 'TESTING & BENCHMARKING',
    desc: 'Conducting static code analysis, unit test suites, database query optimization, and Lighthouse Web Vitals audits.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'CLOUD SHIP & OBSERVABILITY',
    desc: 'Automating continuous deployment pipelines to Vercel, Netlify, and enterprise cloud infrastructures.',
    icon: Cloud,
  },
];

export default function MidRow() {
  const hiltiExp = experience.find((e) => e.company.includes('Hilti')) || experience[0];

  return (
    <div id="mid-row" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">

        {/* ── COLUMN A: EDUCATION & CREDENTIALS & SKILLS (32% = 4 cols) ── */}
        <div className="lg:col-span-4 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col justify-between">
          <div>
            {/* Academic Background */}
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-4">
              ACADEMIC BACKGROUND
            </div>

            <div className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white leading-snug">
                    B.Tech in Computer Science &amp; Engineering
                  </h4>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">
                    Parul Institute of Technology (SAP IEP Track)
                  </p>
                </div>
                <span className="font-anton text-sm text-[#d3121f] whitespace-nowrap">
                  2022–2026
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-[#1f1f1f] my-6" />

            {/* Verified Certifications */}
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-4">
              VERIFIED CREDENTIALS
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {certifications.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-white hover:text-[#d3121f] transition-colors leading-snug flex items-center gap-1 group"
                    >
                      <span>{c.name}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#6b6b6b] group-hover:text-[#d3121f] inline flex-shrink-0" />
                    </a>
                    <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                      {c.issuer} &bull; {c.skills.slice(0, 3).join(', ')}
                    </p>
                  </div>
                  <span className="font-anton text-xs text-[#d3121f] whitespace-nowrap">
                    {c.date}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-[1px] bg-[#1f1f1f] my-6" />

            {/* Core Technical Stack */}
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-4">
              CORE ENGINEERING STACK
            </div>

            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#a0a0a0] border border-[#262626] rounded-[4px] px-2.5 py-1 hover:border-[#d3121f] hover:text-[#d3121f] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── COLUMN B: WORKFLOW (40% = 5 cols) ── */}
        <div id="workflow" className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#1f1f1f]">
          <h3 className="font-anton text-2xl tracking-[0.08em] uppercase text-white mb-8">
            ENGINEERING WORKFLOW
          </h3>

          <div className="flex flex-col relative">
            {workflowSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isLast = idx === workflowSteps.length - 1;

              return (
                <div key={step.num} className="relative flex items-start gap-4 pb-8 last:pb-0">
                  {/* Vertical connecting line */}
                  {!isLast && (
                    <div
                      className="absolute left-[39px] top-[40px] bottom-0 w-[1px] bg-[#1f1f1f]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Number & Icon */}
                  <div className="flex items-center gap-3 flex-shrink-0 z-10">
                    <span className="font-anton text-lg text-[#d3121f] w-5 text-right">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-[#1f1f1f] bg-[#0a0a0a] flex items-center justify-center text-[#a0a0a0] group-hover:border-[#d3121f] transition-colors">
                      <IconComp className="w-4 h-4 text-[#d3121f]" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col pt-1">
                    <h4 className="font-anton text-sm tracking-wide text-white uppercase mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#a0a0a0] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── COLUMN C: PHILOSOPHY & INDUSTRY EXPERIENCE (28% = 3 cols) ── */}
        <div className="lg:col-span-3 p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden quote-gradient">
          
          <div>
            <div className="font-anton text-6xl text-[#d3121f] opacity-35 leading-none mb-2 select-none">
              &ldquo;
            </div>

            <p className="font-inter text-base text-white font-medium leading-relaxed mb-4">
              Engineering is not just writing code, it is designing reliable systems that solve real-world problems.
            </p>

            <div className="font-allura text-3xl text-white font-normal mb-8">
              Anand Jadhav
            </div>

            {/* Industry Internship Highlight Box */}
            <div className="bg-black/60 border border-[#1f1f1f] rounded-[4px] p-4 backdrop-blur-sm mb-6">
              <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#d3121f] mb-1">
                // INDUSTRY EXPERIENCE
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wide">
                {hiltiExp.company}
              </div>
              <div className="text-[11px] text-[#a0a0a0] mt-1 leading-snug">
                {hiltiExp.title} &bull; {hiltiExp.function || 'PPC'} &bull; S/4HANA Enterprise Systems
              </div>
              <div className="text-[10px] text-[#6b6b6b] mt-1 font-mono">
                {hiltiExp.duration}
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            <span className="text-[#d3121f]">✦</span>
            <span>LET'S BUILD RELIABLE SYSTEMS</span>
          </div>

        </div>

      </div>
    </div>
  );
}
