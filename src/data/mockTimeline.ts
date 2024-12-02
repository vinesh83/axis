import { v4 as uuidv4 } from 'uuid';
import { TimelineEvent } from '../types/timeline';

export const MOCK_TIMELINE_EVENTS: Record<string, TimelineEvent[]> = {
  // Sarah Chen's Timeline
  "1": [
    {
      id: uuidv4(),
      date: new Date("1990-05-15"),
      title: "Birth",
      description: "Born in Shanghai, China",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2020-09-01"),
      title: "F-1 Student Visa Entry",
      description: "Entered US on F-1 student visa to pursue Master's degree",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2022-05-15"),
      title: "Graduation",
      description: "Graduated with Master's in Computer Science",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2022-06-01"),
      title: "OPT Approved",
      description: "Optional Practical Training (OPT) approved for 12 months",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2022-07-15"),
      title: "Employment Started",
      description: "Started working at Tech Corp as Software Engineer",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2023-03-20"),
      title: "Marriage",
      description: "Married to John Chen, US Citizen",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2023-08-15"),
      title: "Traffic Citation",
      description: "Received speeding ticket in Santa Clara County",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2023-09-01"),
      title: "Traffic School Completion",
      description: "Completed traffic school and paid fine",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-05"),
      title: "Initial Consultation Email",
      description: "Sent welcome email with initial consultation questionnaire",
      category: "internal",
      type: "update",
      assignedTo: "Jessica Chen"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-08"),
      title: "Document Checklist Sent",
      description: "Emailed comprehensive H-1B document checklist to client",
      category: "internal",
      type: "document",
      assignedTo: "Jessica Chen"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-15"),
      title: "Client Meeting Notes",
      description: "Discussed H-1B requirements and timeline with client",
      category: "internal",
      type: "update",
      assignedTo: "Vinesh Patel"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-19"),
      title: "Documents Received",
      description: "Received educational credentials and work experience letters",
      category: "internal",
      type: "document"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-01"),
      title: "LCA Filing Preparation",
      description: "Internal review of Labor Condition Application documents",
      category: "internal",
      type: "update",
      assignedTo: "David Kim"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-14"),
      title: "H-1B Petition Filed",
      description: "Filed H-1B petition with USCIS",
      category: "immigration",
      type: "milestone"
    }
  ],

  // Carlos Mendoza's Timeline
  "2": [
    {
      id: uuidv4(),
      date: new Date("1988-09-23"),
      title: "Birth",
      description: "Born in Mexico City, Mexico",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2018-06-15"),
      title: "Entry to United States",
      description: "Entered US on B1/B2 visitor visa",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2019-03-10"),
      title: "Marriage to USC",
      description: "Married Maria Rodriguez, a US Citizen",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2019-05-20"),
      title: "I-130 Filed",
      description: "Filed I-130 Petition for Alien Relative",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2019-08-15"),
      title: "Visa Overstay",
      description: "B1/B2 visa expired while awaiting I-130 processing",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2020-02-10"),
      title: "I-130 Approved",
      description: "Received I-130 approval notice",
      category: "immigration",
      type: "document"
    },
    {
      id: uuidv4(),
      date: new Date("2021-06-15"),
      title: "DUI Arrest",
      description: "Arrested for DUI in Los Angeles County",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2021-09-20"),
      title: "DUI Conviction",
      description: "Convicted of DUI, completed alcohol education program",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-15"),
      title: "Case Strategy Meeting",
      description: "Internal team meeting to discuss 601A waiver strategy",
      category: "internal",
      type: "update",
      assignedTo: "Vinesh Patel"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-20"),
      title: "Hardship Documentation Request",
      description: "Sent email requesting additional hardship evidence",
      category: "internal",
      type: "document",
      assignedTo: "Maria Garcia"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-01"),
      title: "Document Review",
      description: "Completed internal review of submitted hardship evidence",
      category: "internal",
      type: "update",
      assignedTo: "Jessica Chen"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-10"),
      title: "Initial Consultation",
      description: "Completed initial case evaluation for 601A waiver",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-15"),
      title: "Client Update Call",
      description: "Phone consultation to discuss waiver application progress",
      category: "internal",
      type: "update",
      assignedTo: "Vinesh Patel"
    }
  ],

  // Maria Rodriguez's Timeline
  "3": [
    {
      id: uuidv4(),
      date: new Date("1995-03-12"),
      title: "Birth",
      description: "Born in Bogotá, Colombia",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2015-08-20"),
      title: "DACA Approved",
      description: "Initial DACA application approved",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2017-08-15"),
      title: "DACA Renewal",
      description: "First DACA renewal approved",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2019-08-10"),
      title: "DACA Renewal",
      description: "Second DACA renewal approved",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2020-03-15"),
      title: "Shoplifting Incident",
      description: "Cited for misdemeanor shoplifting",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2020-05-20"),
      title: "Case Dismissed",
      description: "Shoplifting case dismissed after completion of diversion program",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2021-08-05"),
      title: "DACA Renewal",
      description: "Third DACA renewal approved",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2023-05-15"),
      title: "U Visa Evidence Review",
      description: "Internal review of domestic violence documentation",
      category: "internal",
      type: "update",
      assignedTo: "Sarah Johnson"
    },
    {
      id: uuidv4(),
      date: new Date("2023-05-20"),
      title: "Police Certification Request",
      description: "Sent request for additional police reports",
      category: "internal",
      type: "document",
      assignedTo: "Maria Garcia"
    },
    {
      id: uuidv4(),
      date: new Date("2023-06-01"),
      title: "Document Translation",
      description: "Received certified translations of Spanish documents",
      category: "internal",
      type: "document",
      assignedTo: "Jessica Chen"
    },
    {
      id: uuidv4(),
      date: new Date("2023-06-15"),
      title: "U Visa Certification",
      description: "Obtained U visa certification from local police department",
      category: "immigration",
      type: "document"
    },
    {
      id: uuidv4(),
      date: new Date("2023-07-01"),
      title: "U Visa Filed",
      description: "Filed I-918 U visa application",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2023-12-15"),
      title: "Work Authorization",
      description: "Received U visa-based work authorization",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-10"),
      title: "DACA Renewal Reminder",
      description: "Sent email reminder about upcoming DACA expiration",
      category: "internal",
      type: "update",
      assignedTo: "David Kim"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-20"),
      title: "DACA Renewal",
      description: "Filed fourth DACA renewal application",
      category: "immigration",
      type: "milestone"
    }
  ],

  // Ana Martinez's Timeline
  "4": [
    {
      id: uuidv4(),
      date: new Date("1975-06-15"),
      title: "Birth",
      description: "Born in San Salvador, El Salvador",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("1996-03-15"),
      title: "Entry to United States",
      description: "Entered the United States without inspection",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("1997-08-20"),
      title: "Birth of Children",
      description: "Gave birth to USC twin children Sofia and Miguel",
      category: "personal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2001-04-12"),
      title: "Criminal Incident",
      description: "Convicted of Class B misdemeanor theft in Dallas County",
      category: "criminal",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2001-09-09"),
      title: "TPS Granted",
      description: "Granted El Salvador Temporary Protected Status",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2006-03-25"),
      title: "Advance Parole Approved",
      description: "Application for Advance Parole approved",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2006-07-15"),
      title: "Travel on Advance Parole",
      description: "Departed and returned to US using Advance Parole",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2023-12-15"),
      title: "Adjustment Strategy Meeting",
      description: "Team meeting to discuss adjustment of status strategy",
      category: "internal",
      type: "update",
      assignedTo: "Vinesh Patel"
    },
    {
      id: uuidv4(),
      date: new Date("2023-12-20"),
      title: "Criminal Record Request",
      description: "Requested certified disposition from Dallas County Court",
      category: "internal",
      type: "document",
      assignedTo: "Sarah Johnson"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-05"),
      title: "Document Checklist Email",
      description: "Sent comprehensive adjustment of status document checklist",
      category: "internal",
      type: "document",
      assignedTo: "Maria Garcia"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-10"),
      title: "Application Review Meeting",
      description: "Internal review of I-485 and supporting documents",
      category: "internal",
      type: "update",
      assignedTo: "Jessica Chen"
    },
    {
      id: uuidv4(),
      date: new Date("2024-01-15"),
      title: "Applications Filed",
      description: "Filed I-130, I-485, and I-765 applications",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-20"),
      title: "Interview Preparation",
      description: "Sent interview preparation materials and guidelines",
      category: "internal",
      type: "document",
      assignedTo: "Vinesh Patel"
    },
    {
      id: uuidv4(),
      date: new Date("2024-02-28"),
      title: "I-130 Approved",
      description: "Form I-130 Petition for Alien Relative approved",
      category: "immigration",
      type: "milestone"
    },
    {
      id: uuidv4(),
      date: new Date("2024-03-05"),
      title: "I-765 Approved",
      description: "Form I-765 Application for Employment Authorization approved",
      category: "immigration",
      type: "milestone"
    }
  ]
};