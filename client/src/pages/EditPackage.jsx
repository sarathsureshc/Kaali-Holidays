import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditPackage() {
  const [form, setForm] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPackage = async () => {
    try {
      const res = await API.get(`/packages/${id}`);
      setForm({
        ...res.data,
        itinerary: res.data.itinerary.join('\n'),
        images: res.data.images.join(', '),
        price: res.data.price.toString(),
      });
    } catch {
      toast.error('Failed to load package');
    }
  };

  useEffect(() => {
    getPackage();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        itinerary: form.itinerary.split('\n'),
        images: form.images.split(',').map((url) => url.trim()),
      };
      await API.put(`/packages/${id}`, payload);
      toast.success('Package updated successfully');
      navigate('/admin');
    } catch {
      toast.error('Update failed');
    }
  };

  if (!form) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Package</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" name="title" value={form.title} className="w-full border p-2" onChange={handleChange} required />
        <input type="text" name="destination" value={form.destination} className="w-full border p-2" onChange={handleChange} required />
        <input type="number" name="price" value={form.price} className="w-full border p-2" onChange={handleChange} required />
        <input type="text" name="duration" value={form.duration} className="w-full border p-2" onChange={handleChange} required />
        <textarea name="itinerary" value={form.itinerary} className="w-full border p-2" rows="4" onChange={handleChange}></textarea>
        <textarea name="description" value={form.description} className="w-full border p-2" rows="3" onChange={handleChange}></textarea>
        <input type="text" name="images" value={form.images} className="w-full border p-2" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Package</button>
      </form>
    </div>
  );
}