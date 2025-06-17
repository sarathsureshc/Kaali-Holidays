import React, { useState } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/feedback', form);
      toast.success('Thanks for your feedback!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Name" className="w-full border p-2" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" className="w-full border p-2" value={form.email} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" className="w-full border p-2" rows="5" value={form.message} onChange={handleChange} required></textarea>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Send Message</button>
      </form>
    </div>
  );
}
