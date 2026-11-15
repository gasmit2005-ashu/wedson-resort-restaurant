const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createContact);
router.get('/', protect, authorize('admin', 'manager'), getContacts);
router.put('/:id/status', protect, authorize('admin', 'manager'), updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
