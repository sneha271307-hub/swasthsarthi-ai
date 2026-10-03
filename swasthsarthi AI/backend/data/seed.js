const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Scheme = require("../models/Scheme");

dotenv.config();

const schemes = [
  {
    name: "Pre-Matric Scholarship for Students with Disabilities",
    category: "Disability",
    purpose:
      "Financial support for students with benchmark disabilities studying in Classes IX and X.",
    description:
      "A scholarship component for eligible students with disabilities to support their education.",
    eligibility: [
      "Indian national",
      "Student studying in Class IX or X",
      "Benchmark disability of 40% or more",
      "Valid disability certificate",
    ],
    documents: [
      "Aadhaar Card",
      "Disability certificate or UDID Card",
      "Income certificate",
      "Educational documents",
    ],
    steps: [
      "Check the latest eligibility rules",
      "Prepare the required documents",
      "Apply through the National Scholarship Portal",
      "Track the application status",
    ],
    officialSource:
      "https://depwd.gov.in/en/scholership-schemes-pre-matric/",
  },

  {
    name: "Post-Matric Scholarship for Students with Disabilities",
    category: "Disability",
    purpose:
      "Financial support for students with disabilities studying from Class XI through postgraduate degree or diploma level.",
    description:
      "A scholarship component supporting eligible students with disabilities in post-matric education.",
    eligibility: [
      "Indian national",
      "Student in Class XI, XII, diploma, degree or postgraduate course",
      "Benchmark disability of 40% or more",
      "Valid disability certificate",
    ],
    documents: [
      "Aadhaar Card",
      "Disability certificate or UDID Card",
      "Income certificate",
      "Admission or educational documents",
    ],
    steps: [
      "Check the latest eligibility rules",
      "Prepare the required documents",
      "Apply through the relevant scholarship portal",
      "Track the application status",
    ],
    officialSource:
      "https://depwd.gov.in/en/scholarship-post-matric/",
  },

  {
    name: "Top Class Education for Students with Disabilities",
    category: "Disability",
    purpose:
      "Financial support for eligible students with benchmark disabilities pursuing graduate, postgraduate or diploma education in notified institutes.",
    description:
      "A higher-education scholarship component for eligible students with disabilities.",
    eligibility: [
      "Indian national",
      "Benchmark disability of 40% or more",
      "Studying in a notified institute",
      "Pursuing eligible graduate, postgraduate or diploma education",
    ],
    documents: [
      "Aadhaar Card",
      "UDID or disability certificate",
      "Income certificate",
      "Admission documents",
    ],
    steps: [
      "Check whether the institute is notified",
      "Check the latest eligibility rules",
      "Prepare the required documents",
      "Apply through the National Scholarship Portal",
    ],
    officialSource:
      "https://depwd.gov.in/en/scholarship-top-class-fellowship/",
  },

  {
    name: "National Fellowship for Persons with Disabilities",
    category: "Disability",
    purpose:
      "Fellowship support for eligible students with disabilities pursuing advanced research in Indian universities.",
    description:
      "A scholarship component under the scheme for students with disabilities.",
    eligibility: [
      "Indian national",
      "Eligible student with benchmark disability",
      "Meets the current fellowship requirements",
    ],
    documents: [
      "Aadhaar Card",
      "UDID or disability certificate",
      "Academic documents",
      "Admission or research documents",
    ],
    steps: [
      "Check the latest fellowship guidelines",
      "Prepare the required documents",
      "Apply through the designated portal",
      "Track the application",
    ],
    officialSource:
      "https://depwd.gov.in/en/scholarship/",
  },

  {
    name: "Scholarship for Students with Disabilities - Free Coaching",
    category: "Disability",
    purpose:
      "Support for eligible students with disabilities preparing for specified recruitment or entrance examinations.",
    description:
      "Free coaching is one of the components of the scholarship scheme for students with disabilities.",
    eligibility: [
      "Eligible student with disability",
      "Meets the current scheme requirements",
      "Preparing for an eligible examination",
    ],
    documents: [
      "Disability certificate or UDID Card",
      "Aadhaar Card",
      "Educational documents",
    ],
    steps: [
      "Check the current coaching scheme guidelines",
      "Check eligibility",
      "Prepare documents",
      "Apply through the designated process",
    ],
    officialSource:
      "https://depwd.gov.in/en/scholarship/",
  },

  {
    name: "Senior Citizen Pension Support",
    category: "Senior Citizens",
    purpose:
      "Social assistance for eligible older persons through government pension support.",
    description:
      "Demo record for testing senior-citizen related search. Verify the applicable state or central scheme before using it in production.",
    eligibility: [
      "Older person meeting the applicable scheme requirements",
      "Income and other conditions may apply",
      "Eligibility depends on the applicable government scheme",
    ],
    documents: [
      "Aadhaar Card",
      "Age proof",
      "Bank account details",
      "Income or other required documents",
    ],
    steps: [
      "Identify the applicable pension scheme",
      "Check the latest eligibility rules",
      "Prepare the required documents",
      "Apply through the applicable government channel",
    ],
    officialSource:
      "https://nsap.nic.in/",
  },

  {
    name: "Education Scholarship Support",
    category: "Education",
    purpose:
      "Financial assistance for eligible students who need support for continuing their education.",
    description:
      "Demo education record used to test the search and ranking system.",
    eligibility: [
      "Eligibility depends on the applicable scholarship",
      "Academic and income conditions may apply",
    ],
    documents: [
      "Identity proof",
      "Educational documents",
      "Income certificate where required",
    ],
    steps: [
      "Identify the applicable scholarship",
      "Check eligibility",
      "Prepare documents",
      "Submit the application through the official portal",
    ],
    officialSource:
      "https://scholarships.gov.in/",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    await Scheme.deleteMany({});

    await Scheme.insertMany(schemes);

    console.log(`${schemes.length} schemes inserted successfully`);

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();