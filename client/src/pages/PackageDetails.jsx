import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

export default function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      const res = await API.get(`/packages/${id}`);
      setPkg(res.data);
    };
    fetchPackage();
  }, [id]);

  if (!pkg) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <img src={pkg.images[0]} alt={pkg.title} className="w-full h-96 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{pkg.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{pkg.destination} — {pkg.duration}</p>
      <p className="mb-6">{pkg.description}</p>
      <h2 className="text-xl font-semibold mb-2">Itinerary:</h2>
      <ul className="list-disc pl-6">
        {pkg.itinerary.map((item, idx) => (
          <li key={idx} className="mb-1">{item}</li>
        ))}
      </ul>
      <p className="text-2xl font-bold mt-6 text-primary">Price: ₹{pkg.price}</p>
    </div>
  );
}
