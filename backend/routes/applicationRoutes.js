const express = require('express');
const router = express.Router();
const { applyJob, getCandidateApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, applyJob);
router.get('/mine', protect, getCandidateApplications);

module.exports = router;
