// types.ts
export type MilestoneStatus = 0 | 1 | 2; // 0=not started,1=in progress,2=complete

export interface Milestone {
  id: number;
  title: string;
  description: string;
  status: MilestoneStatus;
}

export interface ChapterChecklistItem {
  id: number;
  title: string;
}

export interface ChapterMeta {
  id: number;
  title: string;
  dueDate: string;           // ISO or display string
  milestones: Milestone[];   // for image 1 & 3
  checklist: ChapterChecklistItem[]; // for image 2
}

// example generic model – fill out for other chapters
export const chapters: ChapterMeta[] = [

  {
    id: 1,
    title: "Chapter 1 - Introduction",
    dueDate: "2026-01-15",
    milestones: [
      { id: 0, title: "Topic Clarified", description: "Define a clear, concise project topic and confirm alignment with supervisor expectations.", status: 0 },
      { id: 1, title: "Problem Statement Drafted", description: "Describe the core problem, its context, and why it matters for the chosen domain.", status: 0 },
      { id: 2, title: "Aim and Objectives Defined", description: "State the overall aim and break it into specific, measurable project objectives.", status: 0 },
      { id: 3, title: "Scope and Limitations Outlined", description: "Specify what the project will cover, what it will not, and key constraints.", status: 0 },
      { id: 4, title: "Significance of Study Written", description: "Explain who benefits from the project and how it contributes to practice or research.", status: 0 }
    ],
    checklist: [
      { id: 0, title: "Project topic is specific, realistic, and approved." },
      { id: 1, title: "Problem statement clearly describes current situation, gaps, and impact." },
      { id: 2, title: "Aim is one overarching goal; objectives are aligned and measurable." },
      { id: 3, title: "Scope covers users, features, environment; limitations are realistic." },
      { id: 4, title: "Significance highlights academic, practical, or societal value." },
      { id: 5, title: "Chapter is logically structured and free of major language issues." }
    ]
  },
  {
    id: 2,
    title: "Chapter 2 - Literature Review",
    dueDate: "2026-02-01",
    milestones: [
      { id: 0, title: "Key Concepts Described", description: "Define the main theories, models, or concepts relevant to the project domain.", status: 0 },
      { id: 1, title: "Related Systems/Studies Reviewed", description: "Summarize prior works, tools, or methods that tackle similar problems.", status: 0 },
      { id: 2, title: "Strengths and Gaps Identified", description: "Highlight what existing works do well and where they fall short.", status: 0 },
      { id: 3, title: "Project Positioned", description: "Explain how the current project builds on or differs from reviewed works.", status: 0 },
      { id: 4, title: "Chapter Conclusion Written", description: "Summarize insights from the review and link them to the proposed solution.", status: 0 }
    ],
    checklist: [
      { id: 0, title: "Key concepts and terminology are clearly explained for a non-expert reader." },
      { id: 1, title: "Major, recent, and context-relevant studies/systems are included." },
      { id: 2, title: "Each related work’s method, contribution, and limitation is briefly described." },
      { id: 3, title: "A comparison shows similarities and differences with the proposed project." },
      { id: 4, title: "Gaps in existing works directly motivate the need for this project." },
      { id: 5, title: "Referencing style is consistent and all cited works appear in references." }
    ]
  },
  {
    id: 3,
    title: "Chapter 3 - Methodology",
    dueDate: "2026-03-01",
    milestones: [
      { id: 0, title: "Methodology Approach Selected", description: "Choose and justify the overall research or development approach (e.g., Agile, Waterfall, Experimental).", status: 0 },
      { id: 1, title: "System Analysis Completed", description: "Describe the current situation, users, and detailed problem definition for the proposed solution.", status: 0 },
      { id: 2, title: "Requirements Documented", description: "List clear functional and non-functional requirements for the system or study.", status: 0 },
      { id: 3, title: "Feasibility Study Completed", description: "Assess technical, economic, and operational feasibility of the proposed solution.", status: 0 },
      { id: 4, title: "System Design Artifacts Prepared", description: "Produce and explain diagrams such as Architecture, DFD, ERD, Use Cases, Class & Sequence diagrams.", status: 0 }
    ],
    checklist: [
      { id: 0, title: "Methodology is named and justified for this project." },
      { id: 1, title: "System analysis reflects the real context and users." },
      { id: 2, title: "Functional requirements are clearly documented." },
      { id: 3, title: "Non-functional requirements cover performance, security, usability, scalability." },
      { id: 4, title: "Feasibility study covers technical, economic, operational feasibility." },
      { id: 5, title: "Design diagrams are present, readable, and consistent." }
    ]
  },
  {
    id: 4,
    title: "Chapter 4 - Implementation and Testing",
    dueDate: "2026-04-01",
    milestones: [
      { id: 0, title: "Development Environment Set Up", description: "Select and configure technologies, tools, and platforms used to build the solution.", status: 0 },
      { id: 1, title: "Core Features Implemented", description: "Implement main modules or features that satisfy the project objectives.", status: 0 },
      { id: 2, title: "Test Plan Designed", description: "Define test cases, data, and procedures for functional and non-functional testing.", status: 0 },
      { id: 3, title: "Testing Executed", description: "Run tests, record results, and verify that features work as intended.", status: 0 },
      { id: 4, title: "Issues Fixed & Iterations Documented", description: "Document bugs found, fixes applied, and improvements made during implementation.", status: 0 }
    ],
    checklist: [
      { id: 0, title: "Implementation maps clearly to documented requirements." },
      { id: 1, title: "Technology choices are justified and aligned with constraints." },
      { id: 2, title: "Test types (unit, integration, usability) are included with sample cases." },
      { id: 3, title: "Test results summarized (passed/failed cases & key findings)." },
      { id: 4, title: "Screenshots/code snippets are explained, not just pasted." },
      { id: 5, title: "Known limitations/issues are acknowledged." }
    ]
  },
  {
    id: 5,
    title: "Chapter 5 - Summary, Conclusion and Recommendations",
    dueDate: "2026-05-01",
    milestones: [
      { id: 0, title: "Work Summarized", description: "Recap the project problem, approach, and major outcomes.", status: 0 },
      { id: 1, title: "Objectives Evaluated", description: "Explicitly state which objectives were achieved and how, supported by results.", status: 0 },
      { id: 2, title: "Conclusions Drawn", description: "Present key takeaways and implications of the findings or solution.", status: 0 },
      { id: 3, title: "Recommendations Given", description: "Suggest practical uses, improvements, or directions for future work.", status: 0 },
      { id: 4, title: "Final Document Polished", description: "Ensure formatting, references, and language meet department guidelines.", status: 0 }
    ],
    checklist: [
      { id: 0, title: "Summary captures the full project concisely." },
      { id: 1, title: "Original objectives revisited and marked achieved/not achieved." },
      { id: 2, title: "Conclusions follow logically from implementation and testing." },
      { id: 3, title: "Recommendations link to limitations or gaps." },
      { id: 4, title: "No new results or concepts introduced in conclusion." },
      { id: 5, title: "Formatting and references comply with department template." }
    ]
  }
];