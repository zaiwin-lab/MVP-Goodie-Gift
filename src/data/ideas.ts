import type { Idea } from "../types";

/* ==========================================================================
   36 mock goodie ideas — six per colour personality.

   Ordered in rounds: the first idea of every colour forms the opening deck,
   the second forms the next, and so on. Six presses of "Show me 6 more"
   therefore give six completely fresh sets, each with all six colours.
   ========================================================================== */

export const IDEAS: Idea[] = [
  /* ================= COLOUR 1 — BLUE · practical, high quantity ============ */
  {
    id: "smart-crowd",
    colour: 1,
    label: "Under RM15",
    name: "Smart Crowd Pack",
    description:
      "Simple, useful goodies for large programmes without blowing the budget.",
    tags: ["Community", "Government", "High Quantity"],
    price: "RM8–RM15/person",
    priceMin: 8,
    priceMax: 15,
    story:
      "At a thousand participants, the only thing that matters is whether people keep it. One reusable pouch beats four disposable items, every time.",
    contents: [
      "Canvas zip pouch",
      "Bamboo pen",
      "Custom event sticker set",
      "QR souvenir card",
    ],
    bestFor: ["Mass programmes", "Community events", "Government roadshows"],
    categories: ["community", "government", "budget", "large", "practical"],
  },
  {
    id: "training-day",
    colour: 1,
    label: "Training",
    name: "Training Day Kit",
    description:
      "Everything a participant needs on the table before the first session starts.",
    tags: ["Training", "Workshop", "Practical"],
    price: "RM18–RM30/person",
    priceMin: 18,
    priceMax: 30,
    story:
      "Course organisers under-buy the basics and over-buy novelty. This covers the operational minimum at a controlled unit cost.",
    contents: [
      "Recycled A5 notebook",
      "Smooth-write pen",
      "RPET lanyard and card holder",
      "Folding phone stand",
    ],
    bestFor: ["Courses", "Bootcamps", "Capacity building"],
    categories: ["training", "workshop", "corporate", "practical", "education"],
  },
  {
    id: "registration-essentials",
    colour: 1,
    label: "Event Basics",
    name: "Registration Essentials",
    description:
      "The unglamorous kit that makes your registration counter look organised.",
    tags: ["Conference", "Essentials", "Bulk"],
    price: "RM6–RM12/person",
    priceMin: 6,
    priceMax: 12,
    story:
      "Nobody photographs a lanyard, but everyone notices when it is cheap. This is the quiet layer that sets the tone for the whole day.",
    contents: [
      "Recycled lanyard and holder",
      "Printed programme card",
      "Name badge insert",
      "Event sticker",
    ],
    bestFor: ["Conferences", "Seminars", "Large gatherings"],
    categories: ["conference", "budget", "essentials", "large"],
  },
  {
    id: "community-care",
    colour: 1,
    label: "Community",
    name: "Community Care Bag",
    description:
      "Goes home with the participant and stays useful in the household.",
    tags: ["Community", "Family", "High Retention"],
    price: "RM20–RM35/person",
    priceMin: 20,
    priceMax: 35,
    story:
      "At kampung programmes the household is the real recipient. Practical items get used by four people instead of one.",
    contents: [
      "Insulated cooler tote",
      "Pocket first aid kit",
      "Reusable shopping bag",
      "Bamboo pen",
    ],
    bestFor: ["Outreach", "Kampung programmes", "Welfare events"],
    categories: ["community", "family", "government", "practical"],
  },
  {
    id: "school-programme",
    colour: 1,
    label: "Education",
    name: "School Programme Pack",
    description:
      "Stationery-led goodies that parents approve of and students actually use.",
    tags: ["Education", "Students", "Useful"],
    price: "RM10–RM18/person",
    priceMin: 10,
    priceMax: 18,
    story:
      "School goodies are really parent-facing. Anything that ends up in a pencil case survives the term.",
    contents: [
      "Zip pencil case",
      "Stationery set",
      "Recycled notebook",
      "Sticker sheet",
    ],
    bestFor: ["School programmes", "Student outreach", "Education campaigns"],
    categories: ["education", "children", "students", "budget", "government"],
  },
  {
    id: "volunteer-crew",
    colour: 1,
    label: "Volunteers",
    name: "Volunteer Crew Set",
    description:
      "Kit your crew so they look like a team and survive a long event day.",
    tags: ["Crew", "Apparel", "Team"],
    price: "RM35–RM60/person",
    priceMin: 35,
    priceMax: 60,
    story:
      "Volunteers are your event photography whether you plan for it or not. Dress them properly and the whole programme looks organised.",
    contents: [
      "Cotton crew tee",
      "Embroidered cap",
      "Insulated bottle",
      "Crew lanyard",
    ],
    bestFor: ["Event crews", "Volunteers", "Organising committees"],
    categories: ["community", "sports", "crew", "apparel", "government"],
  },

  /* ================= COLOUR 2 — CORAL · VIP, premium, appreciation ======== */
  {
    id: "sarawak-executive",
    colour: 2,
    label: "VIP",
    name: "Sarawak Executive Box",
    description:
      "A premium appreciation gift with a distinctive Sarawak touch.",
    tags: ["VIP", "Premium", "Local"],
    price: "RM150+",
    priceMin: 150,
    priceMax: 250,
    story:
      "VIP gifting is judged in the first three seconds of opening. Rigid packaging and a named card do more for perceived value than a costlier item in a polybag.",
    contents: [
      "Premium local craft piece",
      "Sarawak pepper gift set",
      "Executive card holder",
      "Personalised appreciation card",
      "Rigid presentation box",
    ],
    bestFor: ["VIPs", "Speakers", "Official guests", "International delegates"],
    categories: ["vip", "premium", "sarawak", "government", "corporate"],
  },
  {
    id: "speaker-appreciation",
    colour: 2,
    label: "Speakers",
    name: "Speaker Appreciation Set",
    description:
      "Handed over on stage, opened on the plane. Flat, light and personal.",
    tags: ["Speakers", "Travel-friendly", "Premium"],
    price: "RM70–RM130/person",
    priceMin: 70,
    priceMax: 130,
    story:
      "Speaker gifts are given in front of an audience and carried through an airport. Weight and packaging matter more than unit price.",
    contents: [
      "Songket-trim card holder",
      "Illustrated Sarawak postcards",
      "Personalised thank-you card",
      "Slim presentation box",
    ],
    bestFor: ["Speakers", "Panellists", "Guests of honour"],
    categories: ["vip", "conference", "premium", "sarawak", "speakers"],
  },
  {
    id: "award-keepsake",
    colour: 2,
    label: "Awards",
    name: "Award Night Keepsake",
    description:
      "A recognition gift that does not end up on a shelf gathering dust.",
    tags: ["Awards", "Recognition", "Elegant"],
    price: "RM90–RM180/person",
    priceMin: 90,
    priceMax: 180,
    story:
      "Most award gifts are a trophy nobody wanted. Pair a small engraved keepsake with something genuinely usable and the night is remembered warmly.",
    contents: [
      "Engraved desk piece",
      "Studio ceramic mug",
      "Personalised citation card",
      "Magnetic gift box",
    ],
    bestFor: ["Award nights", "Recognition dinners", "Milestone events"],
    categories: ["awards", "corporate", "premium", "appreciation"],
  },
  {
    id: "long-service",
    colour: 2,
    label: "Appreciation",
    name: "Long Service Gift",
    description:
      "Says thank you properly, without sounding like it came from procurement.",
    tags: ["Appreciation", "Staff", "Personal"],
    price: "RM60–RM120/person",
    priceMin: 60,
    priceMax: 120,
    story:
      "Appreciation gifts fail when they feel issued rather than given. A named card and a soft-touch item change the register completely.",
    contents: [
      "Locally thrown ceramic mug",
      "Botanical balm from a local maker",
      "Personalised appreciation card",
      "Rigid gift box",
    ],
    bestFor: ["Long service awards", "Retirement", "Staff recognition"],
    categories: ["corporate", "appreciation", "premium", "staff"],
  },
  {
    id: "launch-gift",
    colour: 2,
    label: "Official",
    name: "Ministerial Launch Gift",
    description:
      "Formal enough for the stage, interesting enough to be remembered.",
    tags: ["Official", "Ceremony", "Sarawak"],
    price: "RM120–RM220/person",
    priceMin: 120,
    priceMax: 220,
    story:
      "Launching ceremonies leave no room for a fumbled hand-over. Everything here is boxed, light, and photographs well under stage lighting.",
    contents: [
      "Woven rattan piece",
      "Sarawak pepper set",
      "Foil-stamped citation card",
      "Ceremonial presentation box",
    ],
    bestFor: ["Launching ceremonies", "Official visits", "Dignitaries"],
    categories: ["vip", "government", "premium", "sarawak", "ceremony"],
  },
  {
    id: "partner-thankyou",
    colour: 2,
    label: "Partnerships",
    name: "Partner Thank-You Box",
    description:
      "For the sponsors and partners who made the whole thing possible.",
    tags: ["Sponsors", "Corporate", "Premium"],
    price: "RM80–RM160/person",
    priceMin: 80,
    priceMax: 160,
    story:
      "Sponsors rarely get thanked with anything but a logo on a backdrop. A considered box is remembered when next year's budget is discussed.",
    contents: [
      "Local delicacy selection",
      "Executive notebook",
      "Personalised partner card",
      "Premium packaging",
    ],
    bestFor: ["Sponsors", "Partners", "Client gifting"],
    categories: ["corporate", "premium", "appreciation", "partnerships"],
  },

  /* ================= COLOUR 3 — YELLOW · conference, travel, tourism ====== */
  {
    id: "delegate-traveller",
    colour: 3,
    label: "Conference",
    name: "Delegate Traveller Kit",
    description:
      "Useful travel-friendly gifts your visiting delegates can actually bring home.",
    tags: ["Conference", "Travel", "Sarawak"],
    price: "RM30–RM50/person",
    priceMin: 30,
    priceMax: 50,
    story:
      "Delegates arrive with a full suitcase. Everything here packs flat, survives the flight, and still says Sarawak when it lands.",
    contents: [
      "Sarawak motif designer tote",
      "Luggage tag",
      "Illustrated postcard set",
      "Travel cable organiser",
    ],
    bestFor: ["Conferences", "Visiting delegates", "International guests"],
    categories: ["conference", "travel", "sarawak", "tourism", "international"],
  },
  {
    id: "sarawak-welcome",
    colour: 3,
    label: "Tourism",
    name: "Sarawak Welcome Pack",
    description:
      "The first thing visitors open in the hotel room — make it count.",
    tags: ["Tourism", "Welcome", "Local"],
    price: "RM40–RM70/person",
    priceMin: 40,
    priceMax: 70,
    story:
      "A welcome pack sets the tone before your programme starts. Local snacks and a proper map beat a folder of printouts.",
    contents: [
      "Local snack selection",
      "Illustrated city guide",
      "Reusable water bottle",
      "Welcome note card",
    ],
    bestFor: ["Inbound visitors", "Hotel drops", "Familiarisation trips"],
    categories: ["tourism", "conference", "sarawak", "international", "welcome"],
  },
  {
    id: "trade-mission",
    colour: 3,
    label: "Delegation",
    name: "Trade Mission Set",
    description:
      "Professional, compact and easy to hand over across a meeting table.",
    tags: ["Business", "Delegation", "Professional"],
    price: "RM60–RM110/person",
    priceMin: 60,
    priceMax: 110,
    story:
      "On a trade mission you hand over gifts between meetings, not on a stage. Small, flat and unmistakably local is exactly right.",
    contents: [
      "Slim card holder",
      "Executive notebook",
      "Sarawak pepper miniature",
      "Business card case",
    ],
    bestFor: ["Trade missions", "Business delegations", "Bilateral meetings"],
    categories: ["corporate", "international", "sarawak", "business", "premium"],
  },
  {
    id: "summit-desk",
    colour: 3,
    label: "Summit",
    name: "Summit Desk Kit",
    description:
      "Things that stay on a delegate's desk long after the summit ends.",
    tags: ["Summit", "Desk", "Modern"],
    price: "RM45–RM80/person",
    priceMin: 45,
    priceMax: 80,
    story:
      "The desk is the most valuable real estate in event gifting. Anything that earns a place there keeps working for months.",
    contents: [
      "Felt laptop sleeve",
      "Aluminium phone stand",
      "Hardcover notebook",
      "Cable organiser",
    ],
    bestFor: ["Summits", "Multi-day conferences", "Corporate forums"],
    categories: ["conference", "corporate", "technology", "professional"],
  },
  {
    id: "media-crew",
    colour: 3,
    label: "Media",
    name: "Media Crew Pack",
    description:
      "For the journalists and content crew who cover your event all day.",
    tags: ["Media", "Press", "Practical"],
    price: "RM50–RM90/person",
    priceMin: 50,
    priceMax: 90,
    story:
      "Media crews run out of battery before they run out of stories. Solve that and your coverage improves by itself.",
    contents: [
      "Slim power bank",
      "Press lanyard",
      "Compact notebook",
      "Quick-dry towel",
    ],
    bestFor: ["Press corps", "Content crews", "Media days"],
    categories: ["media", "conference", "technology", "practical"],
  },
  {
    id: "festival-visitor",
    colour: 3,
    label: "Festivals",
    name: "Festival Visitor Pack",
    description:
      "Bright, cheerful and built to survive a full day outdoors.",
    tags: ["Festival", "Outdoor", "Fun"],
    price: "RM25–RM45/person",
    priceMin: 25,
    priceMax: 45,
    story:
      "Festival goodies compete with food stalls and music. Give something that solves a problem in the first ten minutes and it gets carried all day.",
    contents: [
      "Collapsible silicone cup",
      "Printed hand fan",
      "Drawstring bag",
      "Festival sticker set",
    ],
    bestFor: ["Festivals", "Carnivals", "Outdoor programmes"],
    categories: ["festival", "community", "tourism", "outdoor", "fun"],
  },

  /* ================= COLOUR 4 — GREEN · ESG, CSR, wellbeing =============== */
  {
    id: "eco-impact",
    colour: 4,
    label: "ESG",
    name: "Eco Impact Pack",
    description:
      "A thoughtful combination for sustainability and environmental programmes.",
    tags: ["ESG", "Eco", "CSR"],
    price: "RM20–RM40/person",
    priceMin: 20,
    priceMax: 40,
    story:
      "Built so a sustainability officer can explain every item — reusable where it matters, recycled where it does not, and one item that literally grows.",
    contents: [
      "Insulated steel bottle",
      "Recycled paper notebook",
      "Plantable seed paper card",
      "Kraft presentation box",
    ],
    bestFor: ["ESG programmes", "CSR days", "Environmental campaigns"],
    categories: ["esg", "eco", "csr", "government", "corporate"],
  },
  {
    id: "plant-it-forward",
    colour: 4,
    label: "Environment",
    name: "Plant It Forward Set",
    description:
      "A goodie that keeps growing after your programme is over.",
    tags: ["Environment", "Planting", "Memorable"],
    price: "RM12–RM25/person",
    priceMin: 12,
    priceMax: 25,
    story:
      "Tree planting days end with a photo and a shovel. Send participants home with something that continues the point on their own windowsill.",
    contents: [
      "Desk planter with seeds",
      "Seed paper card",
      "Recycled notebook",
      "Kraft sleeve",
    ],
    bestFor: ["Tree planting", "Environment days", "School programmes"],
    categories: ["esg", "eco", "community", "education", "government"],
  },
  {
    id: "zero-waste-table",
    colour: 4,
    label: "Zero Waste",
    name: "Zero Waste Table Kit",
    description:
      "Removes single-use plastic from your event without a lecture.",
    tags: ["Zero Waste", "Reusable", "Practical"],
    price: "RM30–RM55/person",
    priceMin: 30,
    priceMax: 55,
    story:
      "Venues are tightening single-use policies faster than most programmes adapt. This turns a compliance headache into the gift itself.",
    contents: [
      "Bamboo cutlery set",
      "Collapsible cup",
      "Beeswax food wrap",
      "Cotton carry pouch",
    ],
    bestFor: ["Zero waste events", "Green venues", "Sustainability weeks"],
    categories: ["esg", "eco", "zero-waste", "corporate", "government"],
  },
  {
    id: "wellness-reset",
    colour: 4,
    label: "Wellbeing",
    name: "Wellness Reset Box",
    description:
      "For teams and frontliners who have earned something genuinely restful.",
    tags: ["Wellbeing", "Staff", "Thoughtful"],
    price: "RM55–RM100/person",
    priceMin: 55,
    priceMax: 100,
    story:
      "Wellness gifting works when it is unmistakably for the person, not the organisation. Keep the branding light and the quality high.",
    contents: [
      "Botanical balm from a local maker",
      "Herbal tea selection",
      "Quick-dry towel",
      "Handwritten-style note card",
    ],
    bestFor: ["Staff wellbeing", "Frontline appreciation", "Retreats"],
    categories: ["corporate", "wellbeing", "appreciation", "staff", "women"],
  },
  {
    id: "local-makers",
    colour: 4,
    label: "CSR",
    name: "Local Makers Basket",
    description:
      "Every ringgit traceable to a maker — with a card that names them.",
    tags: ["CSR", "Artisan", "Sarawak"],
    price: "RM55–RM95/person",
    priceMin: 55,
    priceMax: 95,
    story:
      "Local sourcing turns a gift budget into a community outcome you can publish. The provenance card is what makes it count publicly.",
    contents: [
      "Community beadwork piece",
      "Woven rattan coasters",
      "Local botanical balm",
      "Provenance card",
      "Kraft presentation box",
    ],
    bestFor: ["CSR programmes", "Local economy initiatives", "Cultural events"],
    categories: ["csr", "sarawak", "esg", "government", "entrepreneurship"],
  },
  {
    id: "green-campus",
    colour: 4,
    label: "Sustainability",
    name: "Green Campus Pack",
    description:
      "Student-priced sustainability that does not feel like a compromise.",
    tags: ["Campus", "Eco", "Youth"],
    price: "RM15–RM28/person",
    priceMin: 15,
    priceMax: 28,
    story:
      "Students spot greenwashing instantly. Fewer items, better materials, and honest labelling land far better than a bag of eco-branded plastic.",
    contents: [
      "RPET drawstring bag",
      "Recycled notebook",
      "Bamboo pen",
      "Seed paper card",
    ],
    bestFor: ["Campus programmes", "Student sustainability", "Orientation"],
    categories: ["esg", "eco", "students", "university", "youth"],
  },

  /* ================= COLOUR 5 — PURPLE · youth, tech, enterprise ========== */
  {
    id: "young-digital",
    colour: 5,
    label: "Youth",
    name: "Young Digital Pack",
    description:
      "Modern everyday accessories designed for a digitally connected audience.",
    tags: ["Youth", "Technology", "Modern"],
    price: "RM20–RM35/person",
    priceMin: 20,
    priceMax: 35,
    story:
      "Young participants judge goodies on whether their friends notice them. Design-led stickers do more work here than an extra RM5 of material.",
    contents: [
      "Canvas pouch",
      "Folding phone stand",
      "Cable organiser",
      "Die-cut sticker set",
      "QR souvenir card",
    ],
    bestFor: ["Youth programmes", "Digitalisation events", "Universities"],
    categories: ["youth", "technology", "students", "government", "modern"],
  },
  {
    id: "campus-starter",
    colour: 5,
    label: "University",
    name: "Campus Starter Kit",
    description:
      "The orientation pack new students actually carry through first semester.",
    tags: ["University", "Orientation", "Students"],
    price: "RM25–RM45/person",
    priceMin: 25,
    priceMax: 45,
    story:
      "Orientation packs are opened in a crowded hall and judged in seconds. Lead with the tote and the rest is forgiven.",
    contents: [
      "Campus tote bag",
      "Recycled notebook",
      "Lanyard and card holder",
      "Sticker sheet",
    ],
    bestFor: ["Orientation", "Freshman week", "Campus events"],
    categories: ["university", "students", "youth", "education"],
  },
  {
    id: "founder-toolkit",
    colour: 5,
    label: "Entrepreneurship",
    name: "Founder Toolkit",
    description:
      "For pitch days, incubators and programmes that need to stay visible after.",
    tags: ["Startup", "Professional", "Follow-up"],
    price: "RM55–RM100/person",
    priceMin: 55,
    priceMax: 100,
    story:
      "Entrepreneurship programmes are judged on follow-through. A QR card linking to resources turns the goodie into a retention channel.",
    contents: [
      "Felt laptop sleeve",
      "Hardcover notebook",
      "Phone stand",
      "QR resource card",
    ],
    bestFor: ["Incubators", "Pitch days", "Startup programmes"],
    categories: ["entrepreneurship", "technology", "corporate", "training"],
  },
  {
    id: "hackathon-survival",
    colour: 5,
    label: "Technology",
    name: "Hackathon Survival Pack",
    description:
      "Everything needed to get a team through a 36-hour build weekend.",
    tags: ["Hackathon", "Tech", "Fun"],
    price: "RM35–RM65/person",
    priceMin: 35,
    priceMax: 65,
    story:
      "Hackathon goodies are used during the event, not after it. Solve a real 3am problem and your logo is on the winning team's desk.",
    contents: [
      "Power bank",
      "Metal webcam cover",
      "Cable organiser",
      "Caffeine and snack pack",
      "Laptop sticker set",
    ],
    bestFor: ["Hackathons", "Tech competitions", "Developer events"],
    categories: ["technology", "youth", "students", "university", "fun"],
  },
  {
    id: "women-in-business",
    colour: 5,
    label: "Women",
    name: "Women in Business Set",
    description:
      "Considered, practical and pitched well above the usual tote-and-pen.",
    tags: ["Women", "Enterprise", "Elegant"],
    price: "RM50–RM95/person",
    priceMin: 50,
    priceMax: 95,
    story:
      "Programmes for women entrepreneurs deserve gifting that reads as investment, not decoration. Function first, finished beautifully.",
    contents: [
      "Printed motif scarf",
      "Slim card holder",
      "Hardcover notebook",
      "Local botanical balm",
    ],
    bestFor: ["Women's programmes", "Enterprise workshops", "Networking events"],
    categories: ["women", "entrepreneurship", "corporate", "sarawak", "training"],
  },
  {
    id: "graduation-keepsake",
    colour: 5,
    label: "Graduation",
    name: "Graduation Keepsake",
    description:
      "A small, well-made memento for the day everyone photographs anyway.",
    tags: ["Graduation", "Keepsake", "Cohort"],
    price: "RM30–RM60/person",
    priceMin: 30,
    priceMax: 60,
    story:
      "Convocation gifts are kept for decades or lost in a week. The difference is almost always the packaging and the personalisation.",
    contents: [
      "Engraved keepsake pin",
      "Cohort photo card",
      "Compact notebook",
      "Presentation sleeve",
    ],
    bestFor: ["Convocation", "Graduation", "Programme completion"],
    categories: ["university", "students", "education", "appreciation"],
  },

  /* ================= COLOUR 6 — ORANGE · creative, fun, family ============ */
  {
    id: "not-another-mug",
    colour: 6,
    label: "Something Different",
    name: "Please, Not Another Mug!",
    description:
      "For organisers who want to escape predictable corporate gifts.",
    tags: ["Creative", "Corporate", "Fun"],
    price: "RM15–RM30/person",
    priceMin: 15,
    priceMax: 30,
    story:
      "Deliberately positioned against the mug-and-pen default. Everything here is something a 28-year-old would put on their own desk by choice.",
    contents: [
      "Aluminium phone stand",
      "Metal webcam cover",
      "Cable organiser",
      "Design-led sticker set",
      "Printed kraft box",
    ],
    bestFor: ["Modern corporate events", "Creative teams", "Young professionals"],
    categories: ["corporate", "creative", "youth", "technology", "fun"],
  },
  {
    id: "family-day",
    colour: 6,
    label: "Family",
    name: "Family Day Fun Bag",
    description:
      "One bag that keeps both the children and the parents happy.",
    tags: ["Family", "Outdoor", "Playful"],
    price: "RM22–RM40/person",
    priceMin: 22,
    priceMax: 40,
    story:
      "Family day goodies are carried by a parent within ten minutes. Make the bag good and everything inside gets a free ride home.",
    contents: [
      "Cooler tote bag",
      "Kids activity set",
      "Sun cap",
      "Pocket first aid kit",
    ],
    bestFor: ["Family days", "Company outings", "Community carnivals"],
    categories: ["family", "children", "community", "corporate", "outdoor"],
  },
  {
    id: "finishers-reward",
    colour: 6,
    label: "Sports",
    name: "Finisher's Reward",
    description:
      "Worn on the day, kept for training — the goodie that markets your event.",
    tags: ["Sports", "Apparel", "Team"],
    price: "RM45–RM80/person",
    priceMin: 45,
    priceMax: 80,
    story:
      "Apparel is the only goodie category that advertises your event while it is still happening. Sizing is the only real risk, and we plan for it.",
    contents: [
      "Technical event tee",
      "Quick-dry towel",
      "Insulated bottle",
      "Finisher medal ribbon",
    ],
    bestFor: ["Fun runs", "Tournaments", "Campus games"],
    categories: ["sports", "youth", "community", "apparel", "university"],
  },
  {
    id: "kids-discovery",
    colour: 6,
    label: "Children",
    name: "Kids Discovery Pack",
    description:
      "Safe, playful and quietly educational — parents approve on sight.",
    tags: ["Children", "Safe", "Educational"],
    price: "RM12–RM25/person",
    priceMin: 12,
    priceMax: 25,
    story:
      "Children's goodies are really parent-facing. Nothing here is a choking hazard, and the seed card turns into a school activity.",
    contents: [
      "Drawstring activity bag",
      "Colouring and sticker set",
      "Seed paper card",
      "Reusable drink bottle",
    ],
    bestFor: ["Children's programmes", "School events", "Family carnivals"],
    categories: ["children", "family", "education", "community", "eco"],
  },
  {
    id: "desk-rebellion",
    colour: 6,
    label: "Corporate Fun",
    name: "Office Desk Rebellion",
    description:
      "Small, funny, well-made objects that make a team dinner memorable.",
    tags: ["Creative", "Team", "Playful"],
    price: "RM30–RM55/person",
    priceMin: 30,
    priceMax: 55,
    story:
      "Teams notice when a company breaks the pattern. The point of this pack is the reaction in the room, not the unit cost.",
    contents: [
      "Desk toy or fidget piece",
      "Custom illustrated mug alternative",
      "Snack selection",
      "Personalised card",
    ],
    bestFor: ["Annual dinners", "Team building", "Creative agencies"],
    categories: ["corporate", "creative", "fun", "staff", "appreciation"],
  },
  {
    id: "open-house",
    colour: 6,
    label: "Festive",
    name: "Open House Goodie",
    description:
      "Warm, edible-led and unmistakably local — hospitality, not merchandise.",
    tags: ["Festive", "Edible", "Sarawak"],
    price: "RM25–RM50/person",
    priceMin: 25,
    priceMax: 50,
    story:
      "Festive gifting is judged on whether it gets shared at the table. Food from a known local maker outperforms branded objects every time.",
    contents: [
      "Mini Sarawak layer cake",
      "Local snack selection",
      "Festive greeting card",
      "Printed gift sleeve",
    ],
    bestFor: ["Open houses", "Gawai and Raya", "Festive client gifting"],
    categories: ["festival", "sarawak", "corporate", "government", "community"],
  },
];

/** Ideas grouped by colour, preserving round order. */
export const BY_COLOUR = [1, 2, 3, 4, 5, 6].map((c) =>
  IDEAS.filter((i) => i.colour === c),
);

/** Number of complete six-colour rounds available before ideas repeat. */
export const ROUNDS = Math.min(...BY_COLOUR.map((b) => b.length));

/** The deck shown for a given round — one idea of every colour, always six. */
export function deckForRound(round: number) {
  return BY_COLOUR.map((bucket) => bucket[round % bucket.length]);
}

export const IDEAS_BY_ID = Object.fromEntries(IDEAS.map((i) => [i.id, i]));
