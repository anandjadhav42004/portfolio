#!/usr/bin/env python3
"""
Generates an executive, ATS-friendly UI/UX Designer Portfolio Dossier PDF
with clickable hyperlinks, clean typography, and structured case studies.
Zero external dependencies required.
"""

import sys

def escape_pdf_text(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

class PDFBuilder:
    def __init__(self):
        self.objects = []
        self.pages = []
        self.annots_by_page = {}
        self.page_streams = []

    def add_object(self, content):
        self.objects.append(content)
        return len(self.objects)

    def new_page(self):
        page_idx = len(self.pages)
        self.pages.append(page_idx)
        self.annots_by_page[page_idx] = []
        self.page_streams.append([])
        return page_idx

    def add_stream_op(self, page_idx, op):
        self.page_streams[page_idx].append(op)

    def add_link(self, page_idx, x1, y1, x2, y2, url):
        self.annots_by_page[page_idx].append({
            'rect': [x1, y1, x2, y2],
            'url': url
        })

    def build(self, filename):
        # We need font objects, catalog, pages, page objects, stream objects, annot objects
        # Fonts: F1 (Helvetica), F2 (Helvetica-Bold), F3 (Helvetica-Oblique)
        
        # Object 1: Catalog
        # Object 2: Pages tree
        # Page objects start from 3
        
        # Let's organize objects systematically
        catalog_obj_id = 1
        pages_obj_id = 2
        font_helv_id = 3
        font_bold_id = 4
        font_oblique_id = 5

        current_id = 5

        page_obj_ids = []
        content_obj_ids = []
        annot_obj_ids_by_page = {}

        for p_idx in range(len(self.pages)):
            current_id += 1
            page_obj_ids.append(current_id)
            current_id += 1
            content_obj_ids.append(current_id)

            annot_obj_ids_by_page[p_idx] = []
            for _ in self.annots_by_page[p_idx]:
                current_id += 1
                annot_obj_ids_by_page[p_idx].append(current_id)

        # Build objects
        obj_dict = {}

        # 1. Catalog
        obj_dict[catalog_obj_id] = f"<< /Type /Catalog /Pages {pages_obj_id} 0 R >>"

        # 2. Pages
        kids_str = " ".join([f"{pid} 0 R" for pid in page_obj_ids])
        obj_dict[pages_obj_id] = f"<< /Type /Pages /Kids [{kids_str}] /Count {len(self.pages)} >>"

        # Fonts
        obj_dict[font_helv_id] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
        obj_dict[font_bold_id] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
        obj_dict[font_oblique_id] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>"

        # Pages, contents, and annotations
        for p_idx in range(len(self.pages)):
            pid = page_obj_ids[p_idx]
            cid = content_obj_ids[p_idx]
            ann_ids = annot_obj_ids_by_page[p_idx]

            ann_str = ""
            if ann_ids:
                ann_str = f"/Annots [{' '.join([f'{a} 0 R' for a in ann_ids])}]"

            obj_dict[pid] = (
                f"<< /Type /Page /Parent {pages_obj_id} 0 R /MediaBox [0 0 612 792] "
                f"/Contents {cid} 0 R "
                f"/Resources << /Font << /F1 {font_helv_id} 0 R /F2 {font_bold_id} 0 R /F3 {font_oblique_id} 0 R >> >> "
                f"{ann_str} >>"
            )

            # Stream content
            stream_content = "\n".join(self.page_streams[p_idx]).encode('latin1')
            obj_dict[cid] = (
                f"<< /Length {len(stream_content)} >>\nstream\n"
                + stream_content.decode('latin1')
                + "\nendstream"
            )

            # Annots
            for a_idx, annot in enumerate(self.annots_by_page[p_idx]):
                aid = ann_ids[a_idx]
                r = annot['rect']
                url = annot['url']
                obj_dict[aid] = (
                    f"<< /Type /Annot /Subtype /Link "
                    f"/Rect [{r[0]} {r[1]} {r[2]} {r[3]}] "
                    f"/Border [0 0 0] "
                    f"/A << /S /URI /URI ({url}) >> >>"
                )

        # Assemble PDF with cross-reference table
        output = ["%PDF-1.4\n"]
        offsets = {}

        current_offset = len(output[0].encode('latin1'))

        total_objs = max(obj_dict.keys())
        for oid in range(1, total_objs + 1):
            body = obj_dict[oid]
            obj_str = f"{oid} 0 obj\n{body}\nendobj\n"
            offsets[oid] = current_offset
            output.append(obj_str)
            current_offset += len(obj_str.encode('latin1'))

        xref_start = current_offset
        output.append(f"xref\n0 {total_objs + 1}\n")
        output.append("0000000000 65535 f \n")
        for oid in range(1, total_objs + 1):
            output.append(f"{offsets[oid]:010d} 00000 n \n")

        output.append(
            f"trailer\n<< /Size {total_objs + 1} /Root {catalog_obj_id} 0 R >>\n"
            f"startxref\n{xref_start}\n%%EOF\n"
        )

        with open(filename, 'wb') as f:
            f.write("".join(output).encode('latin1'))


def generate_dossier():
    pdf = PDFBuilder()

    # =========================================================================
    # PAGE 1: HEADER + DOUBLE DIAMOND PROCESS + SAP PROGNOS CASE STUDY
    # =========================================================================
    p1 = pdf.new_page()

    # Background Top Header Bar (Dark Charcoal #0f0f0f)
    pdf.add_stream_op(p1, "0.06 0.06 0.06 rg 0 690 612 102 re f")
    # Thin Crimson Accent Line (#d3121f)
    pdf.add_stream_op(p1, "0.827 0.071 0.122 rg 0 687 612 3 re f")

    # Name and Title
    pdf.add_stream_op(p1, "BT /F2 22 Tf 1 1 1 rg 36 754 Td (ANAND JADHAV) Tj ET")
    pdf.add_stream_op(p1, "BT /F2 10 Tf 0.827 0.071 0.122 rg 36 738 Td (LEAD UI/UX DESIGNER & COMPUTER SCIENCE ENGINEER) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 9 Tf 0.7 0.7 0.7 rg 36 724 Td (Parul University | B.Tech CSE (SAP IEP Track, CGPA 8.71) | Vadodara, Gujarat) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 9 Tf 0.7 0.7 0.7 rg 36 710 Td (Current: SAP & IT Intern at Hilti Manufacturing India | Phone: +91 83080 08154) Tj ET")

    # Header Action Badges / Links (Top Right)
    # Badge 1: Live Web Portfolio
    pdf.add_stream_op(p1, "0.827 0.071 0.122 rg 400 750 176 22 re f")
    pdf.add_stream_op(p1, "BT /F2 9 Tf 1 1 1 rg 412 757 Td ([+] LIVE WEB PORTFOLIO) Tj ET")
    pdf.add_link(p1, 400, 750, 576, 772, "https://github.com/anandjadhav42004/portfolio")

    # Badge 2: LinkedIn
    pdf.add_stream_op(p1, "0.15 0.15 0.15 rg 400 724 85 18 re f")
    pdf.add_stream_op(p1, "BT /F2 8 Tf 1 1 1 rg 415 729 Td (LINKEDIN ->) Tj ET")
    pdf.add_link(p1, 400, 724, 485, 742, "https://www.linkedin.com/in/anand-jadhav-b599801b5")

    # Badge 3: GitHub
    pdf.add_stream_op(p1, "0.15 0.15 0.15 rg 491 724 85 18 re f")
    pdf.add_stream_op(p1, "BT /F2 8 Tf 1 1 1 rg 506 729 Td (GITHUB ->) Tj ET")
    pdf.add_link(p1, 491, 724, 576, 742, "https://github.com/anandjadhav42004")

    # SECTION 1: UX DESIGN PHILOSOPHY & DOUBLE DIAMOND
    pdf.add_stream_op(p1, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 666 Td (01. HUMAN-CENTERED UI/UX METHODOLOGY (DOUBLE DIAMOND)) Tj ET")
    pdf.add_stream_op(p1, "0.85 0.85 0.85 RG 1 w 36 660 m 576 660 l S")

    # 4 Pillar Boxes
    pillars = [
        ("1. DISCOVER", "Contextual user interviews, field shadowing, friction mapping."),
        ("2. DEFINE", "Persona modeling, journey mapping, task hierarchy tree."),
        ("3. DEVELOP", "Lo-fi wireframing, SAP Fiori Horizon design tokens, atomic UI."),
        ("4. DELIVER", "Interactive prototyping, usability testing, SUS benchmarking."),
    ]
    box_w = 127
    for i, (p_title, p_desc) in enumerate(pillars):
        bx = 36 + i * (box_w + 10)
        pdf.add_stream_op(p1, f"0.96 0.96 0.96 rg {bx} 612 {box_w} 42 re f")
        pdf.add_stream_op(p1, f"0.85 0.85 0.85 RG 0.5 w {bx} 612 {box_w} 42 re S")
        pdf.add_stream_op(p1, f"BT /F2 8.5 Tf 0.827 0.071 0.122 rg {bx+6} 642 Td ({p_title}) Tj ET")
        # Split desc into two lines
        pdf.add_stream_op(p1, f"BT /F1 7.5 Tf 0.25 0.25 0.25 rg {bx+6} 628 Td ({p_desc[:32]}) Tj ET")
        pdf.add_stream_op(p1, f"BT /F1 7.5 Tf 0.25 0.25 0.25 rg {bx+6} 618 Td ({p_desc[32:]}) Tj ET")

    # SECTION 2: FLAGSHIP UX CASE STUDY — SAP PROGNOS
    pdf.add_stream_op(p1, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 588 Td (02. FLAGSHIP CASE STUDY: SAP PROGNOS (AI DEMAND FORECASTING)) Tj ET")
    pdf.add_stream_op(p1, "0.85 0.85 0.85 RG 1 w 36 582 m 576 582 l S")

    # Case study container box
    pdf.add_stream_op(p1, "0.98 0.98 0.98 rg 36 332 540 242 re f")
    pdf.add_stream_op(p1, "0.8 0.8 0.8 RG 1 w 36 332 540 242 re S")

    # Title & tags inside box
    pdf.add_stream_op(p1, "BT /F2 12 Tf 0.1 0.1 0.1 rg 50 556 Td (SAP Prognos: Enterprise Demand Forecasting & Analytics Cockpit) Tj ET")
    pdf.add_stream_op(p1, "BT /F3 8.5 Tf 0.45 0.45 0.45 rg 50 544 Td (Role: Lead UX/UI & Frontend Developer | Tools: Figma, SAPUI5, FastAPI, Prophet, XGBoost) Tj ET")

    # Subsections inside Case Study
    cs_items = [
        ("Problem Statement:", "Plant supply chain planners managed forecasting across 4 disparate Excel spreadsheets and Python scripts. Lack of real-time actual-vs-forecast comparison caused 18% inventory discrepancies and 47-minute weekly planning bottlenecks."),
        ("User Research & Personas:", "Shadowed 4 production planners at plant level. Formulated primary persona 'Vikram (38), Lead Inventory Planner', who needed transparent model validation without requiring raw mathematical or code debugging skills."),
        ("Information Architecture & Wireframes:", "Engineered a 3-stage progressive disclosure architecture (Ingest Data -> Validate MAPE Curves -> 1-Click SAP ERP Sync). Replaced 14 raw parameters with 3 adaptive presets, reducing cognitive load."),
        ("UI Design System & Accessibility:", "Built an enterprise design system adhering strictly to SAP Fiori 3.0 Horizon. Enforced 4.5:1 WCAG 2.1 AA contrast standards, calibrated 8px layout grid, and applied deep charcoal backgrounds with signature crimson alerts."),
        ("Measured Business & UX Impact:", "Conducted standardized System Usability Scale (SUS) benchmark testing with 6 participants: SUS reached 88/100 (Grade A). Workflow duration reduced by 34%, with 100% first-trial task completion rate.")
    ]

    curr_y = 524
    for header, body in cs_items:
        pdf.add_stream_op(p1, f"BT /F2 8.5 Tf 0.827 0.071 0.122 rg 50 {curr_y} Td ([+] {header}) Tj ET")
        curr_y -= 12
        # Text wrapping simulation
        pdf.add_stream_op(p1, f"BT /F1 8 Tf 0.25 0.25 0.25 rg 62 {curr_y} Td ({escape_pdf_text(body[:96])}) Tj ET")
        curr_y -= 10
        pdf.add_stream_op(p1, f"BT /F1 8 Tf 0.25 0.25 0.25 rg 62 {curr_y} Td ({escape_pdf_text(body[96:])}) Tj ET")
        curr_y -= 14

    # Metrics highlight bar inside SAP Prognos
    pdf.add_stream_op(p1, "0.92 0.92 0.92 rg 50 342 512 28 re f")
    pdf.add_stream_op(p1, "0.827 0.071 0.122 RG 1 w 50 342 512 28 re S")
    pdf.add_stream_op(p1, "BT /F2 9 Tf 0.827 0.071 0.122 rg 60 353 Td (KEY VALIDATION METRICS:) Tj ET")
    pdf.add_stream_op(p1, "BT /F2 9 Tf 0.1 0.1 0.1 rg 195 353 Td (34% FASTER WORKFLOW  |  SUS 88/100 (GRADE A)  |  97.9% ACCURACY) Tj ET")
    pdf.add_stream_op(p1, "BT /F2 8.5 Tf 0.827 0.071 0.122 rg 475 353 Td ([LIVE DEMO ->]) Tj ET")
    pdf.add_link(p1, 470, 345, 555, 365, "https://sap-forecast.vercel.app")

    # SECTION 3: BEFORE & AFTER TRANSFORMATION COMPARISON
    pdf.add_stream_op(p1, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 308 Td (03. BEFORE VS AFTER INTERFACE TRANSFORMATION) Tj ET")
    pdf.add_stream_op(p1, "0.85 0.85 0.85 RG 1 w 36 302 m 576 302 l S")

    # Before Box
    pdf.add_stream_op(p1, "0.97 0.93 0.93 rg 36 210 260 84 re f")
    pdf.add_stream_op(p1, "0.8 0.4 0.4 RG 1 w 36 210 260 84 re S")
    pdf.add_stream_op(p1, "BT /F2 9.5 Tf 0.7 0.1 0.1 rg 46 278 Td (BEFORE: Legacy Excel & Isolated Scripts) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.3 0.3 0.3 rg 46 264 Td (- 47 minutes average weekly planning duration) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.3 0.3 0.3 rg 46 250 Td (- Cluttered rows with unvalidated manual formula errors) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.3 0.3 0.3 rg 46 236 Td (- Zero visual confidence bands or forecast curves) Tj ET")
    pdf.add_stream_op(p1, "BT /F2 8.5 Tf 0.7 0.1 0.1 rg 46 220 Td (System Usability Scale: 42 / 100 (Failing)) Tj ET")

    # After Box
    pdf.add_stream_op(p1, "0.93 0.97 0.93 rg 316 210 260 84 re f")
    pdf.add_stream_op(p1, "0.2 0.7 0.2 RG 1 w 316 210 260 84 re S")
    pdf.add_stream_op(p1, "BT /F2 9.5 Tf 0.1 0.5 0.1 rg 326 278 Td (AFTER: Redesigned SAP Fiori Horizon Cockpit) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.3 0.3 0.3 rg 326 264 Td (- 31 minutes planning duration (34% time savings)) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.3 0.3 0.3 rg 326 250 Td (- Progressive disclosure: 14 parameters in 3 presets) Tj ET")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.3 0.3 0.3 rg 326 236 Td (- Real-time interactive Prophet vs XGBoost MAPE curves) Tj ET")
    pdf.add_stream_op(p1, "BT /F2 8.5 Tf 0.1 0.5 0.1 rg 326 220 Td (System Usability Scale: 88 / 100 (Grade A Excellence)) Tj ET")

    # SECTION 4: DESIGN SKILLS & TOOLING MATRIX
    pdf.add_stream_op(p1, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 186 Td (04. CORE UI/UX & ENGINEERING COMPETENCIES) Tj ET")
    pdf.add_stream_op(p1, "0.85 0.85 0.85 RG 1 w 36 180 m 576 180 l S")

    skills = [
        ("UX RESEARCH & STRATEGY", "User Interviews, Persona Modeling, Journey Mapping, Usability Testing (SUS), Heuristic Evaluation, Information Architecture, Double Diamond Methodology."),
        ("UI & VISUAL CRAFT", "Figma Design Systems, SAP Fiori 3.0 Horizon, Design Tokens, Atomic Component Libraries, Responsive 8px Grid, WCAG 2.1 AA Accessibility, High-Fidelity Prototyping."),
        ("FRONTEND & SAP TECH", "React.js, Next.js, TypeScript, SAPUI5, Tailwind CSS, Framer Motion, Angular, REST APIs, FastAPI, Python, Node.js, Git & GitHub CI/CD, SAP S/4HANA Cloud (PP/PPC).")
    ]
    sy = 168
    for cat, items in skills:
        pdf.add_stream_op(p1, f"BT /F2 8.5 Tf 0.2 0.2 0.2 rg 36 {sy} Td ({cat}:) Tj ET")
        pdf.add_stream_op(p1, f"BT /F1 8 Tf 0.4 0.4 0.4 rg 180 {sy} Td ({escape_pdf_text(items[:82])}) Tj ET")
        sy -= 11
        if len(items) > 82:
            pdf.add_stream_op(p1, f"BT /F1 8 Tf 0.4 0.4 0.4 rg 180 {sy} Td ({escape_pdf_text(items[82:])}) Tj ET")
            sy -= 12
        else:
            sy -= 2

    # Page 1 Footer
    pdf.add_stream_op(p1, "0.85 0.85 0.85 RG 0.5 w 36 45 m 576 45 l S")
    pdf.add_stream_op(p1, "BT /F1 8 Tf 0.5 0.5 0.5 rg 36 32 Td (Anand Jadhav | UI/UX Designer & Full-Stack Engineer | Portfolio Dossier) Tj ET")
    pdf.add_stream_op(p1, "BT /F2 8 Tf 0.827 0.071 0.122 rg 450 32 Td (CONTINUED ON PAGE 2 ->) Tj ET")


    # =========================================================================
    # PAGE 2: ADDITIONAL CASE STUDIES + WORK EXPERIENCE + ACADEMICS
    # =========================================================================
    p2 = pdf.new_page()

    # Top Header Strip Page 2
    pdf.add_stream_op(p2, "0.06 0.06 0.06 rg 0 740 612 52 re f")
    pdf.add_stream_op(p2, "0.827 0.071 0.122 rg 0 737 612 3 re f")
    pdf.add_stream_op(p2, "BT /F2 13 Tf 1 1 1 rg 36 756 Td (ANAND JADHAV - UI/UX DESIGN & ENGINEERING DOSSIER) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.7 0.7 0.7 rg 450 756 Td (PAGE 02 // EXPERIENCE & PROJECTS) Tj ET")

    # SECTION 5: SECONDARY CASE STUDIES
    pdf.add_stream_op(p2, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 714 Td (05. ADDITIONAL PRODUCTION CASE STUDIES) Tj ET")
    pdf.add_stream_op(p2, "0.85 0.85 0.85 RG 1 w 36 708 m 576 708 l S")

    # Project 2: Inventory Pro
    pdf.add_stream_op(p2, "0.98 0.98 0.98 rg 36 590 540 108 re f")
    pdf.add_stream_op(p2, "0.85 0.85 0.85 RG 1 w 36 590 540 108 re S")
    pdf.add_stream_op(p2, "BT /F2 10.5 Tf 0.1 0.1 0.1 rg 48 680 Td (Case Study 02: Inventory Pro - Warehouse Management System (SAP BTP & Fiori)) Tj ET")
    pdf.add_stream_op(p2, "BT /F3 8 Tf 0.45 0.45 0.45 rg 48 668 Td (Stack: SAPUI5, SAP Fiori Horizon, OData, SAP BTP, JavaScript | Role: UI/UX & Frontend Lead) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 652 Td (- Problem: Warehouse managers experienced high cognitive fatigue scanning dense tabular data across picking lists.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 640 Td (- UX Redesign: Rebuilt navigation tree with custom visual KPI cards and contextual search filters.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 628 Td (- Outcome: Cut task navigation duration by 30% and eliminated picking reconciliation bottlenecks.) Tj ET")
    pdf.add_stream_op(p2, "BT /F2 8.5 Tf 0.827 0.071 0.122 rg 48 606 Td (VALIDATION: 30% REDUCTION IN NAVIGATION TIME | SEAMLESS ODATA V2 INTEGRATION) Tj ET")

    # Project 3: ProFlow SaaS
    pdf.add_stream_op(p2, "0.98 0.98 0.98 rg 36 468 540 110 re f")
    pdf.add_stream_op(p2, "0.85 0.85 0.85 RG 1 w 36 468 540 110 re S")
    pdf.add_stream_op(p2, "BT /F2 10.5 Tf 0.1 0.1 0.1 rg 48 558 Td (Case Study 03: ProFlow - SaaS Project Management Platform (Angular + Gemini AI)) Tj ET")
    pdf.add_stream_op(p2, "BT /F3 8 Tf 0.45 0.45 0.45 rg 48 546 Td (Stack: Angular, Node.js, MongoDB, Google Gemini API, JWT Auth | Role: Full-Stack & UI Engineer) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 530 Td (- Problem: Cross-functional software squads suffered from delayed sprint estimations and fragmented user stories.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 518 Td (- UX Redesign: Designed an AI-assisted sprint planning canvas with drag-and-drop Kanbans and clear RBAC hierarchy.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 506 Td (- Outcome: Accelerated sprint setup from 2.5 hours to 15 minutes, boosting squad velocity by 55%.) Tj ET")
    pdf.add_stream_op(p2, "BT /F2 8.5 Tf 0.827 0.071 0.122 rg 48 484 Td (VALIDATION: 55% SPRINT PLANNING TIME IMPROVEMENT | ROLE-BASED ACCESS CONTROL) Tj ET")

    # SECTION 6: WORK EXPERIENCE & INTERNSHIPS
    pdf.add_stream_op(p2, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 444 Td (06. INDUSTRIAL EXPERIENCE & ENTERPRISE ROLES) Tj ET")
    pdf.add_stream_op(p2, "0.85 0.85 0.85 RG 1 w 36 438 m 576 438 l S")

    # Hilti
    pdf.add_stream_op(p2, "BT /F2 9.5 Tf 0.1 0.1 0.1 rg 36 422 Td (Hilti Manufacturing India Pvt. Ltd. | SAP and Information Technology Intern) Tj ET")
    pdf.add_stream_op(p2, "BT /F3 8.5 Tf 0.827 0.071 0.122 rg 420 422 Td (July 2026 - Present | Vadodara Plant) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.3 0.3 0.3 rg 36 410 Td (- Stationed on-site in the Production Planning and Control (PPC) team supporting SAP S/4HANA Cloud operations.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.3 0.3 0.3 rg 36 398 Td (- Analyze industrial shopfloor workflows, collaborate directly with business users, and bridge UI requirements with ERP systems.) Tj ET")

    # UptoSkills
    pdf.add_stream_op(p2, "BT /F2 9.5 Tf 0.1 0.1 0.1 rg 36 376 Td (UptoSkills | Backend Developer Intern) Tj ET")
    pdf.add_stream_op(p2, "BT /F3 8.5 Tf 0.827 0.071 0.122 rg 420 376 Td (May 2026 - August 2026 | Remote) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.3 0.3 0.3 rg 36 364 Td (- Engineered robust RESTful endpoints with Node.js and Express; optimized MongoDB query execution by 28%.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.3 0.3 0.3 rg 36 352 Td (- Partnered with frontend designers to enforce schema contracts and ensure zero data mismatch during sprint releases.) Tj ET")

    # SECTION 7: EDUCATION & CERTIFICATIONS
    pdf.add_stream_op(p2, "BT /F2 11 Tf 0.827 0.071 0.122 rg 36 330 Td (07. ACADEMIC CREDENTIALS & EDUCATION) Tj ET")
    pdf.add_stream_op(p2, "0.85 0.85 0.85 RG 1 w 36 324 m 576 324 l S")

    pdf.add_stream_op(p2, "BT /F2 9 Tf 0.1 0.1 0.1 rg 36 308 Td (Parul Institute of Technology, Parul University - B.Tech Computer Science & Engineering) Tj ET")
    pdf.add_stream_op(p2, "BT /F2 9 Tf 0.827 0.071 0.122 rg 450 308 Td (CGPA: 8.71 / 10 | 2023 - 2027) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.4 0.4 0.4 rg 36 296 Td (Specialization: SAP Industry Enabled Program (IEP) | Enrollment: 2303031570026) Tj ET")

    pdf.add_stream_op(p2, "BT /F2 9 Tf 0.1 0.1 0.1 rg 36 278 Td (Maharashtra State Board (HSC) - 12th Science) Tj ET")
    pdf.add_stream_op(p2, "BT /F2 9 Tf 0.827 0.071 0.122 rg 450 278 Td (Score: 94.00% | 2021 - 2023) Tj ET")

    # SECTION 8: CONTACT & VERIFICATION CALL TO ACTION
    pdf.add_stream_op(p2, "0.96 0.96 0.96 rg 36 172 540 88 re f")
    pdf.add_stream_op(p2, "0.827 0.071 0.122 RG 1.5 w 36 172 540 88 re S")

    pdf.add_stream_op(p2, "BT /F2 10.5 Tf 0.827 0.071 0.122 rg 48 240 Td (READY FOR UI/UX & FULL-STACK ENGINEERING INTERVIEWS) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 226 Td (Available immediately for full-time frontend, UI/UX, and SAP software engineering roles.) Tj ET")
    pdf.add_stream_op(p2, "BT /F1 8.5 Tf 0.25 0.25 0.25 rg 48 212 Td (Email: anandjadhav42004@gmail.com   |   Phone: +91 83080 08154   |   Location: Vadodara, Gujarat, India) Tj ET")

    # Interactive Links inside CTA Box
    pdf.add_stream_op(p2, "0.827 0.071 0.122 rg 48 184 150 20 re f")
    pdf.add_stream_op(p2, "BT /F2 8 Tf 1 1 1 rg 58 190 Td ([+] VISIT LIVE PORTFOLIO) Tj ET")
    pdf.add_link(p2, 48, 184, 198, 204, "https://github.com/anandjadhav42004/portfolio")

    pdf.add_stream_op(p2, "0.15 0.15 0.15 rg 208 184 140 20 re f")
    pdf.add_stream_op(p2, "BT /F2 8 Tf 1 1 1 rg 218 190 Td (EXPLORE SAP PROGNOS) Tj ET")
    pdf.add_link(p2, 208, 184, 348, 204, "https://sap-forecast.vercel.app")

    pdf.add_stream_op(p2, "0.15 0.15 0.15 rg 358 184 120 20 re f")
    pdf.add_stream_op(p2, "BT /F2 8 Tf 1 1 1 rg 368 190 Td (VIEW LINKEDIN) Tj ET")
    pdf.add_link(p2, 358, 184, 478, 204, "https://www.linkedin.com/in/anand-jadhav-b599801b5")

    # Page 2 Footer
    pdf.add_stream_op(p2, "0.85 0.85 0.85 RG 0.5 w 36 45 m 576 45 l S")
    pdf.add_stream_op(p2, "BT /F1 8 Tf 0.5 0.5 0.5 rg 36 32 Td (Anand Jadhav | Official UI/UX Designer & Software Engineer Dossier | Page 2 of 2) Tj ET")
    pdf.add_stream_op(p2, "BT /F2 8 Tf 0.827 0.071 0.122 rg 450 32 Td (VERIFIED PORTFOLIO 2026/2027) Tj ET")

    # Build PDF
    target_path = "/Users/anand/Desktop/portflio/portfolio/public/Anand_Jadhav_UI_UX_Portfolio_Dossier.pdf"
    root_path = "/Users/anand/Desktop/portflio/portfolio/Anand_Jadhav_UI_UX_Portfolio_Dossier.pdf"
    pdf.build(target_path)
    pdf.build(root_path)
    print("Dossier PDF successfully created at:")
    print("1.", target_path)
    print("2.", root_path)

if __name__ == '__main__':
    generate_dossier()
