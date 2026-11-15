const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  updateReservationStatus,
  deleteReservation
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createReservation);
router.get('/', protect, authorize('admin', 'manager', 'staff'), getReservations);
router.put('/:id/status', protect, authorize('admin', 'manager', 'staff'), updateReservationStatus);
router.delete('/:id', protect, authorize('admin'), deleteReservation);

module.exports = router;
