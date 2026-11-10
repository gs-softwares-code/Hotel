import { db, users, properties, roomTypes, pressReleases, esgMetrics, loyaltyTiers, b2bAgents } from "@/db";
import { hashPassword } from "@/lib/crypto";

export async function runDirectSeed() {
  const adminPasswordHash = await hashPassword("AuraAdmin2026!Secure");
  const agentPasswordHash = await hashPassword("AgentVirtuoso2026!");

  try {
    // 1. Seed Staff Users
    await db.insert(users).values([
      {
        id: "usr_admin_001",
        email: "executive@aurahotels.internal",
        passwordHash: adminPasswordHash,
        name: "Victoria Kensington (EVP Global Brand)",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_editor_001",
        email: "editor@aurahotels.internal",
        passwordHash: adminPasswordHash,
        name: "Marcus Vance (Chief Communications)",
        role: "EDITOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_guest_001",
        email: "guest.vip@sovereign.ch",
        passwordHash: adminPasswordHash,
        name: "Lord Sterling Archer",
        role: "GUEST",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_agent_001",
        email: "concierge@virtuosoprivate.com",
        passwordHash: agentPasswordHash,
        name: "Helena Rostova (Luxury Travel Desk)",
        role: "B2B_AGENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 2. Seed Published Flagships
    await db.insert(properties).values([
      {
        id: "prop_kyoto_01",
        brandId: "aura-reserve",
        name: "Aura Reserve Kyoto",
        slug: "aura-reserve-kyoto",
        description:
          "Secluded amid ancient bamboo groves in Higashiyama, where sacred heritage meets private onsen sanctuaries.",
        region: "apac",
        country: "japan",
        city: "Kyoto",
        address: "12 Higashiyama Sanctuary Way",
        latitude: 34.9989,
        longitude: 135.7807,
        starRating: 5,
        status: "PUBLISHED",
        featuredImageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200",
        translationsJson: JSON.stringify({
          fr: { name: "Aura Réserve Kyoto", description: "Sanctuaire isolé dans les bambouseraies d'Higashiyama." },
          zh: { name: "Aura 隐世精选·京都", description: "隐匿于东山千年竹林深处，私享天然温泉与神圣遗产。" },
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_paris_01",
        brandId: "aura-regency",
        name: "Aura Regency Vendôme",
        slug: "aura-regency-vendome",
        description:
          "Haute luxury across Place Vendôme. Majestic 19th-century salon architecture, private courtyard gardens, and three-star gastronomy.",
        region: "emea",
        country: "france",
        city: "Paris",
        address: "18 Place Vendôme, Paris",
        latitude: 48.8675,
        longitude: 2.3294,
        starRating: 5,
        status: "PUBLISHED",
        featuredImageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200",
        translationsJson: JSON.stringify({
          fr: { name: "Aura Régence Vendôme", description: "Haute hôtellerie sur la Place Vendôme avec jardins privés." },
          zh: { name: "Aura 丽晶·巴黎旺多姆", description: "坐落于旺多姆广场，19世纪皇家沙龙建筑与米其林三星美馔。" },
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_aspen_01",
        brandId: "aura-horizon",
        name: "Aura Horizon Alpine Sanctuary",
        slug: "aura-horizon-aspen",
        description:
          "Ski-in ski-out modern timber architecture high above Aspen valley. Panoramic snow vistas, private chalets, and thermal spas.",
        region: "americas",
        country: "usa",
        city: "Aspen",
        address: "500 Mountain Crest Way, Aspen CO",
        latitude: 39.1911,
        longitude: -106.8175,
        starRating: 5,
        status: "PUBLISHED",
        featuredImageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200",
        translationsJson: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_zermatt_draft",
        brandId: "aura-reserve",
        name: "Aura Matterhorn Observatory Villa",
        slug: "aura-matterhorn-villa",
        description: "Private observatory dome facing Matterhorn north wall. (Under audit).",
        region: "emea",
        country: "switzerland",
        city: "Zermatt",
        address: "Via Gornergrat 88, Zermatt",
        latitude: 45.9763,
        longitude: 7.7491,
        starRating: 5,
        status: "DRAFT", // Confirms RBAC draft isolation
        featuredImageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200",
        translationsJson: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 3. Seed Rooms & Suites
    await db.insert(roomTypes).values([
      {
        id: "rm_kyoto_pavilion",
        propertyId: "prop_kyoto_01",
        name: "Imperial Bamboo Pavilion Suite",
        description: "Private cedar onsen terrace, tatami tea chamber, and stone meditation garden.",
        basePrice: 1850,
        capacity: 2,
        amenitiesJson: JSON.stringify(["Private Onsen", "Butler Service", "Tea Master Experience", "Biometric Lock"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "rm_paris_salon",
        propertyId: "prop_paris_01",
        name: "Vendôme Presidential Salon",
        description: "Gold-leaf ceilings, grand piano, Baccarat crystal chandeliers, and private courtyard loggia.",
        basePrice: 3400,
        capacity: 4,
        amenitiesJson: JSON.stringify(["Rolls-Royce Motorcade", "Private Sommelier", "Balcony on Place Vendôme"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 4. Seed Press Releases
    await db.insert(pressReleases).values([
      {
        id: "pr-1",
        title: "Aura Conglomerate Announces Flagship Opening in Historic Kyoto",
        slug: "aura-flagship-kyoto-opening",
        summary: "Ultra-luxury sanctuary featuring private cedar onsens opens bookings for autumn 2026.",
        content: "# FOR IMMEDIATE RELEASE\n\nAura Global Hospitality Group Inc. (NYSE: AURA) announces the grand opening...",
        status: "PUBLISHED",
        publishDate: new Date("2026-10-18"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "pr-2",
        title: "Q3 2026 Financial Results: RevPAR Advances 18.4% Across Flagships",
        slug: "q3-2026-financial-results",
        summary: "EBITDA margins expand to 46.2% following strategic Alpine acquisition.",
        content: "# Q3 2026 EARNINGS DISCLOSURE\n\nOperating performance across all sovereign properties continues to beat consensus...",
        status: "PUBLISHED",
        publishDate: new Date("2026-09-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 5. Seed ESG Benchmarks
    await db.insert(esgMetrics).values([
      {
        id: "esg_2026",
        year: 2026,
        carbonReduction: 44.6,
        diversityScore: 94.2,
        communityInvestment: 42.5,
        renewableEnergyPct: 82.4,
        waterSavedMGal: 148.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 6. Seed Loyalty Tiers
    await db.insert(loyaltyTiers).values([
      {
        id: "tier_ambassador",
        name: "Ambassador Reserve",
        multiplier: 3.5,
        benefits: "Guaranteed presidential upgrade, private helicopter transfers, 24/7 dedicated butler, discrete biometric check-in.",
        minPoints: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 7. Seed B2B Agent Profile
    await db.insert(b2bAgents).values([
      {
        id: "b2b_agent_001",
        userId: "usr_agent_001",
        companyName: "Virtuoso Private Travel Group Ltd",
        gdsCode: "AU-VIRTUOSO-982",
        commissionRate: 0.12,
        status: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

