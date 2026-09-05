import {
  Scale, GlassWater, Flame, BedDouble, Smile, FileText, Pill,
} from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, AreaChart, Area,
} from 'recharts'
import StatCard from '../Components/StatCard.jsx'
import { bmiStatus, sleepStatus, moodStatus, waterIntakeStatus } from '../utils/trafficLight.js'
import './Dashboard.css'

const WATER_DATA = [
  { day: 'Mon', liters: 2.1 },
  { day: 'Tue', liters: 2.4 },
  { day: 'Wed', liters: 1.9 },
  { day: 'Thu', liters: 2.6 },
  { day: 'Fri', liters: 2.3 },
  { day: 'Sat', liters: 2.8 },
  { day: 'Sun', liters: 2.5 },
]

const SLEEP_DATA = [
  { day: 'Mon', hours: 6.5 },
  { day: 'Tue', hours: 7.2 },
  { day: 'Wed', hours: 5.8 },
  { day: 'Thu', hours: 7.5 },
  { day: 'Fri', hours: 6.9 },
  { day: 'Sat', hours: 8.1 },
  { day: 'Sun', hours: 7.6 },
]

const CALORIE_DATA = [
  { day: 'Mon', kcal: 2100 },
  { day: 'Tue', kcal: 1950 },
  { day: 'Wed', kcal: 2300 },
  { day: 'Thu', kcal: 2050 },
  { day: 'Fri', kcal: 2200 },
  { day: 'Sat', kcal: 2400 },
  { day: 'Sun', kcal: 2000 },
]

const MOOD_DATA = [
  { day: 'Mon', mood: 6 },
  { day: 'Tue', mood: 7 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 8 },
  { day: 'Fri', mood: 7 },
  { day: 'Sat', mood: 9 },
  { day: 'Sun', mood: 8 },
]

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page__intro">
        <span className="dashboard-page__eyebrow">Your Health, at a glance</span>
        <h1 className="dashboard-page__title">Health Dashboard</h1>
        <p className="dashboard-page__desc">Sample data shown below — connect your health tools to personalize this view.</p>
      </div>

      <div className="dashboard-stats">
        <StatCard icon={Scale} label="BMI" value="22.4" sub="Healthy range" color="primary" status={bmiStatus(22.4)} />
        <StatCard icon={GlassWater} label="Water Goal" value="2.3 L" sub="Today's target" color="secondary" status={waterIntakeStatus(2.3)} />
        <StatCard icon={Flame} label="Calories" value="2,050" sub="Consumed today" color="accent" />
        <StatCard icon={BedDouble} label="Sleep Hours" value="7.2 hrs" sub="Last night" color="success" status={sleepStatus(7.2)} />
        <StatCard icon={Smile} label="Mood Score" value="8/10" sub="Feeling good" color="warning" status={moodStatus(8)} />
        <StatCard icon={FileText} label="Recent Reports" value="2" sub="Awaiting review" color="primary" />
        <StatCard icon={Pill} label="Upcoming Medicines" value="3" sub="Scheduled today" color="danger" />
        <StatCard icon={Scale} label="Weight" value="64.5 kg" sub="-0.5 kg this week" color="secondary" />
      </div>

      <div className="dashboard-charts">
        <ChartCard title="Weekly Water Intake">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WATER_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="liters" fill="#14B8A6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sleep Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={SLEEP_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#0F766E" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Calorie Intake">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={CALORIE_DATA}>
              <defs>
                <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="kcal" stroke="#F59E0B" fill="url(#calorieGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mood Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MOOD_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">{title}</h3>
      {children}
    </div>
  )
}
