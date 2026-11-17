/* ------------------------------------------------------------
   EDIT THIS FILE. Everything on the site is driven from here.
   demo / report: put a URL. Leave "" to show "soon". Use null to hide that button.
------------------------------------------------------------- */
window.SITE = {
  name: "Adithya Girish",
  label: "Portfolio '26",
  role: "AI / ML Engineer · SRMIST '27",
  tagline: ["I care about getting", "the answer right,", "and saying it plainly."],
  taglineEm: 1,
  bio: "I'm fascinated by pattern recognition: finding the signal in data, and building systems that learn to see it. I care about doing the work properly, explaining it clearly, and being honest about what the results do and don't show. Software and analytics are where I enjoy spending my time, and I'm looking for a team where I can keep learning and be useful.",
  openTo: "Software, Data Analysis & Business Analyst roles",
  email: "adithyagirish52@gmail.com",
  github: "https://github.com/adithyag11",
  linkedin: "https://linkedin.com/in/adithya-girish-372109337",
  resume: "", // resume held back from the public site
  photo: "" // e.g. "photo.jpg" (put the file in this folder). Empty = no photo
};

window.PROJECTS = [
  {
    slug: "aml-detection",
    year: "2026",
    title: "Graph-Based Anti-Money-Laundering Detection",
    kind: "Graph ML",
    summary: "End-to-end fraud detection over 5.08M transactions, from ingestion to a live graph dashboard.",
    role: "Solo",
    stack: ["Python", "XGBoost", "PyTorch", "GraphSAGE", "Next.js", "react-force-graph-2d"],
    github: "https://github.com/adithyag11/AML_System",
    demo: null,
    report: "",
    problem: "Money laundering hides in the structure of transactions: cycles, bursts and tightly knit communities, not in any single payment. The system had to work over 5.08 million transactions and 515,088 accounts, and surface the few that matter to an analyst.",
    approach: "I engineered graph features (degree ratios, cycle and burst detection, Louvain communities) in a single-pass pipeline that runs in 271 seconds, and capped cycle enumeration to stop exponential blow-up on dense components. An XGBoost model scores transactions, and a GraphSAGE model with a pure-PyTorch neighbour sampler cut training time from 40 to 18 minutes. A Next.js dashboard with an interactive force graph sits on top, backed by automated tests and checkpointing.",
    results: "XGBoost reached 0.545 PR-AUC and 0.987 ROC-AUC, catching 77.8% of illicit transactions at a top-1% alert budget, about 160 times better than random."
  },
  {
    slug: "skillora",
    year: "2026",
    title: "Skillora: AI-Powered Skill Gap Predictor",
    kind: "Full-stack AI",
    summary: "Diagnostic quizzes, per-skill mastery and gap scores, and a prioritized learning plan with reassessment.",
    role: "Solo",
    stack: ["React", "FastAPI", "Supabase", "Google Gemini", "Python"],
    github: "https://github.com/adithyag11/Skillora-Skill_Gap_Identifier",
    demo: null,
    report: "skillora-report.pdf",
    problem: "Learners rarely know which skills are actually holding them back. A useful tool has to measure that, not just generate advice that sounds plausible.",
    approach: "Gemini generates the quiz questions and learning plans as JSON, validated with Pydantic. Scoring is kept deterministic: mastery, gap, confidence and ranking are all computed in Python, so results are reproducible. Supabase Auth with Row Level Security means PostgreSQL is queried as the logged-in user through FastAPI, so data stays private by construction.",
    results: "Dashboard load time dropped from about 2.5s to 0.2s using pooled connections, concurrent queries and single-query loading. The product loop is complete: quiz, gap analysis, plan, then a before-and-after reassessment."
  },
  {
    slug: "clickstream-dashboard",
    year: "2026",
    title: "Clickstream Purchase Intelligence Dashboard",
    kind: "Data & BI",
    summary: "Funnel analysis and purchase-intent prediction, turned into a three-dashboard Tableau decision support tool.",
    role: "Solo",
    stack: ["Python", "pandas", "scikit-learn", "Tableau"],
    demo: null,
    report: "clickstream-report.pdf",
    problem: "E-commerce teams see traffic but not where, or why, shoppers drop off before buying.",
    approach: "I cleaned 74,817 events from 1,000 users into 10,000 user-sessions with pandas, using a session-level feature set that leaves out the purchase outcome so the model cannot learn the answer from its target. I compared Logistic Regression, Random Forest and Gradient Boosting with stratified 5-fold cross-validation; Gradient Boosting was best, with an AUC of 0.670. Sessions were then scored into Low, Medium and High intent, and three Tableau dashboards follow Simon's decision phases: Intelligence (what is happening), Design (why it happens) and Choice (what to do).",
    results: "The purchase rate rises from 32.3% for Low intent sessions to 64.3% for Medium and 87.2% for High, so the model ranks sessions usefully even though its AUC is modest. Medium intent holds the largest revenue pool, Rs. 1.80 million, so the recommended actions are cart reminders there, a simple checkout for High intent, and low-cost nudges for Low intent. The dataset is synthetic, so the work shows the method rather than real customer behaviour."
  }
];

window.PUBLICATIONS = [
  {
    year: "2026",
    title: "Ten-Year Cardiovascular Risk Prediction",
    venue: "SCEECS'26 · IEEE MANIT Student Branch",
    date: "Jan 31 – Feb 1, 2026",
    summary: "Predicting ten-year heart-disease risk on the Framingham Heart Study dataset, with the analysis done in Orange. Presented at the conference.",
    link: "https://ieeexplore.ieee.org/document/11429704" // paper URL. Empty = shows "Presented" only
  }
];

window.INTERESTS = {
  intro: "I like the middle ground: roles where you write the code and also explain what it means for the people using it.",
  items: [
    {
      title: "Software engineering",
      text: "Backend and full-stack work: APIs, data pipelines, testing, and making slow things fast.",
      tags: ["Python", "C", "FastAPI", "React", "Next.js", "Supabase"],
      proof: { slug: "skillora", label: "Skillora" }
    },
    {
      title: "Data analysis",
      text: "Cleaning, exploring and modelling data to find out what is really going on: feature engineering, statistical analysis and honest evaluation.",
      tags: ["Python", "Pandas", "NumPy", "Orange"],
      proof: { href: "index.html#publications", label: "Cardiovascular risk study" }
    },
    {
      title: "Business analysis",
      text: "Funnels, drop-off points and purchase intent, turned into dashboards and recommendations that a non-technical team can act on.",
      tags: ["Power BI", "Tableau", "SAP Analytics Cloud", "Funnel analysis"],
      proof: { slug: "clickstream-dashboard", label: "Clickstream dashboard" }
    },
    {
      title: "Applied machine learning",
      text: "Models that end up inside a product: graph ML, classification and risk scoring, with the evaluation to back them.",
      tags: ["GraphSAGE", "XGBoost", "PyTorch", "Gemini"],
      proof: { slug: "aml-detection", label: "AML detection" }
    }
  ]
};

window.SKILLS = [
  { group: "Languages", items: ["Python", "C", "SQL", "JavaScript", "HTML", "CSS"] },
  { group: "Software development", items: ["Pandas", "NumPy", "Next.js", "react-force-graph-2d", "Git", "GitHub", "Unit testing", "DBMS concepts"] },
  { group: "Algorithms & graph analytics", items: ["Graph construction", "Cycle detection", "Louvain community detection", "Strongly connected components"] },
  { group: "Machine learning", items: ["XGBoost", "PyTorch", "GraphSAGE", "Graph neural networks", "Anomaly detection", "Model evaluation (PR-AUC, ROC-AUC)"] },
  { group: "Deep learning", items: ["RNN", "LSTM", "Transformers (familiar)"] },
  { group: "Data & BI tools", items: ["Power BI", "Tableau", "KNIME", "Orange", "SAP Analytics Cloud"] }
];

window.CERTS = [
  { title: "SAP Certified – Data Analyst, SAP Analytics Cloud", issuer: "SAP", date: "April 2026", id: "", link: "https://www.credly.com/badges/6e9948e2-0ce4-494c-89a2-42c7eb97fc24/public_url", badge: "6e9948e2-0ce4-494c-89a2-42c7eb97fc24" },
  { title: "GitHub Copilot", issuer: "Microsoft", date: "April 2026", id: "", link: "https://learn.microsoft.com/api/credentials/share/en-us/ADITHYAGIRISH-6781/8C9F2BA84AE7653B?sharingId=38A167CA7FEB0867", logo: "microsoft" },
  { title: "Introduction to Machine Learning", issuer: "NPTEL", date: "October 2025", id: "NPTEL25CS149S133205178", link: "" }
  // link: paste the certificate URL. Empty = shows "link soon"
];
