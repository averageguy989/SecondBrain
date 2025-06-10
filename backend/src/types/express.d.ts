import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export type ContentType = 'DOCUMENT' | 'TWEET' | 'YOUTUBE' | 'LINK';

export interface ContentInput {
  type: ContentType;
  link?: string | null;
  title: string;
  tags?: string[];
  share?: boolean;
}

export interface Content {
  id: string;
  type: ContentType;
  link: string | null;
  title: string;
  tags: string[];
  share: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
} 