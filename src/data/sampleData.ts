// Sample data for the Healthcare VC Theme Tracker

export interface Article {
  id: string;
  title: string;
  source: string;
  sourceLogo?: string;
  date: string;
  summary: string;
  tags: string[];
  link: string;
  theme: string;
  isRead?: boolean;
  isBookmarked?: boolean;
}

export const sampleArticles: Article[] = [
  // Robotics & Automation
  {
    id: "1",
    title: "Surgical Robotics Market Reaches $7.4B as da Vinci Alternatives Emerge",
    source: "MedTech Breakthrough",
    date: "2024-01-15",
    summary: "The surgical robotics market continues expanding with new competitors challenging Intuitive Surgical's dominance. Companies like Medtronic, Johnson & Johnson, and newer startups are launching advanced robotic platforms.",
    tags: ["Surgical Robotics", "Market Analysis", "Competition"],
    link: "https://example.com/article1",
    theme: "Robotics & Automation",
    isRead: false,
    isBookmarked: true
  },
  {
    id: "2", 
    title: "AI-Powered Robotic Pharmacy Dispensing Systems Reduce Medication Errors by 85%",
    source: "Healthcare Innovation",
    date: "2024-01-14",
    summary: "New robotic pharmacy systems using computer vision and AI are dramatically improving medication safety in hospitals. Multiple health systems report significant reductions in dispensing errors.",
    tags: ["Pharmacy Automation", "AI", "Patient Safety"],
    link: "https://example.com/article2",
    theme: "Robotics & Automation",
    isRead: true,
    isBookmarked: false
  },
  {
    id: "3",
    title: "Rehabilitation Robotics Show Promise for Stroke Recovery Outcomes",
    source: "Clinical Robotics Journal",
    date: "2024-01-13",
    summary: "Latest clinical trials demonstrate that robotic-assisted therapy significantly improves motor function recovery in stroke patients compared to traditional rehabilitation methods.",
    tags: ["Rehabilitation", "Clinical Trials", "Stroke Recovery"],
    link: "https://example.com/article3", 
    theme: "Robotics & Automation",
    isRead: false,
    isBookmarked: false
  },
  {
    id: "4",
    title: "Hospital Logistics Robots Navigate Complex Workflows to Reduce Staff Burden",
    source: "Modern Healthcare",
    date: "2024-01-12",
    summary: "Autonomous mobile robots are increasingly deployed in hospitals for medication delivery, linen transport, and supply chain management, freeing up clinical staff for patient care.",
    tags: ["Hospital Operations", "Autonomous Systems", "Efficiency"],
    link: "https://example.com/article4",
    theme: "Robotics & Automation",
    isRead: false,
    isBookmarked: true
  },

  // Healthcare Customer Experience
  {
    id: "5",
    title: "Patient Portal Adoption Hits 90% as User Experience Improvements Drive Engagement",
    source: "Digital Health News",
    date: "2024-01-15",
    summary: "Healthcare organizations investing in intuitive patient portal designs see dramatic increases in patient engagement. Key features include mobile-first design and simplified appointment scheduling.",
    tags: ["Patient Portals", "UX Design", "Patient Engagement"],
    link: "https://example.com/article5",
    theme: "Healthcare Customer Experience",
    isRead: true,
    isBookmarked: false
  },
  {
    id: "6",
    title: "Telehealth Platforms Focus on Reducing Digital Divide for Elderly Patients",
    source: "Healthcare UX Today",
    date: "2024-01-14", 
    summary: "New telehealth interfaces specifically designed for seniors include larger fonts, simplified navigation, and voice-activated features to improve accessibility and adoption rates.",
    tags: ["Telehealth", "Accessibility", "Elderly Care"],
    link: "https://example.com/article6",
    theme: "Healthcare Customer Experience",
    isRead: false,
    isBookmarked: true
  },
  {
    id: "7",
    title: "AI Chatbots Transform Healthcare Customer Service with 24/7 Support",
    source: "Patient Experience Weekly",
    date: "2024-01-13",
    summary: "Healthcare organizations deploy sophisticated AI chatbots that can handle appointment scheduling, basic medical questions, and care navigation, significantly improving patient satisfaction scores.",
    tags: ["AI Chatbots", "Customer Service", "Patient Satisfaction"],
    link: "https://example.com/article7",
    theme: "Healthcare Customer Experience",
    isRead: false,
    isBookmarked: false
  },
  {
    id: "8",
    title: "Mobile Health Apps Integrate Social Features to Improve Chronic Disease Management",
    source: "mHealth Solutions",
    date: "2024-01-12",
    summary: "New mobile health applications include peer support networks and family involvement features, showing improved outcomes for diabetes and heart disease management.",
    tags: ["Mobile Health", "Social Features", "Chronic Disease"],
    link: "https://example.com/article8",
    theme: "Healthcare Customer Experience",
    isRead: true,
    isBookmarked: false
  },

  // Others
  {
    id: "9",
    title: "Healthcare VC Funding Reaches $12.6B in Q4 2024, Digital Health Leads Growth",
    source: "VC Healthcare Report",
    date: "2024-01-15",
    summary: "Venture capital investment in healthcare companies showed strong growth in the final quarter, with digital health solutions and AI-powered diagnostics attracting the largest funding rounds.",
    tags: ["VC Funding", "Investment Trends", "Digital Health"],
    link: "https://example.com/article9",
    theme: "Others",
    isRead: false,
    isBookmarked: true
  },
  {
    id: "10",
    title: "FDA Approves New Digital Therapeutics for Mental Health Treatment",
    source: "Regulatory Affairs Today",
    date: "2024-01-14",
    summary: "The FDA has cleared several new digital therapeutic applications for treating anxiety and depression, marking a significant milestone for prescription digital medicine.",
    tags: ["FDA Approval", "Digital Therapeutics", "Mental Health"],
    link: "https://example.com/article10",
    theme: "Others",
    isRead: false,
    isBookmarked: false
  },
  {
    id: "11",
    title: "Blockchain Technology Enables Secure Health Data Sharing Across Health Systems",
    source: "Healthcare Blockchain News",
    date: "2024-01-13",
    summary: "New blockchain implementations allow patients to securely share medical records across different healthcare providers while maintaining complete control over their data privacy.",
    tags: ["Blockchain", "Data Privacy", "Interoperability"],
    link: "https://example.com/article11",
    theme: "Others",
    isRead: true,
    isBookmarked: false
  },
  {
    id: "12",
    title: "Wearable Devices Generate $2.1B in Healthcare Cost Savings Through Preventive Care",
    source: "Wearable Health Analytics",
    date: "2024-01-12",
    summary: "Study shows that widespread adoption of health monitoring wearables has led to earlier disease detection and reduced emergency room visits, generating significant healthcare cost savings.",
    tags: ["Wearables", "Preventive Care", "Cost Savings"],
    link: "https://example.com/article12",
    theme: "Others",
    isRead: false,
    isBookmarked: true
  }
];

// Group articles by theme
export const getArticlesByTheme = () => {
  const themes = {
    "Robotics & Automation": sampleArticles.filter(article => article.theme === "Robotics & Automation"),
    "Healthcare Customer Experience": sampleArticles.filter(article => article.theme === "Healthcare Customer Experience"),
    "Others": sampleArticles.filter(article => article.theme === "Others")
  };
  
  return themes;
};
