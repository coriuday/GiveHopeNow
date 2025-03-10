const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Project = require("./models/Project");

// Load environment variables
dotenv.config();

// Sample data
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    bio: "Passionate about helping others and making a difference.",
    location: "New York, USA",
    website: "https://johndoe.com",
    socialLinks: {
      twitter: "johndoe",
      facebook: "johndoe",
      instagram: "johndoe",
      linkedin: "johndoe",
    },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    bio: "Social entrepreneur with a focus on education and healthcare.",
    location: "London, UK",
    website: "https://janesmith.com",
    socialLinks: {
      twitter: "janesmith",
      facebook: "janesmith",
      instagram: "janesmith",
      linkedin: "janesmith",
    },
  },
];

const projects = [
  {
    title: "Clean Water Initiative",
    shortDescription: "Providing clean water to communities in need",
    description: `
      # Clean Water Initiative
      
      ## The Problem
      
      Millions of people around the world lack access to clean, safe drinking water. This leads to disease, poverty, and limited opportunities for education and economic development.
      
      ## Our Solution
      
      We're building sustainable water filtration systems that can be easily maintained by local communities. Each system can provide clean water for up to 1,000 people for 10 years.
      
      ## How Your Donation Helps
      
      - $10 provides clean water for one person for a year
      - $100 helps train a local technician
      - $1,000 funds a complete filtration system for a small community
      
      Join us in making clean water accessible to everyone!
    `,
    category: "community",
    tags: ["water", "health", "sustainability"],
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0",
    goalAmount: 10000,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: "active",
    featured: true,
    rewards: [
      {
        title: "Supporter",
        description: "Thank you email and project updates",
        amount: 10,
      },
      {
        title: "Contributor",
        description: "Personalized thank you card and project updates",
        amount: 50,
      },
      {
        title: "Sponsor",
        description: "Your name on our website and a project t-shirt",
        amount: 100,
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a water system?",
        answer: "Typically 2-3 months from funding to completion.",
      },
      {
        question: "How do you ensure sustainability?",
        answer: "We train local technicians and establish maintenance funds.",
      },
    ],
  },
  {
    title: "Renewable Energy for Schools",
    shortDescription: "Solar power systems for underserved schools",
    description: `
      # Renewable Energy for Schools
      
      ## The Problem
      
      Many schools in developing regions lack reliable electricity, limiting educational opportunities and resources for students.
      
      ## Our Solution
      
      We're installing solar power systems in schools to provide reliable, clean energy. This enables computer labs, evening classes, and improved learning conditions.
      
      ## How Your Donation Helps
      
      - $25 provides lighting for one classroom
      - $250 powers a computer lab
      - $1,000 installs a complete solar system for a small school
      
      Help us brighten the future of education!
    `,
    category: "technology",
    tags: ["education", "solar", "sustainability"],
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    goalAmount: 15000,
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    status: "active",
    trending: true,
    rewards: [
      {
        title: "Friend",
        description: "Digital certificate and project updates",
        amount: 25,
      },
      {
        title: "Patron",
        description: "Your name on a classroom plaque and project updates",
        amount: 100,
      },
      {
        title: "Benefactor",
        description: "School visit opportunity and recognition ceremony",
        amount: 500,
      },
    ],
    faqs: [
      {
        question: "How many schools will benefit?",
        answer: "We aim to equip 10 schools with this funding round.",
      },
      {
        question: "What happens if a system needs repairs?",
        answer: "We train school staff and provide 5 years of maintenance support.",
      },
    ],
  },
  {
    title: "Community Garden Project",
    shortDescription: "Creating urban gardens for food security",
    description: `
      # Community Garden Project
      
      ## The Problem
      
      Urban food deserts limit access to fresh, nutritious food for many communities, contributing to health disparities.
      
      ## Our Solution
      
      We're transforming vacant lots into productive community gardens, providing fresh produce and educational opportunities.
      
      ## How Your Donation Helps
      
      - $20 plants a fruit tree
      - $100 builds a raised garden bed
      - $500 installs an irrigation system
      
      Help us grow healthier communities!
    `,
    category: "food",
    tags: ["urban", "gardening", "nutrition"],
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    goalAmount: 7500,
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    status: "active",
    rewards: [
      {
        title: "Seed Sower",
        description: "Packet of heirloom seeds and project updates",
        amount: 20,
      },
      {
        title: "Garden Friend",
        description: "Invitation to harvest celebration and recipe book",
        amount: 75,
      },
      {
        title: "Garden Steward",
        description: "Named garden bed and monthly produce basket for a season",
        amount: 250,
      },
    ],
    faqs: [
      {
        question: "Who maintains the gardens?",
        answer: "Local volunteers and community members with our support.",
      },
      {
        question: "How is the produce distributed?",
        answer: "Community members who participate get a share, and excess is donated to local food banks.",
      },
    ],
  },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    try {
      // Clear existing data
      await User.deleteMany({});
      await Project.deleteMany({});
      console.log("Cleared existing data");
      
      // Create users
      const createdUsers = await User.create(users);
      console.log(`Created ${createdUsers.length} users`);
      
      // Create projects with user references
      const projectsWithUsers = projects.map((project, index) => ({
        ...project,
        createdBy: createdUsers[index % createdUsers.length]._id,
      }));
      
      const createdProjects = await Project.create(projectsWithUsers);
      console.log(`Created ${createdProjects.length} projects`);
      
      // Update users with created projects
      for (let i = 0; i < createdUsers.length; i++) {
        const userProjects = createdProjects.filter(
          (p) => p.createdBy.toString() === createdUsers[i]._id.toString()
        );
        
        await User.findByIdAndUpdate(createdUsers[i]._id, {
          $push: { createdProjects: { $each: userProjects.map((p) => p._id) } },
        });
      }
      
      console.log("Seed completed successfully");
      process.exit(0);
    } catch (error) {
      console.error("Seed error:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }); 