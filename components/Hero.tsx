
import React, { useState } from 'react';
import { Language, MembershipFormData } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const [formData, setFormData] = useState<MembershipFormData>({
    name: '',
    lastname: '',
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.lastname || !formData.agreed) {
      alert(lang === Language.TH ? 'กรุณากรอกข้อมูลให้ครบถ้วนและยอมรับเงื่อนไข' : 'Please fill in all fields and accept the terms.');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', lastname: '', agreed: false });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-[600px] flex flex-col">
      {/* Background Image Container - Updated with image matching the user's request */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop" 
          alt="Professional doctor at hospital workstation"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Main Content Overlay Area */}
      <div className="relative z-10 flex-grow container mx-auto px-4 flex flex-col justify-end pb-0">
        
        {/* The Teal Banner Bottom Section */}
        <div className="bg-teal-primary/90 text-white p-8 md:p-12 rounded-t-[40px] shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Text Description */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                Your Trusted Health Partner — 
                <span className="block mt-2 font-medium">
                  {lang === Language.TH 
                    ? 'รับความรู้สุขภาพจากแพทย์ผู้เชี่ยวชาญ พร้อมสิทธิพิเศษและข้อเสนอสุดเอ็กซ์คลูซีฟ เพื่อสุขภาพที่ดีกว่าสำหรับคุณ'
                    : 'Get health knowledge from experts with exclusive privileges and offers for your better health.'}
                </span>
              </h1>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={lang === Language.TH ? "ชื่อ" : "Name"}
                    className="w-full px-6 py-4 rounded-full bg-white text-gray-800 focus:ring-2 focus:ring-teal-700 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    value={formData.lastname}
                    onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                    placeholder={lang === Language.TH ? "นามสกุล" : "Lastname"}
                    className="w-full px-6 py-4 rounded-full bg-white text-gray-800 focus:ring-2 focus:ring-teal-700 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Checkbox and Submit */}
              <div className="flex flex-col gap-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-1">
                    <input 
                      type="checkbox" 
                      checked={formData.agreed}
                      onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-white rounded-md peer-checked:bg-teal-800 peer-checked:border-teal-800 transition-all"></div>
                    <svg className="absolute inset-0 w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm leading-snug">
                    {lang === Language.TH 
                      ? 'ข้าพเจ้าได้อ่านและยอมรับข่าวสารข้อมูลต่างๆ โดยยอมรับ นโยบายความเป็นส่วนตัว จาก MEDdeePoom / I have read and agree to receive news and information by accepting the Privacy Policy from MEDdeePoom *'
                      : 'I have read and agree to receive news and information by accepting the Privacy Policy from MEDdeePoom *'}
                  </span>
                </label>

                <div className="flex justify-center md:justify-start">
                  <button 
                    disabled={isSubmitting}
                    className={`
                      min-w-[160px] bg-teal-dark hover:bg-teal-900 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all transform active:scale-95
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                  >
                    {isSubmitting 
                      ? (lang === Language.TH ? 'กำลังดำเนินการ...' : 'Processing...') 
                      : (lang === Language.TH ? 'submit' : 'submit')}
                  </button>
                </div>
              </div>

              {success && (
                <div className="bg-green-100/20 border border-white p-3 rounded-lg text-center animate-bounce">
                  {lang === Language.TH ? 'ลงทะเบียนสำเร็จ! ขอบคุณที่เป็นส่วนหนึ่งกับเรา' : 'Registration successful! Thank you for joining us.'}
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
