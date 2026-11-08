import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Wallet, BarChart3, AppWindow, Zap, Globe, Star, ChevronDown, CheckCircle2 } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden bg-[#13111a]">
      
      {/* Hero Section */}
      <section id="home" className="relative pt-[130px] lg:pt-[200px] px-6 max-w-[1320px] mx-auto w-full">
        {/* Background Shapes */}
        <div className="absolute top-[15%] left-[50%] -translate-x-1/2 z-[3]">
            <img src="https://static.goldlbma-trade.com/assets/images/shapes-round.png" alt="" className="relative z-[2]" />
            <div className="absolute z-[1] w-[150px] h-[150px] top-[-35px] left-[-35px] rounded-full bg-[#2c04fe26]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[#fff] text-[40px] mt-0 mb-2 leading-[1.2] font-semibold">
              New-gen of digital exchange
            </h1>
            <div className="text-[#fff] text-[20px] mb-4">
              Get started with one of the easiest and most secure platforms for buying, selling, trading, and earning digital exchange in one place.
            </div>
            
            <div className="flex items-center gap-2 mt-[35px] lg:mt-[55px]">
               <a href="#" className="flex-1 flex items-center justify-center">
                  <img src="https://static.goldlbma-trade.com/assets/images/app-store.svg" alt="App Store" className="h-16 max-w-full" />
               </a>
               <a href="#" className="flex-1 flex items-center justify-center">
                  <img src="https://static.goldlbma-trade.com/assets/images/google-play.svg" alt="Google Play" className="h-16 max-w-full" />
               </a>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-5 text-right mt-[50px] lg:mt-0 relative">
             <div className="relative inline-block">
                <img src="https://static.goldlbma-trade.com/assets/images/hero-thumb.webp" alt="Hero" className="max-w-full" />
                {/* Floating Bitcoins */}
                <div className="absolute top-[-95px] right-[130px] animate-bounce duration-[3000ms]">
                   <img src="https://static.goldlbma-trade.com/assets/images/bitcoin1.webp" alt="" />
                </div>
                <div className="absolute top-[20px] left-[25px] w-[29%] animate-bounce duration-[4000ms]">
                   <img src="https://static.goldlbma-trade.com/assets/images/bitcoin2.webp" alt="" />
                </div>
                <div className="absolute top-[5px] right-[20px] animate-bounce duration-[5000ms]">
                   <img src="https://static.goldlbma-trade.com/assets/images/bitcoin3.png" alt="" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="mx-auto max-w-[1320px] px-6 w-full">
        <div className="text-center text-[24px] text-[#fff] font-semibold mb-[60px]">Trusted Over 80k+ Companies in the World</div>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-100 grayscale-0">
           <img src="https://static.goldlbma-trade.com/assets/images/client1.png" alt="Client 1" className="h-8 md:h-12 object-contain" />
           <img src="https://static.goldlbma-trade.com/assets/images/client2.png" alt="Client 2" className="h-8 md:h-12 object-contain" />
           <img src="https://static.goldlbma-trade.com/assets/images/client3.png" alt="Client 3" className="h-8 md:h-12 object-contain" />
           <img src="https://static.goldlbma-trade.com/assets/images/client4.png" alt="Client 4" className="h-8 md:h-12 object-contain" />
           <img src="https://static.goldlbma-trade.com/assets/images/client5.png" alt="Client 5" className="h-8 md:h-12 object-contain" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mx-auto max-w-[1320px] px-6 w-full grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="col-span-12 lg:col-span-6 mb-[30px] lg:mb-0 lg:mr-[50px]">
           <div className="relative z-[4] w-full">
               <img src="https://static.goldlbma-trade.com/assets/images/video-thumb.webp" alt="" className="w-full relative z-[2]"/>
               <div className="hidden lg:block absolute z-[1] w-[84%] h-[100%] bottom-[-46px] left-[-26%]">
                   <img src="https://static.goldlbma-trade.com/assets/images/shape-video.webp" alt="" className="w-full rounded-[3px]"/>
               </div>
           </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
           <h2 className="text-[#fff] text-[32px] mt-0 mb-2 leading-[1.2] font-bold">
              LBMA is the most trusted digital exchange platform
           </h2>
           <div className="flex flex-col gap-4 text-[#fff]">
              <p>LBMA Digital exchanges are websites where individuals can buy, sell, or exchange digital assets other digital currency here a LBMA is a digital exchange markets have crashed in the last 24 hours.</p>
              <p>The exchanges can converte a digital assets into major part of a government-backed currencies and convert exchanges.</p>
              
              <button 
                onClick={() => navigate('/welcome')}
                className="relative group w-fit flex items-center justify-center cursor-pointer mt-4"
              >
                  <div className="absolute top-0 left-0 group-hover:top-[5px] group-hover:left-[5px] bg-[#fff] duration-300 ease-in-out w-full h-full rounded-[4px]"></div>
                  <div className="relative text-[#000] bg-[#f7a600] px-[36px] py-4 font-bold rounded-[4px]">
                     Discover more
                  </div>
              </button>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mx-auto max-w-[1320px] px-6 w-full pt-[70px]">
         <div className="flex flex-col text-center max-w-[708px] mb-[50px] lg:mb-[75px] mx-auto">
            <h2 className="text-[#fff] text-[32px] mt-0 mb-2 leading-[1.2] font-[500]">
               Innovative features to buy, trade and invest in digital
            </h2>
            <div className="text-[#fff]">
               A digital exchange is a digital & virtual currency that is secured by LBMA which makes it nearly impossible to counterfeit or double-spend.
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Shield className="text-white" size={32} />} title="Safe and secure" desc="Digital exchange is a digital assets using to secure transactions so there are generally fewer safeguards." />
            <FeatureCard icon={<Wallet className="text-white" size={32} />} title="Easy to create wallet" desc="Create your account. Hosted wallet, you don't need to share any personal info to create a custodial wallet." />
            <FeatureCard icon={<BarChart3 className="text-white" size={32} />} title="Reports & analytics" desc="Crypto fund report published by a cointelegraph research investigates provides benefits to its users." />
            <FeatureCard icon={<AppWindow className="text-white" size={32} />} title="Integrated application" desc="An integrated application is a stand-alone application that can seamlessly integrate into any Fugu project." />
            <FeatureCard icon={<Zap className="text-white" size={32} />} title="Real-time interest" desc="A real interest rate is the interest rate that takes inflation into account. This means it adjusts for inflation." />
            <FeatureCard icon={<Globe className="text-white" size={32} />} title="Multi currency support" desc="Multi-currency support means that shoppers can pay for your products or services using the currency." />
         </div>
      </section>

      {/* Security Section */}
      <section className="mx-auto max-w-[1320px] px-6 w-full pt-[80px]">
         <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
             <div className="col-span-12 lg:col-span-6 lg:mr-[50px] order-2 lg:order-1">
                <h2 className="text-[#fff] text-[32px] mt-0 mb-2 leading-[1.2] font-medium">
                   In the digital world, we are secure & trustworthy
                </h2>
                <div className="text-[#fff] mb-4">
                   LBMA is one of the largest and safest platforms out there. The best digital wallets provide a good mix of security tools and user-facing features at a reasonable cost.
                </div>
                <ul className="flex flex-col mt-[35px] space-y-4 pl-8">
                   <li className="flex gap-3 items-center">
                      <div className="bg-blue-700 rounded-full p-1"><CheckCircle2 size={12} color="white"/></div>
                      <span className="text-[#fff] text-[18px] font-semibold">Cost-effective mode of transaction secure and private.</span>
                   </li>
                   <li className="flex gap-3 items-center">
                      <div className="bg-blue-700 rounded-full p-1"><CheckCircle2 size={12} color="white"/></div>
                      <span className="text-[#fff] text-[18px] font-semibold">Self-governed managed all and easy transfer of funds.</span>
                   </li>
                   <li className="flex gap-3 items-center">
                      <div className="bg-blue-700 rounded-full p-1"><CheckCircle2 size={12} color="white"/></div>
                      <span className="text-[#fff] text-[18px] font-semibold">Currency exchanges finish smoothly and decentralized.</span>
                   </li>
                </ul>
             </div>
             <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 text-right mb-[50px] lg:mb-0">
                 <img src="https://static.goldlbma-trade.com/assets/images/content-thumb.webp" alt="" className="max-w-full relative z-[4]" />
             </div>
         </div>
      </section>

      {/* Steps/Invest Section */}
      <section className="mx-auto max-w-[1320px] px-6 w-full pt-[80px]">
         <div className="grid grid-cols-1 lg:grid-cols-12">
             <div className="col-span-12 lg:col-span-6 mb-[30px] lg:mb-0 lg:mr-[50px]">
                 <img src="https://static.goldlbma-trade.com/assets/images/content-thumb2.webp" alt="" className="max-w-full relative z-[2]" />
             </div>
             <div className="col-span-12 lg:col-span-6">
                <h2 className="text-[#fff] text-[32px] mt-0 mb-2 leading-[1.2] font-bold">
                   Easy step to use LBMA to invest on any device
                </h2>
                <p className="text-[#fff] mb-6">
                   While the concept is simple a place to store your assets & use choosing CMEcan be an incredibly experience.
                </p>
                <button 
                   onClick={() => navigate('/welcome')}
                   className="relative group w-fit flex items-center justify-center cursor-pointer"
                >
                    <div className="absolute top-0 left-0 group-hover:top-[5px] group-hover:left-[5px] bg-[#fff] duration-300 ease-in-out w-full h-full rounded-[4px]"></div>
                    <div className="relative text-[#000] bg-[#f7a600] px-[36px] py-4 font-bold rounded-[4px]">
                       Go To Exchange
                    </div>
                </button>
             </div>
         </div>
      </section>

      {/* Reviews */}
      <section id="review" className="mx-auto max-w-[1320px] px-6 w-full pt-[70px]">
         <div className="flex flex-col text-center max-w-[708px] mb-[50px] lg:mb-[75px] mx-auto">
            <h2 className="text-[#fff] text-[32px] mt-0 mb-2 leading-[1.2] font-[500]">
               Users around the world have a great experience with LBMA
            </h2>
            <div className="text-[#fff]">
               LBMA is a place of trust for millions of people. Our customer reviews overall and is rated just 4.5 out of 5 stars on Trustpilot. It is the right place for you.
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ReviewCard name="Karen Lynn" role="Founder @ Company" text="I found EUREX very professional and trustworthy during my assets trading duration of 147 days. They are very honest and trusted." img="https://static.goldlbma-trade.com/assets/images/author1.webp" />
            <ReviewCard name="Subash Rajendran" role="Software Engineer" text="100% Trusted. Very legit in digital world. So far I'm satisfied with EUREX. I just wish this will continue at this way." img="https://static.goldlbma-trade.com/assets/images/author2.webp" />
            <ReviewCard name="Milan Milenkovic" role="Businessman" text="The best place to start your trading path, thank you for support. Its a safe passive income strategy and will be multiply over time 😍" img="https://static.goldlbma-trade.com/assets/images/author3.webp" />
         </div>

         <div className="flex justify-center mt-14">
            <button className="relative group w-fit flex items-center justify-center cursor-pointer">
               <div className="absolute top-0 left-0 group-hover:top-[5px] group-hover:left-[5px] bg-[#fff] duration-300 ease-in-out w-full h-full rounded-[4px]"></div>
               <div className="relative text-[#000] bg-[#f7a600] px-[36px] py-4 font-bold rounded-[4px]">
                  View All Reviews
               </div>
            </button>
         </div>
      </section>

      {/* FAQ */}
      <section id="help" className="mx-auto max-w-[1320px] px-6 w-full pt-[95px]">
         <div className="flex flex-col text-center max-w-[708px] mb-[50px] lg:mb-[75px] mx-auto relative">
             {/* Decor */}
             <div className="absolute top-[-70px] left-[35%] z-[1] w-[150px] h-[150px] rounded-full bg-[#2c04fe26] blur-xl"></div>
             
             <h2 className="text-[#fff] text-[32px] mt-0 mb-2 leading-[1.2] font-[500] relative z-10">
                Do you have any questions about digital exchange? Ask us
             </h2>
             <div className="text-[#fff] relative z-10">
                Frequently asked questions about digital exchange & blockchain technology. Cryptographic security for conducting trusted transactions.
             </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
               <div className="flex flex-col">
                   <FaqItem question="What is digital exchange in general?" />
                   <FaqItem question="What other types of digital exchange are out there?" />
                   <FaqItem question="What's the connection between NFTs & digital?" />
               </div>
            </div>
            <div>
               <div className="flex flex-col">
                   <FaqItem question="How safe is digital exchange?" />
                   <FaqItem question="What regulation and requirements govern?" />
                   <FaqItem question="What is the biggest problem with digital exchange?" />
               </div>
            </div>
         </div>
      </section>

      {/* Subscribe CTA */}
      <section className="mx-auto max-w-[1320px] px-6 w-full pt-[95px] pb-[80px]">
         <div className="bg-[#f7a600] p-[35px] lg:p-20 rounded-[10px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="relative">
               <img src="https://static.goldlbma-trade.com/assets/images/cta-thumb.webp" alt="" className="max-w-full" />
            </div>
            <div className="w-full">
               <h2 className="text-[#fff] text-[32px] font-medium mt-0 mb-2 leading-[1.2]">
                  Subscribe to learn more and get updates
               </h2>
               <div className="flex flex-col gap-4">
                  <span className="text-[#fff]">A membership site lets you create a secure platform that allows you to deliver content easily and automatically.</span>
                  <div className="relative flex flex-wrap lg:flex-nowrap gap-2 items-center w-full max-w-[460px]">
                     <div className="bg-[#fff] h-[55px] w-full rounded">
                        <input className="text-[#000] bg-transparent w-full h-full border-none outline-none py-[10px] pl-[25px] pr-[10px]" type="text" placeholder="Type your email here" />
                     </div>
                     <button className="bg-[#13111a] text-[#fff] h-[55px] w-full lg:w-[150px] rounded font-bold hover:opacity-90">Subscribe</button>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

// Sub-components for Home Page with updated styling
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-10 flex flex-col items-center justify-center text-center rounded bg-[#26242c] group hover:-translate-y-2 transition-transform duration-300">
     <div className="w-[80px] h-[80px] rounded-[50%] flex items-center justify-center duration-300 ease-in-out bg-[#f7a600] mb-[30px] group-hover:bg-[#fff]">
        <div className="text-white group-hover:text-[#f7a600]">
           {/* Clone the icon and change color on hover logic usually needs state or CSS, simplified here by using currentColor context or just forcing colors */}
           {React.cloneElement(icon as React.ReactElement<any>, { className: "group-hover:text-[#f7a600] text-white transition-colors" })}
        </div>
     </div>
     <h4 className="text-[#fff] mb-[15px] text-[24px] font-semibold">{title}</h4>
     <span className="text-[#fff]">{desc}</span>
  </div>
);

const ReviewCard = ({ name, role, text, img }: { name: string, role: string, text: string, img: string }) => (
   <div className="p-10 flex flex-col justify-center rounded bg-[#26242c] group">
      <div className="flex items-center pl-8 mb-6 gap-1">
         {[1,2,3,4,5].map(i => <Star key={i} fill="#FFC947" stroke="none" size={20} />)}
      </div>
      <span className="text-[#fff] italic">“{text}”</span>
      <div className="flex gap-5 mt-6 items-center">
         <img src={img} alt="avatar" className="rounded-full w-[60px] h-[60px]" />
         <div className="flex flex-col">
            <span className="text-[#fff] text-[20px] font-semibold">- {name}</span>
            <span className="text-[#fff] text-[14px] opacity-70">{role}</span>
         </div>
      </div>
   </div>
);

const FaqItem = ({ question }: { question: string }) => (
   <div className="w-full p-[30px] border-2 border-[#fff] border-b-0 last:border-b-2 text-[#fff] text-[20px] font-semibold cursor-pointer hover:bg-white/5 transition-colors">
      Q. {question}
   </div>
);
