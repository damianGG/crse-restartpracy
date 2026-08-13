import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
} from 'drizzle-orm/pg-core';

/* --------------------------------------------------------------------- */
/* Better Auth tables (verbatim column names required by Better Auth)    */
/* --------------------------------------------------------------------- */

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

/* --------------------------------------------------------------------- */
/* App tables                                                            */
/* --------------------------------------------------------------------- */

// Aktualności (news posts)
export const aktualnosci = pgTable('aktualnosci', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImageUrl: text('coverImageUrl'),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

// Files attached to a news post
export const aktualnosciPliki = pgTable('aktualnosci_pliki', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  aktualnoscId: integer('aktualnoscId')
    .notNull()
    .references(() => aktualnosci.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  url: text('url').notNull(),
  pathname: text('pathname').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

// Rekrutacja - single editable content block
export const rekrutacjaContent = pgTable('rekrutacja_content', {
  id: serial('id').primaryKey(),
  userId: text('userId'),
  title: text('title'),
  intro: text('intro'),
  content: text('content'),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

// Rekrutacja - downloadable files (forms, regulations, etc.)
export const rekrutacjaPliki = pgTable('rekrutacja_pliki', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  pathname: text('pathname').notNull(),
  position: integer('position').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

// Homepage editable content (Hero + About sections)
export const homepageContent = pgTable('homepage_content', {
  id: serial('id').primaryKey(),
  userId: text('userId'),
  heroTitle: text('heroTitle'),
  heroSubtitle: text('heroSubtitle'),
  heroImageUrl: text('heroImageUrl'),
  aboutTitle: text('aboutTitle'),
  aboutContent: text('aboutContent'),
  aboutImageUrl: text('aboutImageUrl'),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
