import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Link } from 'react-router-dom';

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get('/packages');
      setPackages(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Packages</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <Link to={`/packages/${pkg._id}`} key={pkg._id} className="border rounded-lg shadow hover:shadow-lg transition">
            <img src={pkg.images[0]} alt={pkg.title} className="h-48 w-full object-cover rounded-t" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{pkg.title}</h2>
              <p>{pkg.destination}</p>
              <p className="text-primary font-bold">₹{pkg.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
