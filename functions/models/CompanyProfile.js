const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CompanyProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  industrytype: {
    type: String,
    required: true
  },
  numberofemployee: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  githubusername: {
    type: String
  },
  project: [
    {
      user: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      client: {
        type: String,
        required: true
      },
      clientlocation: {
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
      skills: {
        type: [String],
        required: true
      }
    }
  ],
  vaccancy: [
    {
      user: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      degreerequired: {
        type: String,
        required: true
      },
      skillsrequired: {
        type: [String],
        required: true
      },
      jobtype: {
        type: String, 
        // enum: ['Full time', 'Part time', 'Contract', 'Intern'],
        required: true
      },
      description: {
        type: String,
        require: true
      },
      contactno: {
        type: String,
        require: true
      },
      date: {
        type: Date,
        default: Date.now
      }
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
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CompanyProfile = mongoose.model('companyprofiles', CompanyProfileSchema);
