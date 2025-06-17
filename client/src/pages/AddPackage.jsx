import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddPackage() {
  const [form, setForm] = useState({
    title: '',
    destination: '',
    price: '',
    duration: '',
    itinerary: '',
    description: '',
    images: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        itinerary: form.itinerary.split('\n'),
        images: form.images.split(',').map(url => url.trim()),
      };
      await API.post('/packages', payload);
      toast.success('Package added successfully');
      navigate('/admin');
    } catch (err) {
      toast.error('Failed to add package');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" className="w-full border p-2" onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" className="w-full border p-2" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" className="w-full border p-2" onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Duration (e.g., 5 Days)" className="w-full border p-2" onChange={handleChange} required />
        <textarea name="itinerary" placeholder="Itinerary (one per line)" className="w-full border p-2" rows="4" onChange={handleChange}></textarea>
        <textarea name="description" placeholder="Description" className="w-full border p-2" rows="3" onChange={handleChange}></textarea>
        <input type="text" name="images" placeholder="Image URLs (comma separated)" className="w-full border p-2" onChange={handleChange} />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add Package</button>
      </form>
    </div>
  );
}