import { pgTable, serial, text, varchar, timestamp, integer, boolean, decimal, index } from "drizzle-orm/pg-core";

// 사용자 프로필
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  avatar: varchar('avatar', { length: 512 }),
  bio: text('bio'),
  role: varchar('role', { length: 50 }).default('user'), // user, admin, moderator
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}));

// 게시물
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  content: text('content').notNull(),
  image: varchar('image', { length: 512 }),
  published: boolean('published').default(false),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('posts_user_id_idx').on(table.userId),
  publishedIdx: index('posts_published_idx').on(table.published),
}));

// 댓글
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  postIdIdx: index('comments_post_id_idx').on(table.postId),
  userIdIdx: index('comments_user_id_idx').on(table.userId),
}));

// 좋아요
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  postIdUserIdIdx: index('likes_post_id_user_id_idx').on(table.postId, table.userId),
}));

// 팔로우
export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  followerId: integer('follower_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  followingId: integer('following_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  followerIdIdx: index('follows_follower_id_idx').on(table.followerId),
}));