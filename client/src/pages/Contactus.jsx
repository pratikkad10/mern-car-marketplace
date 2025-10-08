import React from "react";
import { MapPin, Phone, Clock, MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const ContactUs = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Navigation (same as your main page) */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-[url('https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-zinc-200/80 mb-8">
              We're here to help with all your automotive needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-card text-card-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Location */}
              <div className="bg-background p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Our Locations
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Headquarters</h4>
                    <p className="text-muted-foreground">
                      123 Auto Plaza, Bangalore, Karnataka 560001
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Mumbai Branch</h4>
                    <p className="text-muted-foreground">
                      456 Motor Street, Mumbai, Maharashtra 400001
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Delhi Branch</h4>
                    <p className="text-muted-foreground">
                      789 Vehicle Lane, New Delhi 110001
                    </p>
                  </div>
                </div>
              </div>
              {/* Contact */}
              <div className="bg-background p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Contact Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Sales Inquiries</h4>
                    <p className="text-muted-foreground">+91 80 1234 5678</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Service Department</h4>
                    <p className="text-muted-foreground">+91 80 9876 5432</p>
                  </div>
                  <div>
                    <h4 className="font-medium">General Inquiries</h4>
                    <p className="text-muted-foreground">info@automarket.in</p>
                  </div>
                </div>
              </div>
              {/* Hours */}
              <div className="bg-background p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">11:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section (unchanged) */}
      {/* ... same as your code ... */}

      {/* Map Section (unchanged) */}
      {/* ... same as your code ... */}

      {/* FAQ Section with Accordion */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit/debit cards, bank transfers, and financing options through our partner banks.",
                },
                {
                  question: "Do you offer test drives?",
                  answer:
                    "Yes, we encourage test drives for all our vehicles. Please contact us to schedule an appointment.",
                },
                {
                  question: "What is your return policy?",
                  answer:
                    "We offer a 7-day return policy on all vehicles with certain conditions. Please ask our sales team for details.",
                },
                {
                  question: "Do you provide vehicle delivery?",
                  answer:
                    "Yes, we can arrange delivery anywhere in India for an additional fee based on distance.",
                },
                {
                  question: "How often do you update your inventory?",
                  answer:
                    "We update our inventory daily with new arrivals. Check our website regularly or sign up for alerts.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer (same as your main page) */}
    </div>
  );
};

export default ContactUs;
