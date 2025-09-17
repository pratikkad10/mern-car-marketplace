import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 mt-[53px]">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
