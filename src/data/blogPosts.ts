export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Must-Visit Beaches in Southeast Asia",
    excerpt: "Discover the most stunning beaches that will make your summer unforgettable.",
    content: `<p>Full content here...</p>`,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    author: "Sarah Johnson",
    date: "December 15, 2024",
    category: "Travel Tips",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Plan a Budget-Friendly Trip to Europe",
    excerpt: "Expert tips on exploring Europe without breaking the bank.",
    content: `<p>Full content here...</p>`,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    author: "Michael Chen",
    date: "December 12, 2024",
    category: "Budget Travel",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "The Rise of AI in Travel Planning",
    excerpt: "How artificial intelligence is transforming the way we plan our adventures.",
    content: `<p>Full content here...</p>`,
    image: "https://images.unsplash.com/photo-1488085061387-422e29c1a1c9?w=600&q=80",
    author: "Emily Davis",
    date: "December 10, 2024",
    category: "Technology",
    readTime: "6 min read",
  },
];