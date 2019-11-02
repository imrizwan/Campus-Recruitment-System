const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  title: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  },
  mail: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  imagePath: {
    type: String
  },
  description: {
    type: String,
    required: true //careerProfile
  },
  batch: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  language: [
    {
      name: {
        type: String,
        required: true
      },
      level: {
        type: String,
        required: true
      }
    }
  ],
  interests: {
    type: [String],
    required: true
  },
  experience: [
    {
      user: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      companyLink: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      },
      companyShortDetail: {
        type: String
      }
    }
  ],
  education: [
    {
      user: {
        type: String,
        required: true
      },
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  activities: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
    }
  ],
  projects: [
    {
      name: {
        type: String,
        required: true
      },
      list: [
        {
          url: {
            type: String
          },
          title: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: true
          }
        }
      ]
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    github: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = StudentProfile = mongoose.model(
  "studentprofile",
  StudentProfileSchema
);
