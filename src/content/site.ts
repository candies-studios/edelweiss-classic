/**
 * Single source of truth for site content.
 *
 * Every fact and link here was taken from official Edelweiss sources
 * (edelweissfin.com pages and the company boilerplate) on 5 Nov 2026.
 * When content changes, update it here or move it to a headless CMS —
 * do not add figures, awards or claims that are not published by the company.
 */

export const OFFICIAL = "https://www.edelweissfin.com";
export const CDN = "https://cdn1.edelweissfin.com/wp-content/uploads";

export const company = {
  name: "Edelweiss Financial Services Limited",
  shortName: "Edelweiss",
  tagline: "Ideas create, values protect",
  campaign: "#BeUnlimited",
  // From the official boilerplate (June 2026)
  description:
    "Edelweiss is a diversified financial services company with seven independent businesses: Alternative Asset Management, Mutual Fund, Asset Reconstruction, NBFC, Housing Finance, General Insurance and Life Insurance. Each business has its own operating platform, management team and board.",
  listings: [
    { exchange: "NSE", code: "EDELWEISS" },
    { exchange: "BSE", code: "532922" },
  ],
  reuters: "EDEL.NS / EDEL.BO",
  bloomberg: "EDEL IS / EDEL IB",
  logo: `${OFFICIAL}/wp-content/uploads/2020/02/logo-1.png`,
  logoFooter: `${CDN}/2020/02/footer-logo-1.png`,
  boilerplate: `${CDN}/2026/06/Edelweiss-Financial-Services-Boiler-Plate.pdf`,
  privacyPolicy: `${OFFICIAL}/wp-content/uploads/2026/05/Privacy-Policy-External-Use.pdf`,
  publicNotice: "https://pms.edelweisspublicalts.com/wp-content/uploads/2025/12/EGWML-public-notice.pdf",
  irEmail: "IR@Edelweissfin.com",
  careersEmail: "GroupTalent.Acquisition@edelweissfin.com",
  social: [
    { label: "X (Twitter)", href: "https://twitter.com/EdelweissFin" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/edelweissfin" },
    { label: "Facebook", href: "https://www.facebook.com/edelweissfinancialservicesltd" },
    { label: "YouTube", href: "https://www.youtube.com/user/edelweiss" },
  ],
};

/* ───────────────────────── Navigation ───────────────────────── */

export type NavItem = { label: string; href: string; description?: string; external?: boolean };
export type NavGroup = { label: string; href: string; columns?: { title: string; items: NavItem[] }[] };

export const nav: NavGroup[] = [
  {
    label: "About Us",
    href: "/about",
    columns: [
      {
        title: "Who we are",
        items: [
          { label: "About Edelweiss", href: "/about", description: "A diversified financial services group" },
          { label: "Our Leadership", href: "/leadership", description: "Board of Directors" },
          { label: "Guiding Principles", href: "/about#principles", description: "The values we work by" },
          { label: "Sustainability", href: "/sustainability", description: "ESG, governance and EdelGive" },
        ],
      },
    ],
  },
  {
    label: "Our Businesses",
    href: "/businesses",
    columns: [
      {
        title: "Credit",
        items: [
          { label: "Credit overview", href: "/businesses/credit" },
          { label: "Home Loans", href: "https://www.nidohomefin.com/", external: true },
          { label: "SME & Business Loans", href: `${OFFICIAL}/sme-business-loans`, external: true },
        ],
      },
      {
        title: "Asset Management",
        items: [
          { label: "Asset Management overview", href: "/businesses/asset-management" },
          { label: "Mutual Funds", href: "https://www.edelweissmf.com/", external: true },
          { label: "Alternative Asset Advisors", href: `${OFFICIAL}/alternative-asset-advisory`, external: true },
        ],
      },
      {
        title: "Asset Reconstruction",
        items: [
          { label: "Asset Reconstruction overview", href: "/businesses/asset-reconstruction" },
          { label: "Edelweiss ARC", href: "http://www.edelweissarc.in/home.aspx", external: true },
        ],
      },
      {
        title: "Insurance",
        items: [
          { label: "Insurance overview", href: "/businesses/insurance" },
          { label: "Life Insurance", href: "https://www.edelweisslife.in/", external: true },
          { label: "General Insurance", href: "https://www.hizuno.com/", external: true },
        ],
      },
    ],
  },
  {
    label: "Investors",
    href: "/investors",
    columns: [
      {
        title: "Investor relations",
        items: [
          { label: "Investor Relations", href: "/investors", description: "Documents, disclosures and filings" },
          { label: "Financial Results", href: "/investors/financial-results", description: "Earnings and presentations" },
          { label: "Annual Reports", href: "/investors/annual-reports", description: "Chairman's letters and ESG reports" },
          { label: "Corporate Governance", href: "/investors/governance", description: "Policies and board committees" },
        ],
      },
    ],
  },
  { label: "Insights", href: "/media#insights" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

/* ───────────────────────── Businesses ───────────────────────── */

export type Business = {
  slug: string;
  name: string;
  summary: string;
  body: string[];
  offerings: { title: string; text: string; href?: string }[];
  facts?: { value: string; label: string; source: string }[];
  image: string;
  official: { label: string; href: string }[];
};

export const businesses: Business[] = [
  {
    slug: "credit",
    name: "Credit",
    summary: "Home loans and SME & business finance for customers across India, with inclusive lending for the self-employed.",
    body: [
      "Edelweiss's retail credit businesses provide home finance and lending for small and medium enterprises.",
      "Home loans are offered through Nido Home Finance Limited, which tailors loan sizes and products to each borrower and lends to self-employed customers and people with limited formal income documentation.",
    ],
    offerings: [
      { title: "Home loans", text: "Fixed- and variable-rate loans to buy, build, repair or renovate a home, with eligibility based on actual repayment capacity.", href: "https://www.nidohomefin.com/" },
      { title: "SME & business loans", text: "Finance for small and medium enterprises.", href: `${OFFICIAL}/sme-business-loans` },
      { title: "Retail credit", text: "The group's retail lending platform.", href: "https://www.edelweissretailfin.com/" },
    ],
    facts: [
      { value: "850+", label: "talukas where Nido Home Finance is present", source: `${OFFICIAL}/home-loans` },
      { value: "10+ years", label: "of home finance expertise", source: `${OFFICIAL}/home-loans` },
    ],
    image: `${CDN}/2020/02/credit-1-1.jpg`,
    official: [
      { label: "Nido Home Finance", href: "https://www.nidohomefin.com/" },
      { label: "Edelweiss Retail Finance", href: "https://www.edelweissretailfin.com/" },
    ],
  },
  {
    slug: "asset-management",
    name: "Asset Management",
    summary: "One of India's leading asset managers, spanning a leading alternatives platform and a mutual fund business.",
    body: [
      "Edelweiss Asset Management houses an alternatives platform focused on private debt and yield strategies, alongside a mutual fund business.",
      "The mutual fund range covers the full spectrum of risk and return, investing across Indian and global asset classes, with a digital investor experience.",
    ],
    offerings: [
      { title: "Mutual funds", text: "Schemes across the risk–return spectrum in Indian and global asset classes.", href: "https://www.edelweissmf.com/" },
      { title: "Alternatives", text: "Private debt and yield strategies: deal sourcing, structuring, monitoring and engagement with investee companies.", href: `${OFFICIAL}/alternative-asset-advisory` },
    ],
    facts: [
      { value: "$10 bn+", label: "customer assets across alternatives and mutual funds", source: `${OFFICIAL}/asset-management` },
      { value: "12", label: "locations across India", source: `${OFFICIAL}/asset-management` },
    ],
    image: `${CDN}/2020/02/investor-2-1.jpg`,
    official: [
      { label: "Edelweiss Mutual Fund", href: "https://www.edelweissmf.com/" },
      { label: "Alternative Asset Advisors", href: `${OFFICIAL}/alternative-asset-advisory` },
    ],
  },
  {
    slug: "asset-reconstruction",
    name: "Asset Reconstruction",
    summary: "Resolving stressed assets through acquisition, revival capital and hands-on turnaround support.",
    body: [
      "Edelweiss invests in distressed Indian companies that have a realistic chance of recovery. Its approach is summed up as Resolve, Reconstruct and Revive.",
      "The business acquires a majority of a company's debt, provides revival capital for capital expenditure and operating needs, and supports companies through the turnaround.",
    ],
    offerings: [
      { title: "Edelweiss Asset Reconstruction Company", text: "Focused on large assets, last-mile capital and turnaround support, with relationships across more than 70 banks and financial institutions.", href: "http://www.edelweissarc.in/home.aspx" },
      { title: "Edelweiss Funds", text: "Third-party funds investing in stressed assets, including EARF, ESTAR and EISAF-1." },
      { title: "Turnaround management", text: "Operations and turnaround capability backed by an in-house advisory board spanning steel, power, infrastructure, manufacturing and logistics." },
    ],
    facts: [
      { value: "70+", label: "bank and financial institution relationships", source: `${OFFICIAL}/distressed-assets-resolution-business` },
      { value: "₹10 bn+", label: "raised and invested through third-party funds", source: `${OFFICIAL}/distressed-assets-resolution-business` },
    ],
    image: `${CDN}/2022/10/AR-4.0.png`,
    official: [{ label: "Edelweiss ARC", href: "http://www.edelweissarc.in/home.aspx" }],
  },
  {
    slug: "insurance",
    name: "Insurance",
    summary: "Life and general insurance designed to be simple, modern and need-based.",
    body: [
      "Edelweiss Life Insurance, formerly Edelweiss Tokio Life Insurance, began nationwide operations in July 2011. It offers need-based life insurance through multiple distribution channels.",
      "General insurance is listed by the group through its general insurance site, hizuno.com.",
    ],
    offerings: [
      { title: "Life insurance", text: "Need-based life insurance solutions for individuals.", href: "https://www.edelweisslife.in/" },
      { title: "General insurance", text: "General insurance for individuals.", href: "https://www.hizuno.com/" },
    ],
    facts: [
      { value: "109", label: "life insurance branches in 88 cities (March 2024)", source: `${OFFICIAL}/life-insurance` },
      { value: "2011", label: "life insurance operations began", source: `${OFFICIAL}/life-insurance` },
    ],
    image: `${CDN}/2020/02/insurance-3-1.jpg`,
    official: [
      { label: "Edelweiss Life Insurance", href: "https://www.edelweisslife.in/" },
      { label: "General Insurance (hizuno.com)", href: "https://www.hizuno.com/" },
    ],
  },
];

/* ───────────────────────── Leadership ───────────────────────── */

export const leadership = [
  { name: "Rashesh Shah", role: "Chairman", bio: "Chairman & Managing Director of Edelweiss with more than 35 years in financial services. A former President of FICCI and an alumnus of IIM Ahmedabad.", photo: `${CDN}/2020/03/Rashesh_Shah.jpg` },
  { name: "Venkatchalam Ramaswamy", role: "Non-Executive Director", bio: "A financial markets professional of nearly three decades who helped build Edelweiss's alternative asset management business.", photo: `${CDN}/2020/03/Venkatchalam_Ramaswamy-1.jpg` },
  { name: "Vidya Shah", role: "Non-Executive, Non-Independent Director; Chairperson, Edelweiss ESG Council", bio: "Chairperson and CEO of EdelGive Foundation, with more than three decades of experience. An alumna of IIM Ahmedabad.", photo: `${CDN}/2020/03/Vidya_Shah.jpg` },
  { name: "Dr. Ashima Goyal", role: "Independent Director", bio: "Economist with three decades of experience, former member of India's Monetary Policy Committee and Professor Emeritus at IGIDR.", photo: `${CDN}/2020/03/Dr.-AshimaP_Goyal.jpg` },
  { name: "Shiva Kumar", role: "Independent Director", bio: "Former Managing Director of State Bank of Bikaner & Jaipur and former Deputy Managing Director of State Bank of India.", photo: `${CDN}/2022/09/Shiva-Kumar.jpg` },
  { name: "C. Balagopal", role: "Independent Director", bio: "Former Chairman of Federal Bank, former IAS officer and co-founder of biomedical devices company Penpol.", photo: `${CDN}/2024/08/C-Balagopal-photo-website.jpg` },
  { name: "Rajiv Jalota", role: "Independent Director", bio: "Former IAS officer with more than 35 years of public service, including leading the Mumbai Port Authority and Maharashtra's finance department.", photo: `${CDN}/2026/05/rajiv-jalota.png` },
];

/* ───────────────────────── Guiding principles ───────────────────────── */

export const principles = [
  { title: "Thinking organisation", text: "Deliberate thought and creative imagination in everything we do." },
  { title: "Fairness", text: "Just treatment of clients, employees and every stakeholder." },
  { title: "Partnership", text: "Collaboration inside the firm, and clients treated as partners." },
  { title: "Long-term orientation", text: "Weighing the lasting consequences of every decision." },
  { title: "Growth", text: "Progress for clients, colleagues and shareholders alike." },
  { title: "Reputation first", text: "A good name valued above financial gain." },
  { title: "Lawfulness and integrity", text: "Following the law and upholding high standards of honesty." },
  { title: "Caring for people", text: "Transparency, equal opportunity and room for every person to grow." },
  { title: "Risk awareness", text: "Balancing risk against reward, continually." },
  { title: "Prudent use of capital", text: "Growing, safeguarding and deploying capital with care." },
  { title: "Customer experience", text: "An outstanding experience, delivered consistently." },
  { title: "Listening to customers", text: "Understanding needs first, then meeting them with the right solutions." },
  { title: "Stakeholder balance", text: "Serving shareholders, employees, customers and society together." },
];

/* ───────────────────────── Investor documents ───────────────────────── */

export type DocCategory =
  | "Earnings release"
  | "Investor presentation"
  | "Earnings call transcript"
  | "Earnings call audio"
  | "Chairman's letter"
  | "ESG report"
  | "AGM";

export type InvestorDoc = { title: string; category: DocCategory; fy: string; href: string; format: "PDF" | "MP3" };

export const investorDocs: InvestorDoc[] = [
  { title: "Financials and Earnings Update Q1 FY27", category: "Earnings release", fy: "FY27", href: `${CDN}/2026/08/Financials-and-Earnings-Update-Q1FY27.pdf`, format: "PDF" },
  { title: "Investor Presentation Q1 FY27", category: "Investor presentation", fy: "FY27", href: `${CDN}/2026/08/Investor-Presentation-Q1FY27.pdf`, format: "PDF" },
  { title: "EAAA Alternatives Business Update Q1 FY27", category: "Investor presentation", fy: "FY27", href: `${CDN}/2026/08/EAAA-Alternatives-Business-Update-Q1FY27-1.pdf`, format: "PDF" },
  { title: "Earnings Call Transcript Q1 FY27", category: "Earnings call transcript", fy: "FY27", href: `${CDN}/2026/08/Earnings-Call-Transcripts-Q1FY27.pdf`, format: "PDF" },
  { title: "Earnings Call Audio Q1 FY27", category: "Earnings call audio", fy: "FY27", href: `${CDN}/2026/08/Earnings-Call-Audio-Q1FY27.mp3`, format: "MP3" },
  { title: "Chairman's Letter FY26", category: "Chairman's letter", fy: "FY26", href: `${CDN}/2026/09/Edelweiss-Chairmans-Letter-FY26.pdf`, format: "PDF" },
  { title: "ESG Report FY26", category: "ESG report", fy: "FY26", href: `${CDN}/2026/09/Edelweiss_ESG-Report-FY26.pdf`, format: "PDF" },
  { title: "31st Annual General Meeting", category: "AGM", fy: "FY27", href: `${CDN}/2026/09/31st-Annual-General-Meeting-1.pdf`, format: "PDF" },
  { title: "Financials and Earnings Update Q4 FY26", category: "Earnings release", fy: "FY26", href: `${CDN}/2026/04/Financials-and-Earnings-Update-Q4FY26.pdf`, format: "PDF" },
  { title: "Earnings Call Transcript Q4 FY26", category: "Earnings call transcript", fy: "FY26", href: `${CDN}/2026/05/Earnings-Call-Transcripts-Q4FY26.pdf`, format: "PDF" },
  { title: "Earnings Call Audio Q4 FY26", category: "Earnings call audio", fy: "FY26", href: `${CDN}/2026/04/Earnings-Call-Audio-Q4FY26.mp3`, format: "MP3" },
  { title: "Financials and Earnings Update Q3 FY26", category: "Earnings release", fy: "FY26", href: `${CDN}/2026/02/Financials-and-Earnings-Update-Q3FY26.pdf`, format: "PDF" },
  { title: "Earnings Call Transcript Q3 FY26", category: "Earnings call transcript", fy: "FY26", href: `${CDN}/2026/02/Earnings-Call-Transcripts-Q3FY26-1.pdf`, format: "PDF" },
  { title: "Earnings Call Audio Q3 FY26", category: "Earnings call audio", fy: "FY26", href: `${CDN}/2026/02/Earnings-Call-Audio-Q3FY26.mp3`, format: "MP3" },
  { title: "Our Journey in Charts (February 2026)", category: "Investor presentation", fy: "FY26", href: `${CDN}/2026/02/Our-Journey-in-Charts-.pdf`, format: "PDF" },
  { title: "Financials and Earnings Update Q2 FY26", category: "Earnings release", fy: "FY26", href: `${CDN}/2025/11/Financials-and-Earnings-Update-Q2FY26.pdf`, format: "PDF" },
  { title: "Investor Presentation Q2 FY26", category: "Investor presentation", fy: "FY26", href: `${CDN}/2025/11/Investor-Presentation-Q2FY26.pdf`, format: "PDF" },
  { title: "Financials and Earnings Update Q1 FY26", category: "Earnings release", fy: "FY26", href: `${CDN}/2025/08/Financials-and-Earnings-Update-Q1FY26.pdf`, format: "PDF" },
  { title: "Investor Presentation Q1 FY26", category: "Investor presentation", fy: "FY26", href: `${CDN}/2025/08/Investor-Presentation-Q1FY26-3.pdf`, format: "PDF" },
  { title: "Chairman's Letter FY25", category: "Chairman's letter", fy: "FY25", href: `${CDN}/2025/09/Edelweiss-Chairman-Letter-File_02-09_Spreads.pdf`, format: "PDF" },
  { title: "ESG Report FY25", category: "ESG report", fy: "FY25", href: `${CDN}/2025/09/Edelweiss-ESG-Master-File_02-09_U20.pdf`, format: "PDF" },
  { title: "30th Annual General Meeting", category: "AGM", fy: "FY26", href: `${CDN}/2025/09/30th-Annual-General-Meeting.pdf`, format: "PDF" },
  { title: "29th Annual General Meeting", category: "AGM", fy: "FY25", href: `${CDN}/2024/09/29th-Annual-General-Meeting.pdf`, format: "PDF" },
];

/** Official pages that hold full archives not reproduced here. */
export const irLinks = {
  overview: `${OFFICIAL}/investor-relation`,
  quarterly: `${OFFICIAL}/quarterly`,
  annualReports: `${OFFICIAL}/annual-reports`,
  analysisTool: `${OFFICIAL}/financial-results-financial-analysis-tool`,
  investorServices: `${OFFICIAL}/investor-services`,
  governance: `${OFFICIAL}/sustainability-governance`,
  boardCommittees: `${CDN}/2026/05/Committees-EFSL.pdf`,
  structuredNcd: `${OFFICIAL}/valuations-of-structured-products-ncds`,
};

/* ───────────────────────── Governance policies ───────────────────────── */

export const policies: { title: string; href: string; group: string }[] = [
  { group: "Corporate governance", title: "Whistle Blower Policy", href: `${CDN}/2023/02/EFSL-Edelweiss-Group-Whistleblower-Policy.pdf` },
  { group: "Corporate governance", title: "Familiarisation Programme for Independent Directors", href: `${CDN}/2023/02/4.EFSL-FAMILIARISATION-PROGRAMME-FOR-INDEPENDENT-DIRECTORS.pdf` },
  { group: "Corporate governance", title: "Related Party Transactions Policy", href: `${CDN}/2022/06/Related-Party-Transactions-Policy-EFSL.pdf` },
  { group: "Corporate governance", title: "Memorandum & Articles of Association", href: `${CDN}/2020/05/3.EFSL-MOA-AOA.pdf` },
  { group: "Corporate governance", title: "Code of Conduct for Directors and Senior Management", href: `${CDN}/2020/03/Code-Of-Conduct-for-Directors-and-Senior-Management-2.pdf` },
  { group: "Corporate governance", title: "Archival Policy", href: `${CDN}/2020/03/Archival-Policy.pdf` },
  { group: "Corporate governance", title: "Dividend Distribution Policy", href: `${CDN}/2020/03/Dividend-Distribution-Policy.pdf` },
  { group: "Corporate governance", title: "Policy for Determining Material Subsidiaries", href: `${CDN}/2020/03/Policy-for-Determining-Material-Subsidiaries.pdf` },
  { group: "Corporate governance", title: "Policy for Determining Materiality of Events and Information", href: `${CDN}/2020/03/Policy-for-Determining-Materiality-of-Events-and-Information-for-Disclosures.pdf` },
  { group: "Corporate governance", title: "Policy for Preservation of Documents", href: `${CDN}/2020/03/Policy-for-Preservation-of-Documents.pdf` },
  { group: "Corporate governance", title: "Terms of Appointment of Independent Directors", href: `${CDN}/2024/09/Terms-and-conditions-of-Appointment-of-Independent-Directors-2.pdf` },
  { group: "Corporate governance", title: "Board Committees", href: `${CDN}/2026/05/Committees-EFSL.pdf` },
  { group: "Environment & social", title: "CSR Policy", href: `${CDN}/2020/03/CSR-Committee-Composition-Policy-1.pdf` },
  { group: "Environment & social", title: "Business Responsibility Policy", href: `${CDN}/2020/03/Business-Responsibility-Policy.pdf` },
  { group: "Other policies", title: "Board Evaluation Policy", href: `${CDN}/2020/03/Board-Evaluation-Policy-1.pdf` },
  { group: "Other policies", title: "Code for Prohibition of Insider Trading", href: `${CDN}/2020/03/Code-for-Prohibition-of-Insider-Trading-in-Securities-of-Edelweiss-Financial-Services.pdf` },
];

/* ───────────────────────── Media ───────────────────────── */

export type NewsItem = { date: string; title: string; kind: "Press release" | "In the news"; outlet?: string; href: string };

export const news: NewsItem[] = [
  { date: "2026-09-21", kind: "Press release", title: "Edelweiss Financial Services announces ₹3,000 million public issue of secured redeemable NCDs", href: `${CDN}/2026/09/Edelweiss-Financial-Services-announces-Rs.-3000-million-Public-Issue-of-Secured-Redeemable-Non-Convertible-Debentures-September-2026.pdf` },
  { date: "2026-09-07", kind: "In the news", outlet: "Mint", title: "Edelweiss charts a 25-year path to build, unlock value", href: `${CDN}/2026/09/Mint-Edelweiss-charts-a-25-year-path-to-build-unlock-value.jpg` },
  { date: "2026-06-08", kind: "Press release", title: "Edelweiss Financial Services announces ₹3,000 million public issue of secured redeemable NCDs", href: `${CDN}/2026/09/Edelweiss-Financial-Services-announces-Rs.-3000-million-public-issue-of-secured-redeemable-non-convertible-debentures_June-2026.pdf` },
  { date: "2026-04-09", kind: "In the news", outlet: "Business Standard", title: "West Asia conflict duration, oil price trajectory hold key for markets", href: `${CDN}/2026/04/Business-Standard-West-Asia-conflict-duration-oil-price-trajectory-hold-key-for-markets-scaled.jpg` },
  { date: "2026-02-25", kind: "In the news", outlet: "Financial Express", title: "A shift from equity only to equity plus bond mindset", href: `${CDN}/2026/04/Financial-Express-A-shift-from-equity-only-to-equity-plus-bond-mindset-scaled.jpg` },
  { date: "2026-02-11", kind: "In the news", outlet: "Financial Express", title: "Carlyle to invest Rs. 2,100 crore in Edelweiss home finance arm", href: `${CDN}/2026/04/Financial-Express-Carlyle-to-invest-Rs.-2100-crore-in-Edelweiss-home-finance-arm.jpg` },
  { date: "2025-11-21", kind: "In the news", outlet: "FPJ", title: "India's golden age of compounding: why patience, institutions and long-term vision will shape the next 20 years", href: `${CDN}/2026/04/FPJ-India%E2%80%99s-Golden-Age-Of-Compounding-Why-Patience-Institutions-Long-Term-Vision-Will-Shape-The-Next-20-Years.pdf` },
  { date: "2025-08-04", kind: "In the news", outlet: "Fortune India", title: "Why Rashesh Shah of Edelweiss feels India will shrug off US tariff blues", href: `${CDN}/2026/04/Fortune-India-Why-Rashesh-Shah-of-Edelweiss-feels-India-will-shrug-off-US-tariff-blues.pdf` },
];

/* ───────────────────────── Careers ───────────────────────── */

export const careers = {
  culture: [
    { title: "Grow in many directions", text: "Varied businesses and roles give people room to develop personally and professionally." },
    { title: "Freedom to lead", text: "Colleagues are trusted to take ownership and shape their work — including building whole functions." },
    { title: "Emerging Leaders", text: "The Edelweiss Emerging Leaders programme develops the next generation of leaders." },
    { title: "Beyond the desk", text: "Volunteering through EdelGive, Joy of Giving week, quizzes, runs and an employee cycling club." },
  ],
};

/* ───────────────────────── Contact ───────────────────────── */

export const offices = [
  { city: "Mumbai", label: "Corporate office", address: "Edelweiss House, Off C.S.T. Road, Kalina, Mumbai 400 098", phone: "+91 22 4079 5199" },
  { city: "New Delhi", label: "Office", address: "708, Kailash Building, K G Marg, Connaught Place, New Delhi 110 001", phone: "+91 22 4079 5199" },
  { city: "Singapore", label: "Edelweiss Capital (Singapore) Pte. Ltd.", address: "3 Church Street, Samsung Hub, #21-05, Singapore 049483" },
  { city: "Dubai", label: "Edelweiss International (Singapore) Pte. Ltd. (DMCC Branch)", address: "14-K, Silver Tower, Jumeirah Lake Towers, Dubai, U.A.E., P.O. Box 125871" },
];

export const contacts = [
  { label: "Investor relations", value: "IR@Edelweissfin.com", href: "mailto:IR@Edelweissfin.com" },
  { label: "Careers", value: "GroupTalent.Acquisition@edelweissfin.com", href: "mailto:GroupTalent.Acquisition@edelweissfin.com" },
  { label: "EdelGive Foundation", value: "edelgive@edelweissfin.com", href: "mailto:edelgive@edelweissfin.com" },
  { label: "Life insurance customers", value: "care@edelweisslife.in", href: "mailto:care@edelweisslife.in" },
];

/* ───────────────────────── Search index ───────────────────────── */

export const searchIndex = [
  { title: "About Edelweiss", href: "/about", keywords: "company overview history principles values" },
  { title: "Our Leadership", href: "/leadership", keywords: "board directors chairman rashesh shah" },
  { title: "Our Businesses", href: "/businesses", keywords: "credit asset management reconstruction insurance" },
  ...businesses.map((b) => ({ title: b.name, href: `/businesses/${b.slug}`, keywords: b.summary })),
  { title: "Investor Relations", href: "/investors", keywords: "shareholders documents disclosures listing nse bse" },
  { title: "Financial Results", href: "/investors/financial-results", keywords: "earnings quarterly presentation transcript audio" },
  { title: "Annual Reports", href: "/investors/annual-reports", keywords: "chairman letter esg report agm" },
  { title: "Corporate Governance", href: "/investors/governance", keywords: "policies board committees whistle blower" },
  { title: "Sustainability", href: "/sustainability", keywords: "esg edelgive csr environment social" },
  { title: "Media and News", href: "/media", keywords: "press releases news insights" },
  { title: "Careers", href: "/careers", keywords: "jobs apply culture" },
  { title: "Contact Us", href: "/contact", keywords: "address office phone email" },
];
