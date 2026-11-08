import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      img: "https://static.goldlbma-trade.com/assets/images/welcome.svg",
      title: "Welcome to",
      subtitle: "A highly trusted comprehensive trading place, with a selection of high-quality trading products."
    },
    {
      img: "https://static.goldlbma-trade.com/assets/images/fee.svg",
      title: "Ultra-low fee rate",
      subtitle: "All transactions enjoy super fee rate, even 0 fee."
    },
    {
      img: "https://static.goldlbma-trade.com/assets/images/onekey.svg",
      title: "One Key Trading",
      subtitle: "Innovative tools to create a fast digital financial product trading experience."
    },
    {
      img: "https://static.goldlbma-trade.com/assets/images/full.svg",
      title: "Full Product",
      subtitle: "Full Product"
    }
  ];

  return (
    <div className="flex flex-col bg-black h-screen w-full overflow-hidden font-sans">
      {/* Top Skip Button */}
      <div className="flex items-center justify-end px-6 h-16 shrink-0 z-20">
        <button onClick={() => navigate('/dashboard')} className="text-sm text-white hover:text-gray-300">
          Skip
        </button>
      </div>
      
      {/* Slider Section */}
      <div className="flex-1 relative overflow-hidden">
        <div 
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
            {slides.map((slide, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 flex flex-col items-center justify-start pt-4">
                    <img 
                        src={slide.img} 
                        alt={slide.title} 
                        style={{ height: '250px', width: 'fit-content' }}
                        className="object-contain mb-8"
                    />
                    <h2 className="text-[32px] text-white pt-8 font-normal leading-tight">{slide.title}</h2>
                    <span className="text-xs text-[#888] px-10 text-center mt-2 leading-relaxed max-w-xs">
                      {slide.subtitle}
                    </span>
                </div>
            ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 pb-8 z-20">
         {slides.map((_, i) => (
             <button 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${activeSlide === i ? 'bg-[#3d5afe]' : 'bg-[#ffffff33]'}`}
             />
         ))}
      </div>

      {/* Start Now Button */}
      <div className="flex-none flex px-4 bg-black pb-[70px]">
        <button 
            onClick={() => navigate('/dashboard')}
            className="flex-1 h-fit self-end py-[6px] px-4 bg-[#3d5afe] hover:bg-[#2a3eb1] text-sm text-white text-center rounded transition-colors"
        >
            Start Now
        </button>
      </div>
    </div>
  );
};