"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, HelpCircle, BookOpen, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "How do I create an account?",
        answer: "Click the 'Sign Up' button in the top right corner. Fill in your details and verify your email address.",
    },
    {
        question: "How does the AI travel assistant work?",
        answer: "Our AI assistant analyzes your preferences and provides personalized recommendations, itineraries, and travel tips.",
    },
    {
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel bookings through your dashboard. Cancellation policies vary by destination.",
    },
    {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and never store your payment details on our servers.",
    },
];

export default function HelpPage() {
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                            Find answers to common questions or get in touch with our support team.
                        </p>
                        <div className="max-w-xl mx-auto flex gap-2">
                            <Input placeholder="Search for help..." className="flex-1" />
                            <Button>
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: HelpCircle, title: "FAQ", description: "Quick answers to common questions" },
                            { icon: BookOpen, title: "Guides", description: "Step-by-step tutorials and tips" },
                            { icon: MessageCircle, title: "Live Chat", description: "Chat with our support team" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full text-center hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.description}</p>
                                        <Button variant="link" className="mt-2">
                                            Learn More →
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                    >
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-lg">{faq.question}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground">{faq.answer}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Still Need Help?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground">
                                        Our support team is here to help. Choose your preferred contact method:
                                    </p>
                                    <div className="space-y-2">
                                        <Button className="w-full justify-start" variant="outline">
                                            <Mail className="mr-2 h-4 w-4" />
                                            Email Support
                                        </Button>
                                        <Button className="w-full justify-start" variant="outline">
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Live Chat
                                        </Button>
                                        <Link href="/contact">
                                            <Button className="w-full justify-start" variant="outline">
                                                <HelpCircle className="mr-2 h-4 w-4" />
                                                Contact Form
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}