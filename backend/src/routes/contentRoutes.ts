import { Router } from 'express';
import { createContent, deleteContent, getContent, updateContent, getPaginatedContent } from '../controllers/contentController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getContent);
router.post('/create', authenticateToken, createContent);
router.put('/update/:id', authenticateToken, updateContent);
router.delete('/delete/:id', authenticateToken, deleteContent);
router.get('/paginated', authenticateToken, getPaginatedContent);
export default router;
