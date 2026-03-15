import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await base44.integrations.Core.SendEmail({
        to: 'federalelectionsanalysis@gmail.com',
        subject: `Contact Form: ${formData.subject}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          
          Message:
          ${formData.message}
        `
      });

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-black font-inter font-bold text-3xl sm:text-4xl text-center mb-8">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="bg-primary/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <Input
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div>
              <Input
                required
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div>
              <Input
                required
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div>
              <Textarea
                required
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500 min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 shimmer-hover"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>

          <p className="text-black text-center mt-6 text-sm sm:text-base">
            Send an email to us at federalelectionsanalysis@gmail.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}