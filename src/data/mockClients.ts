import { Client } from "../types/clients";
import { MOCK_TIMELINE_EVENTS } from "./mockTimeline";

export const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Sarah Chen",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    countryCode: "CN",
    citizenship: "China",
    birthInfo: {
      dateOfBirth: "1990-05-15",
      countryOfBirth: "China",
      gender: "Female",
      languages: ["Mandarin", "English"],
      preferredLanguage: "English",
    },
    contacts: [
      {
        id: "1a",
        firstName: "John",
        lastName: "Chen",
        relationship: "Spouse",
        phone: "+1 (555) 234-5678",
        email: "john.chen@email.com",
        bestContact: ["Email", "Phone call"],
        preferredLanguage: "English",
        role: ["Assistance with providing information"],
      },
      {
        id: "1b",
        firstName: "Li",
        lastName: "Chen",
        relationship: "Parent",
        phone: "+1 (555) 345-6789",
        email: "li.chen@email.com",
        bestContact: ["Phone call"],
        preferredLanguage: "Mandarin",
        role: ["Assistance with providing information"],
      },
    ],
    caseCount: 2,
    timeline: MOCK_TIMELINE_EVENTS["1"],
    documents: [
      {
        id: "1",
        name: "Passport.pdf",
        category: "Identity Documents",
        type: "PDF",
      },
      {
        id: "2",
        name: "Degree Certificate.pdf",
        category: "Educational Documents",
        type: "PDF",
      },
    ],
    cases: [
      {
        id: "case-1",
        title: "H-1B Work Visa Application",
        type: "Visa",
        status: "In Progress",
        strategy: "Provide necessary supporting documents and respond to RFE",
        instructions:
          "Ensure all requested documents are uploaded before the deadline.",
        isActive: true,
        progress: {
          currentStage: 2,
          totalStages: 5,
          stages: [
            {
              id: 1,
              name: "Initial Application Submission",
              description:
                "Submitted the H-1B application form and required fees.",
              completed: true,
              estimatedDuration: "2 weeks",
            },
            {
              id: 2,
              name: "Request for Evidence (RFE)",
              description: "Respond to USCIS RFE for additional information.",
              completed: false,
              dueDate: new Date("2024-03-01"),
            },
            {
              id: 3,
              name: "Approval Notification",
              description: "Await USCIS decision on the application.",
              completed: false,
            },
          ],
        },
        uscisStatus: {
          receiptNumber: "EAC1234567890",
          status: "Request for Evidence",
          form: "I-129",
          lastUpdated: new Date("2024-02-20"),
          estimatedProcessingTime: "2-4 weeks",
          processingCenter: "Vermont Service Center",
          alerts: ["Respond to RFE by March 1, 2024."],
        },
      }
    ],
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    firstName: "Carlos",
    lastName: "Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+1 (555) 456-7890",
    location: "Los Angeles, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    countryCode: "MX",
    citizenship: "Mexico",
    birthInfo: {
      dateOfBirth: "1988-09-23",
      countryOfBirth: "Mexico",
      gender: "Male",
      languages: ["Spanish", "English"],
      preferredLanguage: "Spanish",
    },
    contacts: [
      {
        id: "2a",
        firstName: "Maria",
        lastName: "Mendoza",
        relationship: "Spouse",
        phone: "+1 (555) 567-8901",
        email: "maria.mendoza@email.com",
        bestContact: ["Text", "Phone call"],
        preferredLanguage: "Spanish",
        role: ["Former or current client"],
      },
      {
        id: "2b",
        firstName: "Ana",
        lastName: "Mendoza",
        relationship: "Sister",
        phone: "+1 (555) 678-9012",
        email: "ana.mendoza@email.com",
        bestContact: ["Text"],
        preferredLanguage: "English",
        role: ["Assistance with providing information"],
      },
    ],
    caseCount: 1,
    timeline: MOCK_TIMELINE_EVENTS["2"],
    documents: [],
    cases: [
      {
        id: "case-1",
        title: "I-601A Waiver Application",
        type: "Waiver",
        status: "In Progress",
        strategy: "File I-601A waiver before consular processing",
        instructions: "Gather evidence of extreme hardship to USC spouse",
        isActive: true,
        progress: {
          currentStage: 1,
          totalStages: 4,
          stages: [
            {
              id: 1,
              name: "Document Collection",
              description: "Gather hardship evidence and supporting documents",
              completed: false,
              estimatedDuration: "30 days"
            },
            {
              id: 2,
              name: "I-601A Preparation",
              description: "Prepare and file I-601A waiver application",
              completed: false,
              estimatedDuration: "15 days"
            },
            {
              id: 3,
              name: "USCIS Processing",
              description: "Wait for USCIS decision on waiver",
              completed: false,
              estimatedDuration: "6-8 months"
            },
            {
              id: 4,
              name: "Consular Processing",
              description: "Begin immigrant visa process abroad",
              completed: false,
              estimatedDuration: "3-4 months"
            }
          ]
        }
      }
    ],
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@email.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    countryCode: "CO",
    citizenship: "Colombia",
    birthInfo: {
      dateOfBirth: "1995-03-12",
      countryOfBirth: "Colombia",
      gender: "Female",
      languages: ["Spanish", "English", "Portuguese"],
      preferredLanguage: "Spanish",
    },
    contacts: [
      {
        id: "3a",
        firstName: "Diego",
        lastName: "Rodriguez",
        relationship: "Brother",
        phone: "+1 (555) 890-1234",
        email: "diego.rodriguez@email.com",
        bestContact: ["Email"],
        preferredLanguage: "English",
        role: ["Contacted us for help with case"],
      },
    ],
    caseCount: 3,
    timeline: MOCK_TIMELINE_EVENTS["3"],
    documents: [],
    cases: [
      {
        id: "case-1",
        title: "U Visa Application",
        type: "Visa",
        status: "In Progress",
        strategy: "Monitor U visa processing while maintaining DACA status",
        instructions: "Keep DACA renewed while U visa is pending",
        isActive: true,
        progress: {
          currentStage: 2,
          totalStages: 4,
          stages: [
            {
              id: 1,
              name: "Initial Filing",
              description: "File I-918 U visa application",
              completed: true,
              estimatedDuration: "1 month"
            },
            {
              id: 2,
              name: "Waitlist Determination",
              description: "Await USCIS waitlist decision",
              completed: false,
              estimatedDuration: "12-18 months"
            },
            {
              id: 3,
              name: "Visa Number",
              description: "Wait for available U visa number",
              completed: false,
              estimatedDuration: "24-36 months"
            },
            {
              id: 4,
              name: "Final Approval",
              description: "Receive full U visa approval",
              completed: false,
              estimatedDuration: "1-2 months"
            }
          ]
        },
        uscisStatus: {
          receiptNumber: "EAC2390123456",
          status: "Initial Review",
          form: "I-918",
          lastUpdated: new Date("2023-07-01"),
          estimatedProcessingTime: "48-60 months",
          processingCenter: "Vermont Service Center"
        }
      }
    ],
  },
  {
    id: "4",
    name: "Ana Martinez",
    firstName: "Ana",
    lastName: "Martinez",
    email: "ana.martinez@email.com",
    phone: "+1 (214) 555-0123",
    location: "Dallas, TX",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    countryCode: "SV",
    citizenship: "El Salvador",
    birthInfo: {
      dateOfBirth: "1975-06-15",
      countryOfBirth: "El Salvador",
      gender: "Female",
      languages: ["Spanish", "English"],
      preferredLanguage: "Spanish",
    },
    contacts: [
      {
        id: "4a",
        firstName: "Sofia",
        lastName: "Martinez",
        relationship: "Daughter",
        phone: "+1 (214) 555-1234",
        email: "sofia.martinez@email.com",
        bestContact: ["Text", "Phone call"],
        preferredLanguage: "English",
        role: ["Assistance with providing information"],
      },
      {
        id: "4b",
        firstName: "Miguel",
        lastName: "Martinez",
        relationship: "Son",
        phone: "+1 (214) 555-2345",
        email: "miguel.martinez@email.com",
        bestContact: ["Text", "Phone call"],
        preferredLanguage: "English",
        role: ["Assistance with providing information"],
      }
    ],
    caseCount: 1,
    timeline: MOCK_TIMELINE_EVENTS["4"],
    documents: [
      {
        id: "d1",
        name: "Birth Certificate.pdf",
        category: "Identity Documents",
        type: "PDF"
      },
      {
        id: "d2",
        name: "El Salvador Passport.pdf",
        category: "Identity Documents",
        type: "PDF"
      },
      {
        id: "d3",
        name: "Criminal Record - Dallas County.pdf",
        category: "Legal Documents",
        type: "PDF"
      },
      {
        id: "d4",
        name: "TPS Approval Notice.pdf",
        category: "Immigration Forms",
        type: "PDF"
      },
      {
        id: "d5",
        name: "Advance Parole Document.pdf",
        category: "Immigration Forms",
        type: "PDF"
      },
      {
        id: "d6",
        name: "Children Birth Certificates.pdf",
        category: "Evidence",
        type: "PDF"
      },
      {
        id: "d7",
        name: "I-130 Approval Notice.pdf",
        category: "Immigration Forms",
        type: "PDF"
      },
      {
        id: "d8",
        name: "I-765 Approval Notice.pdf",
        category: "Immigration Forms",
        type: "PDF"
      }
    ],
    cases: [
      {
        id: "case-4",
        title: "Adjustment of Status with Employment Authorization",
        type: "Immigration",
        status: "In Progress",
        strategy: "Process family-based adjustment of status with concurrent employment authorization",
        instructions: "Monitor I-485 processing times and prepare for potential interview",
        isActive: true,
        progress: {
          currentStage: 3,
          totalStages: 5,
          stages: [
            {
              id: 1,
              name: "Initial Filing",
              description: "File I-130, I-485, and I-765 applications",
              completed: true,
              estimatedDuration: "1 day",
              dueDate: new Date("2024-01-15")
            },
            {
              id: 2,
              name: "Biometrics",
              description: "Attend biometrics appointment",
              completed: true,
              estimatedDuration: "1 day",
              dueDate: new Date("2024-02-10")
            },
            {
              id: 3,
              name: "Initial Approvals",
              description: "Receive I-130 and I-765 approvals",
              completed: true,
              estimatedDuration: "45 days"
            },
            {
              id: 4,
              name: "Interview",
              description: "Attend adjustment of status interview",
              completed: false,
              estimatedDuration: "2 hours"
            },
            {
              id: 5,
              name: "Final Decision",
              description: "Receive decision on adjustment of status application",
              completed: false,
              estimatedDuration: "30 days"
            }
          ]
        },
        uscisStatus: {
          receiptNumber: "MSC2490123458",
          status: "Case Is Being Actively Reviewed By USCIS",
          form: "I-485",
          lastUpdated: new Date("2024-03-05"),
          estimatedProcessingTime: "12-18 months",
          processingCenter: "National Benefits Center",
          alerts: ["Interview may be scheduled soon."]
        }
      }
    ]
  }
];