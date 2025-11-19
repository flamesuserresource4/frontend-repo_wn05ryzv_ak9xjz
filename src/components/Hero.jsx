import { GraduationCap } from 'lucide-react'

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/40 p-8 md:p-12 shadow-xl">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-200">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Student stays in Malta, made simple
          </h1>
          <p className="text-blue-100/80 mt-2 max-w-2xl">
            Book a cozy apartment tailored for students. Prices automatically adjust by season to match Malta student accommodation trends.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
