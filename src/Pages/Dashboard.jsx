import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, GlassWater, Flame, BedDouble, Smile, Trash2 } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import StatCard from '../Components/StatCard.jsx'
import { bmiStatus, sleepStatus, moodStatus } from '../utils/trafficLight.js'
import { getEntries, getLatest, clearAll } from '../utils/healthStore.js'
import './Dashboard.css'

function shortDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

function bmiLabel(bmi) {
  if (bmi < 18.5) return 'Underweight range'
  if (bmi < 25) return 'Healthy range'
  if (bmi < 30) return 'Overweight range'
  return 'Obese range'
}

export default function Dashboard() {
  // Bumping this number re-reads localStorage after "Clear my data".
  const [, setVersion] = useState(0)

  const water = getLatest('water')
  const calorie = getLatest('calorie')
  const sleep = getLatest('sleep')
  const mood = getLatest('mood')

  const calorieList = getEntries('calorie')
  const prevCalorie = calorieList.length > 1 ? calorieList[calorieList.length - 2] : null

  const bmi = calorie ? calorie.weight / Math.pow(calorie.height / 100, 2) : null
  const weightChange = calorie && prevCalorie ? calorie.weight - prevCalorie.weight : null

  const sleepData = getEntries('sleep').slice(-7).map((e) => ({ day: shortDate(e.date), hours: e.hours }))
  const moodData = getEntries('mood').slice(-7).map((e) => ({ day: shortDate(e.date), mood: e.mood }))

  const hasAnyData = water || calorie || sleep || mood

  function handleClear() {
    if (window.confirm('Delete all saved results from this browser?')) {
      clearAll()
      setVersion((v) => v + 1)
    }
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__intro">
        <span className="dashboard-page__eyebrow">Your Health, at a glance</span>
        <h1 className="dashboard-page__title">Health Dashboard</h1>
        <p className="dashboard-page__desc">
          Your latest results from the Tools and Wellness pages. They are saved only in this browser and never sent anywhere.
        </p>
      </div>

      {!hasAnyData && (
        <div className="dashboard-empty">
          <p className="dashboard-empty__title">Nothing here yet</p>
          <p className="dashboard-empty__text">
            Use a calculator or the wellness check-in and your results will show up on this page.
          </p>
          <div className="dashboard-empty__links">
            <Link to="/tools" className="dashboard-empty__link">Open Tools</Link>
            <Link to="/wellness" className="dashboard-empty__link">Open Wellness Check</Link>
          </div>
        </div>
      )}

      {hasAnyData && (
        <>
          <div className="dashboard-stats">
            {bmi !== null && (
              <StatCard icon={Scale} label="BMI" value={bmi.toFixed(1)} sub={bmiLabel(bmi)} color="primary" status={bmiStatus(bmi)} />
            )}
            {calorie && (
              <StatCard icon={Scale} label="Weight" value={`${calorie.weight} kg`}
                sub={weightChange === null ? 'From your calorie calculator' : `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} kg since last entry`}
                color="secondary" />
            )}
            {water && (
              <StatCard icon={GlassWater} label="Water Goal" value={`${water.liters} L`} sub="Recommended daily target" color="secondary" />
            )}
            {calorie && (
              <StatCard icon={Flame} label="Calorie Target" value={calorie.maintenance.toLocaleString()} sub="Maintenance per day" color="accent" />
            )}
            {sleep && (
              <StatCard icon={BedDouble} label="Sleep Hours" value={`${sleep.hours} hrs`} sub={`Last analysis · ${sleep.quality}`} color="success" status={sleepStatus(sleep.hours)} />
            )}
            {mood && (
              <StatCard icon={Smile} label="Mood Score" value={`${mood.mood}/10`} sub="Last check-in" color="warning" status={moodStatus(mood.mood)} />
            )}
          </div>

          <div className="dashboard-charts">
            <ChartCard title="Sleep Trend" empty={sleepData.length === 0} emptyText="Use the Sleep Analyzer to see your trend here.">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#0F766E" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Mood Trend" empty={moodData.length === 0} emptyText="Do a Wellness Check to see your mood trend here.">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <button type="button" onClick={handleClear} className="dashboard-clear">
            <Trash2 size={14} /> Clear my data
          </button>
        </>
      )}
    </div>
  )
}

function ChartCard({ title, children, empty, emptyText }) {
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">{title}</h3>
      {empty ? <p className="chart-card__empty">{emptyText}</p> : children}
    </div>
  )
}