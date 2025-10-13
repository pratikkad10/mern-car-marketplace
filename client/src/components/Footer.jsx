// Footer.jsx
import React from 'react'
import { CopyrightIcon, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Footer = () => (
  <footer className="mt-auto w-full bg-background border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="[font-family:var(--font-logo)] text-2xl text-gray-800 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">AutoMarket</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Buy and sell cars with confidence. Explore thousands of listings, verified sellers, and easy financing.
          </p>
          <div className="mt-4 flex items-center gap-3 text-muted-foreground">
            <a aria-label="Facebook" className="hover:text-foreground cursor-pointer"><Facebook className="h-5 w-5" /></a>
            <a aria-label="Instagram" className="hover:text-foreground cursor-pointer"><Instagram className="h-5 w-5" /></a>
            <a aria-label="Twitter" className="hover:text-foreground cursor-pointer"><Twitter className="h-5 w-5" /></a>
            <a aria-label="YouTube" className="hover:text-foreground cursor-pointer"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <NavLink to="/" className={({isActive}) => `block hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/cars/buy" className={({isActive}) => `block hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>Buy Car</NavLink>
            </li>
            <li>
              <NavLink to="/car/sell" className={({isActive}) => `block hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>Sell Car</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({isActive}) => `block hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) => `block hover:text-foreground ${isActive ? 'text-foreground' : ''}`}>Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold text-foreground">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-foreground cursor-pointer">Privacy Policy</li>
            <li className="hover:text-foreground cursor-pointer">Terms of Service</li>
            <li className="hover:text-foreground cursor-pointer">Cookie Policy</li>
            <li className="hover:text-foreground cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Newsletter / Contact */}
        <div>
          <h4 className="text-sm font-semibold text-foreground">Stay Updated</h4>
          <p className="mt-3 text-sm text-muted-foreground">Get the latest deals and listings in your inbox.</p>
          <form className="mt-3 flex gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-background" />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Subscribe</Button>
          </form>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Bengaluru, India</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 80 1234 5678</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@automarket.in</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <CopyrightIcon className="h-3 w-3" /> 2025 AutoMarket. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">Made with ❤️ for car enthusiasts.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
