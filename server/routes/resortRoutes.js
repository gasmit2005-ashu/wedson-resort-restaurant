const express = require('express');
const router = express.Router();
const {
  createResortInquiry,
  getResortInquiries,
  updateResortInquiryStatus,
  deleteResortInquiry
} = require('../controllers/resortController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createResortInquiry);
router.get('/', protect, authorize('admin', 'manager', 'staff'), getResortInquiries);
router.put('/:id/status', protect, authorize('admin', 'manager', 'staff'), updateResortInquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteResortInquiry);

module.exports = router;
