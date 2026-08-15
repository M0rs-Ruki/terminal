-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postSlug" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "body" TEXT,
    "stickerId" TEXT,
    "visitorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "comment_body_or_sticker_required" CHECK ("body" IS NOT NULL OR "stickerId" IS NOT NULL)
);

-- CreateTable
CREATE TABLE "BlogView" (
    "id" SERIAL NOT NULL,
    "postSlug" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_postSlug_id_idx" ON "Comment"("postSlug", "id");

-- CreateIndex
CREATE INDEX "Comment_visitorId_postSlug_createdAt_idx" ON "Comment"("visitorId", "postSlug", "createdAt");

-- CreateIndex
CREATE INDEX "BlogView_postSlug_idx" ON "BlogView"("postSlug");

-- CreateIndex
CREATE INDEX "BlogView_visitorId_postSlug_viewedAt_idx" ON "BlogView"("visitorId", "postSlug", "viewedAt");
