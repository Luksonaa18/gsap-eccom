const WhereToFind = () => {
  return (
    <section className="relative overflow-hidden bg-[#181815] px-6 py-24 text-white md:px-12 lg:px-20 lg:py-32">

      
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex items-center gap-3">
          <span className="h-px w-10 bg-white/40" />
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
            Find our location
          </p>
        </div>


        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h1 className="max-w-4xl text-left text-5xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Come find
            <br />
            <span className="text-white/40">your way to us.</span>
          </h1>

          <p className="max-w-sm text-left text-sm leading-7 text-white/50 lg:pb-2">
            A place worth finding. Come by, explore the space,
            and experience it for yourself.
          </p>
        </div>

        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.35fr_0.65fr]">

          
          <div className="flex flex-col justify-between border border-white/10 p-8 md:p-10">

            <div>
              <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Our location
              </p>

              <h2 className="text-3xl font-bold uppercase tracking-tight">
                Atelier
              </h2>

              <p className="mt-3 text-sm text-white/50">
                Tbilisi, Georgia
              </p>
            </div>

            <div className="mt-16">
              <div className="mb-5 h-px w-full bg-white/10" />

              <a
                href="https://maps.google.com/maps?q=Atelier,Tbilisi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-xs uppercase tracking-[0.2em]"
              >
                <span>Get directions</span>

                <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                  ↗
                </span>
              </a>
            </div>
          </div>

          
          <div className="group relative min-h-[350px] overflow-hidden md:min-h-[500px]">
            <iframe
              src="https://maps.google.com/maps?q=Atelier,Tbilisi&output=embed"
              title="Atelier location in Tbilisi"
              className="h-full min-h-[350px] w-full grayscale transition duration-700 group-hover:grayscale-0 md:min-h-[500px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            
            <div className="pointer-events-none absolute bottom-5 left-5 bg-black/70 px-4 py-3 backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/50">
                Visit us
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white">
                Tbilisi, Georgia
              </p>
            </div>
          </div>

        </div>

        
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            Atelier — Find your place
          </p>

          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            Tbilisi · Georgia
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhereToFind;