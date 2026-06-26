'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Globe, Plane, Star, Users, MapPin, Calendar, Clock, Award, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// ✅ Working Unsplash photo IDs (confirmed)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80';

const DESTINATIONS = [
  { name: 'Bali, Indonesia', id: '1507525428034-b723cf961d3e' },
 
  { name: 'Tokyo, Japan', id: '1540541338287-41700207dee6' },
 
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    id: "1494790108377-be9c29b29330",
    review: "Gontobbo made planning our trip so easy! The AI recommendations were spot-on and we had an amazing time."
  },
  {
    name: "Michael Chen",
    id: "1507003211169-0a1dd7228f2d",
    review: "The smart itinerary feature saved us so much time. We visited places we would have never found on our own."
  },
  {
    name: "Emily Davis",
    id: "1438761681033-6461ffad8d80",
    review: "Best travel platform I've used. The AI assistant helped us plan every detail of our dream vacation."
  }
];

// ✅ Fallback image if Unsplash fails
const FALLBACK_IMAGE = 'https://picsum.photos/seed/fallback/400/300';

export default function Home() {
  // Optional: track image errors to show fallback
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (key: string) => {
    setImgErrors(prev => ({ ...prev, [key]: true }));
  };

  const getImageSrc = (id: string, width = 400) => {
    return `https://images.unsplash.com/photo-${id}?w=${width}&q=80`;
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={HERO_IMAGE}
              alt="Travel Hero"
              fill
              className="object-cover"
              priority
              onError={() => handleImageError('hero')}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Discover Your Next
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Adventure with AI
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Let AI help you plan the perfect trip. Get personalized recommendations, smart itineraries, and seamless booking.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/destinations">
                  <Button size="lg" className="text-lg">
                    Explore Destinations
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                    Get Started Free
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-sm text-gray-300">Travelers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">120+</div>
                  <div className="text-sm text-gray-300">Destinations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-sm text-gray-300">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-sm text-gray-300">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Gontobbo?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of travel planning with AI-powered features
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Compass className="h-8 w-8 text-primary" />,
                  title: "AI Recommendations",
                  description: "Get personalized destination suggestions based on your preferences"
                },
                {
                  icon: <Globe className="h-8 w-8 text-primary" />,
                  title: "Smart Itineraries",
                  description: "AI-generated day-by-day plans optimized for your interests"
                },
                {
                  icon: <Plane className="h-8 w-8 text-primary" />,
                  title: "Seamless Booking",
                  description: "Book flights, hotels, and activities all in one place"
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Secure & Trusted",
                  description: "Verified listings and secure payment processing"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Popular Destinations</h2>
                <p className="text-muted-foreground mt-2">Discover the most loved places by our travelers</p>
              </div>
              <Link href="/destinations">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATIONS.map((item, index) => {
                const imageKey = `dest-${index}`;
                const imageSrc = imgErrors[imageKey] ? FALLBACK_IMAGE : getImageSrc(item.id);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(imageKey)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 (2.3k reviews)</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">What Our Travelers Say</h2>
              <p className="text-muted-foreground mt-2">Real stories from real travelers</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial, index) => {
                const imageKey = `test-${index}`;
                const imageSrc = imgErrors[imageKey] ? FALLBACK_IMAGE : getImageSrc(testimonial.id, 100);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-lg p-6 border shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(imageKey)}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.review}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of travelers who are already planning smarter with Gontobbo
              </p>
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="text-lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}