const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getGalleryItems);
router.post('/', protect, authorize('admin', 'manager'), createGalleryItem);
router.put('/:id', protect, authorize('admin', 'manager'), updateGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
