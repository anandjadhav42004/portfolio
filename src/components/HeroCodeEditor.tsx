import React, { useState } from 'react';

interface CodeSnippet {
  id: string;
  label: string;
  filename: string;
  lang: string;
  color: string;
  code: Array<{ line: number; text: string }>;
}

const snippets: CodeSnippet[] = [
  {
    id: 'abap',
    label: 'ABAP Cloud',
    filename: 'zcl_sap_integration.abap',
    lang: 'ABAP',
    color: 'text-sky-400',
    code: [
      { line: 1, text: 'CLASS zcl_sap_integration DEFINITION PUBLIC FINAL.' },
      { line: 2, text: '  PUBLIC SECTION.' },
      { line: 3, text: '    INTERFACES if_oo_adt_classrun.' },
      { line: 4, text: '    METHODS fetch_btp_odata RETURNING VALUE(rv_status) TYPE string.' },
      { line: 5, text: 'ENDCLASS.' },
      { line: 6, text: 'CLASS zcl_sap_integration IMPLEMENTATION.' },
      { line: 7, text: '  METHOD fetch_btp_odata.' },
      { line: 8, text: '    " Connects SAP HANA Cloud with Node.js Microservice' },
      { line: 9, text: '    rv_status = \'SUCCESS: OData V4 Service Active\'.' },
      { line: 10, text: '  ENDMETHOD.' },
      { line: 11, text: 'ENDCLASS.' }
    ]
  },
  {
    id: 'ts',
    label: 'React & Node',
    filename: 'anand_engineer.ts',
    lang: 'TS',
    color: 'text-indigo-400',
    code: [
      { line: 1, text: 'interface EngineerProfile {' },
      { line: 2, text: '  name: string;' },
      { line: 3, text: '  specialties: string[];' },
      { line: 4, text: '  sapCertifications: string[];' },
      { line: 5, text: '  availability: "Open for High-Impact Roles";' },
      { line: 6, text: '}' },
      { line: 7, text: '' },
      { line: 8, text: 'export const developer: EngineerProfile = {' },
      { line: 9, text: '  name: "Anand Jadhav",' },
      { line: 10, text: '  specialties: ["SAP BTP", "ABAP", "React", "SwiftUI"],' },
      { line: 11, text: '  sapCertifications: ["ABAP Cloud Certified", "Oracle AI"],' },
      { line: 12, text: '  availability: "Open for High-Impact Roles"' },
      { line: 13, text: '};' }
    ]
  },
  {
    id: 'swift',
    label: 'SwiftUI',
    filename: 'WeatherTaskApp.swift',
    lang: 'Swift',
    color: 'text-emerald-400',
    code: [
      { line: 1, text: 'import SwiftUI' },
      { line: 2, text: 'import Combine' },
      { line: 3, text: '' },
      { line: 4, text: 'struct DashboardView: View {' },
      { line: 5, text: '    @StateObject private var vm = WeatherViewModel()' },
      { line: 6, text: '    ' },
      { line: 7, text: '    var body: some View {' },
      { line: 8, text: '        VStack(alignment: .leading, spacing: 16) {' },
      { line: 9, text: '            HeaderCard(title: "Enterprise Sync")' },
      { line: 10, text: '            LiveDataGrid(feed: vm.liveStream)' },
      { line: 11, text: '        }' },
      { line: 12, text: '        .glassBackground()' },
      { line: 13, text: '    }' },
      { line: 14, text: '}' }
    ]
  }
];

const HeroCodeEditor = () => {
  const [activeTab, setActiveTab] = useState<string>('ts');
  const currentSnippet = snippets.find(s => s.id === activeTab) || snippets[1];

  return (
    <div className="w-full rounded-2xl bg-void-2/90 border border-white/10 shadow-card backdrop-blur-xl overflow-hidden font-mono text-xs text-left">
      {/* Top Title Bar with Tabs */}
      <div className="flex items-center justify-between px-4 py-3 bg-void-3 border-b border-white/10 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-void/80 p-1 rounded-lg border border-white/5">
          {snippets.map((snip) => (
            <button
              key={snip.id}
              onClick={() => setActiveTab(snip.id)}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === snip.id
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>{snip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Header Filename Indicator */}
      <div className="px-5 py-2 bg-void/50 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-2">
          <span className={`font-bold ${currentSnippet.color}`}>[{currentSnippet.lang}]</span>
          <span>{currentSnippet.filename}</span>
        </span>
        <span className="text-[10px] text-slate-500">UTF-8</span>
      </div>

      {/* Editor Body */}
      <div className="p-5 flex gap-4 bg-void-2 leading-relaxed overflow-x-auto min-h-[260px]">
        {/* Line Numbers */}
        <div className="flex flex-col text-slate-600 select-none text-right font-mono text-xs pr-2 border-r border-white/5">
          {currentSnippet.code.map((item) => (
            <span key={item.line} className="px-1">{item.line}</span>
          ))}
        </div>

        {/* Code Lines */}
        <pre className="flex-1 whitespace-pre-wrap font-mono text-xs text-slate-200">
          <code>
            {currentSnippet.code.map((item) => (
              <div key={item.line} className="hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                <span className={
                  item.text.includes('CLASS') || item.text.includes('import') || item.text.includes('interface') || item.text.includes('export')
                    ? 'text-indigo-400 font-semibold'
                    : item.text.includes('"') || item.text.includes("'")
                    ? 'text-emerald-400'
                    : item.text.includes('//') || item.text.includes('"')
                    ? 'text-slate-500 italic'
                    : 'text-slate-200'
                }>
                  {item.text}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 bg-void-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
        <span>Ready • SAP BTP & Full Stack</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>TypeScript & ABAP Environment</span>
        </span>
      </div>
    </div>
  );
};

export default HeroCodeEditor;
