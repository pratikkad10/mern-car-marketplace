import React from 'react';
import { Users, Car, Medal, HeartPulse } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Navigation (same as your main page) */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-[url('https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">About AutoMarket</h1>
            <p className="text-lg text-gray-300/80 mb-8">
              Your trusted partner in finding and selling quality vehicles since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-card text-card-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  Founded in 2010, AutoMarket began as a small local dealership with a passion for connecting people with their perfect vehicles.
                </p>
                <p className="text-muted-foreground mb-4">
                  What started as a modest operation has grown into one of the most trusted names in the automotive industry, serving thousands of satisfied customers nationwide.
                </p>
                <p className="text-muted-foreground">
                  Our commitment to transparency, quality, and customer satisfaction has been the driving force behind our success.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
                <img 
                  src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Our beginnings"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">People First</h3>
              <p className="text-muted-foreground">
                We prioritize our customers' needs and build lasting relationships based on trust.
              </p>
            </div>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Vehicles</h3>
              <p className="text-muted-foreground">
                Every car in our inventory undergoes rigorous inspection to ensure reliability.
              </p>
            </div>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Integrity</h3>
              <p className="text-muted-foreground">
                Honest pricing and transparent processes with no hidden fees or surprises.
              </p>
            </div>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartPulse className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Passion</h3>
              <p className="text-muted-foreground">
                We love what we do and it shows in every interaction and vehicle we offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-card text-card-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                bio: "With over 20 years in the automotive industry, Rajesh's vision drives AutoMarket's success.",
                img: "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                name: "Priya Sharma",
                role: "Sales Director",
                bio: "Priya's customer-first approach has helped thousands find their perfect vehicle.",
                img: "https://plus.unsplash.com/premium_photo-1683140685801-4638e36a62fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                name: "Amit Patel",
                role: "Head of Inspections",
                bio: "Amit's meticulous attention to detail ensures every vehicle meets our high standards.",
                img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ].map((member, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-64">
                  <img 
                    src={member.img}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary text-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">13+</p>
              <p className="text-sm uppercase tracking-wider">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">25K+</p>
              <p className="text-sm uppercase tracking-wider">Vehicles Sold</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-sm uppercase tracking-wider">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-sm uppercase tracking-wider">Team Members</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;