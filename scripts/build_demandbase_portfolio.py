#!/usr/bin/env python3
"""
Demandbase UI/UX Designer & Frontend Engineer Portfolio PDF Generator
Builds a pixel-perfect 9-page presentation document and prints to PDF via headless Chrome.
"""

import os
import base64

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as f:
            encoded = base64.b64encode(f.read()).decode('utf-8')
            ext = os.path.splitext(image_path)[1].replace('.', '')
            if ext == 'jpg': ext = 'jpeg'
            return f"data:image/{ext};base64,{encoded}"
    return ""

def generate_html():
    base_dir = "/Users/anand/Desktop/portflio/portfolio"
    portrait_b64 = get_base64_image(f"{base_dir}/public/anand_profile.jpg")
    sap_b64 = get_base64_image(f"{base_dir}/public/sap_prognos_dashboard.jpg")
    robot_b64 = get_base64_image(f"{base_dir}/public/r2_proto_sim.jpg")

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Anand Jadhav — UI/UX Designer & Frontend Engineer Portfolio (Demandbase)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4 portrait;
    margin: 0;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    background: #0a0a0a;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  
  /* 210mm x 297mm A4 Page Container */
  .page {{
    width: 210mm;
    height: 297mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    overflow: hidden;
    background: #0a0a0a;
    padding: 18mm 20mm 16mm 20mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  
  /* Background Subtle Grid on Every Page */
  .grid-bg {{
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }}
  
  .content-wrap {{
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
  }}

  /* Top Navigation Bar */
  .page-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1f1f1f;
    padding-bottom: 3.5mm;
    margin-bottom: 5.5mm;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    color: #6b6b6b;
    text-transform: uppercase;
  }}
  .page-header .brand {{
    color: #d3121f;
    font-weight: 700;
  }}
  
  /* Bottom Running Footer */
  .page-footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #1f1f1f;
    padding-top: 3mm;
    margin-top: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5px;
    letter-spacing: 0.14em;
    color: #555555;
    text-transform: uppercase;
  }}
  .page-footer .pg-num {{
    color: #ffffff;
    font-weight: 700;
  }}
  .page-footer .demandbase-tag {{
    color: #d3121f;
  }}

  /* Typography */
  .font-anton {{
    font-family: 'Anton', sans-serif;
    letter-spacing: 0.04em;
  }}
  .font-mono {{
    font-family: 'JetBrains Mono', monospace;
  }}
  .text-red {{
    color: #d3121f;
  }}
  .text-muted {{
    color: #a0a0a0;
  }}
  .text-faint {{
    color: #666666;
  }}

  /* Section Title Block */
  .section-intro {{
    margin-bottom: 5mm;
  }}
  .section-tag {{
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d3121f;
    background: rgba(211, 18, 31, 0.1);
    border: 1px solid rgba(211, 18, 31, 0.3);
    padding: 2.5px 8px;
    border-radius: 4px;
    margin-bottom: 2mm;
  }}
  .section-title {{
    font-family: 'Anton', sans-serif;
    font-size: 26px;
    text-transform: uppercase;
    color: #ffffff;
    line-height: 1.05;
  }}
  .section-subtitle {{
    font-size: 10px;
    color: #888888;
    margin-top: 1.5mm;
    line-height: 1.4;
  }}

  /* Cards & Containers */
  .card {{
    background: #0f0f0f;
    border: 1px solid #1f1f1f;
    border-radius: 8px;
    padding: 4mm 5mm;
  }}
  .card-highlight {{
    border-color: rgba(211, 18, 31, 0.4);
    background: linear-gradient(145deg, #12090a, #0d0d0d);
  }}

  /* Custom Pill Badges */
  .badge {{
    display: inline-block;
    padding: 2px 7px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 600;
    text-transform: uppercase;
    background: #181818;
    border: 1px solid #282828;
    color: #888;
  }}
  .badge-red {{
    background: rgba(211, 18, 31, 0.15);
    border-color: rgba(211, 18, 31, 0.4);
    color: #ff4d5a;
  }}
  .badge-green {{
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.4);
    color: #10b981;
  }}

  a {{
    color: inherit;
    text-decoration: none;
  }}
</style>
</head>
<body>

  <!-- =================================================================== -->
  <!-- PAGE 1: COVER                                                      -->
  <!-- =================================================================== -->
  <div class="page" style="padding: 0; background: #070707;">
    <div class="grid-bg"></div>
    
    <div style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 18mm 20mm;">
      
      <!-- Top Dossier Meta -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #1f1f1f; padding-bottom: 4mm;">
        <div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 0.22em; color: #d3121f; font-weight: 700; text-transform: uppercase;">
            CAMPUS PLACEMENT DOSSIER // 2026-2027
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.14em; color: #666; text-transform: uppercase; margin-top: 1mm;">
            PARUL UNIVERSITY &bull; ENROLLMENT: 2303031570026
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; letter-spacing: 0.18em; color: #ffffff; font-weight: 700; text-transform: uppercase;">
            APPLICATION FOR DEMANDBASE
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.14em; color: #d3121f; text-transform: uppercase; margin-top: 1mm;">
            ROLE: UI / FRONTEND ENGINEER
          </div>
        </div>
      </div>

      <!-- Center Hero Display: Portrait + Massive Headline -->
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8mm; margin: auto 0;">
        
        <!-- Left: Editorial Typography -->
        <div style="flex: 1.2;">
          <div style="display: inline-block; padding: 3px 9px; border-radius: 4px; background: rgba(211,18,31,0.15); border: 1px solid rgba(211,18,31,0.4); font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; color: #ff4d5a; text-transform: uppercase; margin-bottom: 4mm;">
            UI/UX DESIGN &bull; FRONTEND ENGINEERING
          </div>
          
          <h1 class="font-anton" style="font-size: 64px; line-height: 0.9; text-transform: uppercase; color: #ffffff; margin-bottom: 4mm;">
            ANAND<br><span style="color: #d3121f;">JADHAV</span>
          </h1>

          <div style="font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; color: #e5e5e5; line-height: 1.5; margin-bottom: 4mm; max-width: 95%;">
            Building human-centered, accessible enterprise interfaces with React 18, TypeScript, SAPUI5, and design tokens calibrated for 60 FPS performance.
          </div>

          <div style="font-size: 9.5px; color: #888888; line-height: 1.6; max-width: 95%; margin-bottom: 6mm;">
            Final-year B.Tech CSE student (Parul Institute of Technology, CGPA 8.71) &amp; SAP IT Intern at Hilti Manufacturing India. Experienced in transforming high-friction industrial data into intuitive decision cockpit dashboards.
          </div>

          <!-- Quick Metric Badges -->
          <div style="display: flex; gap: 4mm;">
            <div class="card" style="padding: 2.5mm 4mm; text-align: center; border-color: #262626;">
              <div class="font-anton" style="font-size: 18px; color: #d3121f; line-height: 1;">8.71</div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #888; text-transform: uppercase; margin-top: 1mm;">B.Tech CGPA</div>
            </div>
            <div class="card" style="padding: 2.5mm 4mm; text-align: center; border-color: #262626;">
              <div class="font-anton" style="font-size: 18px; color: #ffffff; line-height: 1;">88 / 100</div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #888; text-transform: uppercase; margin-top: 1mm;">SUS Score</div>
            </div>
            <div class="card" style="padding: 2.5mm 4mm; text-align: center; border-color: #262626;">
              <div class="font-anton" style="font-size: 18px; color: #d3121f; line-height: 1;">-34%</div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #888; text-transform: uppercase; margin-top: 1mm;">Task Time</div>
            </div>
          </div>
        </div>

        <!-- Right: Professional Studio Portrait -->
        <div style="flex: 0.95; display: flex; justify-content: center;">
          <div style="position: relative; width: 68mm; height: 104mm; border-radius: 12px; overflow: hidden; border: 1.5px solid rgba(211, 18, 31, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(211,18,31,0.25);">
            <img src="{portrait_b64}" alt="Anand Jadhav" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: contrast(1.05) brightness(1.02);">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 35%; background: linear-gradient(to top, rgba(10,10,10,0.95), transparent);"></div>
            <div style="position: absolute; bottom: 3mm; left: 3mm; right: 3mm; display: flex; justify-content: space-between; align-items: flex-end;">
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; letter-spacing: 0.15em;">ANAND JADHAV</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #888;">STUDIO DOSSIER</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Cover Footer / Contact Row -->
      <div style="border-top: 1px solid #1f1f1f; padding-top: 3.5mm; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #777;">
        <div>PORTFOLIO: github.com/anandjadhav42004/portfolio</div>
        <div>EMAIL: anandjadhav42004@gmail.com</div>
        <div>PHONE: +91 83080 08154</div>
        <div style="color: #d3121f; font-weight: 700;">PAGE 01 / 09</div>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 2: ABOUT ME                                                   -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>02 // PROFESSIONAL PROFILE &amp; PHILOSOPHY</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">PROFILE &amp; PHILOSOPHY</div>
        <h2 class="section-title">ENGINEERING WITH EMPATHY &amp; PRECISION</h2>
        <p class="section-subtitle">Bridging the gap between human cognitive ergonomics, enterprise design systems, and modern web architecture.</p>
      </div>

      <!-- 2-Column Content Layout -->
      <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 5mm; margin-bottom: 5mm;">
        
        <!-- Left: Narrative -->
        <div class="card" style="display: flex; flex-direction: column; gap: 3.5mm;">
          <h3 class="font-anton" style="font-size: 15px; color: #ffffff; letter-spacing: 0.05em; text-transform: uppercase;">
            Who I Am &amp; What Drives My Work
          </h3>
          <p style="font-size: 9.5px; color: #a0a0a0; line-height: 1.6;">
            I am a final-year Computer Science undergraduate at <strong style="color: #fff;">Parul Institute of Technology</strong> (SAP Industry Enabled Program Track), concurrently serving as a <strong style="color: #fff;">SAP and Information Technology Intern at Hilti Manufacturing India</strong>. 
          </p>
          <p style="font-size: 9.5px; color: #a0a0a0; line-height: 1.6;">
            My design philosophy centers on <strong style="color: #d3121f;">purposeful minimalism</strong>: eliminating cognitive overload in dense enterprise environments while upholding rigorous 60 FPS performance. Having operated on plant shopfloors alongside supply chain controllers, I design interfaces that treat user time as the most critical resource.
          </p>
          
          <div style="border-top: 1px solid #1f1f1f; padding-top: 3mm; margin-top: 1mm;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; font-weight: 700; color: #d3121f; text-transform: uppercase; margin-bottom: 2mm;">
              WHY DEMANDBASE?
            </div>
            <p style="font-size: 9px; color: #888; line-height: 1.5;">
              Demandbase powers enterprise B2B go-to-market decisions with massive data volumes. My background in developing predictive cockpits, managing complex state hierarchies in React, and adhering to strict design system standards directly equips me to build intuitive, high-impact workflows for Demandbase users.
            </p>
          </div>
        </div>

        <!-- Right: Experience & Academic Highlights -->
        <div style="display: flex; flex-direction: column; gap: 3.5mm;">
          
          <div class="card card-highlight">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
              <span class="badge badge-red">CURRENT INTERNSHIP</span>
              <span class="font-mono" style="font-size: 8px; color: #888;">JULY 2026 – PRESENT</span>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #fff;">Hilti Manufacturing India</div>
            <div style="font-size: 9px; color: #d3121f; font-family: 'JetBrains Mono', monospace; margin-bottom: 2mm;">SAP &amp; IT Intern &bull; PPC Operations</div>
            <p style="font-size: 8.5px; color: #999; line-height: 1.45;">
              Stationed on-site in the Production Planning and Control team on SAP S/4HANA Cloud. Bridging business user operational requirements with enterprise IT solutions.
            </p>
          </div>

          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
              <span class="badge">COMPLETED INTERNSHIP</span>
              <span class="font-mono" style="font-size: 8px; color: #888;">MAY – AUG 2026</span>
            </div>
            <div style="font-weight: 700; font-size: 11px; color: #fff;">UptoSkills</div>
            <div style="font-size: 9px; color: #bbb; font-family: 'JetBrains Mono', monospace; margin-bottom: 2mm;">Backend Engineering Intern</div>
            <p style="font-size: 8.5px; color: #999; line-height: 1.45;">
              Built scalable RESTful microservices with Node.js and Express; integrated MongoDB query optimizations resulting in 28% query latency reduction.
            </p>
          </div>

          <div class="card">
            <div style="font-size: 8.5px; font-family: 'JetBrains Mono', monospace; color: #d3121f; font-weight: 700; text-transform: uppercase; margin-bottom: 1mm;">
              ACADEMIC MERIT
            </div>
            <div style="font-weight: 700; font-size: 10.5px; color: #fff;">Parul Institute of Technology</div>
            <div style="font-size: 8.5px; color: #888;">B.Tech Computer Science (2023–2027) &bull; <strong style="color: #fff;">CGPA: 8.71 / 10</strong></div>
            <div style="font-size: 8.5px; color: #888; margin-top: 1mm;">HSC 12th Science: <strong style="color: #fff;">94.00%</strong> &bull; SSC 10th CBSE: <strong style="color: #fff;">75.40%</strong></div>
          </div>

        </div>

      </div>

      <!-- 3 Core Design Pillars -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm;">
        <div class="card">
          <div style="font-size: 14px; color: #d3121f; margin-bottom: 1.5mm;">01</div>
          <div class="font-anton" style="font-size: 12px; color: #fff; text-transform: uppercase; margin-bottom: 1mm;">Progressive Disclosure</div>
          <p style="font-size: 8px; color: #888; line-height: 1.45;">Hiding secondary parameters behind context-aware presets to eliminate decision paralysis in dense enterprise screens.</p>
        </div>
        <div class="card">
          <div style="font-size: 14px; color: #d3121f; margin-bottom: 1.5mm;">02</div>
          <div class="font-anton" style="font-size: 12px; color: #fff; text-transform: uppercase; margin-bottom: 1mm;">Tokenized Design Systems</div>
          <p style="font-size: 8px; color: #888; line-height: 1.45;">Strict synchronization between Figma tokens, CSS variables, and component props ensuring zero drift from mockup to production.</p>
        </div>
        <div class="card">
          <div style="font-size: 14px; color: #d3121f; margin-bottom: 1.5mm;">03</div>
          <div class="font-anton" style="font-size: 12px; color: #fff; text-transform: uppercase; margin-bottom: 1mm;">Empirical UX Validation</div>
          <p style="font-size: 8px; color: #888; line-height: 1.45;">Measuring success via System Usability Scale (SUS) benchmarks, task duration reduction, and error recovery metrics.</p>
        </div>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 02 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 3: SKILLS & TOOLS                                             -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>03 // COMPETENCY MATRIX &amp; TOOLCHAIN</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">VERIFIED CAPABILITIES</div>
        <h2 class="section-title">CORE SKILLS &amp; TECHNICAL ARSENAL</h2>
        <p class="section-subtitle">Structured competencies across design thinking, enterprise design systems, and frontend software engineering.</p>
      </div>

      <!-- 7 Category Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 4mm;">
        
        <!-- Category 1: UI Design -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">01. UI Design &amp; Craft</span>
            <span class="badge badge-red">Figma Expert</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 2.5mm;">
            Crafting enterprise visual systems, typography hierarchies, layout grids, and accessible color ramps.
          </p>
          <div style="display: flex; flex-wrap: gap; gap: 1.5mm;">
            <span class="badge">Figma Variables</span>
            <span class="badge">SAP Fiori 3.0 Horizon</span>
            <span class="badge">8px Grid Layout</span>
            <span class="badge">WCAG 2.1 AA</span>
            <span class="badge">Iconography</span>
          </div>
        </div>

        <!-- Category 2: UX Research -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">02. UX Research &amp; Strategy</span>
            <span class="badge">Double Diamond</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 2.5mm;">
            Uncovering operational pain points through structured qualitative interviews, affinity clustering, and task flow audits.
          </p>
          <div style="display: flex; flex-wrap: gap; gap: 1.5mm;">
            <span class="badge">User Interviews</span>
            <span class="badge">Contextual Inquiries</span>
            <span class="badge">Persona Modeling</span>
            <span class="badge">Journey Mapping</span>
          </div>
        </div>

        <!-- Category 3: Wireframing & IA -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">03. Wireframing &amp; IA</span>
            <span class="badge">Information Architecture</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 2.5mm;">
            Rapid iteration from paper sketches to structural wireframes; organizing complex navigation trees.
          </p>
          <div style="display: flex; flex-wrap: gap; gap: 1.5mm;">
            <span class="badge">Low-Fi Wireframing</span>
            <span class="badge">Progressive Disclosure</span>
            <span class="badge">Navigation Trees</span>
            <span class="badge">Figma Layouts</span>
          </div>
        </div>

        <!-- Category 4: Prototyping & Interaction -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">04. Prototyping &amp; Motion</span>
            <span class="badge badge-red">Framer Motion</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 2.5mm;">
            Simulating natural physics with springs, micro-interactions, layout transitions, and feedback indicators.
          </p>
          <div style="display: flex; flex-wrap: gap; gap: 1.5mm;">
            <span class="badge">Interactive Prototypes</span>
            <span class="badge">Framer Motion</span>
            <span class="badge">Lenis Smooth Scroll</span>
            <span class="badge">Micro-Interactions</span>
          </div>
        </div>

        <!-- Category 5: Responsive & Accessible -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">05. Responsive &amp; Adaptive</span>
            <span class="badge">Mobile-First</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 2.5mm;">
            Zero-horizontal-overflow design across 360px to 1440px viewports; touch-safe min 44px tap targets.
          </p>
          <div style="display: flex; flex-wrap: gap; gap: 1.5mm;">
            <span class="badge">Fluid Clamp Typography</span>
            <span class="badge">Tailwind Grid &amp; Flex</span>
            <span class="badge">prefers-reduced-motion</span>
          </div>
        </div>

        <!-- Category 6: Frontend Engineering -->
        <div class="card card-highlight">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">06. Frontend Codebase</span>
            <span class="badge badge-red">React 18 &bull; TypeScript</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 2.5mm;">
            Writing type-safe, reusable component architectures with clean state management and REST API integration.
          </p>
          <div style="display: flex; flex-wrap: gap; gap: 1.5mm;">
            <span class="badge">React 18</span>
            <span class="badge">TypeScript</span>
            <span class="badge">Next.js</span>
            <span class="badge">Tailwind CSS</span>
            <span class="badge">SAPUI5</span>
            <span class="badge">Angular</span>
          </div>
        </div>

      </div>

      <!-- Category 7: Enterprise Backend & Cloud Toolchain Banner -->
      <div class="card" style="margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <span class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">07. Backend, Data &amp; Enterprise Cloud Stack</span>
          <span class="badge">Full-Stack Competency</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; font-size: 8px;">
          <div>
            <div style="color: #d3121f; font-weight: 700; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">ENTERPRISE SAP</div>
            <div style="color: #a0a0a0;">SAP S/4HANA Cloud (PP/PPC), SAP BTP, OData V2/V4, SAP Fiori Launchpad.</div>
          </div>
          <div>
            <div style="color: #d3121f; font-weight: 700; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">APIS &amp; PYTHON</div>
            <div style="color: #a0a0a0;">FastAPI, Python, Node.js, Express, RESTful APIs, JWT Auth, RBAC.</div>
          </div>
          <div>
            <div style="color: #d3121f; font-weight: 700; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">DATABASES</div>
            <div style="color: #a0a0a0;">PostgreSQL, MongoDB, MySQL, Redis Caching, JSON Schema Contracts.</div>
          </div>
          <div>
            <div style="color: #d3121f; font-weight: 700; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">DEV TOOLS &amp; CI/CD</div>
            <div style="color: #a0a0a0;">Git, GitHub, Vercel CI/CD, VS Code, Postman, Vite, esbuild, Chrome DevTools.</div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 03 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 4: PROJECT SHOWCASE                                           -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>04 // PRODUCTION PROJECT PORTFOLIO</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">SELECTED WORKS</div>
        <h2 class="section-title">ENTERPRISE APPLICATIONS &amp; SYSTEMS</h2>
        <p class="section-subtitle">Real-world production platforms built to solve operational inefficiencies through thoughtful interaction design.</p>
      </div>

      <!-- 3 Featured Projects Showcase Cards -->
      <div style="display: flex; flex-direction: column; gap: 4.5mm;">
        
        <!-- Project 1: SAP Prognos -->
        <div class="card card-highlight" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5mm; align-items: center;">
          <div>
            <div style="display: flex; gap: 2mm; align-items: center; margin-bottom: 1.5mm;">
              <span class="font-anton" style="font-size: 16px; color: #d3121f;">01</span>
              <h3 class="font-anton" style="font-size: 14px; color: #fff; text-transform: uppercase;">
                SAP Prognos: AI Demand Forecasting Platform
              </h3>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888; margin-bottom: 2.5mm;">
              ROLE: LEAD UX/UI &amp; FRONTEND &bull; SAPUI5, FASTAPI, PROPHET, XGBOOST
            </div>
            <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 3mm;">
              Designed and engineered an enterprise predictive analytics dashboard comparing Prophet and XGBoost forecast models. Replaced opaque Python scripts with an intuitive 3-stage visual interface, cutting weekly planning duration by 34%.
            </p>
            <div style="display: flex; gap: 2mm;">
              <span class="badge badge-red">SUS 88/100 (Grade A)</span>
              <span class="badge badge-green">-34% Task Duration</span>
              <span class="badge">Live on Vercel</span>
            </div>
          </div>
          <div style="height: 38mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a;">
            <img src="{sap_b64}" alt="SAP Prognos Dashboard" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
          </div>
        </div>

        <!-- Project 2: Inventory Pro -->
        <div class="card" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5mm; align-items: center;">
          <div>
            <div style="display: flex; gap: 2mm; align-items: center; margin-bottom: 1.5mm;">
              <span class="font-anton" style="font-size: 16px; color: #d3121f;">02</span>
              <h3 class="font-anton" style="font-size: 14px; color: #fff; text-transform: uppercase;">
                Inventory Pro: Warehouse Management System
              </h3>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888; margin-bottom: 2.5mm;">
              ROLE: UI/UX &amp; SAP DEVELOPER &bull; SAPUI5, FIORI HORIZON, ODATA, SAP BTP
            </div>
            <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 3mm;">
              Redesigned enterprise warehouse picking and stock replenishment workflows. Replaced 40+ dense spreadsheet rows with responsive visual KPI cards and contextual search filters, accelerating task navigation by 30%.
            </p>
            <div style="display: flex; gap: 2mm;">
              <span class="badge badge-green">30% Faster Navigation</span>
              <span class="badge">SAP BTP Deployed</span>
              <span class="badge">OData V2 Sync</span>
            </div>
          </div>
          <div style="height: 38mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; background: #151515; display: flex; flex-direction: column; justify-content: center; padding: 4mm;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; margin-bottom: 1mm;">// SAP FIORI HORIZON KPI TOKENS</div>
            <div style="font-size: 9px; color: #fff; font-weight: 600;">Stock Health Index: 98.4%</div>
            <div style="height: 3px; background: #222; border-radius: 2px; margin: 2mm 0; overflow: hidden;">
              <div style="width: 78%; height: 100%; background: #d3121f;"></div>
            </div>
            <div style="font-size: 7.5px; color: #888;">Live OData telemetry feed synchronized with manufacturing plant inventory counts.</div>
          </div>
        </div>

        <!-- Project 3: ProFlow -->
        <div class="card" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5mm; align-items: center;">
          <div>
            <div style="display: flex; gap: 2mm; align-items: center; margin-bottom: 1.5mm;">
              <span class="font-anton" style="font-size: 16px; color: #d3121f;">03</span>
              <h3 class="font-anton" style="font-size: 14px; color: #fff; text-transform: uppercase;">
                ProFlow: SaaS Project Management Platform
              </h3>
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888; margin-bottom: 2.5mm;">
              ROLE: FULL-STACK &amp; UI DEVELOPER &bull; ANGULAR, NODE.JS, MONGODB, GEMINI AI
            </div>
            <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 3mm;">
              Architected a full-stack SaaS platform featuring role-based access control (RBAC). Integrated Google Gemini API to automate sprint backlog story breakdown and task allocation, reducing sprint planning overhead by 55%.
            </p>
            <div style="display: flex; gap: 2mm;">
              <span class="badge badge-green">+55% Squad Velocity</span>
              <span class="badge">Gemini API AI Agent</span>
              <span class="badge">JWT &amp; RBAC</span>
            </div>
          </div>
          <div style="height: 38mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; background: #141414; padding: 4mm; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888;">
              <span>SPRINT AUTOMATION</span>
              <span style="color: #10b981;">AI ACTIVE</span>
            </div>
            <div style="font-size: 8.5px; color: #bbb; line-height: 1.4;">
              &ldquo;Break down User Story #104 into 4 engineering tasks with estimated story points.&rdquo;
            </div>
            <div style="display: flex; gap: 1.5mm;">
              <span class="badge" style="font-size: 7.5px;">Auto-estimation</span>
              <span class="badge" style="font-size: 7.5px;">Drag-and-Drop Kanban</span>
            </div>
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 04 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 5: DEEP DIVE UX CASE STUDY (SAP PROGNOS)                      -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>05 // FLAGSHIP UX CASE STUDY DEEP DIVE</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">CASE STUDY DEEP DIVE</div>
        <h2 class="section-title">SAP PROGNOS: DEMAND FORECASTING COCKPIT</h2>
        <p class="section-subtitle">An end-to-end 10-step design thinking transformation from manufacturing friction to an accessible analytics cockpit.</p>
      </div>

      <!-- 10-Step Structured Breakdown Grid (5 columns x 2 rows) -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3.5mm; margin-bottom: 4mm;">
        
        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">01</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">Problem Identification</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Plant inventory planners operated across 4 disconnected Excel workbooks and ML terminal scripts. Discrepancies averaged 18% with weekly planning cycles taking 47 minutes.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">02</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">User Research &amp; Inquiry</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Conducted 4 contextual inquiry interviews with supply chain controllers. Revealed that 82% of users felt anxious reading raw mathematical error outputs without visual confidence boundaries.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">03</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">User Persona Modeling</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Formulated primary persona: <em>"Vikram Sharma (38), Lead Inventory Planner"</em>. Goal: Validate procurement schedules without writing Python. Pain point: Lack of side-by-side model contrast.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">04</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">User Journey Mapping</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Mapped end-to-end task flow. Identified 6 redundant confirmation steps in legacy workflow. Streamlined sequence into 3 clean stages: Ingest Data &rarr; Evaluate MAPE Curves &rarr; 1-Click SAP ERP Sync.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">05</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">Information Architecture</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Applied progressive disclosure principles. Clustered 14 dense hyperparameters into 3 adaptive operational presets (Aggressive, Balanced, Conservative), exposing raw tuners only upon user request.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">06</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">Wireframing &amp; Paper Iterations</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Created 8 low-fidelity layout variants. Tested split-screen comparative charting against tabbed navigation; split-screen reduced cognitive context-switching errors by 41% during early paper tests.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">07</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">High-Fidelity UI Design System</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Constructed an accessible design token system adhering to SAP Fiori 3.0 Horizon. Enforced strict 4.5:1 WCAG 2.1 AA color contrast ratios, 8px grid spacing, and dark-mode telemetry palettes.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">08</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">Interactive Prototyping</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Implemented high-fidelity interactive prototype in React &amp; SAPUI5. Configured sub-100ms micro-interactions, spring curves for tooltips, and real-time hover inspection along forecast curves.</p>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">09</span>
            <div style="font-weight: 700; font-size: 10px; color: #fff;">Usability Testing &amp; SUS Evaluation</div>
          </div>
          <p style="font-size: 8px; color: #999; line-height: 1.45;">Conducted standardized usability trials with 6 enterprise participants. Measured task completion rate (100% on trial 1) and evaluated satisfaction via System Usability Scale (SUS): scored 88/100 (Grade A).</p>
        </div>

        <div class="card card-highlight">
          <div style="display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;">
            <span class="badge badge-green">10</span>
            <div style="font-weight: 700; font-size: 10px; color: #10b981;">Final Solution &amp; Measured Impact</div>
          </div>
          <p style="font-size: 8px; color: #e5e5e5; line-height: 1.45;">Weekly forecasting workflow dropped from 47 min to 31 min (<strong>34% speedup</strong>). Deployed production web app on Vercel with automated FastAPI telemetry backend.</p>
        </div>

      </div>

      <!-- Live Dashboard Proof Banner -->
      <div class="card" style="padding: 2.5mm 4mm; display: flex; justify-content: space-between; align-items: center; border-color: rgba(211,18,31,0.5);">
        <div style="display: flex; gap: 3mm; align-items: center;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700;">LIVE PLATFORM:</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #fff;">https://sap-forecast.vercel.app</span>
        </div>
        <div style="display: flex; gap: 3mm; font-family: 'JetBrains Mono', monospace; font-size: 8px;">
          <span style="color: #10b981;">&bull; 88/100 SUS SCORE</span>
          <span style="color: #ff4d5a;">&bull; 34% WORKFLOW SPEEDUP</span>
        </div>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 05 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 6: DESIGN PROCESS & WORKFLOW DIAGRAM                          -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>06 // DESIGN METHODOLOGY &amp; WORKFLOW</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">METHODOLOGY</div>
        <h2 class="section-title">THE 7-STAGE HUMAN-CENTERED FRAMEWORK</h2>
        <p class="section-subtitle">How I take an ambiguous enterprise requirement from discovery and research to production-ready design tokens.</p>
      </div>

      <!-- 7 Horizontal Process Rows -->
      <div style="display: flex; flex-direction: column; gap: 2.8mm; margin-bottom: auto;">
        
        <!-- Stage 1 -->
        <div class="card" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #d3121f;">01 // RES</div>
          <div style="font-weight: 700; font-size: 10px; color: #fff;">Research &amp; Empathize</div>
          <div style="font-size: 8px; color: #888; line-height: 1.4;">Contextual inquiry, user shadowing, pain point aggregation, competitive auditing.</div>
          <div class="badge" style="text-align: center; font-size: 7.5px;">Problem Statement Canvas</div>
        </div>

        <!-- Stage 2 -->
        <div class="card" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #d3121f;">02 // DEF</div>
          <div style="font-weight: 700; font-size: 10px; color: #fff;">Define &amp; Model</div>
          <div style="font-size: 8px; color: #888; line-height: 1.4;">Synthesizing research data into behavioral user personas, empathy maps, and key friction matrices.</div>
          <div class="badge" style="text-align: center; font-size: 7.5px;">Behavioral Personas</div>
        </div>

        <!-- Stage 3 -->
        <div class="card" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #d3121f;">03 // IDE</div>
          <div style="font-weight: 700; font-size: 10px; color: #fff;">Ideate &amp; Structure</div>
          <div style="font-size: 8px; color: #888; line-height: 1.4;">Information architecture restructuring, user journey mapping, and eliminating task redundancies.</div>
          <div class="badge" style="text-align: center; font-size: 7.5px;">User Journey Map</div>
        </div>

        <!-- Stage 4 -->
        <div class="card" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #d3121f;">04 // WIR</div>
          <div style="font-weight: 700; font-size: 10px; color: #fff;">Wireframing &amp; Flow</div>
          <div style="font-size: 8px; color: #888; line-height: 1.4;">Rapid low-fi paper sketching to validate progressive disclosure before writing UI code.</div>
          <div class="badge" style="text-align: center; font-size: 7.5px;">Lo-Fi Wireframe Decks</div>
        </div>

        <!-- Stage 5 -->
        <div class="card card-highlight" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #d3121f;">05 // DES</div>
          <div style="font-weight: 700; font-size: 10px; color: #fff;">UI Design &amp; Tokens</div>
          <div style="font-size: 8px; color: #aaa; line-height: 1.4;">Figma atomic component libraries, typography scale, 8px layout grid, WCAG 2.1 AA accessibility contrast.</div>
          <div class="badge badge-red" style="text-align: center; font-size: 7.5px;">Design Token Specs</div>
        </div>

        <!-- Stage 6 -->
        <div class="card card-highlight" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #d3121f;">06 // PRO</div>
          <div style="font-weight: 700; font-size: 10px; color: #fff;">Prototyping &amp; Code</div>
          <div style="font-size: 8px; color: #aaa; line-height: 1.4;">Connecting interactive states in Figma and React; calibrating Framer Motion spring physics under 100ms.</div>
          <div class="badge badge-red" style="text-align: center; font-size: 7.5px;">Clickable Prototypes</div>
        </div>

        <!-- Stage 7 -->
        <div class="card" style="display: grid; grid-template-columns: 22mm 45mm 1fr 40mm; gap: 3mm; align-items: center; padding: 2.5mm 4mm;">
          <div class="font-anton" style="font-size: 16px; color: #10b981;">07 // VAL</div>
          <div style="font-weight: 700; font-size: 10px; color: #10b981;">Usability Validation</div>
          <div style="font-size: 8px; color: #888; line-height: 1.4;">Unmoderated test sessions, cognitive walkthroughs, System Usability Scale (SUS) benchmarking.</div>
          <div class="badge badge-green" style="text-align: center; font-size: 7.5px;">SUS Evaluation Audit</div>
        </div>

      </div>

      <!-- Core Quality Principles Banner -->
      <div class="card" style="margin-top: 4mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm;">
        <div>
          <div style="font-size: 8.5px; font-weight: 700; color: #d3121f; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">CONTINUOUS FEEDBACK</div>
          <div style="font-size: 8px; color: #888;">Design decisions are iteratively validated against real user task time, avoiding designer confirmation bias.</div>
        </div>
        <div>
          <div style="font-size: 8.5px; font-weight: 700; color: #d3121f; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">ACCESSIBLE FIRST</div>
          <div style="font-size: 8px; color: #888;">Ensuring high-contrast dark mode readability and complete keyboard navigation compliance across all forms.</div>
        </div>
        <div>
          <div style="font-size: 8.5px; font-weight: 700; color: #d3121f; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">ZERO SPEC DRIFT</div>
          <div style="font-size: 8px; color: #888;">Figma tokens match CSS custom properties 1:1, preventing visual drift during frontend implementation.</div>
        </div>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 06 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 7: UI DESIGN & FRONTEND ENGINEERING                           -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>07 // THE DESIGN-TO-CODE BRIDGE</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">ENGINEERING EXECUTION</div>
        <h2 class="section-title">CONNECTING DESIGN WITH MODERN FRONTEND</h2>
        <p class="section-subtitle">Why Demandbase benefits from a hybrid engineer who speaks fluent Figma and writes robust production TypeScript.</p>
      </div>

      <!-- 4 Core Pillars of Technical UI Engineering -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 4mm;">
        
        <div class="card card-highlight">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <div class="font-anton" style="font-size: 13px; color: #fff;">01. Atomic Component Architecture</div>
            <span class="badge badge-red">React 18</span>
          </div>
          <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 2mm;">
            Structuring code along Atomic Design principles: Atoms (Buttons, Badges), Molecules (Stat Cards, Input Controls), and Organisms (Interactive Forecast Cockpits). Ensures maximum modular reusability and isolated unit testing.
          </p>
          <div class="badge" style="font-size: 7.5px;">Zero prop drilling &bull; Strict TypeScript interfaces</div>
        </div>

        <div class="card card-highlight">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <div class="font-anton" style="font-size: 13px; color: #fff;">02. Design Token Synchronization</div>
            <span class="badge badge-red">Tailwind CSS</span>
          </div>
          <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 2mm;">
            Figma color variables and spacing scales map directly to Tailwind config presets and CSS Custom Properties (<code style="color: #d3121f;">--bg</code>, <code style="color: #d3121f;">--red</code>, <code style="color: #d3121f;">--line</code>). Eliminates visual discrepancies between design specs and live DOM.
          </p>
          <div class="badge" style="font-size: 7.5px;">Consistent 8px spacing rhythm &bull; Semantic tokens</div>
        </div>

        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <div class="font-anton" style="font-size: 13px; color: #fff;">03. 60 FPS Motion &amp; Touch Safety</div>
            <span class="badge">Framer Motion</span>
          </div>
          <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 2mm;">
            Animations utilize GPU-accelerated transforms (<code style="color: #fff;">translate3d</code>, <code style="color: #fff;">scale</code>, <code style="color: #fff;">opacity</code>) with custom cubic-bezier <code style="color: #d3121f;">[0.22, 1, 0.36, 1]</code>. Mouse parallax and 3D tilts gracefully disable on touch devices to conserve battery.
          </p>
          <div class="badge" style="font-size: 7.5px;">prefers-reduced-motion &bull; Zero layout jank</div>
        </div>

        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
            <div class="font-anton" style="font-size: 13px; color: #fff;">04. Responsive Breakpoint Optimization</div>
            <span class="badge">Mobile to Desktop</span>
          </div>
          <p style="font-size: 8.5px; color: #a0a0a0; line-height: 1.5; margin-bottom: 2mm;">
            Audited across 360px, 390px, 768px, and 1440px viewports. Incorporates fluid typography clamps (<code style="color: #fff;">clamp(44px, 10vw, 98px)</code>) and strict <code style="color: #d3121f;">overflow-x: clip</code> rules to guarantee zero horizontal scroll bugs.
          </p>
          <div class="badge" style="font-size: 7.5px;">Min 44px tap targets &bull; Viewport-fit safe areas</div>
        </div>

      </div>

      <!-- Concrete Code Example Card -->
      <div class="card" style="background: #080808; border-color: #262626; margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700;">// PRODUCTION REACT 18 + FRAMER MOTION PATTERN</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #666;">src/lib/motion.ts</span>
        </div>
        <pre style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #bbb; line-height: 1.45; background: #0c0c0c; padding: 2.5mm 3.5mm; border-radius: 4px; border: 1px solid #1a1a1a; overflow: hidden;">
export const ease = [0.22, 1, 0.36, 1] as const; // Apple Expo Out
export const fadeUp = {{
  hidden: {{ opacity: 0, y: 24, filter: 'blur(6px)' }},
  show: {{ opacity: 1, y: 0, filter: 'blur(0px)', transition: {{ duration: 0.8, ease }} }},
}};
export const springTransition = {{ type: 'spring', stiffness: 350, damping: 25 }};</pre>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 07 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 8: ADDITIONAL WORK & EXPERIMENTAL LAB                         -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>08 // ADDITIONAL PLATFORMS &amp; LAB WORK</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">EXPLORATION &amp; SYSTEMS</div>
        <h2 class="section-title">ADDITIONAL SYSTEMS, INTERFACES &amp; PROTOTYPES</h2>
        <p class="section-subtitle">Real-time emergency telemetry, full-stack prototypes, and human-machine interface experiments.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 4mm;">
        
        <!-- Additional Project 1: DisasterLink -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2mm;">
            <div class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">
              DisasterLink: Real-Time Crisis Response
            </div>
            <span class="badge badge-red">Next.js &bull; Express</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 3mm;">
            Full-stack crisis management platform connecting survivors, field relief teams, and emergency dispatchers via live mapping and low-bandwidth SOS notifications.
          </p>
          <div style="background: #141414; padding: 2.5mm; border-radius: 4px; border: 1px solid #222; margin-bottom: 2.5mm;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #d3121f; margin-bottom: 1mm;">KEY UX CHALLENGE:</div>
            <div style="font-size: 8px; color: #aaa;">Designing for low-bandwidth 2G environments with high visual contrast for direct sunlight readability.</div>
          </div>
          <div style="display: flex; gap: 1.5mm;">
            <span class="badge" style="font-size: 7.5px;">PostgreSQL</span>
            <span class="badge" style="font-size: 7.5px;">TypeScript</span>
            <span class="badge" style="font-size: 7.5px;">Live Geolocation</span>
          </div>
        </div>

        <!-- Additional Project 2: Hardware Telemetry -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2mm;">
            <div class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">
              Robotics Telemetry Simulator
            </div>
            <span class="badge">Hardware HMI</span>
          </div>
          <p style="font-size: 8.5px; color: #888; line-height: 1.45; margin-bottom: 3mm;">
            Tactical simulation cockpit displaying kinematic motor angles, battery drain telemetry, and live camera feed diagnostics for robotic prototypes.
          </p>
          <div style="height: 25mm; border-radius: 4px; overflow: hidden; border: 1px solid #222; margin-bottom: 2.5mm;">
            <img src="{robot_b64}" alt="Robotics Simulator" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="display: flex; gap: 1.5mm;">
            <span class="badge" style="font-size: 7.5px;">Real-Time Kinematics</span>
            <span class="badge" style="font-size: 7.5px;">Sensor Dashboard</span>
          </div>
        </div>

      </div>

      <!-- UI Design Lab & Micro-interaction Experiments -->
      <div class="card card-highlight" style="margin-top: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5mm;">
          <div class="font-anton" style="font-size: 13px; color: #fff; text-transform: uppercase;">
            Interactive Micro-Interaction Lab (In Production Portfolio)
          </div>
          <span class="badge badge-red">Live Production Code</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm;">
          <div>
            <div style="font-size: 8.5px; font-weight: 700; color: #fff; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
              CONTEXTUAL CURSOR
            </div>
            <div style="font-size: 8px; color: #888; line-height: 1.4;">Custom follower cursor dynamically expands into contextual labels (<code style="color: #d3121f;">VIEW</code>, <code style="color: #d3121f;">DRAG</code>, <code style="color: #d3121f;">CLICK</code>) based on hover target.</div>
          </div>
          <div>
            <div style="font-size: 8.5px; font-weight: 700; color: #fff; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
              TRANSFORMATION SLIDER
            </div>
            <div style="font-size: 8px; color: #888; line-height: 1.4;">Interactive draggable comparison slider contrasting legacy fragmented Excel sheets directly against SAP Fiori Horizon cockpits.</div>
          </div>
          <div>
            <div style="font-size: 8.5px; font-weight: 700; color: #fff; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
              PROGRESS TIMELINE
            </div>
            <div style="font-size: 8px; color: #888; line-height: 1.4;">Vertical scroll-filling glowing crimson line that dynamically illuminates milestone nodes as the recruiter scrolls down.</div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 08 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 9: CONTACT, VERIFICATION & CLOSING STATEMENT                  -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>09 // VERIFICATION &amp; DIRECT CONNECTION</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">CONNECTION &amp; VERIFICATION</div>
        <h2 class="section-title">LET'S BUILD EXCEPTIONAL ENTERPRISE UI</h2>
        <p class="section-subtitle">Prepared for the Demandbase Campus Interview &bull; Parul University Placement Drive 2026/2027.</p>
      </div>

      <!-- Demandbase Closing Statement -->
      <div class="card card-highlight" style="margin-bottom: 5mm; padding: 5mm 6mm;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #d3121f; font-weight: 700; text-transform: uppercase; margin-bottom: 2mm;">
          STATEMENT OF INTEREST FOR DEMANDBASE
        </div>
        <p style="font-size: 10px; color: #e5e5e5; line-height: 1.6; margin-bottom: 3mm;">
          &ldquo;Modern B2B marketing and sales platforms succeed or fail based on how effortlessly users can extract insight from overwhelming volumes of data. My background—unifying human-centered research, strict enterprise design systems like SAP Fiori, and production-grade React 18/TypeScript code—directly aligns with Demandbase&rsquo;s vision of delivering best-in-class UI/UX. I am eager to contribute immediately to your frontend engineering squad.&rdquo;
        </p>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #888;">
          &mdash; <strong style="color: #fff;">Anand Jadhav</strong>, Candidate for UI / Frontend Engineer
        </div>
      </div>

      <!-- 2-Column: Contact Details & Vector QR Code -->
      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5mm; margin-bottom: auto;">
        
        <!-- Contact List -->
        <div class="card" style="display: flex; flex-direction: column; gap: 3.5mm;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #d3121f; font-weight: 700; text-transform: uppercase;">
            DIRECT CONTACT DOSSIER
          </div>

          <div style="display: flex; flex-direction: column; gap: 2.5mm; font-size: 9px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
              <span style="color: #666; font-family: 'JetBrains Mono', monospace;">EMAIL:</span>
              <span style="color: #fff; font-weight: 600;">anandjadhav42004@gmail.com</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
              <span style="color: #666; font-family: 'JetBrains Mono', monospace;">PHONE:</span>
              <span style="color: #fff; font-weight: 600;">+91 83080 08154</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
              <span style="color: #666; font-family: 'JetBrains Mono', monospace;">LOCATION:</span>
              <span style="color: #fff; font-weight: 600;">Vadodara, Gujarat, India</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
              <span style="color: #666; font-family: 'JetBrains Mono', monospace;">LINKEDIN:</span>
              <span style="color: #d3121f; font-weight: 600;">linkedin.com/in/anand-jadhav-b599801b5</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
              <span style="color: #666; font-family: 'JetBrains Mono', monospace;">GITHUB:</span>
              <span style="color: #d3121f; font-weight: 600;">github.com/anandjadhav42004</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666; font-family: 'JetBrains Mono', monospace;">LIVE WEB:</span>
              <span style="color: #fff; font-weight: 600;">github.com/anandjadhav42004/portfolio</span>
            </div>
          </div>
        </div>

        <!-- QR Code & Academic Credentials -->
        <div class="card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 4mm;">
          
          <!-- Vector QR Code representation -->
          <div style="width: 32mm; height: 32mm; background: #ffffff; padding: 2.5mm; border-radius: 6px; margin-bottom: 2.5mm;">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; fill: #0a0a0a;">
              <!-- Outer Markers -->
              <rect x="0" y="0" width="30" height="30" fill="#0a0a0a" />
              <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
              <rect x="10" y="10" width="10" height="10" fill="#0a0a0a" />

              <rect x="70" y="0" width="30" height="30" fill="#0a0a0a" />
              <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
              <rect x="80" y="10" width="10" height="10" fill="#0a0a0a" />

              <rect x="0" y="70" width="30" height="30" fill="#0a0a0a" />
              <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
              <rect x="10" y="80" width="10" height="10" fill="#0a0a0a" />

              <!-- Interior Data Modules -->
              <rect x="35" y="5" width="8" height="8" />
              <rect x="48" y="5" width="6" height="6" />
              <rect x="58" y="12" width="6" height="6" />
              <rect x="35" y="20" width="6" height="6" />
              <rect x="48" y="24" width="8" height="8" />
              <rect x="40" y="38" width="20" height="20" fill="#d3121f" />
              <rect x="45" y="43" width="10" height="10" fill="#ffffff" />
              <rect x="5" y="40" width="6" height="6" />
              <rect x="18" y="45" width="8" height="8" />
              <rect x="75" y="38" width="6" height="6" />
              <rect x="85" y="48" width="8" height="8" />
              <rect x="35" y="70" width="8" height="8" />
              <rect x="48" y="75" width="6" height="6" />
              <rect x="62" y="70" width="10" height="10" />
              <rect x="80" y="80" width="6" height="6" />
              <rect x="70" y="88" width="8" height="8" />
            </svg>
          </div>

          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; text-transform: uppercase;">
            SCAN TO OPEN LIVE PORTFOLIO
          </div>
          <div style="font-size: 7.5px; color: #777; margin-top: 1mm;">
            Optimized for Mobile &amp; Desktop Review
          </div>

        </div>

      </div>

      <!-- Placement Verification Seal -->
      <div style="border-top: 1px solid #1f1f1f; padding-top: 3.5mm; display: flex; justify-content: space-between; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #666;">
        <div>
          PARUL INSTITUTE OF TECHNOLOGY &bull; TRAINING &amp; PLACEMENT CELL
        </div>
        <div>
          STUDENT ENROLLMENT: <strong style="color: #fff;">2303031570026</strong>
        </div>
        <div style="color: #d3121f; font-weight: 700;">
          PAGE 09 / 09
        </div>
      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">END OF DOSSIER</span>
      </div>

    </div>
  </div>

</body>
</html>
"""
    return html

def main():
    base_dir = "/Users/anand/Desktop/portflio/portfolio"
    out_dir = f"{base_dir}/Demandbase_Portfolio_Submission"
    src_dir = f"{out_dir}/Portfolio_Source_Files"
    os.makedirs(src_dir, exist_ok=True)

    html_content = generate_html()
    html_file = f"{src_dir}/Anand_Jadhav_UIUX_Portfolio_Document.html"
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"HTML source document written to {html_file}")

if __name__ == '__main__':
    main()
