const mongoose = require("mongoose")

const RewardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  estimatedDelivery: {
    type: Date,
  },
  limited: {
    type: Boolean,
    default: false,
  },
  limitedQuantity: {
    type: Number,
    default: 0,
  },
  limitedQuantityTotal: {
    type: Number,
    default: 0,
  },
})

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
})

const UpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description"],
      trim: true,
      maxlength: [160, "Short description cannot be more than 160 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["art", "music", "film", "publishing", "technology", "design", "food", "games", "community"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    imageUrl: {
      type: String,
      required: [true, "Please provide a project image"],
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    videoUrl: {
      type: String,
    },
    goalAmount: {
      type: Number,
      required: [true, "Please provide a funding goal"],
      min: [1, "Goal amount must be at least 1"],
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    backers: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, "Please provide an end date"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rewards: [RewardSchema],
    faqs: [FAQSchema],
    updates: [UpdateSchema],
    comments: [CommentSchema],
    status: {
      type: String,
      enum: ["draft", "pending", "active", "completed", "cancelled"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for checking if project is funded
ProjectSchema.virtual("isFunded").get(function () {
  return this.currentAmount >= this.goalAmount
})

// Virtual for calculating funding percentage
ProjectSchema.virtual("fundingPercentage").get(function () {
  return Math.min(Math.round((this.currentAmount / this.goalAmount) * 100), 100)
})

// Virtual for calculating days left
ProjectSchema.virtual("daysLeft").get(function () {
  return Math.max(0, Math.ceil((new Date(this.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
})

// Virtual for checking if project has ended
ProjectSchema.virtual("hasEnded").get(function () {
  return new Date() > new Date(this.endDate)
})

// Set virtuals to true when converting to JSON
ProjectSchema.set("toJSON", { virtuals: true })
ProjectSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("Project", ProjectSchema)

