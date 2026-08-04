import React from "react";
import vegetables from "../../assets/vegetables.png";
import Button from "../button/Button";

const HeroSection = () => {
  return (
    <section className="min-h-[85vh] bg-gradient-to-br from-emerald-50 via-white to-[#e6eee1] flex items-center py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 sm:px-8 lg:px-0 w-full">
        <div className="flex flex-col gap-y-6 md:gap-y-8 text-left justify-center">
          <div>
            <span className="text-xs md:text-sm font-semibold tracking-widest text-emerald-600 uppercase block mb-3">
              Fresh From Farm To Your Plate
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Healthy eating <br />
              the organic way
            </h1>
          </div>

          <p className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed">
            Discover fresh, organic and handpicked vegetables directly from local growers — delivered with care for taste and wellness.
          </p>

          <div className="pt-4 md:pt-6">
            <Button text="Explore Menu" variant="primary" />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <span className="rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              100% Organic
            </span>
            <span className="rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              Farm Fresh
            </span>
            <span className="rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              Fast Delivery
            </span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end w-full">
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl">
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl ring-1 ring-slate-200 bg-white">
              <img
                src={vegetables}
                alt="Fresh Organic Vegetables"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;