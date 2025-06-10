import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
export const prisma = new PrismaClient();

// Handle cleanup on application shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
}); 