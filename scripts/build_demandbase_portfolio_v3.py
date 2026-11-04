#!/usr/bin/env python3
"""
Demandbase UI/UX Designer & Frontend Engineer Portfolio PDF Generator (v3 Final Refined)
Generates an award-winning, editorial A4 Landscape (297mm x 210mm) 9-page portfolio PDF
with authentic resume metrics, genuine screenshots, visual case study storytelling,
interactive component tokens, high-contrast readable text, and a verified scannable QR code.
"""

import os
import base64

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as f:
            encoded = base64.b64encode(f.read()).decode('utf-8')
            ext = os.path.splitext(image_path)[1].replace('.', '').lower()
            if ext == 'jpg': ext = 'jpeg'
            return f"data:image/{ext};base64,{encoded}"
    return ""

def get_file_content(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    return ""

def build_portfolio_html():
    base_dir = "/Users/anand/Desktop/portflio/portfolio"
    portrait_b64 = get_base64_image(f"{base_dir}/public/anand_profile.jpg")
    sap_b64 = get_base64_image(f"{base_dir}/public/sap_prognos_dashboard.jpg")
    kanban_b64 = get_base64_image(f"{base_dir}/external/portfolio-v2/public/images/projects/kanbanDark.webp")
    table_b64 = get_base64_image(f"{base_dir}/external/portfolio-v2/public/images/projects/covidTrackerTable.webp")
    robot_b64 = get_base64_image(f"{base_dir}/public/r2_proto_sim.jpg")

    qr_svg_path = f"{base_dir}/Demandbase_Portfolio_Submission/Portfolio_Source_Files/live_portfolio_qr.svg"
    qr_svg_content = get_file_content(qr_svg_path)
    if "<?xml" in qr_svg_content:
        qr_svg_content = qr_svg_content.split("?>", 1)[-1].strip()

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Anand Jadhav — UI/UX Designer & Frontend Engineer Portfolio (Demandbase v3 Final)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page {{
    size: 297mm 210mm;
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
  
  /* A4 Landscape Page: 297mm x 210mm */
  .page {{
    width: 297mm;
    height: 210mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    overflow: hidden;
    background: #0a0a0a;
    padding: 12mm 16mm 10mm 16mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  
  /* Subtle Engineering Grid Background */
  .grid-bg {{
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 30px 30px;
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

  /* Top Running Header */
  .page-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1f1f1f;
    padding-bottom: 2.5mm;
    margin-bottom: 3.5mm;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.16em;
    color: #888888;
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
    padding-top: 2.5mm;
    margin-top: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5px;
    letter-spacing: 0.14em;
    color: #777777;
    text-transform: uppercase;
  }}
  .page-footer .pg-num {{
    color: #ffffff;
    font-weight: 700;
  }}
  .page-footer .demandbase-tag {{
    color: #d3121f;
  }}

  /* Typography Scale */
  .font-anton {{
    font-family: 'Anton', sans-serif;
    letter-spacing: 0.03em;
  }}
  .font-space {{
    font-family: 'Space Grotesk', sans-serif;
  }}
  .font-mono {{
    font-family: 'JetBrains Mono', monospace;
  }}
  .text-red {{
    color: #d3121f;
  }}
  .text-muted {{
    color: #c5c5c5;
  }}

  /* Section Intro Headers */
  .section-intro {{
    margin-bottom: 3.5mm;
  }}
  .section-tag {{
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #ff4d5a;
    background: rgba(211, 18, 31, 0.12);
    border: 1px solid rgba(211, 18, 31, 0.35);
    padding: 2px 7px;
    border-radius: 4px;
    margin-bottom: 1.5mm;
  }}
  .section-title {{
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    color: #ffffff;
    line-height: 1.1;
  }}
  .section-subtitle {{
    font-size: 8.8px;
    color: #b0b0b0;
    margin-top: 1mm;
    line-height: 1.35;
  }}

  /* Surface Cards */
  .card {{
    background: #111111;
    border: 1px solid #222222;
    border-radius: 8px;
    padding: 3.5mm 4.5mm;
  }}
  .card-highlight {{
    border-color: rgba(211, 18, 31, 0.45);
    background: linear-gradient(145deg, #160c0d, #0f0f0f);
  }}

  /* Pills & Badges */
  .badge {{
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5px;
    font-weight: 600;
    text-transform: uppercase;
    background: #181818;
    border: 1px solid #2a2a2a;
    color: #b5b5b5;
  }}
  .badge-red {{
    background: rgba(211, 18, 31, 0.15);
    border-color: rgba(211, 18, 31, 0.45);
    color: #ff4d5a;
  }}
  .badge-green {{
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.45);
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
  <!-- PAGE 1: HERO & COVER (A4 LANDSCAPE)                                -->
  <!-- =================================================================== -->
  <div class="page" style="padding: 12mm 18mm;">
    <div class="grid-bg"></div>
    <div class="content-wrap" style="justify-content: space-between;">
      
      <!-- Top Dossier Meta -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #1f1f1f; padding-bottom: 2.5mm;">
        <div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.2em; color: #d3121f; font-weight: 700; text-transform: uppercase;">
            CAMPUS PLACEMENT DOSSIER // 2026-2027
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; letter-spacing: 0.12em; color: #888; text-transform: uppercase; margin-top: 0.8mm;">
            PARUL UNIVERSITY &bull; ENROLLMENT: 2303031570026
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.18em; color: #ffffff; font-weight: 700; text-transform: uppercase;">
            APPLICATION FOR DEMANDBASE
          </div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; letter-spacing: 0.12em; color: #d3121f; text-transform: uppercase; margin-top: 0.8mm;">
            ROLE: UI / FRONTEND ENGINEER
          </div>
        </div>
      </div>

      <!-- Center Widescreen Layout: Editorial Left (58%) + Portrait Right (42%) -->
      <div style="display: grid; grid-template-columns: 1.25fr 0.85fr; gap: 8mm; align-items: center; margin: auto 0;">
        
        <div>
          <div class="section-tag" style="margin-bottom: 3.5mm;">
            UI/UX DESIGN &bull; FRONTEND ENGINEERING
          </div>
          
          <h1 class="font-anton" style="font-size: 58px; line-height: 0.92; text-transform: uppercase; color: #ffffff; margin-bottom: 3mm;">
            ANAND <span style="color: #d3121f;">JADHAV</span>
          </h1>

          <!-- Role in Prominent Red and White -->
          <div style="font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.05em; color: #ff4d5a; text-transform: uppercase; margin-bottom: 4mm;">
            UI/UX DESIGNER &bull; FRONTEND ENGINEER
          </div>

          <!-- Concise, Authentic Professional Summary -->
          <div style="font-size: 9.8px; color: #dcdcdc; line-height: 1.6; max-width: 95%; margin-bottom: 5.5mm;">
            Designing and engineering responsive, user-friendly enterprise interfaces with React 18, TypeScript, and SAPUI5. Experienced in reducing task navigation friction, translating complex multidimensional data into clear KPI cockpits, and writing clean, component-driven production code.
          </div>

          <!-- Core Real Credentials Grid (Strictly from verified resume) -->
          <div style="display: flex; gap: 3.5mm; flex-wrap: wrap;">
            <div class="card card-highlight" style="padding: 2.5mm 4mm; text-align: left;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7px; color: #ff4d5a; text-transform: uppercase;">Current Role</div>
              <div style="font-weight: 700; font-size: 9px; color: #fff; margin-top: 0.5mm;">Hilti Manufacturing India</div>
              <div style="font-size: 7.5px; color: #aaa;">SAP S/4HANA Cloud (PPC)</div>
            </div>
            <div class="card" style="padding: 2.5mm 4mm; text-align: left;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7px; color: #d3121f; text-transform: uppercase;">Documented UX Metric</div>
              <div style="font-weight: 700; font-size: 9px; color: #fff; margin-top: 0.5mm;">-30% Task Navigation Time</div>
              <div style="font-size: 7.5px; color: #aaa;">Inventory Pro Redesign</div>
            </div>
            <div class="card" style="padding: 2.5mm 4mm; text-align: left;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7px; color: #10b981; text-transform: uppercase;">Verified Live Demo</div>
              <div style="font-weight: 700; font-size: 9px; color: #fff; margin-top: 0.5mm;">SAP Prognos Platform</div>
              <div style="font-size: 7.5px; color: #aaa;">sap-forecast.vercel.app</div>
            </div>
          </div>
        </div>

        <!-- Right: Studio Portrait in Editorial Frame -->
        <div style="display: flex; justify-content: center;">
          <div style="position: relative; width: 68mm; height: 112mm; border-radius: 12px; overflow: hidden; border: 1.5px solid rgba(211, 18, 31, 0.45); box-shadow: 0 15px 40px rgba(0,0,0,0.85), 0 0 30px rgba(211,18,31,0.25);">
            <img src="{portrait_b64}" alt="Anand Jadhav" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 35%; background: linear-gradient(to top, rgba(10,10,10,0.95), transparent);"></div>
            <div style="position: absolute; bottom: 3mm; left: 3.5mm; right: 3.5mm; display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700;">ANAND JADHAV</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 7px; color: #ccc;">UI/UX &bull; FRONTEND ENGINEER</div>
              </div>
              <span class="badge badge-red" style="font-size: 6.5px;">2026/2027</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Cover Footer with Clickable Live Portfolio Link -->
      <div style="border-top: 1px solid #1f1f1f; padding-top: 2.5mm; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #888;">
        <div>
          LIVE PORTFOLIO: <a href="https://portfolio-eosin-seven-23.vercel.app" target="_blank" style="color: #ff4d5a; font-weight: 700; text-decoration: underline;">portfolio-eosin-seven-23.vercel.app</a>
        </div>
        <div>EMAIL: <a href="mailto:anandjadhav42004@gmail.com" style="color: #fff;">anandjadhav42004@gmail.com</a></div>
        <div>PHONE: <a href="tel:+918308008154" style="color: #fff;">+91 83080 08154</a></div>
        <div style="color: #d3121f; font-weight: 700;">PAGE 01 / 09</div>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 2: ABOUT ME & EXPERIENCE TIMELINE (A4 LANDSCAPE)               -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>02 // PROFESSIONAL JOURNEY &amp; PHILOSOPHY</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">JOURNEY &amp; VALUES</div>
        <h2 class="section-title">THE DESIGNER WHO UNDERSTANDS CODE</h2>
        <p class="section-subtitle">Bridging shopfloor user empathy with modern component-driven frontend architecture.</p>
      </div>

      <!-- 3-Column Balanced Landscape Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1.15fr 0.85fr; gap: 4.5mm; margin-bottom: auto;">
        
        <!-- Column 1: Narrative & Philosophy -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4mm 5mm;">
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 2mm;">
              DESIGN PHILOSOPHY
            </div>
            <p style="font-size: 8.5px; color: #b8b8b8; line-height: 1.55; margin-bottom: 3mm;">
              Enterprise B2B software handles vast arrays of data, but it should never feel punishing to use. I design with <strong style="color: #fff;">progressive disclosure</strong>—shielding users from cognitive overload by surfacing critical telemetry first, with depth available on demand.
            </p>
            <p style="font-size: 8.5px; color: #b8b8b8; line-height: 1.55;">
              My core strength is serving as an <strong style="color: #d3121f;">uncompromising bridge</strong> between design and engineering: translating Figma tokens into production React 18 code with zero visual drift.
            </p>
          </div>
          <div style="background: #161616; padding: 2.5mm 3.5mm; border-radius: 6px; border: 1px solid #262626; margin-top: 3mm;">
            <div style="font-size: 8px; color: #fff; font-weight: 600;">&ldquo;Good design in B2B is invisible efficiency.&rdquo;</div>
            <div style="font-size: 7px; color: #aaa; font-family: 'JetBrains Mono', monospace; margin-top: 1mm;">Focused on task duration &amp; error reduction</div>
          </div>
        </div>

        <!-- Column 2: Visual Experience Timeline -->
        <div class="card card-highlight" style="padding: 4mm 5mm;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 3mm;">
            VISUAL EXPERIENCE TIMELINE
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 3.5mm; position: relative;">
            
            <!-- Milestone 1 -->
            <div style="display: flex; gap: 3mm;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 7px; height: 7px; border-radius: 50%; background: #d3121f;"></div>
                <div style="width: 1px; height: 100%; background: #2a2a2a; margin: 1mm 0;"></div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; gap: 4mm;">
                  <span style="font-weight: 700; font-size: 9px; color: #fff;">Hilti Manufacturing India</span>
                  <span class="badge badge-red" style="font-size: 6.5px;">JUL 2026 – PRESENT</span>
                </div>
                <div style="font-size: 7.5px; color: #ff4d5a; font-family: 'JetBrains Mono', monospace;">SAP and IT Intern &bull; PPC Operations</div>
                <div style="font-size: 7.5px; color: #b0b0b0; margin-top: 0.5mm;">Support Production Planning &amp; Control on SAP S/4HANA Cloud at Vadodara plant; analyze operational manufacturing workflows directly with business users.</div>
              </div>
            </div>

            <!-- Milestone 2 -->
            <div style="display: flex; gap: 3mm;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 7px; height: 7px; border-radius: 50%; background: #888;"></div>
                <div style="width: 1px; height: 100%; background: #2a2a2a; margin: 1mm 0;"></div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; gap: 4mm;">
                  <span style="font-weight: 700; font-size: 9px; color: #fff;">UptoSkills</span>
                  <span class="badge" style="font-size: 6.5px;">MAY – AUG 2026</span>
                </div>
                <div style="font-size: 7.5px; color: #bbb; font-family: 'JetBrains Mono', monospace;">Backend Developer Intern &bull; Remote</div>
                <div style="font-size: 7.5px; color: #b0b0b0; margin-top: 0.5mm;">Developed and maintained backend features in a production codebase using Node.js, Express.js, and MongoDB.</div>
              </div>
            </div>

            <!-- Milestone 3 -->
            <div style="display: flex; gap: 3mm;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 7px; height: 7px; border-radius: 50%; background: #888;"></div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; gap: 4mm;">
                  <span style="font-weight: 700; font-size: 9px; color: #fff;">Parul Institute of Technology</span>
                  <span class="badge" style="font-size: 6.5px;">2023 – 2027</span>
                </div>
                <div style="font-size: 7.5px; color: #bbb; font-family: 'JetBrains Mono', monospace;">B.Tech Computer Science (SAP IEP Track)</div>
                <div style="font-size: 7.5px; color: #b0b0b0; margin-top: 0.5mm;">Undergraduate degree in CS with enterprise SAP focus; engineered SAP Prognos and Inventory Pro with measurable navigation improvements.</div>
              </div>
            </div>

          </div>
        </div>

        <!-- Column 3: Academic Merit & Certifications (Strictly Verified) -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4mm 5mm;">
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 2mm;">
              EDUCATION &amp; CERTIFICATIONS
            </div>
            
            <div style="margin-bottom: 2mm;">
              <div style="font-weight: 700; font-size: 8.5px; color: #fff;">B.Tech Computer Science (SAP Track)</div>
              <div style="font-size: 7.5px; color: #aaa;">Parul University (2023–2027)</div>
            </div>

            <div style="margin-bottom: 2mm;">
              <div style="font-weight: 700; font-size: 8.5px; color: #fff;">HSC 12th Science: 94.67%</div>
              <div style="font-size: 7.5px; color: #aaa;">Dayanand Science College, Latur (2021)</div>
            </div>

            <div style="margin-bottom: 2mm;">
              <div style="font-weight: 700; font-size: 8.5px; color: #fff;">SSC 10th CBSE: 75.40%</div>
              <div style="font-size: 7.5px; color: #aaa;">Yashwant International School (2019)</div>
            </div>

            <div style="border-top: 1px solid #1f1f1f; padding-top: 2.5mm; margin-top: 1.5mm;">
              <div style="font-size: 7.5px; font-weight: 700; color: #d3121f; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
                KEY CERTIFICATIONS
              </div>
              <div style="font-size: 7.5px; color: #ccc;">&bull; SAP Certified Associate: ABAP Cloud (2025)</div>
              <div style="font-size: 7.5px; color: #ccc;">&bull; Oracle Cloud Infrastructure AI Foundations</div>
              <div style="font-size: 7.5px; color: #ccc;">&bull; HackerRank Frontend Developer (React)</div>
            </div>
          </div>
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
  <!-- PAGE 3: VISUAL SKILLS & UI DESIGN SYSTEM (A4 LANDSCAPE)             -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>03 // VISUAL COMPETENCY &amp; DESIGN SYSTEM MATRIX</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">TOOLKIT &amp; CRAFT</div>
        <h2 class="section-title">CAPABILITY MATRIX &amp; VISUAL DESIGN ARTIFACTS</h2>
        <p class="section-subtitle">Structured across user-centered design, reusable UI components, design tokens, and production frontend engineering.</p>
      </div>

      <!-- 6 Graphical Cards Layout (Well Distributed) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; margin-bottom: 3.5mm;">
        
        <!-- Card 1: UI Design & Systems -->
        <div class="card card-highlight" style="padding: 3.5mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff;">01 // UI DESIGN</div>
            <span class="badge badge-red">Figma</span>
          </div>
          <p style="font-size: 7.8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
            Crafting tokenized component libraries, typography scales, 8px layout grids, and accessible color ramps.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 1mm;">
            <span class="badge">Figma Components</span>
            <span class="badge">SAP Fiori Horizon</span>
            <span class="badge">8px Grid System</span>
            <span class="badge">Contrast Ratios</span>
          </div>
        </div>

        <!-- Card 2: UX Research -->
        <div class="card" style="padding: 3.5mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff;">02 // UX RESEARCH</div>
            <span class="badge">User-Centered</span>
          </div>
          <p style="font-size: 7.8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
            Analyzing user friction, modeling operational personas, and conducting task flow optimization audits.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 1mm;">
            <span class="badge">User Inquiries</span>
            <span class="badge">Persona Modeling</span>
            <span class="badge">Journey Mapping</span>
            <span class="badge">Heuristic Review</span>
          </div>
        </div>

        <!-- Card 3: Wireframing & IA -->
        <div class="card" style="padding: 3.5mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff;">03 // WIREFRAMING &amp; IA</div>
            <span class="badge">Structure</span>
          </div>
          <p style="font-size: 7.8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
            Progressive disclosure layouts; restructuring complex multi-tier navigation into intuitive decision views.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 1mm;">
            <span class="badge">Lo-Fi Wireframes</span>
            <span class="badge">Spatial Mockups</span>
            <span class="badge">Task Trees</span>
            <span class="badge">Progressive Disclosure</span>
          </div>
        </div>

        <!-- Card 4: Prototyping & Motion -->
        <div class="card" style="padding: 3.5mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff;">04 // MOTION &amp; PROTO</div>
            <span class="badge badge-red">Framer Motion</span>
          </div>
          <p style="font-size: 7.8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
            Implementing natural spring physics, micro-interactions, layout transitions, and feedback loops.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 1mm;">
            <span class="badge">Framer Motion</span>
            <span class="badge">Lenis Smooth Scroll</span>
            <span class="badge">Micro-Interactions</span>
            <span class="badge">Spring Physics</span>
          </div>
        </div>

        <!-- Card 5: Frontend Code -->
        <div class="card card-highlight" style="padding: 3.5mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff;">05 // FRONTEND DEV</div>
            <span class="badge badge-red">React 18 &bull; TS</span>
          </div>
          <p style="font-size: 7.8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
            Writing type-safe, reusable component architectures in React 18, TypeScript, Tailwind CSS, and SAPUI5.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 1mm;">
            <span class="badge">React.js</span>
            <span class="badge">TypeScript</span>
            <span class="badge">Tailwind CSS</span>
            <span class="badge">SAPUI5</span>
            <span class="badge">Next.js</span>
          </div>
        </div>

        <!-- Card 6: Backend & Cloud -->
        <div class="card" style="padding: 3.5mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff;">06 // DATA &amp; APIS</div>
            <span class="badge">Full-Stack</span>
          </div>
          <p style="font-size: 7.8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
            Connecting UI controls with RESTful endpoints, Python telemetry backends, and enterprise cloud data.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 1mm;">
            <span class="badge">FastAPI</span>
            <span class="badge">Python</span>
            <span class="badge">REST APIs</span>
            <span class="badge">PostgreSQL</span>
            <span class="badge">SAP S/4HANA</span>
          </div>
        </div>

      </div>

      <!-- VISUAL UI DESIGN ARTIFACT & REUSABLE COMPONENT SPEC (Fills Lower Space) -->
      <div class="card" style="margin-top: auto; padding: 3mm 4.5mm; background: #0e0e0e; border: 1px solid #252525;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5mm; border-bottom: 1px solid #1c1c1c; padding-bottom: 1.5mm;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700;">VISUAL COMPONENT SYSTEM &amp; DESIGN TOKENS</span>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #aaa;">FIGMA VARIABLES &rarr; TAILWIND CONFIG &rarr; REACT PROPS</span>
        </div>

        <div style="display: grid; grid-template-columns: 1.1fr 1.4fr 1.5fr; gap: 4mm; align-items: center;">
          
          <!-- Column 1: Color Palette Tokens -->
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.2px; color: #ccc; margin-bottom: 1mm;">COLOR TOKENS:</div>
            <div style="display: flex; gap: 2mm; align-items: center;">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 1px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: #0a0a0a; border: 1px solid #333;"></div>
                <span style="font-size: 6px; color: #888; font-family: 'JetBrains Mono';">#0A</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 1px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: #141414; border: 1px solid #333;"></div>
                <span style="font-size: 6px; color: #888; font-family: 'JetBrains Mono';">#14</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 1px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: #d3121f;"></div>
                <span style="font-size: 6px; color: #ff4d5a; font-family: 'JetBrains Mono';">#D3</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 1px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: #ff4d5a;"></div>
                <span style="font-size: 6px; color: #ff4d5a; font-family: 'JetBrains Mono';">#FF</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 1px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: #10b981;"></div>
                <span style="font-size: 6px; color: #10b981; font-family: 'JetBrains Mono';">#10</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 1px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: #ffffff;"></div>
                <span style="font-size: 6px; color: #ccc; font-family: 'JetBrains Mono';">#FF</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Typography Hierarchy -->
          <div style="border-left: 1px solid #202020; padding-left: 3.5mm;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.2px; color: #ccc; margin-bottom: 1mm;">TYPOGRAPHY HIERARCHY:</div>
            <div style="display: flex; flex-direction: column; gap: 1px; font-size: 7px; color: #b5b5b5;">
              <div><strong style="color: #fff; font-family: 'Anton'; font-size: 8px;">ANTON:</strong> Hero &amp; High-Impact Numbers</div>
              <div><strong style="color: #fff; font-family: 'Space Grotesk'; font-size: 7.5px;">SPACE GROTESK:</strong> Section Titles &amp; Headings</div>
              <div><strong style="color: #fff; font-family: 'Inter'; font-size: 7.5px;">INTER:</strong> Accessible UI Labels &amp; Body Copy</div>
              <div><strong style="color: #fff; font-family: 'JetBrains Mono'; font-size: 7.5px;">JETBRAINS MONO:</strong> Telemetry, Code &amp; KPIs</div>
            </div>
          </div>

          <!-- Column 3: Reusable UI Component Elements -->
          <div style="border-left: 1px solid #202020; padding-left: 3.5mm;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.2px; color: #ccc; margin-bottom: 1.5mm;">SAMPLE UI ATOMS (REACT/FIGMA):</div>
            <div style="display: flex; gap: 2mm; align-items: center;">
              <!-- Primary Button -->
              <div style="background: linear-gradient(135deg, #d3121f, #a50e18); color: #fff; font-family: 'Space Grotesk'; font-weight: 700; font-size: 7px; padding: 2px 7px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.2);">
                Run Forecast &rarr;
              </div>
              <!-- Status Pill -->
              <div style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.4); color: #10b981; font-family: 'JetBrains Mono'; font-size: 6.5px; padding: 2px 5px; border-radius: 3px;">
                &bull; Live S/4HANA Sync
              </div>
              <!-- Metric Badge -->
              <div style="background: #181818; border: 1px solid #333; color: #fff; font-family: 'JetBrains Mono'; font-size: 6.5px; padding: 2px 5px; border-radius: 3px;">
                MAPE: <span style="color: #10b981;">4.8%</span>
              </div>
            </div>
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
  <!-- PAGE 4: SELECTED PRODUCTION PROJECTS WITH SCREENSHOTS (A4 LANDSCAPE) -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>04 // PRODUCTION PLATFORM SHOWCASE</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">SELECTED WORKS</div>
        <h2 class="section-title">PRODUCTION PLATFORMS WITH MEASURABLE IMPACT</h2>
        <p class="section-subtitle">Real-world production platforms built, deployed, and verified with measurable task efficiency improvements.</p>
      </div>

      <!-- 3-Column Large Project Showcase with Real Screenshots -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-bottom: auto;">
        
        <!-- Project 1: SAP Prognos -->
        <div class="card card-highlight" style="display: flex; flex-direction: column; justify-content: space-between; padding: 3.5mm;">
          <div>
            <!-- Large Screenshot -->
            <div style="height: 48mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; margin-bottom: 2.5mm;">
              <img src="{sap_b64}" alt="SAP Prognos" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1mm;">
              <span class="font-anton" style="font-size: 13px; color: #fff;">01 // SAP PROGNOS</span>
              <span class="badge badge-red">AI Forecasting</span>
            </div>
            <div style="font-size: 7.5px; color: #ff4d5a; font-family: 'JetBrains Mono', monospace; margin-bottom: 1.5mm;">
              SAPUI5 &bull; FASTAPI &bull; PROPHET &bull; XGBOOST
            </div>
            <p style="font-size: 8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Built a full-stack predictive platform (final year project) with interactive actual-vs-forecast visualizations and role-based dashboard views in SAPUI5; compared XGBoost and Prophet by MAPE.
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 1.5mm; display: flex; justify-content: space-between; font-size: 7.5px; font-family: 'JetBrains Mono', monospace;">
            <span style="color: #10b981;">Dual Model Comparison</span>
            <a href="https://sap-forecast.vercel.app" target="_blank" style="color: #ff4d5a; text-decoration: underline;">sap-forecast.vercel.app</a>
          </div>
        </div>

        <!-- Project 2: Inventory Pro (Real Tabular/KPI Screenshot) -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 3.5mm;">
          <div>
            <!-- Real Tabular KPI Screenshot -->
            <div style="height: 48mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; margin-bottom: 2.5mm;">
              <img src="{table_b64}" alt="Inventory Pro UI" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1mm;">
              <span class="font-anton" style="font-size: 13px; color: #fff;">02 // INVENTORY PRO</span>
              <span class="badge">Warehouse SAP</span>
            </div>
            <div style="font-size: 7.5px; color: #bbb; font-family: 'JetBrains Mono', monospace; margin-bottom: 1.5mm;">
              SAPUI5 &bull; SAP FIORI &bull; ODATA &bull; SAP BTP
            </div>
            <p style="font-size: 8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Developed a warehouse management app (MVC, OData) with KPI dashboards and Excel export; redesigned navigation with custom UI components, cutting task navigation time by 30%.
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 1.5mm; display: flex; justify-content: space-between; font-size: 7.5px; font-family: 'JetBrains Mono', monospace;">
            <span style="color: #10b981;">30% Nav Time Cut</span>
            <span style="color: #ccc;">SAP BTP Deployed</span>
          </div>
        </div>

        <!-- Project 3: ProFlow (Real Kanban SaaS Screenshot) -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 3.5mm;">
          <div>
            <!-- Real Kanban SaaS Screenshot -->
            <div style="height: 48mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; margin-bottom: 2.5mm;">
              <img src="{kanban_b64}" alt="ProFlow Kanban" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1mm;">
              <span class="font-anton" style="font-size: 13px; color: #fff;">03 // PROFLOW SAAS</span>
              <span class="badge">SaaS &bull; AI</span>
            </div>
            <div style="font-size: 7.5px; color: #bbb; font-family: 'JetBrains Mono', monospace; margin-bottom: 1.5mm;">
              ANGULAR &bull; NODE.JS &bull; MONGODB &bull; GEMINI API
            </div>
            <p style="font-size: 8px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Engineered a full-stack SaaS platform on the MEAN stack with RBAC and JWT auth. Integrated Google Gemini API to automate task generation and sprint planning, improving team productivity by 55% and task completion by 40%.
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 1.5mm; display: flex; justify-content: space-between; font-size: 7.5px; font-family: 'JetBrains Mono', monospace;">
            <span style="color: #10b981;">+55% Team Velocity</span>
            <span style="color: #ccc;">JWT Multitenant</span>
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
  <!-- PAGE 5: UX CASE STUDY: SAP PROGNOS (FLAGSHIP SHOWPIECE)             -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>05 // FLAGSHIP CASE STUDY &bull; SAP PROGNOS</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro" style="margin-bottom: 2.5mm;">
        <div class="section-tag">DEEP DIVE CASE STUDY</div>
        <h2 class="section-title">SAP PROGNOS: PREDICTIVE FORECASTING COCKPIT</h2>
        <p class="section-subtitle">Transforming fragmented manufacturing spreadsheets into an interactive actual-vs-forecast comparison dashboard.</p>
      </div>

      <!-- Top Row: Problem, Persona, Visual 4-Stage User Journey -->
      <div style="display: grid; grid-template-columns: 0.95fr 1fr 1.35fr; gap: 3.5mm; margin-bottom: 3.5mm;">
        
        <!-- 1. Problem Identification -->
        <div class="card">
          <div style="display: flex; align-items: center; gap: 1.5mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">01</span>
            <div style="font-weight: 700; font-size: 8.5px; color: #fff;">Problem Context</div>
          </div>
          <p style="font-size: 7.5px; color: #b0b0b0; line-height: 1.45;">
            Enterprise planners previously handled demand forecasting across disconnected Excel spreadsheets and terminal scripts, lacking unified side-by-side trend visibility.
          </p>
        </div>

        <!-- 2. User Persona Card -->
        <div class="card card-highlight">
          <div style="display: flex; align-items: center; gap: 1.5mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">02</span>
            <div style="font-weight: 700; font-size: 8.5px; color: #fff;">Persona: Vikram Sharma (38)</div>
          </div>
          <p style="font-size: 7.5px; color: #cccccc; line-height: 1.45;">
            <strong>Lead Inventory Planner:</strong> Needs transparent model validation between Prophet and XGBoost without having to write code or debug statistical scripts in terminal.
          </p>
        </div>

        <!-- 3. Visual 4-Stage User Journey Flow with Arrows -->
        <div class="card">
          <div style="display: flex; align-items: center; gap: 1.5mm; margin-bottom: 1.5mm;">
            <span class="badge badge-red">03</span>
            <div style="font-weight: 700; font-size: 8.5px; color: #fff;">Visual User Journey Flow</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 6.8px; font-family: 'JetBrains Mono', monospace; text-align: center;">
            <div style="background: #181818; padding: 1.5mm 1.8mm; border-radius: 4px; border: 1px solid #282828; flex: 1;">
              <div style="color: #ff4d5a; font-weight: 700;">STEP 1</div>
              <div style="color: #bbb;">Ingest CSV</div>
            </div>
            <div style="color: #d3121f; padding: 0 1mm; font-weight: 700;">&rarr;</div>
            <div style="background: #181818; padding: 1.5mm 1.8mm; border-radius: 4px; border: 1px solid #282828; flex: 1;">
              <div style="color: #ff4d5a; font-weight: 700;">STEP 2</div>
              <div style="color: #bbb;">Run Models</div>
            </div>
            <div style="color: #d3121f; padding: 0 1mm; font-weight: 700;">&rarr;</div>
            <div style="background: #181818; padding: 1.5mm 1.8mm; border-radius: 4px; border: 1px solid #282828; flex: 1;">
              <div style="color: #ff4d5a; font-weight: 700;">STEP 3</div>
              <div style="color: #bbb;">MAPE Curves</div>
            </div>
            <div style="color: #d3121f; padding: 0 1mm; font-weight: 700;">&rarr;</div>
            <div style="background: #181818; padding: 1.5mm 1.8mm; border-radius: 4px; border: 1px solid #282828; flex: 1;">
              <div style="color: #ff4d5a; font-weight: 700;">STEP 4</div>
              <div style="color: #bbb;">Role Cockpit</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Row: Design Decisions & Actual High-Res Screenshot (Filling Vertical Space) -->
      <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 3.5mm; margin-bottom: auto;">
        
        <!-- Design Decisions & Architecture -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4mm;">
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 2mm;">
              KEY DESIGN DECISIONS &amp; RATIONALE
            </div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              <strong>1. Model Comparison Layout:</strong> Implemented a side-by-side time-series chart allowing planners to visually cross-check Prophet and XGBoost forecast trajectories against actual sales.
            </p>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              <strong>2. Progressive Disclosure:</strong> Separated high-level MAPE accuracy indicators from granular parameter tuners, keeping the main interface focused on operational action.
            </p>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45;">
              <strong>3. Role-Based Views:</strong> Designed dedicated dashboard perspectives in SAPUI5 for production planners vs. inventory management.
            </p>
          </div>
          <div style="background: #161616; padding: 2mm 3mm; border-radius: 4px; border: 1px solid #282828; font-size: 7.5px; font-family: 'JetBrains Mono', monospace;">
            <a href="https://sap-forecast.vercel.app" target="_blank" style="color: #10b981; font-weight: 700; text-decoration: underline;">&bull; LIVE COCKPIT DEMO: sap-forecast.vercel.app</a>
          </div>
        </div>

        <!-- Real Screenshot of SAP Prognos (Large & Clear) -->
        <div style="height: 62mm; border-radius: 6px; overflow: hidden; border: 1px solid rgba(211,18,31,0.5); box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
          <img src="{sap_b64}" alt="SAP Prognos Interface" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
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
  <!-- PAGE 6: DESIGN PROCESS (A4 LANDSCAPE)                              -->
  <!-- =================================================================== -->
  <div class="page">
    <div class="grid-bg"></div>
    <div class="content-wrap">
      
      <div class="page-header">
        <span class="brand">ANAND JADHAV</span>
        <span>06 // DESIGN PROCESS &amp; WORKFLOW TIMELINE</span>
        <span>DEMANDBASE SELECTION</span>
      </div>

      <div class="section-intro">
        <div class="section-tag">METHODOLOGY</div>
        <h2 class="section-title">THE 6-STAGE HUMAN-CENTERED DESIGN WORKFLOW</h2>
        <p class="section-subtitle">How I transform ambiguous enterprise requirements into accessible, high-performance production components.</p>
      </div>

      <!-- 6-Stage Horizontal Connected Flow (Well-Distributed) -->
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 3mm; margin-bottom: 4.5mm;">
        
        <!-- Stage 1 -->
        <div class="card" style="padding: 4mm 3mm; text-align: left;">
          <div class="font-anton" style="font-size: 15px; color: #d3121f; margin-bottom: 1.5mm;">01</div>
          <div style="font-weight: 700; font-size: 8.5px; color: #fff; margin-bottom: 1mm;">DISCOVER</div>
          <div style="font-size: 7.5px; color: #b0b0b0; line-height: 1.4; margin-bottom: 2.5mm;">User shadowing, workflow analysis, pain point identification.</div>
          <span class="badge" style="font-size: 6.5px;">Problem Canvas</span>
        </div>

        <!-- Stage 2 -->
        <div class="card" style="padding: 4mm 3mm; text-align: left;">
          <div class="font-anton" style="font-size: 15px; color: #d3121f; margin-bottom: 1.5mm;">02</div>
          <div style="font-weight: 700; font-size: 8.5px; color: #fff; margin-bottom: 1mm;">DEFINE</div>
          <div style="font-size: 7.5px; color: #b0b0b0; line-height: 1.4; margin-bottom: 2.5mm;">User persona formulation, empathy mapping, workflow mapping.</div>
          <span class="badge" style="font-size: 6.5px;">User Personas</span>
        </div>

        <!-- Stage 3 -->
        <div class="card" style="padding: 4mm 3mm; text-align: left;">
          <div class="font-anton" style="font-size: 15px; color: #d3121f; margin-bottom: 1.5mm;">03</div>
          <div style="font-weight: 700; font-size: 8.5px; color: #fff; margin-bottom: 1mm;">IDEATE</div>
          <div style="font-size: 7.5px; color: #b0b0b0; line-height: 1.4; margin-bottom: 2.5mm;">Information architecture, progressive disclosure trees, task flows.</div>
          <span class="badge" style="font-size: 6.5px;">IA Maps</span>
        </div>

        <!-- Stage 4 -->
        <div class="card" style="padding: 4mm 3mm; text-align: left;">
          <div class="font-anton" style="font-size: 15px; color: #d3121f; margin-bottom: 1.5mm;">04</div>
          <div style="font-weight: 700; font-size: 8.5px; color: #fff; margin-bottom: 1mm;">WIREFRAME</div>
          <div style="font-size: 7.5px; color: #b0b0b0; line-height: 1.4; margin-bottom: 2.5mm;">Low-fi sketches to validate spatial hierarchy before coding.</div>
          <span class="badge" style="font-size: 6.5px;">Lo-Fi Decks</span>
        </div>

        <!-- Stage 5 -->
        <div class="card card-highlight" style="padding: 4mm 3mm; text-align: left;">
          <div class="font-anton" style="font-size: 15px; color: #d3121f; margin-bottom: 1.5mm;">05</div>
          <div style="font-weight: 700; font-size: 8.5px; color: #fff; margin-bottom: 1mm;">DESIGN</div>
          <div style="font-size: 7.5px; color: #ccc; line-height: 1.4; margin-bottom: 2.5mm;">Figma component libraries, 8px grid, accessible color contrast.</div>
          <span class="badge badge-red" style="font-size: 6.5px;">Design Tokens</span>
        </div>

        <!-- Stage 6 -->
        <div class="card card-highlight" style="padding: 4mm 3mm; text-align: left;">
          <div class="font-anton" style="font-size: 15px; color: #10b981; margin-bottom: 1.5mm;">06</div>
          <div style="font-weight: 700; font-size: 8.5px; color: #10b981; margin-bottom: 1mm;">VALIDATE</div>
          <div style="font-size: 7.5px; color: #ccc; line-height: 1.4; margin-bottom: 2.5mm;">Interactive React component testing, code review, user feedback.</div>
          <span class="badge badge-green" style="font-size: 6.5px;">Usability Review</span>
        </div>

      </div>

      <!-- 3 Key Principles for Demandbase (Filling Lower Half) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: auto;">
        <div class="card" style="padding: 4mm;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 1.5mm;">
            1. ZERO DESIGN DRIFT
          </div>
          <p style="font-size: 7.5px; color: #b0b0b0; line-height: 1.45;">
            Maintaining 1:1 parity between Figma variables and Tailwind CSS custom properties, ensuring visual integrity during frontend sprint implementation.
          </p>
        </div>
        <div class="card" style="padding: 4mm;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 1.5mm;">
            2. ACCESSIBILITY-FIRST
          </div>
          <p style="font-size: 7.5px; color: #b0b0b0; line-height: 1.45;">
            Ensuring high-contrast dark mode readability, visible keyboard focus rings, and touch-safe minimum 44px tap targets across all viewports.
          </p>
        </div>
        <div class="card" style="padding: 4mm;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; margin-bottom: 1.5mm;">
            3. MEASURABLE EFFICIENCY
          </div>
          <p style="font-size: 7.5px; color: #b0b0b0; line-height: 1.45;">
            Design success is evaluated through reduced operational task duration, lower cognitive error rates, and clean navigation ergonomics.
          </p>
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
  <!-- PAGE 7: DESIGN TO CODE (A4 LANDSCAPE)                              -->
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
        <h2 class="section-title">TRANSLATING FIGMA DESIGNS INTO REACT 18 CODE</h2>
        <p class="section-subtitle">How component-driven engineering, synchronized design tokens, and smooth motion deliver responsive interfaces.</p>
      </div>

      <!-- 2-Column: Left Technical Cards, Right Live Code Snippet (Balanced Vertically) -->
      <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 4.5mm; margin-bottom: auto;">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm;">
          
          <div class="card card-highlight" style="padding: 3.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">01. Atomic Components</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Structuring interfaces into Atoms (Buttons, Badges), Molecules (KPI Cards), and Organisms (Forecast Cockpit) with strict TypeScript prop contracts.
            </p>
            <span class="badge badge-red" style="font-size: 6.5px;">React 18 &bull; TypeScript</span>
          </div>

          <div class="card card-highlight" style="padding: 3.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">02. Tokenized CSS</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Figma color tokens map directly to Tailwind CSS variables (<code style="color: #ff4d5a;">--bg</code>, <code style="color: #ff4d5a;">--red</code>, <code style="color: #ff4d5a;">--line</code>), maintaining strict 8px layout rhythm.
            </p>
            <span class="badge badge-red" style="font-size: 6.5px;">Tailwind CSS Tokens</span>
          </div>

          <div class="card" style="padding: 3.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">03. Responsive Design</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Designing for responsive viewports (360px mobile to 1440px desktop) with flexible fluid typography and overflow protection.
            </p>
            <span class="badge" style="font-size: 6.5px;">Fluid Viewports</span>
          </div>

          <div class="card" style="padding: 3.5mm;">
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">04. Smooth Motion</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Hardware-accelerated transforms with Apple Expo Out easing. Touch devices gracefully disable tilt effects to respect battery life.
            </p>
            <span class="badge" style="font-size: 6.5px;">Framer Motion</span>
          </div>

        </div>

        <!-- Right: Code Snippet Card from Live Portfolio -->
        <div class="card" style="background: #090909; border-color: #262626; display: flex; flex-direction: column; justify-content: space-between; padding: 4mm;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm; margin-bottom: 2mm;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #d3121f; font-weight: 700;">// PRODUCTION TYPE-SAFE MOTION INTERFACE</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 7px; color: #888;">src/lib/motion.ts</span>
          </div>
          <pre style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #ddd; line-height: 1.45; overflow: hidden;">
// Apple Expo Out Easing Curve
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {{
  hidden: {{ opacity: 0, y: 24, filter: 'blur(6px)' }},
  show: {{ 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)', 
    transition: {{ duration: 0.8, ease }} 
  }},
}};

export const springTransition = {{
  type: 'spring',
  stiffness: 350,
  damping: 25,
}};</pre>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 7px; color: #aaa; border-top: 1px solid #1a1a1a; padding-top: 1.5mm;">
            Ensures smooth transitions without layout shifts.
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 07 / 09</span>
      </div>

    </div>
  </div>


  <!-- =================================================================== -->
  <!-- PAGE 8: ADDITIONAL WORK & LABS (A4 LANDSCAPE)                      -->
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
        <p class="section-subtitle">Real-time emergency response platform, kinematic robotics simulator, and interactive micro-interaction lab.</p>
      </div>

      <!-- 3-Column Layout for Additional Projects (Filling Vertical Space) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-bottom: auto;">
        
        <!-- Additional Project 1: DisasterLink -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4mm;">
          <div>
            <div style="height: 48mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; background: #141414; padding: 3mm; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 2.5mm;">
              <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #aaa;">
                <span>GEOSPATIAL SOS PLATFORM</span>
                <span style="color: #ff4d5a;">LIVE ALERTS</span>
              </div>
              <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: #fff;">DisasterLink</div>
                <div style="font-size: 7.5px; color: #ccc;">Low-Bandwidth Crisis Response</div>
              </div>
              <div style="display: flex; gap: 1mm;">
                <span class="badge" style="font-size: 6.5px;">Next.js</span>
                <span class="badge" style="font-size: 6.5px;">PostgreSQL</span>
              </div>
            </div>
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">DISASTERLINK PLATFORM</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Real-time platform connecting survivors, volunteers, and emergency authorities through SOS alerts, live geospatial mapping, and low-bandwidth communication protocols.
            </p>
          </div>
          <span class="badge badge-red" style="align-self: flex-start; font-size: 6.5px;">TypeScript &bull; Next.js</span>
        </div>

        <!-- Additional Project 2: Robotics Telemetry Simulator -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4mm;">
          <div>
            <div style="height: 48mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; margin-bottom: 2.5mm;">
              <img src="{robot_b64}" alt="Robotics Simulator" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">ROBOTICS TELEMETRY SIMULATOR</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Tactical hardware simulation cockpit displaying real-time kinematic motor angles, battery drain telemetry, and camera diagnostics for physical prototypes.
            </p>
          </div>
          <span class="badge" style="align-self: flex-start; font-size: 6.5px;">Hardware HMI Cockpit</span>
        </div>

        <!-- Additional Project 3: Interactive UI Lab -->
        <div class="card card-highlight" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4mm;">
          <div>
            <div style="height: 48mm; border-radius: 6px; overflow: hidden; border: 1px solid #2a2a2a; background: #160c0d; padding: 3mm; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 2.5mm;">
              <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #ff4d5a;">
                <span>PROTOTYPE UI LAB</span>
                <span class="badge badge-red" style="font-size: 6.5px;">INTERACTION</span>
              </div>
              <div>
                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700; color: #fff;">Contextual Cursor &amp; Slider</div>
                <div style="font-size: 7.5px; color: #ddd;">Prototyped for Anand's Portfolio</div>
              </div>
              <div style="font-size: 7px; color: #aaa; font-family: 'JetBrains Mono', monospace;">
                Framer Motion &bull; Lenis Smooth Scroll
              </div>
            </div>
            <div class="font-anton" style="font-size: 12px; color: #fff; margin-bottom: 1mm;">INTERACTION LAB</div>
            <p style="font-size: 7.5px; color: #b5b5b5; line-height: 1.45; margin-bottom: 2mm;">
              Designed agency-grade micro-interactions: contextual follower cursor (<code style="color: #ff4d5a;">VIEW</code>, <code style="color: #ff4d5a;">DRAG</code>), draggable before/after transformation slider, and scroll progress lines.
            </p>
          </div>
          <span class="badge badge-green" style="align-self: flex-start; font-size: 6.5px;">Prototype &amp; Lab</span>
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
  <!-- PAGE 9: CONTACT & GENUINE CREDENTIALS (A4 LANDSCAPE)               -->
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

      <!-- 2-Column: Left Statement of Interest, Right Contacts & Genuine QR -->
      <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 6mm; margin-bottom: auto;">
        
        <!-- Left: Statement of Interest -->
        <div class="card card-highlight" style="display: flex; flex-direction: column; justify-content: space-between; padding: 5mm;">
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5px; color: #d3121f; font-weight: 700; text-transform: uppercase; margin-bottom: 2.5mm;">
              STATEMENT OF INTEREST FOR DEMANDBASE
            </div>
            <p style="font-size: 9.5px; color: #e5e5e5; line-height: 1.6; margin-bottom: 3.5mm;">
              &ldquo;Modern B2B marketing and sales intelligence platforms succeed based on how effortlessly users can extract insight from overwhelming data volumes. My background—unifying human-centered research, enterprise design systems like SAP Fiori, and production-grade React 18 / TypeScript code—directly aligns with Demandbase&rsquo;s vision of delivering best-in-class UI/UX. I am eager to contribute immediately to your frontend engineering team.&rdquo;
            </p>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #ccc;">
              &mdash; <strong style="color: #fff;">Anand Jadhav</strong>, Candidate for UI / Frontend Engineer
            </div>
          </div>

          <div style="border-top: 1px solid #222; padding-top: 2.5mm; font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #999;">
            <div>INSTITUTION: Parul Institute of Technology, Parul University</div>
            <div>STUDENT ENROLLMENT: 2303031570026 &bull; B.Tech CSE (SAP IEP Track)</div>
          </div>
        </div>

        <!-- Right: Verified Contact Dossier & Real QR Code -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 4.5mm;">
          <div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #d3121f; font-weight: 700; text-transform: uppercase; margin-bottom: 3mm;">
              DIRECT CONTACT DOSSIER
            </div>

            <div style="display: flex; flex-direction: column; gap: 2mm; font-size: 8px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
                <span style="color: #888; font-family: 'JetBrains Mono', monospace;">EMAIL:</span>
                <a href="mailto:anandjadhav42004@gmail.com" style="color: #fff; font-weight: 600;">anandjadhav42004@gmail.com</a>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
                <span style="color: #888; font-family: 'JetBrains Mono', monospace;">PHONE:</span>
                <a href="tel:+918308008154" style="color: #fff; font-weight: 600;">+91 83080 08154</a>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
                <span style="color: #888; font-family: 'JetBrains Mono', monospace;">LOCATION:</span>
                <span style="color: #fff; font-weight: 600;">Vadodara, Gujarat, India</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
                <span style="color: #888; font-family: 'JetBrains Mono', monospace;">LINKEDIN:</span>
                <a href="https://www.linkedin.com/in/anand-jadhav-b599801b5" target="_blank" style="color: #ff4d5a; font-weight: 600;">linkedin.com/in/anand-jadhav-b599801b5</a>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a1a; padding-bottom: 1.5mm;">
                <span style="color: #888; font-family: 'JetBrains Mono', monospace;">GITHUB:</span>
                <a href="https://github.com/anandjadhav42004" target="_blank" style="color: #ff4d5a; font-weight: 600;">github.com/anandjadhav42004</a>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #888; font-family: 'JetBrains Mono', monospace;">LIVE WEB:</span>
                <a href="https://portfolio-eosin-seven-23.vercel.app" target="_blank" style="color: #ff4d5a; font-weight: 700; text-decoration: underline;">portfolio-eosin-seven-23.vercel.app</a>
              </div>
            </div>
          </div>

          <!-- Genuine Scannable QR Code Strip -->
          <div style="display: flex; align-items: center; gap: 3.5mm; background: #161616; padding: 2.5mm 3.5mm; border-radius: 6px; border: 1px solid #282828; margin-top: 3mm;">
            <div style="width: 20mm; height: 20mm; background: #ffffff; padding: 1mm; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              {qr_svg_content}
            </div>
            <div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #ff4d5a; font-weight: 700;">SCAN TO OPEN LIVE PORTFOLIO</div>
              <div style="font-size: 7px; color: #ccc; margin-top: 0.5mm;">Directly links to: <br><strong style="color: #fff;">portfolio-eosin-seven-23.vercel.app</strong></div>
            </div>
          </div>

        </div>

      </div>

      <div class="page-footer">
        <span>ANAND JADHAV // UI/UX DOSSIER</span>
        <span class="demandbase-tag">DEMANDBASE INTERVIEW SPECIALIZATION</span>
        <span class="pg-num">PAGE 09 / 09 &bull; END OF DOSSIER</span>
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

    html_content = build_portfolio_html()
    html_file = f"{src_dir}/Anand_Jadhav_UIUX_Portfolio_Final_v3.html"
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"v3 HTML source written to {html_file}")

if __name__ == '__main__':
    main()
