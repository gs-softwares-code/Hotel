import { sql, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ==========================================
// 1. USERS & LUCIA AUTH
// ==========================================

export const UserRoleEnum = z.enum(["ADMIN", "EDITOR", "GUEST", "B2B_AGENT"]);
export type UserRole = z.infer<typeof UserRoleEnum>;

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // string UUID / nanoId
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["ADMIN", "EDITOR", "GUEST", "B2B_AGENT"] })
    .notNull()
    .default("GUEST"),
  phone: text("phone"),
  country: text("country"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

// ==========================================
// 2. PROPERTIES (HOTELS & BRANDS)
// ==========================================

export const properties = sqliteTable("properties", {
  id: text("id").primaryKey(),
  brandId: text("brand_id").notNull(), // e.g., 'aura-reserve', 'aura-regency', 'aura-horizon'
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  region: text("region").notNull(), // e.g. "apac", "emea", "americas"
  country: text("country").notNull(), // e.g. "france", "japan", "usa"
  city: text("city").notNull(),
  address: text("address").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  starRating: integer("star_rating").notNull().default(5),
  status: text("status", { enum: ["DRAFT", "PUBLISHED"] })
    .notNull()
    .default("DRAFT"),
  translationsJson: text("translations_json"),
  featuredImageUrl: text("featured_image_url"),
  phone: text("phone"),
  email: text("email"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const propertyImages = sqliteTable("property_images", {
  id: text("id").primaryKey(),
  propertyId: text("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text").notNull(),
  category: text("category").notNull().default("all"), // e.g. "rooms", "dining", "wellness", "architecture"
  order: integer("order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

// ==========================================
// 3. ROOMS & BOOKINGS
// ==========================================

export const roomTypes = sqliteTable("room_types", {
  id: text("id").primaryKey(),
  propertyId: text("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  basePrice: real("base_price").notNull(), // Nightly base rate in USD
  capacity: integer("capacity").notNull().default(2),
  sizeSqFt: integer("size_sq_ft").default(750),
  bedType: text("bed_type").default("King Size Imperial Bed"),
  amenitiesJson: text("amenities_json"),
  imageUrl: text("image_url"),
  availableCount: integer("available_count").default(5),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  propertyId: text("property_id").references(() => properties.id, { onDelete: "cascade" }),
  roomId: text("room_id")
    .notNull()
    .references(() => roomTypes.id, { onDelete: "cascade" }),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone"),
  specialRequests: text("special_requests"),
  checkIn: integer("check_in", { mode: "timestamp" }).notNull(),
  checkOut: integer("check_out", { mode: "timestamp" }).notNull(),
  adultsCount: integer("adults_count").default(2),
  childrenCount: integer("children_count").default(0),
  status: text("status", { enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] })
    .notNull()
    .default("CONFIRMED"),
  totalAmount: real("total_amount").notNull(),
  paymentStatus: text("payment_status", { enum: ["PAID", "PAY_AT_CHECKIN", "REFUNDED"] })
    .notNull()
    .default("CONFIRMED" as any),
  bookingReference: text("booking_reference").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

// ==========================================
// 4. DINING & TABLE RESERVATIONS
// ==========================================

export const diningVenues = sqliteTable("dining_venues", {
  id: text("id").primaryKey(),
  propertyId: text("property_id").references(() => properties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  cuisine: text("cuisine").notNull(),
  description: text("description").notNull(),
  hours: text("hours").notNull(),
  dressCode: text("dress_code").default("Smart Elegant"),
  imageUrl: text("image_url").notNull(),
  menuHighlightsJson: text("menu_highlights_json"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const diningReservations = sqliteTable("dining_reservations", {
  id: text("id").primaryKey(),
  venueId: text("venue_id")
    .notNull()
    .references(() => diningVenues.id, { onDelete: "cascade" }),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone"),
  reservationDate: text("reservation_date").notNull(), // YYYY-MM-DD
  reservationTime: text("reservation_time").notNull(), // e.g. "19:30"
  partySize: integer("party_size").notNull().default(2),
  specialRequests: text("special_requests"),
  status: text("status", { enum: ["CONFIRMED", "CANCELLED", "COMPLETED"] })
    .notNull()
    .default("CONFIRMED"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

// ==========================================
// 5. INQUIRIES & CONTACT
// ==========================================

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  category: text("category", { enum: ["GENERAL", "RESERVATION", "EVENTS", "PRESS", "CONCIERGE"] })
    .notNull()
    .default("GENERAL"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status", { enum: ["NEW", "RESPONDED", "ARCHIVED"] })
    .notNull()
    .default("NEW"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

// ==========================================
// 6. CONTENT & CMS (PRESS & ESG)
// ==========================================

export const pressReleases = sqliteTable("press_releases", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  publishDate: integer("publish_date", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  status: text("status", { enum: ["DRAFT", "PUBLISHED"] })
    .notNull()
    .default("DRAFT"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const esgMetrics = sqliteTable("esg_metrics", {
  id: text("id").primaryKey(),
  year: integer("year").notNull().unique(),
  carbonReduction: real("carbon_reduction").notNull(),
  diversityScore: real("diversity_score").notNull(),
  communityInvestment: real("community_investment").notNull(),
  renewableEnergyPct: real("renewable_energy_pct").notNull().default(0),
  waterSavedMGal: real("water_saved_m_gal").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

// ==========================================
// 7. LOYALTY & B2B
// ==========================================

export const loyaltyTiers = sqliteTable("loyalty_tiers", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  multiplier: real("multiplier").notNull().default(1.0),
  benefits: text("benefits").notNull(),
  minPoints: integer("min_points").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export const b2bAgents = sqliteTable("b2b_agents", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyName: text("company_name").notNull(),
  gdsCode: text("gds_code").notNull().unique(),
  commissionRate: real("commission_rate").notNull().default(0.1),
  status: text("status", { enum: ["PENDING", "APPROVED", "SUSPENDED"] })
    .notNull()
    .default("APPROVED"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

// ==========================================
// DRIZZLE RELATIONS
// ==========================================

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  bookings: many(bookings),
  b2bProfile: one(b2bAgents, {
    fields: [users.id],
    references: [b2bAgents.userId],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const propertiesRelations = relations(properties, ({ many }) => ({
  images: many(propertyImages),
  roomTypes: many(roomTypes),
  diningVenues: many(diningVenues),
  bookings: many(bookings),
}));

export const propertyImagesRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, {
    fields: [propertyImages.propertyId],
    references: [properties.id],
  }),
}));

export const roomTypesRelations = relations(roomTypes, ({ one, many }) => ({
  property: one(properties, {
    fields: [roomTypes.propertyId],
    references: [properties.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  property: one(properties, {
    fields: [bookings.propertyId],
    references: [properties.id],
  }),
  roomType: one(roomTypes, {
    fields: [bookings.roomId],
    references: [roomTypes.id],
  }),
}));

export const diningVenuesRelations = relations(diningVenues, ({ one, many }) => ({
  property: one(properties, {
    fields: [diningVenues.propertyId],
    references: [properties.id],
  }),
  reservations: many(diningReservations),
}));

export const diningReservationsRelations = relations(diningReservations, ({ one }) => ({
  venue: one(diningVenues, {
    fields: [diningReservations.venueId],
    references: [diningVenues.id],
  }),
}));

export const b2bAgentsRelations = relations(b2bAgents, ({ one }) => ({
  user: one(users, {
    fields: [b2bAgents.userId],
    references: [users.id],
  }),
}));

// ==========================================
// ZOD SCHEMAS & TYPES
// ==========================================

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertPropertySchema = createInsertSchema(properties);
export const selectPropertySchema = createSelectSchema(properties);

export const insertRoomTypeSchema = createInsertSchema(roomTypes);
export const selectRoomTypeSchema = createSelectSchema(roomTypes);

export const insertBookingSchema = createInsertSchema(bookings);
export const selectBookingSchema = createSelectSchema(bookings);

export const insertDiningVenueSchema = createInsertSchema(diningVenues);
export const selectDiningVenueSchema = createSelectSchema(diningVenues);

export const insertDiningReservationSchema = createInsertSchema(diningReservations);
export const selectDiningReservationSchema = createSelectSchema(diningReservations);

export const insertInquirySchema = createInsertSchema(inquiries);
export const selectInquirySchema = createSelectSchema(inquiries);

export const insertPressReleaseSchema = createInsertSchema(pressReleases);
export const selectPressReleaseSchema = createSelectSchema(pressReleases);

export const insertEsgMetricSchema = createInsertSchema(esgMetrics);
export const selectEsgMetricSchema = createSelectSchema(esgMetrics);

export const insertB2BAgentSchema = createInsertSchema(b2bAgents);
export const selectB2BAgentSchema = createSelectSchema(b2bAgents);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type PropertyImage = typeof propertyImages.$inferSelect;
export type RoomType = typeof roomTypes.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type DiningVenue = typeof diningVenues.$inferSelect;
export type DiningReservation = typeof diningReservations.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type PressRelease = typeof pressReleases.$inferSelect;
export type EsgMetric = typeof esgMetrics.$inferSelect;
export type LoyaltyTier = typeof loyaltyTiers.$inferSelect;
export type B2BAgent = typeof b2bAgents.$inferSelect;
