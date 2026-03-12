const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Recruiter only)
const createJob = async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized to post jobs' });
    }

    const {
      title,
      companyName,
      companyLogo,
      location,
      salaryMin,
      salaryMax,
      experienceMin,
      experienceMax,
      jobType,
      skillsRequired,
      description,
    } = req.body;

    const job = await Job.create({
      title,
      companyName,
      companyLogo,
      location,
      salaryMin,
      salaryMax,
      experienceMin,
      experienceMax,
      jobType,
      skillsRequired,
      description,
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const { title, location, jobType, skills, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (jobType) {
      query.jobType = jobType;
    }
    
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skillsRequired = { $in: skillsArray.map(s => new RegExp(s, 'i')) };
    }

    const count = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalJobs: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
};
