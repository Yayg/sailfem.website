/*
  Warnings:

  - Renamed `userId` to `ownerId` (preserves existing ownership instead of
    dropping it) and made it nullable: null now means "owned by the clan"
    rather than a specific member.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_userId_fkey";

-- RenameColumn (preserves existing data, unlike drop+add)
ALTER TABLE "Equipment" RENAME COLUMN "userId" TO "ownerId";
ALTER TABLE "Equipment" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "equippedByUserId" TEXT,
ADD COLUMN     "slot" TEXT;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_equippedByUserId_fkey" FOREIGN KEY ("equippedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
