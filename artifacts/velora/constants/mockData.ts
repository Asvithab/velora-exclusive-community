export interface Member {
  id: string;
  name: string;
  username: string;
  bio: string;
  tier: "founder" | "elite" | "member";
  interests: string[];
  isOnline: boolean;
  isFollowing: boolean;
  followers: number;
  following: number;
  joinedAt: string;
  location: string;
  initials: string;
  avatarColor: string;
  reputation: number;
  badges: string[];
  posts: number;
}

export interface Post {
  id: string;
  authorId: string;
  author: Member;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
  createdAt: string;
  timeAgo: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  isRSVPd: boolean;
  isFeatured: boolean;
  price: string;
  type: "dinner" | "rooftop" | "gallery" | "mixer" | "retreat";
  hostedBy: string;
}

export interface Conversation {
  id: string;
  member: Member;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  isTyping: boolean;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  bio: string;
  whyJoin: string;
  submittedAt: string;
  initials: string;
  avatarColor: string;
  interests: string[];
  status: "pending" | "approved" | "rejected";
}

export const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Isabelle Fontaine",
    username: "isabellef",
    bio: "Creative director & collector. NYC ↔ Paris. Building things that matter.",
    tier: "founder",
    interests: ["Art", "Fashion", "Architecture", "Travel"],
    isOnline: true,
    isFollowing: false,
    followers: 1240,
    following: 89,
    joinedAt: "Jan 2024",
    location: "New York, NY",
    initials: "IF",
    avatarColor: "#8B5CF6",
    reputation: 9420,
    badges: ["Founder", "Connector", "Tastemaker"],
    posts: 48,
  },
  {
    id: "2",
    name: "Marcus Velez",
    username: "marcusv",
    bio: "VC partner. Angel investor in 30+ companies. Avid surfer & chef on weekends.",
    tier: "elite",
    interests: ["Investing", "Tech", "Surfing", "Food"],
    isOnline: true,
    isFollowing: true,
    followers: 892,
    following: 134,
    joinedAt: "Feb 2024",
    location: "San Francisco, CA",
    initials: "MV",
    avatarColor: "#C9A96E",
    reputation: 7850,
    badges: ["Elite", "Investor"],
    posts: 31,
  },
  {
    id: "3",
    name: "Chiara Russo",
    username: "chiararusso",
    bio: "Fashion editor at Vogue Italia. Writer, curator, dreamer. Milan → everywhere.",
    tier: "founder",
    interests: ["Fashion", "Writing", "Art", "Travel"],
    isOnline: false,
    isFollowing: false,
    followers: 2100,
    following: 201,
    joinedAt: "Jan 2024",
    location: "Milan, Italy",
    initials: "CR",
    avatarColor: "#F43F5E",
    reputation: 11200,
    badges: ["Founder", "Influencer", "Tastemaker"],
    posts: 87,
  },
  {
    id: "4",
    name: "Sebastien Cole",
    username: "sebcole",
    bio: "Music producer. Grammy winner. Always searching for the next sound.",
    tier: "elite",
    interests: ["Music", "Art", "Travel", "Tech"],
    isOnline: true,
    isFollowing: true,
    followers: 3400,
    following: 67,
    joinedAt: "Mar 2024",
    location: "Los Angeles, CA",
    initials: "SC",
    avatarColor: "#22C55E",
    reputation: 14800,
    badges: ["Elite", "Creator"],
    posts: 22,
  },
  {
    id: "5",
    name: "Layla Hassan",
    username: "laylahassan",
    bio: "Architect. Turning spaces into stories. Beirut-born, world-shaped.",
    tier: "member",
    interests: ["Architecture", "Design", "Travel", "Food"],
    isOnline: false,
    isFollowing: false,
    followers: 445,
    following: 210,
    joinedAt: "Apr 2024",
    location: "Dubai, UAE",
    initials: "LH",
    avatarColor: "#F59E0B",
    reputation: 3200,
    badges: ["Member"],
    posts: 15,
  },
  {
    id: "6",
    name: "Dmitri Volkov",
    username: "dmitriv",
    bio: "Entrepreneur. 3x founder. Building at the intersection of luxury & tech.",
    tier: "elite",
    interests: ["Tech", "Investing", "Travel", "Wine"],
    isOnline: true,
    isFollowing: false,
    followers: 1890,
    following: 312,
    joinedAt: "Feb 2024",
    location: "London, UK",
    initials: "DV",
    avatarColor: "#06B6D4",
    reputation: 8900,
    badges: ["Elite", "Investor", "Connector"],
    posts: 41,
  },
  {
    id: "7",
    name: "Amara Osei",
    username: "amaraosei",
    bio: "Photographer. Visual storyteller. Africa through a lens that celebrates.",
    tier: "member",
    interests: ["Photography", "Travel", "Art", "Culture"],
    isOnline: false,
    isFollowing: true,
    followers: 780,
    following: 156,
    joinedAt: "May 2024",
    location: "Accra, Ghana",
    initials: "AO",
    avatarColor: "#EF4444",
    reputation: 4100,
    badges: ["Member", "Creator"],
    posts: 33,
  },
  {
    id: "8",
    name: "Nicolás Vargas",
    username: "nicolasv",
    bio: "Chef & restaurateur. 2 Michelin stars. Food is my love language.",
    tier: "elite",
    interests: ["Food", "Wine", "Travel", "Culture"],
    isOnline: true,
    isFollowing: false,
    followers: 2200,
    following: 89,
    joinedAt: "Mar 2024",
    location: "Buenos Aires, Argentina",
    initials: "NV",
    avatarColor: "#A78BFA",
    reputation: 10500,
    badges: ["Elite", "Tastemaker"],
    posts: 56,
  },
];

export const CURRENT_USER: Member = {
  id: "0",
  name: "Alex Rivera",
  username: "alexrivera",
  bio: "Founder & creative. Building Velora. Obsessed with design, food, and good conversations.",
  tier: "founder",
  interests: ["Tech", "Design", "Food", "Travel", "Art"],
  isOnline: true,
  isFollowing: false,
  followers: 524,
  following: 43,
  joinedAt: "Jan 2024",
  location: "New York, NY",
  initials: "AR",
  avatarColor: "#C9A96E",
  reputation: 6200,
  badges: ["Founder", "Creator"],
  posts: 18,
};

export const POSTS: Post[] = [
  {
    id: "p1",
    authorId: "1",
    author: MEMBERS[0],
    content: "Just wrapped a stunning exhibition at Gagosian. The intersection of digital and physical art is evolving faster than anyone predicted. Excited for what's next.",
    likes: 142,
    comments: 28,
    shares: 14,
    isLiked: false,
    tags: ["Art", "Design", "NYC"],
    createdAt: "2024-05-01",
    timeAgo: "2h ago",
  },
  {
    id: "p2",
    authorId: "2",
    author: MEMBERS[1],
    content: "Closed two rounds this week. The AI infrastructure space is moving at an insane pace. If you're building at that layer, let's connect.",
    likes: 89,
    comments: 31,
    shares: 22,
    isLiked: true,
    tags: ["Tech", "VC", "AI"],
    createdAt: "2024-05-01",
    timeAgo: "4h ago",
  },
  {
    id: "p3",
    authorId: "3",
    author: MEMBERS[2],
    content: "The SS25 shows in Milan were unlike anything I've witnessed. Fashion is rediscovering its soul — slow, intentional, deeply personal. A thread on what I saw...",
    likes: 234,
    comments: 67,
    shares: 45,
    isLiked: false,
    tags: ["Fashion", "Milan", "Style"],
    createdAt: "2024-05-01",
    timeAgo: "6h ago",
  },
  {
    id: "p4",
    authorId: "4",
    author: MEMBERS[3],
    content: "New album drops in 6 weeks. This one is different. Four years of life compressed into 12 tracks. Can't wait for you all to hear it.",
    likes: 891,
    comments: 203,
    shares: 310,
    isLiked: true,
    tags: ["Music", "Art", "Drop"],
    createdAt: "2024-05-01",
    timeAgo: "8h ago",
  },
  {
    id: "p5",
    authorId: "6",
    author: MEMBERS[5],
    content: "London to Tokyo in 48 hours for one meeting. Some things are worth it. The future of luxury hospitality is being built quietly in Tokyo. Notes from the trip.",
    likes: 176,
    comments: 44,
    shares: 28,
    isLiked: false,
    tags: ["Travel", "Luxury", "Business"],
    createdAt: "2024-05-01",
    timeAgo: "12h ago",
  },
  {
    id: "p6",
    authorId: "8",
    author: MEMBERS[7],
    content: "Sourced the most extraordinary ingredient in Patagonia — a wild herb that grows at 3000m elevation. It tastes like the wind before rain. Already imagining the dish.",
    likes: 312,
    comments: 89,
    shares: 56,
    isLiked: false,
    tags: ["Food", "Travel", "Culinary"],
    createdAt: "2024-04-30",
    timeAgo: "1d ago",
  },
];

export const EVENTS: Event[] = [
  {
    id: "e1",
    title: "Velora Founders Dinner",
    description: "An intimate dinner bringing together the founding members of Velora. Private chef, curated wine, and conversations worth having.",
    venue: "The Penthouse at 1 Hotel",
    location: "New York, NY",
    date: "May 15, 2024",
    time: "7:30 PM",
    attendees: 24,
    maxAttendees: 30,
    isRSVPd: true,
    isFeatured: true,
    price: "Complimentary",
    type: "dinner",
    hostedBy: "Velora",
  },
  {
    id: "e2",
    title: "Rooftop x Art Basel",
    description: "Exclusive rooftop gathering during Art Basel week. Meet collectors, artists, and curators in a relaxed setting.",
    venue: "The Standard Rooftop",
    location: "Miami, FL",
    date: "June 6, 2024",
    time: "8:00 PM",
    attendees: 67,
    maxAttendees: 100,
    isRSVPd: false,
    isFeatured: true,
    price: "Members Only",
    type: "rooftop",
    hostedBy: "Isabelle Fontaine",
  },
  {
    id: "e3",
    title: "Tech & Taste: SF Edition",
    description: "Where the tech world meets the culinary world. A curated evening of innovation, conversation, and exceptional food.",
    venue: "Quince Restaurant",
    location: "San Francisco, CA",
    date: "May 22, 2024",
    time: "6:30 PM",
    attendees: 18,
    maxAttendees: 25,
    isRSVPd: false,
    isFeatured: false,
    price: "Complimentary",
    type: "mixer",
    hostedBy: "Marcus Velez",
  },
  {
    id: "e4",
    title: "Velora Summer Retreat",
    description: "A 3-day retreat in the Hamptons. Workshops, beach dinners, morning runs, and the kind of conversations that change things.",
    venue: "Private Estate, Montauk",
    location: "Montauk, NY",
    date: "July 12-14, 2024",
    time: "Check-in: 3 PM",
    attendees: 35,
    maxAttendees: 40,
    isRSVPd: false,
    isFeatured: true,
    price: "Members: $800",
    type: "retreat",
    hostedBy: "Velora",
  },
  {
    id: "e5",
    title: "Gallery Opening: Future Forms",
    description: "Private preview of Future Forms — a group exhibition exploring AI and human creativity. Champagne, conversation, and extraordinary work.",
    venue: "Pace Gallery",
    location: "London, UK",
    date: "May 30, 2024",
    time: "7:00 PM",
    attendees: 45,
    maxAttendees: 60,
    isRSVPd: false,
    isFeatured: false,
    price: "Members Only",
    type: "gallery",
    hostedBy: "Dmitri Volkov",
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    member: MEMBERS[0],
    lastMessage: "Would love to connect at the Basel event!",
    lastMessageAt: "2m ago",
    unread: 2,
    isTyping: false,
  },
  {
    id: "c2",
    member: MEMBERS[1],
    lastMessage: "Thanks for the intro, really valuable.",
    lastMessageAt: "1h ago",
    unread: 0,
    isTyping: false,
  },
  {
    id: "c3",
    member: MEMBERS[3],
    lastMessage: "Sending you the early stream link now.",
    lastMessageAt: "3h ago",
    unread: 1,
    isTyping: true,
  },
  {
    id: "c4",
    member: MEMBERS[5],
    lastMessage: "Let's grab coffee in London next month.",
    lastMessageAt: "Yesterday",
    unread: 0,
    isTyping: false,
  },
  {
    id: "c5",
    member: MEMBERS[7],
    lastMessage: "The tasting menu was extraordinary.",
    lastMessageAt: "2d ago",
    unread: 0,
    isTyping: false,
  },
];

export const PENDING_APPLICATIONS: Application[] = [
  {
    id: "a1",
    name: "Sofia Marchetti",
    email: "sofia@marchetti.co",
    bio: "Creative strategist and brand consultant working with luxury houses across Europe.",
    whyJoin: "I've been following Velora since inception. The curation here is unlike anything I've seen. I want to contribute and connect.",
    submittedAt: "2h ago",
    initials: "SM",
    avatarColor: "#F43F5E",
    interests: ["Fashion", "Art", "Travel", "Design"],
    status: "pending",
  },
  {
    id: "a2",
    name: "James Okafor",
    email: "james@okafor.io",
    bio: "Startup founder and angel investor. Previously at Goldman, now building in fintech.",
    whyJoin: "The people here are exactly the kind of community I want to be part of. High signal, low noise.",
    submittedAt: "5h ago",
    initials: "JO",
    avatarColor: "#22C55E",
    interests: ["Tech", "Finance", "Investing", "Travel"],
    status: "pending",
  },
  {
    id: "a3",
    name: "Yuki Tanaka",
    email: "yuki@tanakadesign.jp",
    bio: "Industrial designer based in Tokyo. Work has been featured in Dezeen and Wallpaper*.",
    whyJoin: "Velora feels like the right room. I've wanted access to this kind of network for a long time.",
    submittedAt: "1d ago",
    initials: "YT",
    avatarColor: "#8B5CF6",
    interests: ["Design", "Architecture", "Art", "Tech"],
    status: "pending",
  },
];

export const INTERESTS = [
  "Art", "Architecture", "Design", "Fashion", "Food",
  "Music", "Tech", "Travel", "Finance", "Photography",
  "Writing", "Culture", "Sports", "Wellness", "Film",
  "Wine", "Real Estate", "Investing", "Sustainability", "Crypto",
];

export const STATS = {
  totalMembers: 847,
  activeToday: 312,
  postsThisWeek: 94,
  eventsThisMonth: 7,
};
