"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
    {
        id: 1,
        title: "10 Must-Visit Beaches in Southeast Asia",
        excerpt: "Discover the most stunning beaches that will make your summer unforgettable.",
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
        image: "https://images.unsplash.com/photo-1499856125952-72489de9b6e8?w=600&q=80",
        author: "Michael Chen",
        date: "December 12, 2024",
        category: "Budget Travel",
        readTime: "8 min read",
    },
    {
        id: 3,
        title: "The Rise of AI in Travel Planning",
        excerpt: "How artificial intelligence is transforming the way we plan our adventures.",
        image: "https://images.unsplash.com/photo-1537956965359-0e5b7f15b9f6?w=600&q=80",
        author: "Emily Davis",
        date: "December 10, 2024",
        category: "Technology",
        readTime: "6 min read",
    },
];

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main className="pt-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Blog</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Stories, tips, and inspiration from our travel community
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary">{post.category}</Badge>
                                            <span className="text-xs text-muted-foreground">{post.readTime}</span>
                                        </div>
                                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <User className="h-4 w-4 mr-1" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {post.date}
                                            </div>
                                        </div>
                                        <Button variant="link" className="px-0 mt-2" asChild>
                                            <Link href={`/blog/${post.id}`}>
                                                Read More
                                                <ArrowRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}