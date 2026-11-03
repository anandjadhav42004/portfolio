import React, { useState } from 'react';
import { Mail, Phone, Globe, MapPin, ArrowUpRight, Send, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">

        {/* ── COLUMN 1: HEADING & CTA (5 cols) ── */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col justify-between">
          <div>
            <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[0.95] mb-6">
              LET'S WORK<br />
              TOGETHER <span className="text-[#d3121f]">✦</span>
            </h2>

            <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-md mb-8">
              Actively interviewing for Software Engineering, Full-Stack Developer, and SAP Consultant roles.
              Open for high-impact internships, full-time positions, and enterprise software engineering projects.
            </p>
          </div>

          <a
            href={`mailto:${portfolioData.email}`}
            className="inline-flex items-center gap-4 group cursor-pointer w-fit"
          >
            <div className="w-14 h-14 rounded-full border border-[#1f1f1f] flex items-center justify-center group-hover:border-[#d3121f] group-hover:bg-[#d3121f]/10 transition-colors">
              <ArrowUpRight className="w-6 h-6 text-[#d3121f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="font-anton text-base sm:text-lg tracking-wider uppercase text-white group-hover:text-[#d3121f] transition-colors">
              GET IN TOUCH DIRECTLY
            </span>
          </a>
        </div>

        {/* ── COLUMN 2: 4 CONTACT ROWS (4 cols) ── */}
        <div className="lg:col-span-4 p-8 sm:p-12 lg:p-16 border-b md:border-b-0 lg:border-r border-[#1f1f1f] flex flex-col justify-center gap-6">
          
          {/* Email */}
          <div className="flex items-center gap-4 group">
            <button
              onClick={copyEmail}
              className="w-11 h-11 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#a0a0a0] group-hover:border-[#d3121f] group-hover:text-[#d3121f] transition-colors flex-shrink-0"
              title="Copy Email"
            >
              {copied ? <Check className="w-4 h-4 text-[#d3121f]" /> : <Mail className="w-4 h-4" />}
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b6b6b]">EMAIL</span>
              <a
                href={`mailto:${portfolioData.email}`}
                className="text-xs sm:text-sm font-medium text-white hover:text-[#d3121f] transition-colors"
              >
                {portfolioData.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 group">
            <a
              href={`tel:${portfolioData.phone}`}
              className="w-11 h-11 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#a0a0a0] group-hover:border-[#d3121f] group-hover:text-[#d3121f] transition-colors flex-shrink-0"
            >
              <Phone className="w-4 h-4" />
            </a>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b6b6b]">PHONE</span>
              <a
                href={`tel:${portfolioData.phone}`}
                className="text-xs sm:text-sm font-medium text-white hover:text-[#d3121f] transition-colors"
              >
                {portfolioData.phone}
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-4 group">
            <a
              href={`https://www.linkedin.com/in/${portfolioData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#a0a0a0] group-hover:border-[#d3121f] group-hover:text-[#d3121f] transition-colors flex-shrink-0"
            >
              <Globe className="w-4 h-4" />
            </a>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b6b6b]">LINKEDIN</span>
              <a
                href={`https://www.linkedin.com/in/${portfolioData.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm font-medium text-white hover:text-[#d3121f] transition-colors"
              >
                linkedin.com/in/{portfolioData.linkedin}
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded-full border border-[#1f1f1f] flex items-center justify-center text-[#a0a0a0] flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#d3121f]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b6b6b]">LOCATION</span>
              <span className="text-xs sm:text-sm font-medium text-white">
                {portfolioData.location}
              </span>
            </div>
          </div>

        </div>

        {/* ── COLUMN 3: RESUME & PROVENANCE (3 cols) ── */}
        <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-[#0f0f0f]/40">
          <div>
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#d3121f] mb-3">
              OFFICIAL RESUME DOSSIER
            </div>
            <p className="text-xs text-[#a0a0a0] leading-relaxed mb-6">
              Download the complete, ATS-formatted curriculum vitae of Anand Jadhav covering education, project metrics, verified SAP credentials, and internships.
            </p>

            <a
              href={`mailto:${portfolioData.email}?subject=Requesting%20Resume%20Dossier%20-%20Anand%20Jadhav`}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-[4px] border border-[#d3121f] bg-[#d3121f]/10 text-white hover:bg-[#d3121f] text-xs font-semibold uppercase tracking-[0.16em] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>REQUEST RESUME CV</span>
            </a>
          </div>

          <div className="pt-6 border-t border-[#1f1f1f] mt-8 text-[11px] text-[#6b6b6b] uppercase tracking-wider">
            B.Tech CSE &bull; Parul University &bull; 2026 Batch
          </div>
        </div>

      </div>
    </section>
  );
}
