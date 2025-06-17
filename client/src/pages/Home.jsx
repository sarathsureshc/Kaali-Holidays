import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="h-[90vh] flex items-center justify-center text-center bg-cover bg-center bg-[url('https://source.unsplash.com/1600x900/?travel,beach')]">
        <div className="bg-black bg-opacity-50 p-10 rounded text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World with Kaali Holidays</h1>
          <p className="text-lg mb-6">Your journey begins here</p>
          <Link to="/packages" className="bg-primary text-white px-6 py-3 rounded text-lg">View Packages</Link>
        </div>
      </section>
    </div>
  );
}
