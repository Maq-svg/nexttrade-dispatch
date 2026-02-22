/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  DollarSign, 
  Home, 
  Users, 
  Phone, 
  MapPin, 
  Clock, 
  Briefcase, 
  Video, 
  Sparkles, 
  ChevronRight, 
  Layout, 
  AlertCircle,
  Loader2,
  Download,
  Play,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowUp,
  ShieldCheck
} from 'lucide-react';
import { cn } from './lib/utils';
import { getAI, VEO_MODEL } from './services/gemini';

// --- Types ---

type LayoutOption = 'professional' | 'modern';

interface VideoGenerationState {
  isGenerating: boolean;
  progress: string;
  videoUrl: string | null;
  error: string | null;
}

// --- Components ---

const Navbar = () => {
  const scrollToApply = () => {
    const element = document.getElementById('apply-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-brand-primary p-2 rounded-lg">
              <Truck className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">NEXT TRADE LLC</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors">About</a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors">Benefits</a>
            <a href="#video-gen" className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors">AI Video</a>
            <button 
              onClick={scrollToApply}
              className="bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LayoutToggle = ({ active, onChange }: { active: LayoutOption, onChange: (val: LayoutOption) => void }) => (
  <div className="flex justify-center mb-12">
    <div className="bg-slate-100 p-1 rounded-2xl flex gap-1">
      <button 
        onClick={() => onChange('professional')}
        className={cn(
          "px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
          active === 'professional' ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}
      >
        <Briefcase className="w-4 h-4" />
        Professional
      </button>
      <button 
        onClick={() => onChange('modern')}
        className={cn(
          "px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
          active === 'modern' ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}
      >
        <Layout className="w-4 h-4" />
        Modern & Bold
      </button>
    </div>
  </div>
);

const ProfessionalLayout = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto"
  >
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-brand-primary p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <Truck size={400} />
        </div>
        <div className="relative z-10">
          <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4">Don’t Just Move Cars—Move Your Career.</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">NOW HIRING:<br />CAR HAULING BROKERS</h1>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2">
              <DollarSign className="text-green-400 w-5 h-5" />
              <span className="font-semibold">50K – 500K PKR</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 flex items-center gap-2">
              <Home className="text-blue-400 w-5 h-5" />
              <span className="font-semibold">100% Remote</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Why Join Next Trade LLC?</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            We are looking for motivated brokers to manage loads, negotiate rates, and grow with a U.S.-based leader in logistics. Join a family-oriented team that values your drive.
          </p>
          <ul className="space-y-4">
            {[
              "Direct access to premium U.S. loads",
              "Comprehensive training provided",
              "High-performance culture",
              "Weekly payouts & bonuses"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <div className="bg-blue-100 p-1 rounded-full">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-brand-accent" />
            Contact Information
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Call / WhatsApp</p>
              <p className="text-xl font-display font-bold">0328 5288 041</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">Location</p>
              <p className="text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                Township, Lahore
              </p>
            </div>
            <button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Apply via Form
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ModernLayout = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="max-w-5xl mx-auto"
  >
    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 aspect-[16/9] md:aspect-auto md:min-h-[600px] flex items-center">
      <img 
        src="https://picsum.photos/seed/truck-highway/1920/1080?blur=2" 
        alt="Truck on highway" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      
      <div className="relative z-10 p-8 md:p-20 max-w-2xl">
        <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Your Drive. Our Platform. Unlimited Success.
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Car Hauling <span className="text-blue-500">Broker</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 font-medium">
          Not Truck Dispatching! High-level sales & logistics brokerage.
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="border-l-2 border-blue-500 pl-4">
            <p className="text-slate-400 text-sm uppercase font-bold tracking-wider">Salary</p>
            <p className="text-white text-xl font-bold">Base + High Commissions</p>
            <p className="text-blue-400 text-sm">Top earners: 500K+</p>
          </div>
          <div className="border-l-2 border-slate-500 pl-4">
            <p className="text-slate-400 text-sm uppercase font-bold tracking-wider">Shift</p>
            <p className="text-white text-xl font-bold">4 PM – 6 AM</p>
            <p className="text-slate-400 text-sm">Flexible for talent</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
          >
            Apply Now <Sparkles className="w-5 h-5 text-blue-600" />
          </button>
          <button className="bg-slate-800/50 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all">
            Call 0328 5288 041
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const VideoGenSection = () => {
  const [prompt, setPrompt] = useState("A professional, cinematic advertisement background featuring a modern 9-car carrier trailer truck driving on a clean American highway during golden hour. High resolution, 4k, corporate logistics style.");
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [state, setState] = useState<VideoGenerationState>({
    isGenerating: false,
    progress: '',
    videoUrl: null,
    error: null
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setState({ isGenerating: true, progress: 'Initializing...', videoUrl: null, error: null });

    try {
      // Check for API key
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // After opening, we assume they might have selected it, but the platform handles the key injection
      }

      const ai = getAI();
      let operation = await ai.models.generateVideos({
        model: VEO_MODEL,
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      setState(prev => ({ ...prev, progress: 'Generating video (this may take a few minutes)...' }));

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // We need to fetch with API key header
        // In this environment, process.env.API_KEY is injected
        const apiKey = (process.env as any).API_KEY || (process.env as any).GEMINI_API_KEY;
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey,
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setState({ isGenerating: false, progress: '', videoUrl: url, error: null });
      } else {
        throw new Error("Failed to get video download link.");
      }

    } catch (err: any) {
      console.error(err);
      setState({ 
        isGenerating: false, 
        progress: '', 
        videoUrl: null, 
        error: err.message || "An error occurred during generation." 
      });
      
      if (err.message?.includes("Requested entity was not found")) {
        setState(prev => ({ ...prev, error: "API Key issue. Please select a valid paid project key." }));
      }
    }
  };

  return (
    <section id="video-gen" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> Powered by Veo 3
          </div>
          <h2 className="text-4xl font-bold mb-4">AI Recruitment Video Generator</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Create high-quality, cinematic marketing videos for your car hauling brokerage in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Video Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Describe the video you want to generate..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Aspect Ratio</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setAspectRatio('16:9')}
                    className={cn(
                      "flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all",
                      aspectRatio === '16:9' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                    )}
                  >
                    <Layout className="w-4 h-4" /> 16:9 Landscape
                  </button>
                  <button 
                    onClick={() => setAspectRatio('9:16')}
                    className={cn(
                      "flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all",
                      aspectRatio === '9:16' ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                    )}
                  >
                    <Video className="w-4 h-4" /> 9:16 Portrait
                  </button>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={state.isGenerating}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Video
                  </>
                )}
              </button>

              {state.error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{state.error}</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-slate-800">
            {state.isGenerating ? (
              <div className="text-center p-8">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                <p className="text-white font-medium">{state.progress}</p>
                <p className="text-slate-500 text-sm mt-2">This usually takes 1-3 minutes</p>
              </div>
            ) : state.videoUrl ? (
              <div className="relative w-full h-full group">
                <video 
                  src={state.videoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href={state.videoUrl} 
                    download="next-trade-recruitment.mp4"
                    className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400 font-medium">Your generated video will appear here</p>
                <p className="text-slate-600 text-sm mt-2">Enter a prompt and click generate to start</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingShare = () => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = "Join Next Trade LLC as a Car Hauling Broker! High earnings, 100% remote.";

  const shareLinks = [
    { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Twitter', icon: Twitter, color: 'bg-[#1DA1F2]', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}` },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-[#0A66C2]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}` },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3">
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: 5 }}
          className={cn(
            "w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg transition-all",
            link.color
          )}
          title={`Share on ${link.name}`}
        >
          <link.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  );
};

const SocialShare = () => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = "Join Next Trade LLC as a Car Hauling Broker! High earnings, 100% remote.";

  const shareLinks = [
    { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Twitter', icon: Twitter, color: 'bg-[#1DA1F2]', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}` },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-[#0A66C2]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}` },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-8">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-md",
            link.color
          )}
        >
          <link.icon className="w-4 h-4" />
          {link.name}
        </a>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmed Khan",
      role: "Senior Broker",
      text: "Joining Next Trade changed my perspective on logistics. The commission structure is transparent, and the support from the U.S. team is unmatched.",
      image: "https://picsum.photos/seed/ahmed/100/100"
    },
    {
      name: "Sara Malik",
      role: "Logistics Specialist",
      text: "The flexibility of remote work allowed me to balance my life while earning more than I ever did in traditional dispatching. It's a true brokerage role.",
      image: "https://picsum.photos/seed/sara/100/100"
    },
    {
      name: "Zain Ali",
      role: "Top Performer",
      text: "I hit the 500K PKR mark in my third month. If you have the drive and sales skills, this platform will take you to the next level.",
      image: "https://picsum.photos/seed/zain/100/100"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from the brokers who are already scaling their careers with Next Trade LLC.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ApplicationForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'none',
    message: ''
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+]{10,15}$/;
    
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      alert("Please enter a valid phone number.");
      return false;
    }
    if (!agreed) {
      alert("Please agree to the privacy policy.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', experience: 'none', message: '' });
        setAgreed(false);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <section id="apply-form" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Apply for This Position</h2>
            <p className="text-slate-600">Fill out the form below and our recruitment team will contact you within 24 hours.</p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
              <p className="text-slate-600 mb-8">Thank you for your interest in Next Trade LLC. We'll be in touch soon.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-blue-600 font-bold hover:underline"
              >
                Submit another application
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="03xx xxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Logistics Experience</label>
                <select 
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="none">No experience (We provide training)</option>
                  <option value="dispatch">Truck Dispatching (1+ years)</option>
                  <option value="brokerage">Brokerage (1+ years)</option>
                  <option value="sales">Sales/Call Center (1+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Resume (Optional)</label>
                <div className="relative group">
                  <input 
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) alert(`File selected: ${file.name} (Simulation)`);
                    }}
                  />
                  <div className="w-full bg-white border-2 border-dashed border-slate-200 rounded-xl p-6 text-center group-hover:border-blue-400 transition-all">
                    <Download className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-blue-500" />
                    <p className="text-sm text-slate-500">Click or drag and drop your CV here</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Why do you want to join us?</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full h-32 bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Tell us about your drive..."
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <input 
                  id="privacy"
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="text-sm text-slate-600 leading-tight">
                  I agree to the <span className="font-bold text-blue-700">Privacy Policy</span> and consent to Next Trade LLC contacting me regarding this application.
                </label>
              </div>

              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-bold tracking-widest">or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfD_example/viewform" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                >
                  Apply via Google Forms <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary p-2 rounded-lg">
            <Truck className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">NEXT TRADE LLC</span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2026 Next Trade LLC. All rights reserved. U.S. Based Logistics.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors"><Users className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors"><Phone className="w-5 h-5" /></a>
          <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors"><MapPin className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeLayout, setActiveLayout] = useState<LayoutOption>('professional');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Inject JSON-LD for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": "Car Hauling Broker",
      "description": "Next Trade LLC is hiring Car Hauling Brokers in Lahore. Manage U.S. logistics loads, negotiate rates, and earn high commissions. 100% remote work. Full training provided for motivated individuals.",
      "identifier": {
        "@type": "PropertyValue",
        "name": "Next Trade LLC",
        "value": "NT-BROKER-2026"
      },
      "datePosted": "2026-02-21",
      "validThrough": "2027-02-21",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Next Trade LLC",
        "sameAs": "https://nexttradellc.com",
        "logo": "https://picsum.photos/seed/nexttrade-logo/200/200"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Township",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "postalCode": "54000",
          "addressCountry": "PK"
        }
      },
      "jobLocationType": "TELECOMMUTE",
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "PK"
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "PKR",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 50000,
          "maxValue": 500000,
          "unitText": "MONTH"
        }
      },
      "skills": "Sales, Negotiation, Logistics, English Communication",
      "experienceRequirements": "No experience required, full training provided.",
      "occupationalCategory": "41-3031.00 Securities, Commodities, and Financial Services Sales Agents",
      "industry": "Logistics and Supply Chain",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nexttradellc.com"
      }
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <FloatingShare />
      
      <main>
        {/* Hero / Layout Showcase */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Recruitment Flyer Options</h1>
            <p className="text-slate-600">Choose the layout that best fits your brand's voice.</p>
          </div>
          
          <LayoutToggle active={activeLayout} onChange={setActiveLayout} />
          
          <AnimatePresence mode="wait">
            {activeLayout === 'professional' ? (
              <ProfessionalLayout key="prof" />
            ) : (
              <ModernLayout key="modern" />
            )}
          </AnimatePresence>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                  <DollarSign className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Uncapped Earning</h3>
                <p className="text-slate-600">Top performers earn over 500K PKR per month with our aggressive commission structure.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                  <Clock className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">U.S. Market Hours</h3>
                <p className="text-slate-600">Work 4 PM – 6 AM PKT. Perfect for night owls and those looking for a global career path.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="bg-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                  <Home className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">100% Remote</h3>
                <p className="text-slate-600">Work from Township, Lahore or anywhere else. No daily commute, just results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Generation Section */}
        <VideoGenSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Application Form Section */}
        <ApplicationForm />

        {/* SEO & Share Section */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Share2 className="w-3 h-3" /> Spread the Word
            </div>
            <h2 className="text-3xl font-bold mb-4">Know Someone Perfect for This?</h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              Help your network find their next big career move. Share this opportunity on your favorite social platforms.
            </p>
            <SocialShare />
          </div>
        </section>
      </main>

      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-all"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
