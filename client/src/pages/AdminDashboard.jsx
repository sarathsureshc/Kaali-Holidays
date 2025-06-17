import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      const res = await API.get('/packages');
      setPackages(res.data);
    } catch (err) {
      toast.error('Failed to fetch packages');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this package?")) {
      try {
        await API.delete(`/packages/${id}`);
        toast.success("Package deleted");
        fetchPackages();
      } catch {
        toast.error("Error deleting package");
      }
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/add" className="bg-primary text-white px-4 py-2 rounded">Add Package</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {packages.map(pkg => (
          <div key={pkg._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold text-lg">{pkg.title}</h2>
            <p>{pkg.destination} - ₹{pkg.price}</p>
            <p>{pkg.duration}</p>
            <div className="flex gap-2 mt-2">
              <Link to={`/admin/edit/${pkg._id}`} className="text-blue-600">Edit</Link>
              <button onClick={() => handleDelete(pkg._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}