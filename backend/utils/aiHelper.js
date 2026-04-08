/**
 * AI Travel Plan Generator (DATA-MAX v5.0)
 * Expanded with 5 Hotels, 5 Restaurants, 5 Landmarks, and 5 Historical Sites per city.
 * Supports up to 14 days of balanced, high-density content.
 */

const commonLeisure = [
  { name: "Local Market Exploration", type: "Leisure", description: "Wander through the vibrant local bazaars, sampling street food and shopping for souvenirs." },
  { name: "Evening Stroll & Photography", type: "Leisure", description: "A relaxed walk through scenic areas of the city to capture the local vibe during the golden hour." },
  { name: "Cafe Hopping", type: "Leisure", description: "Visit some of the most popular local cafes to try regional beverages and relax with a book." },
  { name: "Temple/Church Architecture Study", type: "Leisure", description: "A slow-paced visit to minor local shrines to appreciate the intricate local architecture and peaceful vibes." },
  { name: "Local Culinary Tour", type: "Leisure", description: "Join a self-guided food walk to discover the city's hidden culinary gems and iconic eateries." },
  { name: "Relax at Public Parks", type: "Leisure", description: "Spend a quiet afternoon in one of the city's green lungs, observing local life." },
  { name: "Street Mural Hunt", type: "Leisure", description: "Explore the city's street art scene and colorful murals in urban neighborhoods." },
  { name: "Souvenir Shopping Spree", type: "Leisure", description: "Visit traditional handicraft stores to pick up unique local gifts and artwork." },
  { name: "Regional Snack Tasting", type: "Leisure", description: "Head to a famous local bakery/snack shop to try the city's signature delicacies." }
];

const destinations = {
  "warangal": {
    temples: [
      { name: "Thousand Pillar Temple", location: "Hanamkonda", history: { dynasty: "Kakatiya", year: 1163, builder: "Rudra Deva", importance: "Masterpiece of Kakatiya architecture with 1000 pillars" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Ramappa Temple", location: "Palampet", history: { dynasty: "Kakatiya", year: 1213, builder: "Recherla Rudra", importance: "UNESCO World Heritage Site with floating bricks" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Bhadrakali Temple", location: "Near Bhadrakali Lake", history: { dynasty: "Chalukya", year: 625, builder: "Pulakeshin II", importance: "One of the oldest temples for Goddess Bhadrakali" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Padmakshi Temple", location: "Hanamkonda", history: { dynasty: "Kakatiya", year: 1150, builder: "Prolla II", importance: "Jain and Hindu hybrid architecture on a hilltop" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.4 },
      { name: "Inavolu Mallikarjuna Temple", location: "Inavolu", history: { dynasty: "Kakatiya", year: 1100, builder: "Unknown", importance: "Famous for its unique Jathara festivals" }, timings: "5:00 AM – 7:00 PM", entryFee: "Free", rating: 4.5 }
    ],
    famous_places: [
      { name: "Warangal Fort", location: "Mathwada", description: "13th-century fort featuring iconic stone arches (Kakatiya Toranas)." },
      { name: "Laknavaram Lake", location: "Govindaraopet", description: "Scenic lake with a suspension bridge and island resorts." },
      { name: "Pakhal Lake & Wildlife Sanctuary", location: "Narsampet", description: "Stunning lake surrounded by lush green hilly terrain and wildlife." },
      { name: "Kakatiya Musical Garden", location: "Near Bhadrakali Temple", description: "A beautifully landscaped garden featuring a musical fountain." },
      { name: "Eturnagaram Wildlife Sanctuary", location: "Eturnagaram", description: "One of the oldest wildlife sanctuaries in Telangana." }
    ],
    hotels: [
      { name: "Hotel Suprabha", location: "Hanamkonda", pricePerNight: 2800, rating: 4.3 },
      { name: "Hotel Skyland", location: "Station Road", pricePerNight: 1800, rating: 4.1 },
      { name: "Kola’s Grand", location: "Warangal City", pricePerNight: 1500, rating: 3.9 },
      { name: "Hotel O Railway Station", location: "Warangal", pricePerNight: 1200, rating: 3.8 },
      { name: "FabHotel Lake View", location: "Nakkalagutta", pricePerNight: 2200, rating: 4.0 }
    ],
    restaurants: [
      { name: "Green Bawarchi", cuisine: "Biryani", location: "Hanamkonda", rating: 4.2 },
      { name: "Khursheed Hotel", cuisine: "Hyderabadi", location: "Warangal City", rating: 4.5 },
      { name: "Green Park Biryani", cuisine: "Mughlai", location: "Subedari", rating: 4.1 },
      { name: "Skyv Pure Veg", cuisine: "South Indian", location: "Hanamkonda", rating: 4.3 },
      { name: "Mandi.com", cuisine: "Arabic", location: "Kazipet", rating: 4.4 }
    ],
    places_pool: [
      // ... same deep pool for daily schedule generation ...
      { name: "Thousand Pillar Temple", location: "Hanamkonda", type: "Temple" },
      { name: "Warangal Fort Ruins", location: "Mathwada", type: "Landmark" },
      { name: "Ramappa Temple", location: "Palampet", type: "Temple" },
      { name: "Bhadrakali Temple", location: "Warangal", type: "Temple" },
      { name: "Laknavaram Lake", location: "Govindaraopet", type: "Landmark" },
      { name: "Pakhal Lake & Sanctuary", location: "Narsampet", type: "Wildlife" },
      { name: "Eturnagaram Forest", location: "Eturnagaram", type: "Wildlife" },
      { name: "Padmakshi Temple", location: "Hanamkonda", type: "Temple" },
      { name: "Kakatiya Musical Garden", location: "Warangal", type: "Garden" },
      { name: "Kakatiya Rock Garden", location: "Warangal", type: "Garden" },
      { name: "Sammakka Saralamma Temple", location: "Medaram", type: "Temple" },
      { name: "Kolanupaka Jain Temple", location: "Kolanupaka", type: "Temple" },
      { name: "Bheemuni Padam Waterfalls", location: "Gudur", type: "Waterfall" },
      { name: "Inavolu Mallanna Temple", location: "Inavolu", type: "Temple" },
      { name: "Bhadrakali Biodiversity Park", location: "Warangal", type: "Park" },
      { name: "Kush Mahal", location: "Warangal Fort", type: "Landmark" },
      { name: "Rayaparthy Shiva Temple", location: "Rayaparthy", type: "Temple" },
      { name: "Sri Vidya Saraswathi Temple", location: "Wargal", type: "Temple" },
      { name: "Ainavolu Lord Mallikarjuna", location: "Ainavolu", type: "Temple" },
      { name: "Wadepally Reservoir", location: "Hanamkonda", type: "Landmark" },
      { name: "Mallur Narasimha Swamy", location: "Mallur", type: "Temple" },
      { name: "Kazipet Railway Museum", location: "Kazipet", type: "Museum" },
      { name: "Regional Science Centre", location: "Hanamkonda", type: "Learning" },
      { name: "Urs Dargha", location: "Warangal", type: "Culture" },
      { name: "Pratap Nagar Market", location: "Warangal", type: "Market" },
      { name: "Gnanapuram Park", location: "Warangal", type: "Park" },
      { name: "Vana Vigyan Kendra Zoo", location: "Hanamkonda", type: "Wildlife" },
      { name: "Kakatiya University Campus", location: "Hanamkonda", type: "Learning" },
      { name: "Dharmasagar Reservoir", location: "Dharmasagar", type: "Landmark" },
      { name: "Wadepally Hill Trek", location: "Warangal", type: "Activity" },
      { name: "Siddique Dargha", location: "Warangal Fort", type: "Culture" },
      { name: "Hanamkonda Public Garden", location: "Hanamkonda", type: "Garden" },
      { name: "Govindarajula Gutta", location: "Warangal Town", type: "Temple" },
      { name: "Sammakka Sarakka Jathara Path", location: "Medaram", type: "Culture" },
      { name: "Warangal Textile Park", location: "Shyamapet", type: "Industry" },
      { name: "Hunter Road Walk", location: "Warangal", type: "Leisure" },
      { name: "Kazipet Junction (Historic)", location: "Kazipet", type: "Landmark" },
      { name: "Kandakatla Ramappa Temple", location: "Kandakatla", type: "Temple" },
      { name: "Nagnur Fort Ruins", location: "Nagnur", type: "Landmark" },
      { name: "Mallanna Swamy Temple", location: "Komuravelli", type: "Temple" },
      { name: "Jain Hill", location: "Padmakshi Gutta", type: "Landmark" },
      { name: "Warangal Arts College", location: "Subedari", type: "Landmark" },
      { name: "Station Road Shopping", location: "Warangal", type: "Market" },
      { name: "Bhadrakali Lake Sunset", location: "Warangal", type: "Activity" }
    ]
  },
  "tirupati": {
    temples: [
      { name: "Tirumala Venkateswara", location: "Tirumala Hills", history: { dynasty: "Pallava/Vijayanagara", year: 300, builder: "Kings of Pallava", importance: "World's most visited sacred shrine" }, timings: "3:00 AM – 1:00 AM", entryFee: "Free/Paid", rating: 4.9 },
      { name: "Sri Padmavathi Ammavari", location: "Tiruchanur", history: { dynasty: "Pallava", year: 800, builder: "Local Rulers", importance: "Dedicated to Goddess Padmavathi" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Sri Govindaraja Swamy", location: "Tirupati City", history: { dynasty: "Vijayanagara", year: 1130, builder: "Ramanujacharya", importance: "One of the largest temple complexes in Tirupati" }, timings: "5:00 AM – 9:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Sri Kapileswara Swamy", location: "Tirumala Foot Hills", history: { dynasty: "Ancient", year: 1000, builder: "Cholas", importance: "Pancha Kshethra dedicated to Lord Shiva" }, timings: "5:00 AM – 8:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Sri Kalyana Venkateswara Swamy", location: "Srinivasa Mangapuram", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Where Lord Venkateswara stayed after marriage" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Silathoranam", location: "Tirumala Hills", description: "Millions-of-years-old natural stone arch formation." },
      { name: "Chandragiri Fort", location: "Chandragiri", description: "11th-century fortress, once the capital of Vijayanagara Kings." },
      { name: "Talakona Waterfalls", location: "Sri Venkateswara National Park", description: "Highest waterfall in Andhra Pradesh, scenic trek." },
      { name: "Kapila Theertham Falls", location: "Tirumala Foot Hills", description: "A sacred waterfall located right inside the temple complex." },
      { name: "Sri Venkateswara Zoological Park", location: "Tirupati City", description: "Second largest zoo in Asia with vast enclosures." }
    ],
    hotels: [
      { name: "Hotel Bliss", location: "Renigunta Road", pricePerNight: 2200, rating: 4.2 },
      { name: "Hotel PLR Grand", location: "RTC Bus Stand", pricePerNight: 2600, rating: 4.0 },
      { name: "Raj Park - Hill View", location: "KT Road", pricePerNight: 3500, rating: 4.3 },
      { name: "Republic Inn", location: "Tirupati", pricePerNight: 1800, rating: 4.1 },
      { name: "Golden Tulip", location: "Alipiri Road", pricePerNight: 4500, rating: 4.5 }
    ],
    restaurants: [
      { name: "Minerva Coffee Shop", cuisine: "South Indian", location: "Tirupati", rating: 4.4 },
      { name: "Gufha Restaurant", cuisine: "Multi-cuisine", location: "Pai Viceroy", rating: 4.3 },
      { name: "Adayar Bhavan", cuisine: "South Veg", location: "Tirupati", rating: 4.5 },
      { name: "Bhimas Deluxe", cuisine: "Traditional", location: "Main Road", rating: 4.2 },
      { name: "Lakshmi Narayana Bhavan", cuisine: "Brahminical", location: "Tirupati", rating: 4.6 }
    ],
    places_pool: [
      { name: "Tirumala Main Temple", location: "Tirumala Hills", type: "Temple" },
      { name: "Sri Kapileswara Swamy", location: "Tirupati", type: "Temple" },
      { name: "Sri Padmavathi Ammavari", location: "Tiruchanur", type: "Temple" },
      { name: "Talakona Waterfall", location: "Forest Area", type: "Waterfall" },
      { name: "Silathoranam Natural Arch", location: "Tirumala", type: "Landmark" },
      { name: "Chandragiri Fort", location: "Chandragiri", type: "Landmark" },
      { name: "Swami Pushkarini Lake", location: "Tirumala", type: "Landmark" },
      { name: "Venkateswara National Park", location: "Tirumala", type: "Wildlife" },
      { name: "ISKCON Tirupati", location: "Tirupati", type: "Temple" },
      { name: "Akasaganga Teertham", location: "Tirumala Hills", type: "Waterfall" },
      { name: "TTD Gardens", location: "Tirumala", type: "Garden" },
      { name: "Govindarajan Temple", location: "Tirupati", type: "Temple" },
      { name: "Sri Vari Museum", location: "Tirumala", type: "Museum" },
      { name: "Deer Park", location: "Foot Hills", type: "Park" },
      { name: "Papavinasam Waterfall", location: "Tirumala", type: "Waterfall" },
      { name: "Regional Science Centre", location: "Alipiri", type: "Museum" },
      { name: "Srikalahasti Temple (near)", location: "Srikalahasti", type: "Temple" },
      { name: "Kapila Theertham Falls", location: "Foot Hills", type: "Landmark" },
      { name: "Sri Veda Narayanaswami", location: "Nagalapuram", type: "Temple" },
      { name: "Vaikuntha Teertham", location: "Tirumala", type: "Landmark" },
      { name: "Tumburu Teertham", location: "Forest Area", type: "Waterfall" },
      { name: "Sri Bedi Anjaneyaswami", location: "Tirumala", type: "Temple" },
      { name: "Sri Varahaswami Temple", location: "Tirumala", type: "Temple" },
      { name: "Srivari Mettu Path", location: "Alipiri", type: "Landmark" },
      { name: "Silathoranam Garden", location: "Tirumala", type: "Garden" },
      { name: "Sri Venkateswara Museum", location: "Tirumala", type: "Museum" },
      { name: "Regional Science Centre Park", location: "Alipiri", type: "Park" },
      { name: "Papanasanam Waterfall Trek", location: "Tirumala Hills", type: "Activity" },
      { name: "Tarigonda Vengamamba Walk", location: "Tirumala", type: "Landmark" },
      { name: "Sri Prasanna Venkateswara", location: "Appalayagunta", type: "Temple" },
      { name: "Gudimallam Temple", location: "Renigunta", type: "Temple" },
      { name: "Horsley Hills (near)", location: "Madanapalle", type: "Landmark" },
      { name: "Nagari Hills Trek", location: "Nagari", type: "Activity" },
      { name: "Kanakana Raya Cave", location: "Chandragiri", type: "Landmark" },
      { name: "Renigunta Junction Walk", location: "Renigunta", type: "Leisure" },
      { name: "Tirupati Bazaar Shopping", location: "Main Road", type: "Market" },
      { name: "S.V. Ayurvedic Museum", location: "Tirupati", type: "Museum" },
      { name: "Alipiri Srivari Padalu", location: "Foot Hills", type: "Landmark" },
      { name: "Sri Kalyana Venkateswara", location: "Srinivasa Mangapuram", type: "Temple" },
      { name: "Surutapalli Shiva Temple", location: "Surutapalli", type: "Temple" },
      { name: "Kailasakona Waterfalls", location: "Nagari", type: "Waterfall" },
      { name: "Vakalapudi Beach (near)", location: "Kakinada", type: "Beach" },
      { name: "Regional Planetarium", location: "Tirupati", type: "Learning" },
      { name: "Tirumala Forest Safari", location: "Tirumala", type: "Wildlife" },
      { name: "Akasa Ganga ViewPoint", location: "Tirumala", type: "Landmark" },
      { name: "TTD Information Centre", location: "Tirupati", type: "Culture" }
    ]
  },
  "hyderabad": {
    temples: [
      { name: "Birla Mandir", location: "Naubath Pahad", history: { dynasty: "Modern", year: 1976, builder: "B.K. Birla", importance: "Stone-carved white marble temple with city views" }, timings: "7:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Chilkur Balaji", location: "Gandipet", history: { dynasty: "14th Century", year: 1350, builder: "Unknown", importance: "Worshipped as the 'Visa Balaji'" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Karmanghat Hanuman", location: "Karmanghat", history: { dynasty: "Kakatiya", year: 1143, builder: "Prataprudra II", importance: "One of the oldest and most powerful Hanuman temples" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Ujjaini Mahankali", location: "Secunderabad", history: { dynasty: "Ancient", year: 1813, builder: "Appaiah", importance: "Central to the Bonalu festival celebrations" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Sita Ramachandraswamy", location: "Ammapalli", history: { dynasty: "Ancient", year: 1600, builder: "Unknown", importance: "Popular film shooting location with historic idols" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.5 }
    ],
    famous_places: [
      { name: "Charminar", location: "Old City", description: "Iconic 16th-century monument with four grand minarets." },
      { name: "Golconda Fort", location: "Golconda", description: "Breathtaking medieval hilltop citadel with acoustic wonders." },
      { name: "Chowmahalla Palace", location: "Old City", description: "Elegant 18th-century palace reflecting the Nizams' royal heritage." },
      { name: "Qutb Shahi Tombs", location: "Ibrahim Bagh", description: "Historic necropolis with stunning Indo-Islamic dome architecture." },
      { name: "Salar Jung Museum", location: "Old City Side", description: "One of the world's largest private art collections." }
    ],
    hotels: [
      { name: "Slackpackr", location: "Begumpet", pricePerNight: 900, rating: 4.5 },
      { name: "Hotel Siri Inn", location: "Hitech City", pricePerNight: 2800, rating: 4.2 },
      { name: "Holiday Inn Express", location: "Banjara Hills", pricePerNight: 4500, rating: 4.3 },
      { name: "The Purple Leaf", location: "Secunderabad", pricePerNight: 3200, rating: 4.1 },
      { name: "Hotel Minerva Grand", location: "Banjara Hills", pricePerNight: 3500, rating: 4.3 }
    ],
    restaurants: [
      { name: "Shah Ghouse", cuisine: "Biryani", location: "Gachibowli", rating: 4.4 },
      { name: "Paradise IT Junction", cuisine: "Biryani", location: "Hitech City", rating: 4.2 },
      { name: "Chutneys", cuisine: "South Veg", location: "Banjara Hills", rating: 4.5 },
      { name: "Rayalaseema Ruchulu", cuisine: "Telugu", location: "Jubilee Hills", rating: 4.4 },
      { name: "Nimrah Cafe", cuisine: "Irani Chai", location: "Charminar", rating: 4.7 }
    ],
    places_pool: [
      { name: "Charminar", location: "Old City", type: "Landmark" },
      { name: "Golconda Fort", location: "Golconda", type: "Landmark" },
      { name: "Ramoji Film City", location: "Outskirts", type: "Activity" },
      { name: "Salar Jung Museum", location: "Old City", type: "Museum" },
      { name: "Chowmahalla Palace", location: "Old City", type: "Landmark" },
      { name: "Hussain Sagar Lake", location: "Central", type: "Landmark" },
      { name: "Qutb Shahi Tombs", location: "Ibrahim Bagh", type: "Landmark" },
      { name: "Birla Mandir", location: "Naubath Pahad", type: "Temple" },
      { name: "Laad Bazaar", location: "Charminar", type: "Market" },
      { name: "Nehru Zoological Park", location: "Bahadurpura", type: "Wildlife" },
      { name: "Statue of Equality", location: "Shamshabad", type: "Landmark" },
      { name: "Taj Falaknuma Palace", location: "Falaknuma", type: "Landmark" },
      { name: "Lumbini Park", location: "Lakeside", type: "Garden" },
      { name: "Shilparamam Village", location: "Hitech City", type: "Culture" },
      { name: "Mecca Masjid", location: "Old City", type: "Temple" },
      { name: "Purani Haveli", location: "Old City", type: "Landmark" },
      { name: "Taramati Baradari", location: "Gandipet", type: "Landmark" },
      { name: "KBR National Park", location: "Jubilee Hills", type: "Park" },
      { name: "Wonderla Hyderabad", location: "Kongara Khurd", type: "Activity" },
      { name: "Birla Planetarium", location: "Naubath Pahad", type: "Learning" },
      { name: "Sudha Car Museum", location: "Bahadurpura", type: "Museum" },
      { name: "Nizam's Museum", location: "Purani Haveli", type: "Museum" },
      { name: "Sanjeevaiah Park", location: "Necklace Road", type: "Park" },
      { name: "Public Gardens", location: "Nampally", type: "Garden" },
      { name: "Gandipet Lake", location: "Gandipet", type: "Landmark" },
      { name: "Hitech City Cyber Towers", location: "Madhapur", type: "Landmark" },
      { name: "Paigah Tombs", location: "Pisalgutta", type: "Landmark" },
      { name: "Spanish Mosque", location: "Begumpet", type: "Temple" },
      { name: "Inorbit Mall", location: "Madhapur", type: "Market" },
      { name: "Ikea Hyderabad", location: "Hitech City", type: "Market" },
      { name: "B.M. Birla Science Centre", location: "Naubath Pahad", type: "Museum" },
      { name: "Lamakaan", location: "Banjara Hills", type: "Culture" },
      { name: "Prasads IMAX", location: "Necklace Road", type: "Activity" },
      { name: "Buddha Statue Boating", location: "Hussain Sagar", type: "Activity" },
      { name: "Durgam Cheruvu Bridge", location: "Madhapur", type: "Landmark" },
      { name: "Jubilee Hills Checkpost", location: "Jubilee Hills", type: "Leisure" },
      { name: "Osmania University Bridge", location: "O.U.", type: "Landmark" },
      { name: "Dhola-ri-Dhani", location: "Kompally", type: "Activity" },
      { name: "Mrugavani National Park", location: "Chilkur", type: "Wildlife" },
      { name: "Sanghi Temple", location: "Ramoji City Side", type: "Temple" },
      { name: "Yadagirigutta Temple (near)", location: "Bhongir", type: "Temple" },
      { name: "Keesaragutta Temple", location: "Keesara", type: "Temple" },
      { name: "Medak Cathedral (near)", location: "Medak", type: "Culture" },
      { name: "Surendrapuri Mythology Park", location: "Bhongir", type: "Activity" },
      { name: "Ananthagiri Hills (near)", location: "Vikarabad", type: "Landmark" },
      { name: "Kondapochamma Sagar", location: "Gajwel", type: "Landmark" },
      { name: "Birla Mandir Hill View", location: "Hills", type: "Landmark" },
      { name: "Old City Food Walk", location: "Charminar", type: "Activity" },
      { name: "GVK House of India", location: "Banjara Hills", type: "Market" },
      { name: "Forum Sujana Mall", location: "Kukatpally", type: "Market" }
    ]
  },
  "goa": {
    temples: [
      { name: "Shree Mangeshi", location: "Ponda", history: { dynasty: "Saraswat", year: 1560, builder: "Local Devotees", importance: "Architectural masterpiece with a 7-story lamp tower" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Shree Shantadurga", location: "Kavlem", history: { dynasty: "Marathi", year: 1738, builder: "Naroram Mantri", importance: "Dedicated to the Goddess of Peace" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Mahadev Temple", location: "Tambdi Surla", history: { dynasty: "Kadamba", year: 1200, builder: "Kings of Kadamba", importance: "Oldest surviving stone temple in Goa" }, timings: "7:00 AM – 5:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Shree Mahalasa Narayani", location: "Mardol", history: { dynasty: "Ancient", year: 1567, builder: "Local Merchants", importance: "Famous for its massive brass lamp tower" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Shri Ramnath", location: "Bandivade", history: { dynasty: "Marathi", year: 1500, builder: "Community", importance: "Where Lord Rama stopped for prayer" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Basilica of Bom Jesus", location: "Old Goa", description: "UNESCO site housing the remains of St. Francis Xavier." },
      { name: "Fort Aguada", location: "Candolim", description: "17th-century Portuguese fortress with a stunning lighthouse." },
      { name: "Cabo de Rama Fort", location: "Canacona", description: "Ancient clifftop fort with sweeping views of the Arabian Sea." },
      { name: "Se Cathedral", location: "Old Goa", description: "One of the largest churches in Asia, known for its Golden Bell." },
      { name: "Dudhsagar Waterfalls", location: "Mollem", description: "Majestic four-tiered waterfall accessible via jungle trek." }
    ],
    hotels: [
      { name: "The Hosteller Goa", location: "Anjuna", pricePerNight: 1200, rating: 4.5 },
      { name: "ibis Styles Goa", location: "Calangute", pricePerNight: 3500, rating: 4.2 },
      { name: "Lotus Sutra", location: "Arambol", pricePerNight: 2800, rating: 4.3 },
      { name: "Summerville Beach", location: "Candolim", pricePerNight: 3200, rating: 4.1 },
      { name: "Kings Villa", location: "Palolem", pricePerNight: 1800, rating: 4.3 }
    ],
    restaurants: [
      { name: "Mum’s Kitchen", cuisine: "Goan", location: "Panjim", rating: 4.4 },
      { name: "Thalassa", cuisine: "Greek", location: "Vagator", rating: 4.6 },
      { name: "Brittos", cuisine: "Seafood", location: "Baga", rating: 4.2 },
      { name: "Fishermans Wharf", cuisine: "Riverside", location: "South Goa", rating: 4.5 },
      { name: "Martin’s Corner", cuisine: "Heritage", location: "Betalbatim", rating: 4.7 }
    ],
    places_pool: [
      // ... deep pool same as before ...
      { name: "Baga Beach", location: "North Goa", type: "Beach" },
      { name: "Calangute Beach", location: "North Goa", type: "Beach" },
      { name: "Anjuna Beach Flea Market", location: "North Goa", type: "Market" },
      { name: "Palolem Beach", location: "South Goa", type: "Beach" },
      { name: "Fort Aguada", location: "Candolim", type: "Landmark" },
      { name: "Basilica of Bom Jesus", location: "Old Goa", type: "Landmark" },
      { name: "Dudhsagar Waterfalls", location: "Mollem", type: "Waterfall" },
      { name: "Chapora Fort (Dil Chahta Hai)", location: "Vagator", type: "Landmark" },
      { name: "Fontainhas Latin Quarter", location: "Panjim", type: "Culture" },
      { name: "Vagator Beach Cliffs", location: "North Goa", type: "Beach" },
      { name: "Colva Beach", location: "South Goa", type: "Beach" },
      { name: "Cabo de Rama Fort", location: "Canacona", type: "Landmark" },
      { name: "Dona Paula Viewpoint", location: "Panjim", type: "Landmark" },
      { name: "Mangeshi Temple", location: "Ponda", type: "Temple" },
      { name: "Se Cathedral", location: "Old Goa", type: "Landmark" },
      { name: "Sahakari Spice Plantation", location: "Ponda", type: "Activity" },
      { name: "Butterfly Beach", location: "South Goa", type: "Beach" },
      { name: "Reis Magos Fort", location: "Verem", type: "Landmark" },
      { name: "Casino Pride Goa", location: "Panjim", type: "Activity" },
      { name: "Mollem National Park", location: "Sanguem", type: "Wildlife" },
      { name: "Arambol Beach Lake", location: "North Goa", type: "Beach" },
      { name: "Sinquerim Beach", location: "North Goa", type: "Beach" },
      { name: "Church of St. Augustine", location: "Old Goa", type: "Landmark" },
      { name: "Naval Aviation Museum", location: "Vasco", type: "Museum" },
      { name: "Morjim Turtle Beach", location: "North Goa", type: "Beach" },
      { name: "Ashwem Beach", location: "North Goa", type: "Beach" },
      { name: "Divar Island Ferry", location: "Divar", type: "Activity" },
      { name: "Salim Ali Bird Sanctuary", location: "Chorao", type: "Wildlife" },
      { name: "Panjim Church (Immaculate)", location: "Panjim", type: "Landmark" },
      { name: "Candolim Beach Walk", location: "North Goa", type: "Beach" },
      { name: "Mandovi River Cruise", location: "Panjim", type: "Activity" },
      { name: "Old Goa Heritage Walk", location: "Old Goa", type: "Culture" },
      { name: "Grand Island Boat Trip", location: "High Seas", type: "Activity" },
      { name: "Vasco da Gama Port", location: "Vasco", type: "Landmark" },
      { name: "Santa Monica Jetty", location: "Panjim", type: "Landmark" },
      { name: "Miramar Beach", location: "Panjim", type: "Beach" },
      { name: "Agonda Beach", location: "South Goa", type: "Beach" },
      { name: "Majorda Beach", location: "South Goa", type: "Beach" },
      { name: "Cavelossim Beach", location: "South Goa", type: "Beach" },
      { name: "Mobor Beach", location: "South Goa", type: "Beach" },
      { name: "Salaulim Dam", location: "Sanguem", type: "Landmark" },
      { name: "Netravali Wildlife", location: "Sanguem", type: "Wildlife" },
      { name: "Bhagwan Mahavir Sanctuary", location: "Mollem", type: "Wildlife" },
      { name: "Corjuem Fort", location: "Aldona", type: "Landmark" }
    ]
  },
  "kerala": {
    temples: [
      { name: "Sree Padmanabhaswamy", location: "Trivandrum", history: { dynasty: "Travancore", year: 1750, builder: "Marthanda Varma", importance: "Richest temple in the world with gold vaults" }, timings: "3:30 AM – 7:20 PM", entryFee: "Free", rating: 4.9 },
      { name: "Guruvayur Krishna", location: "Thrissur", history: { dynasty: "Ancient", year: 1000, builder: "Local Kings", importance: "Vishwa Krishna temple of great power" }, timings: "3:00 AM – 9:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Vadakkumnathan Temple", location: "Thrissur", history: { dynasty: "Ancient", year: 800, builder: "Adi Shankara", importance: "UNESCO recognized classic Kerala architecture" }, timings: "4:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Sabarimala Sastha", location: "Pathanamthitta", history: { dynasty: "Ancient", year: 1200, builder: "Kings of Pandalam", importance: "One of the largest pilgrimage centers in the world" }, timings: "Varies", entryFee: "Free", rating: 4.9 },
      { name: "Thirunelli Temple", location: "Wayanad", history: { dynasty: "Puranic", year: 1000, builder: "Lord Brahma", importance: "Known as the 'Kashi of the South'" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Alleppey Backwaters", location: "Alappuzha", description: "Iconic houseboat cruises through palm-fringed lagoons." },
      { name: "Munnar Tea Estates", location: "Munnar", description: "Endless rolling hills covered in mist and tea plantations." },
      { name: "Bekal Fort", location: "Kasaragod", description: "Massive clifftop sea-fort with stunning sunset views." },
      { name: "Mattancherry Palace", location: "Fort Kochi", description: "Royal palace featuring world-famous Hindu temple murals." },
      { name: "Athirappilly Waterfalls", location: "Chalakudy", description: "Magnificent waterfall often called the 'Niagara of India'." }
    ],
    hotels: [
      { name: "The Hosteller Munnar", location: "Munnar", pricePerNight: 1000, rating: 4.5 },
      { name: "Casa Feliz B&B", location: "Fort Kochi", pricePerNight: 2200, rating: 4.6 },
      { name: "Woodland Vista", location: "Thekkady", pricePerNight: 2800, rating: 4.2 },
      { name: "Alleppey Prince", location: "Alappuzha", pricePerNight: 3500, rating: 4.1 },
      { name: "Drizzle Valley Cottage", location: "Munnar", pricePerNight: 2000, rating: 4.2 }
    ],
    restaurants: [
      { name: "Kashi Art Cafe", cuisine: "Continental", location: "Fort Kochi", rating: 4.6 },
      { name: "Fusion Bay", cuisine: "Seafood", location: "Fort Kochi", rating: 4.5 },
      { name: "Dal Roti", cuisine: "North Indian", location: "Fort Kochi", rating: 4.4 },
      { name: "Villa Maya", cuisine: "Traditional", location: "Trivandrum", rating: 4.7 },
      { name: "Oceanos Restaurant", cuisine: "Seafood", location: "Fort Kochi", rating: 4.5 }
    ],
    places_pool: [
      // ... same pool ...
      { name: "Munnar Tea Plantations", location: "Munnar", type: "Landmark" },
      { name: "Alleppey Houseboat Cruise", location: "Alappuzha", type: "Activity" },
      { name: "Fort Kochi Chinese Nets", location: "Kochi", type: "Culture" },
      { name: "Edakkal Caves", location: "Wayanad", type: "Landmark" },
      { name: "Periyar Wildlife Sanctuary", location: "Thekkady", type: "Wildlife" },
      { name: "Kovalam Lighthouse Beach", location: "Kovalam", type: "Beach" },
      { name: "Kumarakom Bird Sanctuary", location: "Kumarakom", type: "Wildlife" },
      { name: "Varkala Cliff Beach", location: "Varkala", type: "Beach" },
      { name: "Vagamon Meadows", location: "Idukki", type: "Landmark" },
      { name: "Bekal Fort", location: "Kasaragod", type: "Landmark" },
      { name: "Athirapally Waterfalls", location: "Thrissur", type: "Waterfall" },
      { name: "Vadakkunnathan Temple", location: "Thrissur", type: "Temple" },
      { name: "Poovar Island Resort Area", location: "Trivandrum", type: "Landmark" },
      { name: "Ashtamudi Lake", location: "Kollam", type: "Landmark" },
      { name: "Kappad Beach", location: "Kozhikode", type: "Beach" },
      { name: "Idukki Arch Dam", location: "Idukki", type: "Landmark" },
      { name: "Guruvayur Krishna Temple", location: "Thrissur", type: "Temple" },
      { name: "Mattupetty Dam", location: "Munnar", type: "Landmark" },
      { name: "Eravikulam National Park", location: "Munnar", type: "Wildlife" },
      { name: "Silent Valley National Park", location: "Palakkad", type: "Wildlife" },
      { name: "Cherai Beach", location: "Kochi", type: "Beach" },
      { name: "Pardesi Synagogue", location: "Kochi", type: "Culture" },
      { name: "Bolgatty Palace", location: "Kochi", type: "Landmark" },
      { name: "Attukal Bhagavathy", location: "Trivandrum", type: "Temple" },
      { name: "Napier Museum", location: "Trivandrum", type: "Museum" },
      { name: "Kerala Folklore Museum", location: "Kochi", type: "Museum" },
      { name: "Muzhappilangad Drive-in Beach", location: "Kannur", type: "Beach" },
      { name: "Meenmutty Waterfalls", location: "Wayanad", type: "Waterfall" },
      { name: "Banasura Sagar Dam", location: "Wayanad", type: "Landmark" },
      { name: "Pookode Lake", location: "Wayanad", type: "Landmark" },
      { name: "St. Angelo Fort", location: "Kannur", type: "Landmark" },
      { name: "Kodanad Elephant Training", location: "Kochi Outskirts", type: "Activity" },
      { name: "Thattekad Bird Sanctuary", location: "Kochi Outskirts", type: "Wildlife" },
      { name: "Hill Palace Museum", location: "Thripunithura", type: "Museum" },
      { name: "Lighthouse Beach Varkala", location: "Varkala", type: "Beach" },
      { name: "Shankumugham Beach", location: "Trivandrum", type: "Beach" },
      { name: "Kottayam Rubber Plantations", location: "Kottayam", type: "Landmark" },
      { name: "Marari Beach", location: "Alleppey", type: "Beach" },
      { name: "Pathiramanal Island", location: "Vembanad Lake", type: "Wildlife" },
      { name: "Kuttanad Backwaters", location: "Alleppey", type: "Landmark" },
      { name: "Neyyar Dam & Safari", location: "Trivandrum", type: "Wildlife" },
      { name: "Ponmudi Hill Station", location: "Trivandrum Outskirts", type: "Landmark" },
      { name: "Chaliyar River Walk", location: "Nilambur", type: "Leisure" },
      { name: "Aruvikkara Dam", location: "Trivandrum", type: "Landmark" }
    ]
  },
  "bangalore": {
    temples: [
      { name: "Bull Temple", location: "Basavanagudi", history: { dynasty: "Vijayanagara", year: 1537, builder: "Kempe Gowda I", importance: "Features a massive 4.5m monolithic Nandi statue" }, timings: "6:00 AM – 8:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Gavi Gangadhareshwara", location: "Gavipuram", history: { dynasty: "Gowda", year: 1550, builder: "Kempe Gowda", importance: "Ancient cave temple where sun rays hit the idol twice a year" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Someshwara Temple", location: "Ulsoor", history: { dynasty: "Chola/Vijayanagara", year: 1200, builder: "Unknown", importance: "Classic hybrid architecture with intricate gopurams" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kote Venkataramana", location: "Chamarajpet", history: { dynasty: "Wodeyar", year: 1689, builder: "Chikka Devaraja", importance: "Historic 17th-century royal temple near Tipu's palace" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.7 },
      { name: "Chokkanathaswamy", location: "Domlur", history: { dynasty: "Chola", year: 1000, builder: "Kings of Chola", importance: "One of the oldest temples in Bangalore" }, timings: "5:30 AM – 8:00 PM", entryFee: "Free", rating: 4.6 }
    ],
    famous_places: [
      { name: "Vidhana Soudha", location: "Central", description: "Grand seat of the state legislature, known for its Neo-Dravidian architecture." },
      { name: "Bangalore Palace", location: "Palace Road", description: "Royal palace inspired by Windsor Castle with Tudor-style towers." },
      { name: "Lalbagh Botanical Garden", location: "South Bangalore", description: "Colonial-era garden featuring a magnificent 19th-century glass house." },
      { name: "Cubbon Park", location: "Central District", description: "A vast green oasis housing the High Court and State Central Library." },
      { name: "Tipu Sultan's Summer Palace", location: "Chamarajpet", description: "Ornate wooden palace that served as the summer home of the ruler." }
    ],
    hotels: [
      { name: "The Hosteller Bangalore", location: "Indiranagar", pricePerNight: 1200, rating: 4.5 },
      { name: "Castle Dollars", location: "Koramangala", pricePerNight: 2800, rating: 4.2 },
      { name: "LUHO Grande", location: "BTM Layout", pricePerNight: 3500, rating: 4.4 },
      { name: "Sterling Residency", location: "Hebbal", pricePerNight: 3200, rating: 4.1 },
      { name: "Bloom Hotel", location: "Richmond Road", pricePerNight: 3500, rating: 4.4 }
    ],
    restaurants: [
      { name: "MTR Lalbagh", cuisine: "Heritage South Indian", location: "Lalbagh Road", rating: 4.6 },
      { name: "Vidyarthi Bhavan", cuisine: "Dosa", location: "Basavanagudi", rating: 4.7 },
      { name: "CTR", cuisine: "Butter Dosa", location: "Malleshwaram", rating: 4.8 },
      { name: "Koshy’s", cuisine: "Multi", location: "St Marks Road", rating: 4.4 },
      { name: "Bob's Bar", cuisine: "Pub", location: "Indiranagar", rating: 4.4 }
    ],
    places_pool: [
      // ... same pool ...
      { name: "Lalbagh Flower Show", location: "South Bangalore", type: "Garden" },
      { name: "Cubbon Park Library", location: "Central", type: "Park" },
      { name: "Bangalore Palace", location: "North Bangalore", type: "Landmark" },
      { name: "Bannerghatta Safari", location: "Outskirts", type: "Wildlife" },
      { name: "Vidhana Soudha (Night view)", location: "Central", type: "Landmark" },
      { name: "Visvesvaraya Science Museum", location: "Kasturba Road", type: "Museum" },
      { name: "Commercial Street Shopping", location: "Shivajinagar", type: "Market" },
      { name: "HAL Aerospace Museum", location: "Old Airport Road", type: "Museum" },
      { name: "VV Puram Food Street", location: "Basavanagudi", type: "Market" },
      { name: "Nandi Hills Sunrise", location: "Outskirts", type: "Landmark" },
      { name: "Bull Temple", location: "Basavanagudi", type: "Temple" },
      { name: "Ulsoor Lake Boating", location: "Halasuru", type: "Landmark" },
      { name: "Innovative Film City", location: "Bidadi", type: "Activity" }
    ]
  },
  "vanarasi": {
    temples: [
      { name: "Kashi Vishwanath", location: "Main City", history: { dynasty: "Holkar", year: 1780, builder: "Ahilyabai", importance: "Center of the world's oldest living city" }, timings: "3:00 AM – 11:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Sankat Mochan Hanuman", location: "Near BHU", history: { dynasty: "Spiritual", year: 1530, builder: "Tulsidas", importance: "Sacred temple where Hanuman was spotted" }, timings: "6:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kaal Bhairav", location: "Visheshwarganj", history: { dynasty: "Ancient", year: 1000, builder: "Adi Shankara", importance: "Dedicated to the 'Kotwal' or guardian of Kashi" }, timings: "5:00 AM – 10:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Durga Mandir", location: "Durga Kund", history: { dynasty: "Maratha", year: 1700, builder: "Local Queen", importance: "Famous for its red sandstone architecture and tank" }, timings: "5:00 AM – 9:00 PM", entryFee: "Free", rating: 4.7 },
      { name: "Annapurna Devi", location: "Near Vishwanath", history: { dynasty: "Ancient", year: 1000, builder: "Unknown", importance: "Where Goddess Parvati serves food to Lord Shiva" }, timings: "5:00 AM – 9:30 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Dashashwamedh Ghat", location: "River Side", description: "The heart of Varanasi, famous for its spectacular Evening Aarti." },
      { name: "Assi Ghat", location: "South Varanasi", description: "Peaceful riverfront known for Sunrise Yoga and Subah-e-Banaras." },
      { name: "Ramnagar Fort", location: "East Bank", description: "18th-century red sandstone palace housing royal treasures." },
      { name: "Sarnath", location: "Outskirts", description: "Sacred deer park where Buddha delivered his first sermon." },
      { name: "Kashi Vishwanath Corridor", location: "Temple Area", description: "Grand modern development connecting the river to the sacred shrine." }
    ],
    hotels: [
      { name: "Stay Banaras", location: "Cantonment", pricePerNight: 2300, rating: 4.6 },
      { name: "Hotel Alka", location: "Meer Ghat", pricePerNight: 2800, rating: 4.4 },
      { name: "Live Free Hostel", location: "Assi Ghat", pricePerNight: 700, rating: 4.3 },
      { name: "Hotel Temple View", location: "Old Varanasi", pricePerNight: 1500, rating: 4.1 },
      { name: "Hidden Monkey Hostel", location: "Assi Ghat", pricePerNight: 600, rating: 4.3 }
    ],
    restaurants: [
      { name: "Kashi Chat Bhandar", cuisine: "Chat", location: "Varanasi", rating: 4.5 },
      { name: "Deena Chat Bhandar", cuisine: "Chat", location: "Varanasi", rating: 4.4 },
      { name: "Blue Lassi Shop", cuisine: "Lassi", location: "Varanasi", rating: 4.6 },
      { name: "Pizzeria Vaatika", cuisine: "Pizza", location: "Varanasi", rating: 4.7 },
      { name: "Brown Bread Bakery", cuisine: "European", location: "Varanasi", rating: 4.5 }
    ],
    places_pool: [
        // Same as before ...
        { name: "Dashashwamedh Ghat Aarti", location: "Varanasi", type: "Culture" },
        { name: "Kashi Vishwanath Temple", location: "Varanasi", type: "Temple" }
    ]
  },
  "hampi": {
    temples: [
      { name: "Virupaksha Temple", location: "Hampi Bazaar", history: { dynasty: "Vijayanagara", year: 1336, builder: "Lakkana Dandesha", importance: "UNESCO site and one of the oldest functioning temples" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Vijaya Vittala", location: "Stone Chariot Area", history: { dynasty: "Vijayanagara", year: 1513, builder: "Krishnadevaraya", importance: "Home of the iconic stone chariot and musical pillars" }, timings: "8:00 AM – 5:00 PM", entryFee: "Paid", rating: 4.9 },
      { name: "Hazara Rama Temple", location: "Royal Enclosure", history: { dynasty: "Vijayanagara", year: 1500, builder: "Devaraya I", importance: "Known for elaborate carvings depicting the Ramayana" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Achyutaraya Temple", location: "Sule Bazaar", history: { dynasty: "Vijayanagara", year: 1534, builder: "Achyutadeva Raya", importance: "Unique temple nested between hills and a plaza" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Krishna Temple", location: "West Hampi", history: { dynasty: "Vijayanagara", year: 1513, builder: "Krishnadevaraya", importance: "Built to celebrate the conquest of Utkala" }, timings: "6:00 AM – 6:00 PM", entryFee: "Free", rating: 4.8 }
    ],
    famous_places: [
      { name: "Vijaya Vittala Stone Chariot", location: "Temple Complex", description: "Iconic stone-carved chariot representing the pinnacle of Vijayanagara art." },
      { name: "Lotus Palace", location: "Zenana Enclosure", description: "Exquisite two-story structure blending Hindu and Islamic architecture." },
      { name: "Mahanavami Dibba", location: "Royal Area", description: "Massive ancient platform once used for grand royal celebrations." },
      { name: "Elephant Stables", location: "Zenana Enclosure", description: "Stunning dome-roofed building designed to house royal elephants." },
      { name: "Hemakuta Hill", location: "Near Virupaksha", description: "Scenic hilltop offering spectacular sunset views over the ruins." }
    ],
    hotels: [
      { name: "Prajwal Homestay", location: "Hampi Bazaar", pricePerNight: 1000, rating: 4.4 },
      { name: "Shankar Homestay", location: "Hampi Bazaar", pricePerNight: 1200, rating: 4.5 },
      { name: "Nargila Guest House", location: "Hippie Island", pricePerNight: 1500, rating: 4.1 },
      { name: "Sunrise Guest House", location: "Anegundi", pricePerNight: 900, rating: 4.2 },
      { name: "Gopi Guest House", location: "Hampi Bazaar", pricePerNight: 1500, rating: 4.1 }
    ],
    restaurants: [
      { name: "Mango Tree Restaurant", cuisine: "International Veg", location: "Hampi Bazaar", rating: 4.6 },
      { name: "The Hampi Cafe", cuisine: "Traditional Tiffins", location: "Main Road", rating: 4.5 },
      { name: "Tutti Cafe", cuisine: "Middle Eastern/Israeli", location: "Across River", rating: 4.4 },
      { name: "Sagar Restaurant", cuisine: "South Indian Thali", location: "Hampi Bazaar", rating: 4.3 },
      { name: "Aunty Hotel", cuisine: "Local/Homely", location: "Anegundi", rating: 4.7 }
    ],
    places_pool: [
        { name: "Virupaksha Temple", location: "Hampi", type: "Temple" }
    ]
  },
  "kanchipuram": {
    temples: [
      { name: "Kanchi Kailasanathar", location: "West Kanchi", history: { dynasty: "Pallava", year: 700, builder: "Rajasimha", importance: "Oldest and most architecturally significant structure" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Ekambareswarar", location: "Main Road", history: { dynasty: "Pallava/Chola", year: 600, builder: "Various Kings", importance: " Earth element temple with a 57m Raja Gopuram" }, timings: "6:00 AM – 9:00 PM", entryFee: "Free", rating: 4.8 },
      { name: "Kanchi Kamakshi Amman", location: "City Center", history: { dynasty: "Chola", year: 1200, builder: "Local Rulers", importance: "Major Shakti shrine and central cultural heart of Kanchi" }, timings: "5:30 AM – 9:00 PM", entryFee: "Free", rating: 4.9 },
      { name: "Varadharaja Perumal", location: "East Kanchi", history: { dynasty: "Chola", year: 1053, builder: "Unknown", importance: "Home to the rare 100-pillared carved hall" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Ashtabujakaram Temple", location: "South Kanchi", history: { dynasty: "Pallava", year: 800, builder: "Unknown", importance: "Vishnu temple where the deity has eight arms" }, timings: "6:00 AM – 7:30 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Kanchipuram Silk Saree Markets", location: "City Center", description: "Town's world-famous heritage of gold-bordered silk weaving." },
      { name: "Vaikuntha Perumal Palace Ruins", location: "Temple Site", description: "Historic architecture showcasing rare sculpted lion pillars." },
      { name: "Panchabhoota Sthalam Sites", location: "Kanchipuram", description: "Earth element pilgrimage hub featuring grand temple corridors." },
      { name: "Chitragupta Temple", location: "Railway Road", description: "One of the world's few temples dedicated to the record-keeper god." },
      { name: "Silk Weaving Village Tour", location: "Outskirts", description: "Educational tour of traditional handloom weaving techniques." }
    ],
    hotels: [
      { name: "Hotel SSK Grand", location: "Nelukkara St", pricePerNight: 2600, rating: 3.8 },
      { name: "Sree Sakthi Residency", location: "East Raja St", pricePerNight: 1800, rating: 4.0 },
      { name: "Nitheesh Residency", location: "Railway Station Rd", pricePerNight: 2200, rating: 4.1 },
      { name: "Sai Homestay", location: "Kanchi Center", pricePerNight: 2000, rating: 4.2 },
      { name: "Sri Rams Residency", location: "East Raja St", pricePerNight: 2000, rating: 4.2 }
    ],
    restaurants: [
      { name: "Hotel Saravana Bhavan", cuisine: "South Veg", location: "Near Temple", rating: 4.5 },
      { name: "Dindigul Thalappakatti", cuisine: "Biryani", location: "East Raja St", rating: 4.3 },
      { name: "Gongura", cuisine: "Andhra Veg", location: "Kanchipuram", rating: 4.2 },
      { name: "Murugan Idli Shop", cuisine: "South Indian", location: "City Center", rating: 4.6 },
      { name: "Adayar Ananda Bhavan", cuisine: "Sweets/Veg", location: "Main Road", rating: 4.4 }
    ],
    places_pool: [ { name: "Silk Markets", location: "Kanchi", type: "Market" } ]
  },
  "arunachalam": {
    temples: [
      { name: "Arunachalesvara", location: "Foot of Hill", history: { dynasty: "Pallava/Chola", year: 800, builder: "Ancient Kings", importance: " Fire element temple - one of the largest in India" }, timings: "5:00 AM – 9:30 PM", entryFee: "Free", rating: 4.9 },
      { name: "Adi Annamalai Temple", location: "Girivalam Path", history: { dynasty: "Puranic", year: "2000 BC", builder: "Lord Brahma", importance: "Oldest structure on the girivalam path" }, timings: "6:00 AM – 8:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Arulmigu Renugambal", location: "Padavedu", history: { dynasty: "Ancient", year: 1000, builder: "Kings", importance: "Major Shakti shrine in the region" }, timings: "6:00 AM – 7:30 PM", entryFee: "Free", rating: 4.8 },
      { name: "Mallikarjuna Swamy", location: "Parvathamalai", history: { dynasty: "Siddhar", year: 1500, builder: "Siddhars", importance: "Hilltop temple known for intense spiritual energy" }, timings: "Varies", entryFee: "Free", rating: 4.7 },
      { name: "Sri Varadaraja Perumal", location: "Injimedu", history: { dynasty: "Ancient", year: 1000, builder: "Kings", importance: "Calm and historic Vishnu temple outside town" }, timings: "6:00 AM – 7:00 PM", entryFee: "Free", rating: 4.7 }
    ],
    famous_places: [
      { name: "Arunachala Hill", location: "Tiruvannamalai", description: "Sacred fire hill around which millions perform the 14km walking ritual." },
      { name: "Sri Ramanasramam", location: "Ramana Nagar", description: "The spiritual ashram of sage Ramana Maharshi, a place of deep silence." },
      { name: "Arunachala Raja Gopuram", location: "Temple Entrance", description: "Massive 217-foot gopuram, a signature landmark of the city." },
      { name: "Seshadri Swamigal Ashram", location: "Girivalam Path", description: "Quiet spiritual haven dedicated to the 20th-century mystic." },
      { name: "Yogi Ramsuratkumar Ashram", location: "Tiruvannamalai", description: "Beautiful contemporary ashram dedicated to the Godchild of Tiruvannamalai." }
    ],
    hotels: [
      { name: "Ellora Hotel", location: "Ramana Nagar", pricePerNight: 2500, rating: 4.3 },
      { name: "Hotel Ramakrishna", location: "Temple Front", pricePerNight: 1800, rating: 4.1 },
      { name: "Dwaraka Guest House", location: "Girivalam Path", pricePerNight: 1500, rating: 4.2 },
      { name: "Sai Guest House", location: "Ramana Nagar", pricePerNight: 1200, rating: 4.2 },
      { name: "Leaf Hotel", location: "Arunachalam", pricePerNight: 3500, rating: 4.4 }
    ],
    restaurants: [
      { name: "Akshaya Restaurant", cuisine: "South Indian", location: "Main Road", rating: 4.4 },
      { name: "German Bakery", cuisine: "European", location: "Near Ramana Ashram", rating: 4.5 },
      { name: "Hotel Arpana", cuisine: "Vegetarian", location: "Temple Area", rating: 4.2 },
      { name: "The Dreaming Tree", cuisine: "International Veg", location: "Ramana Nagar", rating: 4.2 },
      { name: "Vellalar Mess", cuisine: "Local", location: "Main Road", rating: 4.6 }
    ],
    places_pool: [ { name: "Girivalam Path", location: "Hill", type: "Culture" } ]
  }
};

/**
 * Adaptive Schedule Generator (Super Dense v5.0)
 * Uses adaptive density logic for items per day.
 */
function generateDailySchedule(placesPool, days) {
  const shuffledUnique = [...placesPool].sort(() => Math.random() - 0.5);
  const shuffledLeisure = [...commonLeisure].sort(() => Math.random() - 0.5);
  
  const schedule = [];
  let uniqueIndex = 0;
  let leisureOffset = 0;

  // Adaptive Density
  let itemsPerDay = 6;
  if (days <= 3) itemsPerDay = 7;
  else if (days >= 10) itemsPerDay = 5;

  for (let d = 1; d <= days; d++) {
    const dayPlaces = [];
    while (dayPlaces.length < itemsPerDay && uniqueIndex < shuffledUnique.length) {
      dayPlaces.push(shuffledUnique[uniqueIndex]);
      uniqueIndex++;
    }
    while (dayPlaces.length < itemsPerDay) {
        dayPlaces.push({ ...shuffledLeisure[leisureOffset % shuffledLeisure.length], day: d });
        leisureOffset++;
    }
    schedule.push({ day: d, places: dayPlaces });
  }
  return schedule;
}

function generateTravelPlan(destination, budget, days) {
  const key = destination.toLowerCase().trim();
  const data = destinations[key] || { temples: [], hotels: [], restaurants: [], places_pool: [], famous_places: [] };

  const budgetBreakdown = {
    hotels: Math.round(budget * 0.40),
    food: Math.round(budget * 0.30),
    travel: Math.round(budget * 0.30)
  };

  const daily_schedule = generateDailySchedule(data.places_pool, days);

  return {
    destination: destination,
    budget,
    days,
    budget_breakdown: budgetBreakdown,
    daily_schedule,
    temples: data.temples,
    famous_places: data.famous_places || [],
    hotels: data.hotels || [],
    restaurants: data.restaurants || []
  };
}

module.exports = generateTravelPlan;
