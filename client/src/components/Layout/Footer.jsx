import React from "react";

/**
 * Footer component: Simple footer with copyright info.
 * Uses TailwindCSS for styling. Fixed at bottom with light background.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-12">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} AI Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
