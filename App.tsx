
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HealthAssistant from './components/HealthAssistant';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.TH);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(prev => prev === Language.TH ? Language.EN : Language.TH);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar 
        lang={lang} 
        toggleLang={toggleLang} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <main className="flex-grow">
        <Hero lang={lang} />
        
        {/* Additional Content Sections to make it look like a full site */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">
              {lang === Language.TH ? 'บริการระดับพรีเมียมของเรา' : 'Our Premium Services'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: lang === Language.TH ? 'ตรวจสุขภาพประจำปี' : 'Annual Check-up', icon: '📋' },
                { title: lang === Language.TH ? 'ปรึกษาแพทย์ออนไลน์' : 'Telemedicine', icon: '💻' },
                { title: lang === Language.TH ? 'สิทธิพิเศษสมาชิก' : 'Member Privileges', icon: '⭐' }
              ].map((service, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">MEDdee POOM</h3>
            <p className="text-gray-400 max-w-sm">
              {lang === Language.TH 
                ? 'พันธมิตรด้านสุขภาพที่วางใจได้ของคุณ พร้อมให้คำแนะนำและดูแลคุณด้วยความเชี่ยวชาญ' 
                : 'Your trusted health partner, ready to provide advice and care for you with expertise.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{lang === Language.TH ? 'ลิงก์สำคัญ' : 'Links'}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400">Home</a></li>
              <li><a href="#" className="hover:text-teal-400">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{lang === Language.TH ? 'ติดต่อเรา' : 'Contact'}</h4>
            <p className="text-gray-400">Tel: 2618</p>
            <p className="text-gray-400">Email: info@meddeepoom.com</p>
          </div>
        </div>
      </footer>

      <HealthAssistant lang={lang} />
    </div>
  );
};

export default App;
