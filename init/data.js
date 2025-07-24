const sampleListings = [
  {
    title: "Desert King",
    description: "Beautiful place in the heart of the desert with amazing views and relaxing atmosphere.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1606788075761-1b53d66f1423?auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Desert Oasis",
    country: "United States",
    category: "Trending"
  },
  {
    title: "Beachside Bungalow",
    description: "Wake up to the sound of waves and the ocean breeze in this charming bungalow.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Miami Beach",
    country: "United States",
    category: "Swimming Pools"
  },
  {
    title: "Mountain Cabin",
    description: "Cozy cabin nestled in the mountains, perfect for a peaceful retreat or hiking adventure.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Aspen",
    country: "United States",
    category: "Camping"
  },
  {
    title: "Modern City Apartment",
    description: "Stylish apartment in the heart of downtown with all modern amenities and city views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60"
    },
    price: 3000,
    location: "New York",
    country: "United States",
    category: "Iconic cities"
  },
  {
    title: "Tropical Treehouse",
    description: "Live amongst the trees in this beautiful treehouse surrounded by lush jungle.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587502536263-9298c38b7b31?auto=format&fit=crop&w=800&q=60"
    },
    price: 2200,
    location: "Hilo",
    country: "Hawaii",
    category: "Camping"
  },
  {
    title: "Lakefront Lodge",
    description: "Enjoy calm mornings and beautiful sunsets by the lake in this cozy lodge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60"
    },
    price: 2100,
    location: "Lake Tahoe",
    country: "United States",
    category: "Swimming Pools"
  },
  {
    title: "Rustic Barn Stay",
    description: "Experience country life with a modern twist in this renovated rustic barn.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1559599238-095e469fae62?auto=format&fit=crop&w=800&q=60"
    },
    price: 1700,
    location: "Nashville",
    country: "United States",
    category: "Farms"
  },
  {
    title: "Ski Chalet",
    description: "Hit the slopes and then relax by the fire in this alpine ski chalet.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60"
    },
    price: 2800,
    location: "Vail",
    country: "United States",
    category: "Trending"
  },
  {
    title: "Historic Castle",
    description: "Live like royalty in this beautifully restored historic castle with breathtaking views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60"
    },
    price: 3500,
    location: "Edinburgh",
    country: "Scotland",
    category: "Castles"
  },
  {
    title: "Eco Bamboo Villa",
    description: "Sustainable living at its finest in this open-air bamboo villa surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=60"
    },
    price: 2300,
    location: "Bali",
    country: "Indonesia",
    category: "Domes"
  },
  {
    title: "Seaside Villa",
    description: "Luxurious villa with private beach access and stunning ocean panoramas.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-156321770-b18c2b7e51c8?auto=format&fit=crop&w=800&q=60"
    },
    price: 4500,
    location: "Santorini",
    country: "Greece",
    category: "Swimming Pools"
  },
  {
    title: "Cozy Lakeside Cabin",
    description: "Perfect retreat for fishing and kayaking enthusiasts, with serene lake views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1563039866-9e671c6d3f2b?auto=format&fit=crop&w=800&q=60"
    },
    price: 1900,
    location: "Lake Placid",
    country: "United States",
    category: "Camping"
  },
  {
    title: "Urban Loft with Rooftop",
    description: "Trendy loft apartment with a spacious rooftop deck, ideal for city explorers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1549517045-bc93de0e0666?auto=format&fit=crop&w=800&q=60"
    },
    price: 2800,
    location: "Berlin",
    country: "Germany",
    category: "Iconic cities"
  },
  {
    title: "Safari Tent Lodge",
    description: "Experience the wild in comfort with this luxurious safari tent lodge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1534015822361-b51f0f9b6c0b?auto=format&fit=crop&w=800&q=60"
    },
    price: 3200,
    location: "Maasai Mara",
    country: "Kenya",
    category: "Camping"
  },
  {
    title: "Historic Townhouse",
    description: "Charming townhouse in a historic district, blending old-world charm with modern comforts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523217582562-09d2bd2f277a?auto=format&fit=crop&w=800&q=60"
    },
    price: 2100,
    location: "Boston",
    country: "United States",
    category: "Room"
  },
  {
    title: "Vineyard Estate",
    description: "Idyllic estate set amidst rolling vineyards, offering wine tasting and stunning views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1556912173-ee12a4f4d2f0?auto=format&fit=crop&w=800&q=60"
    },
    price: 3800,
    location: "Napa Valley",
    country: "United States",
    category: "Farms"
  },
  {
    title: "Overwater Bungalow",
    description: "Direct access to crystal-clear waters from your private overwater bungalow.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571050012217-1f4a1b0b0a0a?auto=format&fit=crop&w=800&q=60"
    },
    price: 5000,
    location: "Maldives",
    country: "Maldives",
    category: "Boats"
  },
  {
    title: "Countryside Farmhouse",
    description: "A tranquil escape to the countryside in a beautifully restored farmhouse.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517430489673-f925c0e1b6f0?auto=format&fit=crop&w=800&q=60"
    },
    price: 1600,
    location: "Tuscany",
    country: "Italy",
    category: "Farms"
  },
  {
    title: "Luxury Penthouse",
    description: "Panoramic city views from this opulent penthouse with top-tier amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552960562-b062130026e6?auto=format&fit=crop&w=800&q=60"
    },
    price: 6000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Iconic cities"
  },
  {
    title: "Forest Glamping Tent",
    description: "Reconnect with nature in this comfortable glamping tent nestled in the forest.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518609804825-9762a6d5f7f2?auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Yosemite",
    country: "United States",
    category: "Camping"
  }
];

module.exports = { data: sampleListings };
