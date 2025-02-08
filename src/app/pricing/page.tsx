"use client"
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div>
      <section className="text-gray-300 body-font overflow-hidden bg-black">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-gray-300">
              Subscription Plans
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 mb-6">
              <span className="font-bold text-green-500">Limited-time Offer: </span>
              Avail 80% Discount on all plans!
            </p>
            <div className="flex mx-auto border-2 border-green-500 rounded-lg overflow-hidden">
              <button 
                className={`py-2 px-6 ${isMonthly ? 'bg-green-500 text-white' : 'text-green-500'} focus:outline-none transition-colors duration-200`}
                onClick={() => setIsMonthly(true)}
              >
                Monthly
              </button>
              <button 
                className={`py-2 px-6 ${!isMonthly ? 'bg-green-500 text-white' : 'text-green-500'} focus:outline-none transition-colors duration-200`}
                onClick={() => setIsMonthly(false)}
              >
                Annually
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center -m-4 gap-8">
            {/* Start Plan */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 flex flex-col relative overflow-hidden min-h-[600px]">
                <h2 className="text-4xl font-semibold text-green-600 mb-4">START</h2>
                <h3 className="text-lg mb-4 text-gray-300">1. Real Estate Agent</h3>
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-gray-300">Rs.1,000</span>
                    <span className="text-lg line-through ml-2 text-gray-500">Rs.5,000</span>
                    <span className="text-sm ml-1 text-gray-500">/mo</span>
                  </div>
                  <p className="text-green-500 text-sm mt-2">Save 80% now!</p>
                </div>

                <div className="flex-grow">
                  <div className="space-y-4">
                    {/* Benefits list with improved checkmarks */}
                    {["Post 1 property listing per month", 
                      "Showcase your listing to potential buyers and renters",
                      "Ideal for individual agents managing fewer properties"].map((benefit, index) => (
                      <p key={index} className="flex items-center text-gray-400">
                        <span className="w-5 h-5 mr-3 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        {benefit}
                      </p>
                    ))}
                  </div>
                </div>

                <Link href="/contact" className="mt-8">
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-3 transition-colors duration-200 flex items-center justify-center group">
                    Get Started
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            {/* Business Plan */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-green-500 flex flex-col relative overflow-hidden min-h-[600px]">
                <span className="bg-green-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                <h2 className="text-4xl font-semibold text-green-600 mb-4">BUSINESS</h2>
                <h3 className="text-lg mb-4 text-gray-300">2. Real Estate Owner</h3>
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-gray-300">Rs.7,000</span>
                    <span className="text-lg line-through ml-2 text-gray-500">Rs.35,000</span>
                    <span className="text-sm ml-1 text-gray-500">/mo</span>
                  </div>
                  <p className="text-green-500 text-sm mt-2">Most Popular Choice!</p>
                </div>

                <div className="flex-grow">
                  <div className="space-y-4">
                    {["Post up to 10 property listings per month",
                      "Perfect for property owners renting or selling multiple properties",
                      "Gain visibility for your listings across Pakistan",
                      "Premium listing placement"].map((benefit, index) => (
                      <p key={index} className="flex items-center text-gray-400">
                        <span className="w-5 h-5 mr-3 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        {benefit}
                      </p>
                    ))}
                  </div>
                </div>

                <Link href="/contact" className="mt-8">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-3 transition-colors duration-200 flex items-center justify-center group">
                    Get Started
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            {/* Developer Plan */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 flex flex-col relative overflow-hidden min-h-[600px]">
                <h2 className="text-4xl font-semibold text-green-600 mb-4">DEVELOPER</h2>
                <h3 className="text-lg mb-4 text-gray-300">3. Builder & Developer</h3>
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-gray-300">Rs.30,000</span>
                    <span className="text-lg line-through ml-2 text-gray-500">Rs.150,000</span>
                    <span className="text-sm ml-1 text-gray-500">/mo</span>
                  </div>
                  <p className="text-green-500 text-sm mt-2">Best for large projects!</p>
                </div>

                <div className="flex-grow">
                  <div className="space-y-4">
                    {["Comprehensive Project Marketing",
                      "Showcase your entire real estate project",
                      "Highlight features, floor plans, and availability",
                      "Attract investors and potential buyers",
                      "Dedicated support team"].map((benefit, index) => (
                      <p key={index} className="flex items-center text-gray-400">
                        <span className="w-5 h-5 mr-3 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="w-3 h-3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        {benefit}
                      </p>
                    ))}
                  </div>
                </div>

                <Link href="/contact" className="mt-8">
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-3 transition-colors duration-200 flex items-center justify-center group">
                    Get Started
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Palestine Support Section */}
      <section className="bg-green-500 text-white body-font overflow-hidden py-10 max-w-[840px] mx-auto px-8 rounded-lg mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Help Kids in Palestine</h2>
            <p className="text-lg md:text-xl opacity-90">Let's work together to give children the care and support they need!</p>
          </div>
          <Link href="https://www.pcrf.net/" className="flex-shrink-0">
            <button className="bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Donate Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;