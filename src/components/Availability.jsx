import { useEffect, useMemo, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function formatDate(d) {
  return d.toISOString().slice(0, 10)
}

function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

function Availability() {
  const [rooms, setRooms] = useState([])
  const [seasons, setSeasons] = useState([])
  const [roomId, setRoomId] = useState('')
  const [checkIn, setCheckIn] = useState(formatDate(new Date()))
  const [checkOut, setCheckOut] = useState(formatDate(addDays(new Date(), 7)))
  const [guests, setGuests] = useState(1)
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [r, s] = await Promise.all([
          fetch(`${API}/rooms`).then(res => res.json()),
          fetch(`${API}/seasons`).then(res => res.json()),
        ])
        setRooms(r)
        setSeasons(s)
        if (r && r.length) setRoomId(String(r[0]._id))
      } catch (e) {
        setError('Failed to load data')
      }
    }
    load()
  }, [])

  const seasonBadges = useMemo(() => (
    <div className="flex flex-wrap gap-2">
      {seasons.map(s => (
        <span key={`${s.name}-${s.start_month}`} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-blue-100">
          {s.name}: €{s.rate}/night
        </span>
      ))}
    </div>
  ), [seasons])

  const getQuote = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id: roomId, check_in: checkIn, check_out: checkOut, guests })
      })
      if (!res.ok) throw new Error('Quote failed')
      const data = await res.json()
      setQuote(data)
    } catch (e) {
      setError('Could not get a quote. Please check dates and try again.')
    } finally {
      setLoading(false)
    }
  }

  const book = async () => {
    if (!quote) return
    setLoading(true); setError('')
    try {
      const name = prompt('Your full name:')
      const email = prompt('Email address:')
      if (!name || !email) throw new Error('Missing details')
      const res = await fetch(`${API}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: roomId,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          name,
          email
        })
      })
      if (!res.ok) throw new Error('Booking failed')
      const data = await res.json()
      alert(`Booking confirmed! Total: €${data.total_price}`)
      setQuote(null)
    } catch (e) {
      setError('Booking failed. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-800/40 p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">Check availability</h2>
        {seasonBadges}
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-400/30 p-2 rounded">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="block text-blue-100 text-sm mb-1">Room</label>
          <select value={roomId} onChange={e=>setRoomId(e.target.value)} className="w-full bg-slate-900/60 border border-white/10 rounded px-3 py-2 text-white">
            {rooms.map(r => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-blue-100 text-sm mb-1">Check-in</label>
          <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="w-full bg-slate-900/60 border border-white/10 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-blue-100 text-sm mb-1">Check-out</label>
          <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="w-full bg-slate-900/60 border border-white/10 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-blue-100 text-sm mb-1">Guests</label>
          <input type="number" min={1} max={8} value={guests} onChange={e=>setGuests(parseInt(e.target.value)||1)} className="w-full bg-slate-900/60 border border-white/10 rounded px-3 py-2 text-white" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={getQuote} disabled={loading} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded">
          {loading ? 'Loading…' : 'Get quote'}
        </button>
        {quote && (
          <>
            <span className="text-blue-100">Total: <span className="font-bold text-white">€{quote.total_price}</span></span>
            <button onClick={book} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded">Book now</button>
          </>
        )}
      </div>
    </section>
  )
}

export default Availability
