import Hero from './components/Hero'
import Availability from './components/Availability'
import Bookings from './components/Bookings'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <header className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <Hero />
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 space-y-6 pb-16">
        <Availability />
        <Bookings />
      </main>

      <footer className="relative z-10 max-w-5xl mx-auto px-6 pb-10 text-center text-blue-200/70">
        Built for student stays in Malta • Prices auto-adjust by season
      </footer>
    </div>
  )
}

export default App
