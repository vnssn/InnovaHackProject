"use client";

export default function FinancialReplayPage() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen">

<div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
<div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
<div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
</div>

<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-xl pt-lg relative z-10">
<div className="flex flex-col gap-xs relative">
<div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50"></div>
<h1 className="font-display-lg text-display-lg text-on-surface">Financial Replay</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">A story of your spending, step by step.</p>
</div>

<div className="flex items-center gap-sm bg-surface-container/80 backdrop-blur-md rounded-full px-1 py-1 shadow-md border border-outline-variant/30">
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<div className="flex items-center gap-sm px-sm cursor-pointer group">
<span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">calendar_today</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">October 24, 2023</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tuesday</span>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative z-10">

<div className="lg:col-span-7 flex flex-col relative">

<div className="absolute left-8 top-8 bottom-32 w-px bg-gradient-to-b from-surface-variant via-outline-variant/50 to-transparent"></div>

<div className="flex items-center gap-lg mb-lg">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant/50 shadow-sm relative z-10">
<span className="material-symbols-outlined text-on-surface" style={{"fontVariationSettings":"'FILL' 1"} as React.CSSProperties}>wb_sunny</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-1">Morning Routine</span>
<h2 className="font-headline-md text-headline-md text-on-surface">The day begins.</h2>
</div>
</div>

<div className="flex flex-col gap-lg pl-3 relative">

<div className="flex gap-md group hover:-translate-y-1 transition-transform duration-300">
<div className="flex flex-col items-center mt-2 relative z-10">
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shrink-0 shadow-md group-hover:border-primary/50 transition-colors">
<span className="material-symbols-outlined text-primary text-[20px]">local_cafe</span>
</div>
</div>
<div className="flex-1 bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md shadow-md group-hover:bg-surface-container-low/80 group-hover:shadow-lg transition-all relative overflow-hidden">

<div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex justify-between items-start mb-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">08:15 AM</span>
<h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Blue Tokai Coffee Roasters</h3>
</div>
<div className="text-right">
<span className="font-headline-md text-headline-md text-on-surface block">₹350<span className="text-body-md text-on-surface-variant">.00</span></span>
<span className="inline-flex items-center gap-xs px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[14px]">restaurant</span>
                    Food &amp; Dining
                  </span>
</div>
</div>
<div className="flex items-center gap-sm text-on-surface-variant">
<div className="w-6 h-6 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Close up of a latte art in a dark ceramic cup on a wooden table, morning light, moody cafe atmosphere, cinematic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkRmddjBoIj82h42MmHpxtu-iNMuLEzdQ3xA5fuTOIdbyNGkMbfLKDiE5Z8Edklp8sDywZuYk8mWCKRXImbfV9f8oEZvQoDjM3zzuaODyZ5ok3FX_aAjWshGxHEYQRqb6MJco5kKfWyxofN8ZWzJjI_d8sltpjdbBjED9rUieQY3L5GnG7lioCOYCVuu7cIDATfmkxEehhiUZPuXDuHCzFpqfljklDGVFuwU8WX0tFP7bFu4Vrr_nzZL_dkidRMXH7-ktKcWPCrOM"/>
</div>
<p className="font-body-md text-body-md line-clamp-1">Morning cortado to start the day.</p>
</div>
</div>
</div>

<div className="flex gap-md group hover:-translate-y-1 transition-transform duration-300">
<div className="flex flex-col items-center mt-2 relative z-10">
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shrink-0 shadow-md group-hover:border-tertiary/50 transition-colors">
<span className="material-symbols-outlined text-tertiary text-[20px]">directions_car</span>
</div>
</div>
<div className="flex-1 bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md shadow-md group-hover:bg-surface-container-low/80 group-hover:shadow-lg transition-all relative overflow-hidden">

<div className="absolute -right-10 -bottom-10 w-32 h-32 bg-tertiary/5 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex justify-between items-start mb-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">09:02 AM</span>
<h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Uber India</h3>
</div>
<div className="text-right">
<span className="font-headline-md text-headline-md text-on-surface block">₹425<span className="text-body-md text-on-surface-variant">.50</span></span>
<span className="inline-flex items-center gap-xs px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[14px]">commute</span>
                    Transport
                  </span>
</div>
</div>

<div className="mt-sm w-full h-24 rounded-xl overflow-hidden border border-outline-variant/30 shadow-inner relative">
<div className="w-full h-full bg-cover bg-center opacity-70" data-location="Bandra Kurla Complex, Mumbai" style={{"backgroundImage":"url('https"} as React.CSSProperties}></div>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent mix-blend-multiply"></div>
<div className="absolute bottom-2 left-2 flex items-center gap-xs text-on-surface">
<span className="material-symbols-outlined text-[16px]">location_on</span>
<span className="font-label-sm text-label-sm">Ride to BKC Office</span>
</div>
</div>
</div>
</div>
</div>

<div className="flex items-center gap-lg my-lg ml-[-12px]">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant/50 shadow-sm relative z-10 ml-3">
<span className="material-symbols-outlined text-on-surface" style={{"fontVariationSettings":"'FILL' 1"} as React.CSSProperties}>restaurant_menu</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-1">Lunch Hour</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Fueling up.</h2>
</div>
</div>
<div className="flex flex-col gap-lg pl-3 relative mb-xl">

<div className="flex gap-md group hover:-translate-y-1 transition-transform duration-300">
<div className="flex flex-col items-center mt-2 relative z-10">
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shrink-0 shadow-md group-hover:border-secondary/50 transition-colors">
<span className="material-symbols-outlined text-secondary text-[20px]">shopping_bag</span>
</div>
</div>
<div className="flex-1 bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md shadow-md group-hover:bg-surface-container-low/80 group-hover:shadow-lg transition-all relative overflow-hidden">

<div className="absolute -right-10 -bottom-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex justify-between items-start mb-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">01:30 PM</span>
<h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Swiggy Instamart</h3>
</div>
<div className="text-right">
<span className="font-headline-md text-headline-md text-on-surface block">₹890<span className="text-body-md text-on-surface-variant">.00</span></span>
<span className="inline-flex items-center gap-xs px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                    Groceries
                  </span>
</div>
</div>

<div className="grid grid-cols-3 gap-sm mt-md">
<div className="aspect-square rounded-lg overflow-hidden border border-outline-variant/30">
<img className="w-full h-full object-cover" data-alt="Fresh avocados and cherry tomatoes on a dark slate background, high contrast, studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhy3q8elxF8WC-LAGLuFWxslCxNhReLzQQ0I4lgtzPKivcLY85OW_1CP0LdyKiqdertABE-4YVK-CD0u0uh0fbLk-8iVKE_el8lBs9EcKEQk0ffqYHBRJHtHwP_rs9uMlbBpjGKNbETZUa1NJUEsCzTJvKEzbwgBly-yh10oXVtA9ITc5cBIyjxIGuhEBoLaNUB51PDxuMkNU1feHYllqZ8klF6GDI4m5veYxcuLBQH0G1_IYcNYzzIO9rEiIeaOkiRUmI_jLjvYM"/>
</div>
<div className="aspect-square rounded-lg overflow-hidden border border-outline-variant/30">
<img className="w-full h-full object-cover" data-alt="Artisan sourdough bread loaf on a dark rustic table, flour dusting, moody lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3M5bHNRHd3qcpXnm2CaB2ZJoSxJ7yb7JRAqdpJUPiYbe_Yph0tAbzAqdNR6Lwb9ob4HF1XXZYgWpn-UG_iLvY5ZwggdWJu_1OX1CHq9SiSZcsGNNP2z_OOvZe9CH2k99Y0tSga5bc_GBA990TEjAXdxxoACeOYoM_terE56_ZilNGWAVQk4lvNFCt4aXiTOlXLtJOkV2-u0Ged7nyvIfKaL209fce1lToesCoac8Diisswt8Csl9h88yn2ICU8stN6-xHxhP6FJw"/>
</div>
<div className="aspect-square rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
<span className="font-label-md text-label-md text-on-surface-variant">+3 items</span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-lg mt-12 lg:mt-0 relative z-10 lg:-ml-4">

<div className="bg-surface-container-low/80 backdrop-blur-2xl border border-outline-variant/40 rounded-[32px] p-xl shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[600px]">

<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
<div className="relative z-10 flex-1 flex flex-col">
<div className="mb-lg">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-[0.2em] block mb-2">Total Day Spend</span>
<div className="flex items-baseline gap-2">
<h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">₹1,665<span className="text-headline-lg text-on-surface-variant">.50</span></h2>
</div>

<div className="flex items-center gap-xs mt-3">
<div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[14px]">arrow_downward</span>
</div>
<span className="font-label-md text-label-md text-secondary">12% below your daily average</span>
</div>
</div>

<div className="mb-xl flex-1">
<h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-md">Category Breakdown</h3>
<div className="flex flex-col gap-md">

<div className="flex flex-col gap-xs">
<div className="flex justify-between items-end">
<span className="font-label-md text-label-md text-on-surface flex items-center gap-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Food &amp; Groceries
                  </span>
<span className="font-label-md text-label-md text-on-surface-variant">₹1,240</span>
</div>
<div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{"width":"74%"} as React.CSSProperties}></div>
</div>
</div>

<div className="flex flex-col gap-xs">
<div className="flex justify-between items-end">
<span className="font-label-md text-label-md text-on-surface flex items-center gap-xs">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    Transport
                  </span>
<span className="font-label-md text-label-md text-on-surface-variant">₹425</span>
</div>
<div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary rounded-full" style={{"width":"26%"} as React.CSSProperties}></div>
</div>
</div>
</div>
</div>

<div className="mt-auto bg-gradient-to-br from-primary-container/20 to-surface-container-highest border border-primary/20 rounded-2xl p-md relative overflow-hidden group hover:border-primary/40 transition-colors">

<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
<div className="flex gap-md relative z-10">
<div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 shadow-[0_0_15px_rgba(173,198,255,0.2)]">
<span className="material-symbols-outlined text-primary">auto_awesome</span>
</div>
<div className="flex flex-col gap-xs">
<h4 className="font-label-md text-label-md text-on-surface">FinAI Insight</h4>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                   "You had a heavy grocery day, but your transport costs were minimal. Sticking to home-cooked meals this week will balance this out perfectly."
                 </p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
}
