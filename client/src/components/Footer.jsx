// Footer.jsx
import { CopyrightIcon } from 'lucide-react'
import React from 'react'

const Footer = () => (
  <footer className="w-full -mb-10 bg-[#101826]">
    <div className="flex items-center justify-between px-4 h-14">
      <p className="text-zinc-300/80 text-sm flex gap-1 items-center">
        <CopyrightIcon className="h-3 w-3" /> 
        <span>2025 AutoMarket. All rights reserved.</span>
      </p>
      <div className="flex gap-4 text-zinc-300/80 text-sm">
        <span className="cursor-pointer hover:text-white">Privacy Policy</span>
        <span className="cursor-pointer hover:text-white">Terms of Service</span>
        <span className="cursor-pointer hover:text-white">Cookie Policy</span>
      </div>
    </div>
  </footer>
);

export default Footer;
