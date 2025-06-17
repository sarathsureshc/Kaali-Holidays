import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-primary">Kaali Holidays</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/packages" className="hover:text-primary">Packages</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
