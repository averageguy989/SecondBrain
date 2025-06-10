import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateUrl } from '../utils/validators';
import { ContentType, ContentInput, Content } from '../types/express';

const prisma = new PrismaClient();

// Helper function to validate content type specific rules
const validateContentType = (type: ContentType, link: string | null | undefined): { isValid: boolean; message?: string } => {
  if (!link) {
    if (type === 'DOCUMENT') return { isValid: true };
    return { isValid: false, message: `${type} content requires a link` };
  }

  switch (type) {
    case 'YOUTUBE':
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      return {
        isValid: youtubeRegex.test(link),
        message: youtubeRegex.test(link) ? undefined : 'Invalid YouTube URL'
      };
    case 'TWEET':
      const tweetRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/;
      return {
        isValid: tweetRegex.test(link),
        message: tweetRegex.test(link) ? undefined : 'Invalid Twitter URL'
      };
    case 'LINK':
      return {
        isValid: validateUrl(link),
        message: validateUrl(link) ? undefined : 'Invalid URL'
      };
    case 'DOCUMENT':
      return { isValid: true };
    default:
      return { isValid: false, message: 'Invalid content type' };
  }
};

// Create new content
export const createContent = async (req: Request, res: Response) => {
  try {
    const { type, link, title, tags } = req.body as ContentInput;
    const userId = req.user?.id; // Assuming user is attached by auth middleware

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Validate required fields
    if (!type || !title) {
      return res.status(411).json({
        message: 'Type and title are required'
      });
    }

    // Validate content type
    const typeValidation = validateContentType(type as ContentType, link);
    if (!typeValidation.isValid) {
      return res.status(411).json({
        message: typeValidation.message
      });
    }

    // Validate title length
    if (title.length < 1 || title.length > 200) {
      return res.status(411).json({
        message: 'Title must be between 1 and 200 characters'
      });
    }

    // Validate tags
    if (tags && !Array.isArray(tags)) {
      return res.status(411).json({
        message: 'Tags must be an array'
      });
    }

    if (tags && tags.length > 10) {
      return res.status(411).json({
        message: 'Maximum 10 tags allowed'
      });
    }

    // Create content
    const content = await prisma.content.create({
      data: {
        type,
        link: link ?? null, // Use nullish coalescing to handle undefined
        title,
        tags: tags ?? [],
        userId,
        share: false // Default to private
      }
    }) as Content;

    res.status(200).json({
      message: 'Content created successfully',
      content: {
        id: content.id,
        type: content.type,
        link: content.link,
        title: content.title,
        tags: content.tags,
        share: content.share,
        createdAt: content.createdAt
      }
    });

  } catch (error) {
    console.error('Content creation error:', error);
    res.status(500).json({
      message: 'Error creating content'
    });
  }
};

// Get user's contents with optional filters
export const getContents = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { type, tags, share, page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Build filter conditions
    const where: any = { userId };
    
    if (type) {
      where.type = type;
    }
    
    if (share !== undefined) {
      where.share = share === 'true';
    }
    
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      where.tags = {
        hasSome: tagArray
      };
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Get contents with pagination
    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        }
      }) as Promise<Content[]>,
      prisma.content.count({ where })
    ]);

    res.status(200).json({
      message: 'Contents retrieved successfully',
      data: {
        contents: contents.map((content) => ({
          id: content.id,
          type: content.type,
          link: content.link,
          title: content.title,
          tags: content.tags,
          share: content.share,
          createdAt: content.createdAt
        })),
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit))
        }
      }
    });

  } catch (error) {
    console.error('Content retrieval error:', error);
    res.status(500).json({
      message: 'Error retrieving contents'
    });
  }
};

// Update content
export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, link, title, tags, share } = req.body as Partial<ContentInput>;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Check if content exists and belongs to user
    const existingContent = await prisma.content.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingContent) {
      return res.status(404).json({
        message: 'Content not found or access denied'
      });
    }

    // Validate content type if provided
    if (type) {
      const typeValidation = validateContentType(type as ContentType, link || existingContent.link);
      if (!typeValidation.isValid) {
        return res.status(411).json({
          message: typeValidation.message
        });
      }
    }

    // Validate title if provided
    if (title && (title.length < 1 || title.length > 200)) {
      return res.status(411).json({
        message: 'Title must be between 1 and 200 characters'
      });
    }

    // Validate tags if provided
    if (tags) {
      if (!Array.isArray(tags)) {
        return res.status(411).json({
          message: 'Tags must be an array'
        });
      }
      if (tags.length > 10) {
        return res.status(411).json({
          message: 'Maximum 10 tags allowed'
        });
      }
    }

    // Update content
    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        type,
        link: link ?? undefined, // Only update if provided
        title,
        tags: tags ?? undefined, // Only update if provided
        share
      }
    }) as Content;

    res.status(200).json({
      message: 'Content updated successfully',
      content: {
        id: updatedContent.id,
        type: updatedContent.type,
        link: updatedContent.link,
        title: updatedContent.title,
        tags: updatedContent.tags,
        share: updatedContent.share,
        updatedAt: updatedContent.updatedAt
      }
    });

  } catch (error) {
    console.error('Content update error:', error);
    res.status(500).json({
      message: 'Error updating content'
    });
  }
};

// Delete content
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Check if content exists and belongs to user
    const existingContent = await prisma.content.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingContent) {
      return res.status(404).json({
        message: 'Content not found or access denied'
      });
    }

    // Delete content
    await prisma.content.delete({
      where: { id }
    });

    res.status(200).json({
      message: 'Content deleted successfully'
    });

  } catch (error) {
    console.error('Content deletion error:', error);
    res.status(500).json({
      message: 'Error deleting content'
    });
  }
};

// Toggle content sharing
export const toggleShare = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { share } = req.body as { share: boolean };
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    if (typeof share !== 'boolean') {
      return res.status(411).json({
        message: 'Share status must be a boolean'
      });
    }

    // Check if content exists and belongs to user
    const existingContent = await prisma.content.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingContent) {
      return res.status(404).json({
        message: 'Content not found or access denied'
      });
    }

    // Update share status
    const updatedContent = await prisma.content.update({
      where: { id },
      data: { share }
    });

    res.status(200).json({
      message: `Content ${share ? 'shared' : 'unshared'} successfully`,
      content: {
        id: updatedContent.id,
        share: updatedContent.share
      }
    });

  } catch (error) {
    console.error('Content share toggle error:', error);
    res.status(500).json({
      message: 'Error updating content share status'
    });
  }
};

// Get content by ID with access control
export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Find the content
    const content = await prisma.content.findUnique({
      where: { id }
    }) as Content | null;

    if (!content) {
      return res.status(404).json({
        message: 'Content not found'
      });
    }

    // Check access control
    const isOwner = content.userId === userId;
    const isShared = content.share;

    // If not owner and not shared, deny access
    if (!isOwner && !isShared) {
      return res.status(403).json({
        message: 'Access denied: This content is private'
      });
    }

    // Prepare response based on access level
    const response = {
      id: content.id,
      type: content.type,
      link: content.link,
      title: content.title,
      tags: content.tags,
      share: content.share,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
      // Only include owner info if the requesting user is the owner
      ...(isOwner && {
        owner: {
          id: userId,
          // You can add more owner details here if needed
        }
      })
    };

    res.status(200).json({
      message: 'Content retrieved successfully',
      content: response,
      access: {
        isOwner,
        isShared
      }
    });

  } catch (error) {
    console.error('Content retrieval error:', error);
    res.status(500).json({
      message: 'Error retrieving content'
    });
  }
}; 