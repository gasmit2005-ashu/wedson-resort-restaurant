const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createCategory
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getMenuItems);
router.get('/categories', getCategories);

router.post('/', protect, authorize('admin', 'manager'), createMenuItem);
router.put('/:id', protect, authorize('admin', 'manager'), updateMenuItem);
router.delete('/:id', protect, authorize('admin', 'manager'), deleteMenuItem);

router.post('/categories', protect, authorize('admin', 'manager'), createCategory);

module.exports = router;
