import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mt-16">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default Layout;
