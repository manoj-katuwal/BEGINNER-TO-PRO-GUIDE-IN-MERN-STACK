import React from 'react';

const ProductCard = (props) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      {/* Sida Row Layout: `flex-row` block directly lagayeko layout dynamic row huna */}
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out group flex flex-row h-[240px]">
        
        {/* Left Side Image: Flex balance garna layout grid fixed binary use gareko */}
        <div className="relative overflow-hidden bg-slate-100 w-1/3 min-w-[140px] h-full">
          <img 
            src={props.imageUrl || "https://unsplash.com"} 
            alt={props.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
          />
          <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] tracking-wider uppercase font-bold px-2 py-0.5 rounded shadow-sm">
            New
          </span>
        </div>

        {/* Right Side Content: Full control setup */}
        <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
          <div>
            {/* Brand / Category */}
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-0.5">
              Premium Gear
            </span>
            
            {/* Title with overflow protection */}
            <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors duration-200">
              {props.title || "Wireless Premium Headphones"}
            </h3>

            {/* Price section */}
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-black text-slate-900">{props.price || "$249.00"}</span>
              <span className="text-xs text-slate-400 line-through">$299.00</span>
            </div>

            {/* Description */}
            <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {props.description || "Immersive sound with active noise cancellation, heavy bass tuning, and 40-hour battery life."}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-4 flex items-center gap-2">
            <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] transform">
              Add to Cart
            </button>
            <button className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors duration-200 shrink-0">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
