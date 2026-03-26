import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// 샘플 users 테이블 (Supabase auth.users와 연동)
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Supabase auth.users의 id와 동일하게 맞춤
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// 샘플 posts 테이블
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content'),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
