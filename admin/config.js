/* ═══════════════════════════════════════════════════════
   Webnari CMS — Site Configuration
   Client: Jade's Spice (@jades_spice)
   ═══════════════════════════════════════════════════════ */
window.CMS_CONFIG = {
  /* ── Branding ─────────────────────────────────── */
  siteName: "Jade's Spice",
  siteTagline: "Content Manager",
  accentColor: "#D94040",
  accentGradient: "linear-gradient(135deg, #D94040, #F0A830)",

  /* ── Live Site URL ────────────────────────────── */
  siteUrl: "https://jadesspice.com",

  /* ── CMS API (Cloudflare Worker proxy) ──────── */
  apiUrl: "https://webnari-cms.webnari.workers.dev",

  /* ── GitHub Target ────────────────────────────── */
  github: {
    owner: "coding1017",
    repo: "jadesspice",
    branch: "main",
    dataFile: "site-data.json",
    imageDir: "images/uploads"
  },

  /* ── Auth (SHA-256 of password) ────────────────── */
  // Password: "JadesSpice@2026!" → SHA-256 hash below
  passwordHash: "4ef984cbcaa678fcdd7ecd6162254ac4fc5fcc9fa4212bc38a9c5c80b1091563",

  /* ── Section Definitions ──────────────────────── */
  sections: [
    {
      key: "hero",
      label: "Hero",
      icon: "home",
      type: "hero",
      fields: [
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "headline", label: "Headline", type: "textarea", help: "Use newlines for line breaks" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "ctaText", label: "Primary Button Text", type: "text" },
        { key: "ctaLink", label: "Primary Button Link", type: "text" },
        { key: "secondaryCtaText", label: "Secondary Button Text", type: "text" },
        { key: "secondaryCtaLink", label: "Secondary Button Link", type: "text" }
      ]
    },
    {
      key: "sections.featured_meals",
      label: "Featured Meals",
      icon: "utensils",
      type: "card_list",
      max: 8,
      itemLabel: "meal",
      fields: [
        { key: "name", label: "Meal Name", type: "text", required: true },
        { key: "description", label: "Short Description", type: "textarea", maxLength: 200, help: "Shows on the menu card" },
        { key: "longDescription", label: "Full Description", type: "textarea", maxLength: 500, help: "Detailed writeup for the meal detail view" },
        { key: "image", label: "Photo", type: "image" },
        { key: "tag", label: "Cuisine Tag", type: "select", options: ["Chinese", "Fusion", "Healthy", "Comfort"] },
        { key: "servingSize", label: "Serving Size", type: "text", placeholder: "e.g. 12 oz / 340g" },
        { key: "price", label: "Price", type: "text", placeholder: "e.g. $14.99" },
        { key: "spiceLevel", label: "Spice Level", type: "select", options: ["Mild", "Medium", "Spicy", "Extra Spicy"] },
        { key: "fields.protein", label: "Protein", type: "text", placeholder: "e.g. 55g", group: "macros" },
        { key: "fields.calories", label: "Calories", type: "text", placeholder: "e.g. 445", group: "macros" },
        { key: "fields.carbs", label: "Carbs", type: "text", placeholder: "e.g. 33g", group: "macros" },
        { key: "fields.fat", label: "Fat", type: "text", placeholder: "e.g. 12g", group: "macros" },
        { key: "fields.fiber", label: "Fiber", type: "text", placeholder: "e.g. 4g", group: "macros" },
        { key: "fields.sodium", label: "Sodium", type: "text", placeholder: "e.g. 580mg", group: "macros" },
        { key: "fields.sugar", label: "Sugar", type: "text", placeholder: "e.g. 6g", group: "macros" },
        { key: "ingredients", label: "Key Ingredients", type: "textarea", help: "Comma-separated list of main ingredients", group: "details" },
        { key: "allergens", label: "Allergens", type: "text", placeholder: "e.g. Soy, Sesame, Gluten", group: "details" },
        { key: "cookingSteps", label: "How It's Made", type: "textarea", maxLength: 1000, help: "Optional step-by-step cooking process", group: "details" },
        { key: "reheatingTips", label: "Reheating Instructions", type: "textarea", help: "e.g. Microwave 2-3 min, stovetop 5 min", group: "details" },
        { key: "shelfLife", label: "Shelf Life", type: "text", placeholder: "e.g. 5 days refrigerated, 30 days frozen", group: "details" }
      ]
    },
    {
      key: "sections.about",
      label: "About",
      icon: "heart",
      type: "rich_text",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "image", label: "Photo", type: "image" }
      ]
    },
    {
      key: "contact",
      label: "Contact",
      icon: "at-sign",
      type: "key_value",
      fields: [
        { key: "instagram", label: "Instagram URL", type: "text" },
        { key: "instagramHandle", label: "Instagram Handle", type: "text", help: "e.g. @jades_spice" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Phone", type: "text" },
        { key: "orderLink", label: "Order Link (DM/URL)", type: "text", help: "Where the Order Now button goes" }
      ]
    },
    {
      key: "sections.testimonials",
      label: "Reviews",
      icon: "star",
      type: "card_list",
      max: 6,
      itemLabel: "review",
      fields: [
        { key: "text", label: "Review Text", type: "textarea", required: true },
        { key: "author", label: "Name", type: "text" },
        { key: "source", label: "Source", type: "text", placeholder: "e.g. via Instagram" },
        { key: "rating", label: "Stars", type: "select", options: ["5", "4", "3"] }
      ]
    },
    {
      key: "sections.kitchen",
      label: "Kitchen Videos",
      icon: "video",
      type: "card_list",
      max: 6,
      itemLabel: "video",
      fields: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Thumbnail", type: "image" },
        { key: "label", label: "Label Tag", type: "text", placeholder: "e.g. Meal Prep Day" },
        { key: "link", label: "Instagram Reel Link", type: "text" }
      ]
    },
    {
      key: "seo",
      label: "SEO",
      icon: "search",
      type: "key_value",
      fields: [
        { key: "title", label: "Page Title", type: "text", help: "Shows in browser tab and Google results" },
        { key: "description", label: "Meta Description", type: "textarea", help: "Shows under title in Google results (150-160 chars)", maxLength: 160 },
        { key: "ogTitle", label: "Social Share Title", type: "text", help: "Title when shared on Facebook/Twitter" },
        { key: "ogDescription", label: "Social Share Description", type: "textarea", help: "Description when shared on social media" }
      ]
    }
  ]
};
