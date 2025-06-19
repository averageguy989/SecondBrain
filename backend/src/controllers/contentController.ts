import { Request, Response } from 'express';
import prisma from '../config/prisma';

const prismaClient = prisma as any;

// create content
export const createContent = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { type, link, title, tags, shared } = req.body;

  if (!userId || !type || !link || !title) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const tagsArray: string[] = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        : [];

    console.log(tagsArray);
    const tagConnectData = [];

    for (const tagName of tagsArray) {
      const existingTag = await prismaClient.tag.findUnique({
        where: { name: tagName },
      });

      if (existingTag) {
        tagConnectData.push({ id: existingTag.id });
      } else {
        const newTag = await prismaClient.tag.create({
          data: { name: tagName },
        });
        tagConnectData.push({ id: newTag.id });
      }
    }

    const content = await prismaClient.content.create({
      data: {
        type,
        link,
        title,
        shared: shared ?? false,
        userId,
        tags: {
          connect: tagConnectData, // ✅ Must be [{ id }]
        },
      },
      include: {
        tags: true,
      },
    });

    res.status(201).json(content);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
};

// get content
export const getContent = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;
  try { 
    const content = await prismaClient.content.findMany({
      where: { userId },
      include: {
        tags: true,
      },
    });

    res.status(200).json(content);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Failed to get content' });
  }
};

// update content
export const updateContent = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;
  const { type, link, title, tags, shared } = req.body;

  const tagsArray: string[] = Array.isArray(tags)
    ? tags
    : typeof tags === 'string'
      ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : [];
  
  const tagConnectData = [];

  for (const tagName of tagsArray) {
    const existingTag = await prismaClient.tag.findUnique({
      where: { name: tagName },
    });

    if (existingTag) {
      tagConnectData.push({ id: existingTag.id });
    } else {
      const newTag = await prismaClient.tag.create({
        data: { name: tagName },
      });
      tagConnectData.push({ id: newTag.id });
    }
  }

  try {
    const content = await prismaClient.content.update({
      where: { id, userId },
      data: { type, link, title, tags: { connect: tagConnectData }, shared },
    });

    res.status(200).json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

// delete content
export const deleteContent = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  try {
    const content = await prismaClient.content.findUnique({
      where: { id: id, userId: userId },
    });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    await prismaClient.content.delete({
      where: { id, userId },
    });

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
};



