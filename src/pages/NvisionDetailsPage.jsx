import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- DATA ---
const highlights = [
  { title: 'About NVISION', copy: 'NVISION is a hands-on technical festival bringing together innovators, engineers, and creators.', icon: '🤖' },
  { title: 'Theme', copy: 'From manual control to smart automation, machines perceive, decide, and react.', icon: '🌐' },
  { title: 'Highlights', copy: 'Live robot builds, sensor workshops, and obstacle-navigation demonstrations.', icon: '⚡' },
  { title: 'Schedule', copy: 'A focused multi-day experience featuring build sessions and final live showcases.', icon: '📅' },
  { title: 'Venue', copy: 'National Institute of Technology Durgapur, West Bengal, India.', icon: '📍' },
];

const timeline = [
  { time: '09:00', title: 'Registration & Inauguration', detail: 'Participant registration followed by event instructions.' },
  { time: '10:00', title: 'Workshop Session', detail: 'Introduction to components and control mechanisms.' },
  { time: '12:30', title: 'Hands-on Build Session', detail: 'Participants assemble and wire the robotic car.' },
  { time: '14:30', title: 'Testing & Debugging', detail: 'Track testing and obstacle detection tuning.' },
  { time: '16:30', title: 'Final Demonstration', detail: 'Live demonstration of sensor-based navigation.' },
  { time: '17:30', title: 'Results & Valedictory', detail: 'Evaluation results and certificate distribution.' }
];

function NvisionDetailsPage() {
  const [now, setNow] = useState(new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMins = getMinutes(timeline[0].time);
  const endMins = getMinutes(timeline[timeline.length - 1].time);
  const totalProgress = Math.max(0, Math.min(1, (currentMinutes - startMins) / (endMins - startMins)));

  const getStatus = (timeStr, nextTimeStr) => {
    const thisMins = getMinutes(timeStr);
    const nextMins = nextTimeStr ? getMinutes(nextTimeStr) : thisMins + 60;
    if (currentMinutes >= nextMins) return 'completed';
    if (currentMinutes >= thisMins && currentMinutes < nextMins) return 'active';
    return 'pending';
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white py-24 font-sans selection:bg-blue-100">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-28">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-4 italic"
          >
            NVISION<span className="text-blue-600 not-italic">.</span>
          </motion.h2>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="px-6 py-3 bg-slate-900 rounded-2xl text-white font-mono text-lg inline-flex items-center gap-4 shadow-2xl border border-slate-800"
          >
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping" />
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </motion.div>
        </div>

        {/* HIGHLIGHTS GRID WITH ZOOM */}
        <div className="grid gap-8 md:grid-cols-3 mb-40">
          {highlights.slice(0, 3).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, rotateZ: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 text-center flex flex-col items-center shadow-sm"
            >
              <span className="text-6xl mb-6">{item.icon}</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.copy}</p>
            </motion.div>
          ))}
        </div>

        {/* TIMELINE SECTION (Sides to Middle) */}
        <div className="relative max-w-5xl mx-auto px-2">
          
          {/* Central Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-slate-100 -translate-x-1/2 rounded-full hidden md:block">
            <motion.div 
              className="w-full bg-blue-600 origin-top rounded-full shadow-[0_0_30px_rgba(37,99,235,0.8)]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: totalProgress }}
              transition={{ type: "spring", stiffness: 20 }}
            />
          </div>

          <div className="space-y-16">
            {timeline.map((entry, idx) => {
              const status = getStatus(entry.time, timeline[idx + 1]?.time);
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between">
                  
                  {/* Timeline Card Flying in from sides */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 150 : -150, rotateY: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    className={`w-full md:w-[44%] ${isEven ? 'md:order-last' : 'md:order-first'}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`p-10 rounded-[2.5rem] border-2 transition-all duration-700 ${
                        status === 'active' 
                          ? 'bg-slate-900 text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] border-blue-500' 
                          : 'bg-white border-slate-50 shadow-2xl shadow-slate-200/50'
                      } ${status === 'completed' ? 'opacity-40 grayscale-[0.8]' : ''}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
                          status === 'active' ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {entry.time}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold tracking-tight">{entry.title}</h4>
                      <p className={`text-sm mt-4 leading-relaxed ${status === 'active' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {entry.detail}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Central Node Dot (Zoom in) */}
                  <div className="absolute left-[50%] top-[-40px] md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 150 }}
                      className={`w-14 h-14 rounded-full border-[6px] border-white shadow-2xl flex items-center justify-center
                        ${status === 'completed' ? 'bg-blue-600' : status === 'active' ? 'bg-slate-900' : 'bg-slate-200'}
                      `}
                    >
                      {status === 'active' && <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25" />}
                      <span className="text-xs font-bold text-white">{status === 'completed' ? '✓' : ''}</span>
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-[44%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL FOOTER CARD */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="mt-40 p-16 rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 [background-image:radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
          <h3 className="text-4xl font-black mb-4 relative z-10 italic">Ready for the Experience?</h3>
          <p className="text-blue-100 mb-10 relative z-10">DM Sen Auditorium, NIT Durgapur — See you at 09:00 AM.</p>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-12 py-5 bg-white text-blue-600 font-black rounded-full shadow-2xl text-lg relative z-10"
          >
            NAVIGATE TO VENUE
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default NvisionDetailsPage;