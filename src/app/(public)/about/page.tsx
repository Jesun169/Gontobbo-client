"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, Users, Award, Rocket } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="pt-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                            About Gontobbo
                        </h1>
                        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                            We're on a mission to revolutionize travel planning with AI-powered technology.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            { icon: Globe, title: "Global Reach", description: "120+ destinations worldwide" },
                            { icon: Users, title: "Community", description: "50,000+ happy travelers" },
                            { icon: Award, title: "Excellence", description: "4.9/5 average rating" },
                            { icon: Rocket, title: "Innovation", description: "AI-powered planning" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <item.icon className="h-10 w-10 text-primary mb-2" />
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Our Story</h2>
                        <p>
                            Gontobbo was born from a simple idea: travel planning should be exciting, not exhausting.
                            We combined cutting-edge AI technology with deep travel expertise to create a platform
                            that helps you discover your next adventure with confidence.
                        </p>
                        <h2>Our Mission</h2>
                        <p>
                            To empower every traveler with intelligent tools and personalized recommendations,
                            making travel planning accessible, enjoyable, and memorable for everyone.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}