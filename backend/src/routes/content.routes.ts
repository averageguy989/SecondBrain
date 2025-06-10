import { Router, RequestHandler } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
  toggleShare
} from '../controllers/content.controller';

const router = Router();

// All routes require authentication
router.use(authenticateToken as RequestHandler);

// Create new content
router.post('/', createContent as RequestHandler);

// Get user's contents with optional filters
router.get('/', getContents as RequestHandler);

// Get specific content by ID
router.get('/:id', getContentById as RequestHandler);

// Update content
router.put('/:id', updateContent as RequestHandler);

// Delete content
router.delete('/:id', deleteContent as RequestHandler);

// Toggle content sharing
router.patch('/:id/share', toggleShare as RequestHandler);

export default router; 