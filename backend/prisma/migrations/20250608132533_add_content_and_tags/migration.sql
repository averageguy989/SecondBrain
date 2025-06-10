-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('DOCUMENT', 'TWEET', 'YOUTUBE', 'LINK');

-- CreateTable
CREATE TABLE "contents" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "link" TEXT,
    "title" TEXT NOT NULL,
    "tags" TEXT[],
    "share" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
