const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get enrollments for current user
router.get('/my', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id })
      .populate('courseId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all enrollments (admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('courseId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent enrollments (admin only)
router.get('/recent', auth, adminAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const enrollments = await Enrollment.find()
      .populate('courseId')
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get enrollments by course (admin only)
router.get('/course/:courseId', auth, adminAuth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.courseId })
      .populate('courseId')
      .sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create enrollment
router.post('/', auth, async (req, res) => {
  try {
    const { courseId, userName, userEmail, userPhone, courseTitle } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId: courseId
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      userId: req.user.id,
      courseId,
      userName,
      userEmail,
      userPhone,
      courseTitle
    });

    await enrollment.save();
    await enrollment.populate('courseId');
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update enrollment status (admin only)
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('courseId');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get total enrollments count (admin only)
router.get('/stats/total', auth, adminAuth, async (req, res) => {
  try {
    const total = await Enrollment.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
