
import React from 'react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e4e8c] rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1e4e8c] font-bold text-xl leading-none">MEDdee</span>
            <span className="text-[#6fb6b0] font-bold text-lg leading-tight tracking-widest">POOM</span>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="hidden lg:flex items-center flex-grow mx-8 justify-center">
          <div className="relative w-full max-w-xl">
            <input 
              type="text" 
              placeholder={lang === Language.TH ? "ค้นหา..." : "Search..."}
              className="w-full pl-6 pr-14 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#6fb6b0] focus:border-transparent outline-none transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-2 text-[#1e4e8c]">
            <div className="p-2 bg-gray-50 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <span className="font-bold text-lg">2618</span>
          </div>

          <button className="hidden md:block bg-[#6fb6b0] text-white px-6 py-2 rounded-full font-medium hover:bg-[#5aa49e] transition-colors whitespace-nowrap">
            {lang === Language.TH ? 'ร่วมเป็นสมาชิก' : 'Join Membership'}
          </button>

          <button 
            onClick={toggleLang}
            className="text-gray-600 font-bold hover:text-teal-600 px-2"
          >
            {lang}
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-teal-600 lg:hidden"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="hidden lg:block text-teal-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 animate-fade-in-down">
          <div className="relative">
            <input 
              type="text" 
              placeholder="ค้นหา..."
              className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-200"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[#1e4e8c] py-2 border-b">
            <span>Contact Us</span>
            <span className="font-bold">2618</span>
          </div>
          <button className="w-full bg-[#6fb6b0] text-white py-3 rounded-full font-bold">
            {lang === Language.TH ? 'ร่วมเป็นสมาชิก' : 'Join Membership'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
