import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Bookings() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/bookings`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setError('Failed to load bookings')
      }
    }
    load()
  }, [])

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-800/40 p-6 md:p-8 shadow-xl">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Recent bookings</h2>
      {error && <p className="text-sm text-red-300 mb-2">{error}</p>}
      {items.length === 0 ? (
        <p className="text-blue-100">No bookings yet.</p>
      ) : (
        <div className="divide-y divide-white/10">
          {items.map(b => (
            <div key={b._id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{b.student?.name} • {b.student?.email}</p>
                <p className="text-blue-100 text-sm">{b.check_in} → {b.check_out} • Guests {b.guests}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">€{b.total_price}</p>
                <p className="text-blue-200 text-xs uppercase tracking-wide">{b.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Bookings
