import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GlassWater, Flame, BedDouble, Pill, Salad, Search } from 'lucide-react'
import { medicines } from '../data/medicines.js'
import './Tools.css'

const TABS = [
  { id: 'water', label: 'Water Intake', icon: GlassWater },
  { id: 'calorie', label: 'Calorie Calculator', icon: Flame },
  { id: 'sleep', label: 'Sleep Analyzer', icon: BedDouble },
  { id: 'medicine', label: 'Medicine Lookup', icon: Pill },
  { id: 'diet', label: 'Diet Recommendation', icon: Salad },
]

const VALID_TABS = TABS.map((t) => t.id)

export default function Tools() {
  const [searchParams] = useSearchParams()
  const urlTab = searchParams.get('tab')
  const [tab, setTab] = useState(VALID_TABS.includes(urlTab) ? urlTab : 'water')
  const [prevUrlTab, setPrevUrlTab] = useState(urlTab)

  // Sync the active tab when the URL's ?tab= param changes (e.g. clicking a
  // different tool card on the Home page while already on /tools).
  // Adjusting state during render, per React's guidance, instead of an
  // effect — avoids an extra render pass.
  if (urlTab !== prevUrlTab) {
    setPrevUrlTab(urlTab)
    if (VALID_TABS.includes(urlTab)) setTab(urlTab)
  }

  return (
    <div className="tools-page">
      <div className="tools-page__intro">
        <span className="tools-page__eyebrow">Health Tools Dashboard</span>
        <h1 className="tools-page__title">Quick, personal health calculators</h1>
        <p className="tools-page__desc">Answer a few questions and get instant, easy-to-understand results.</p>
      </div>

      <div className="tools-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`tools-tab ${tab === t.id ? 'tools-tab--active' : ''}`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <div className="tools-panel">
        {tab === 'water' && <WaterCalculator />}
        {tab === 'calorie' && <CalorieCalculator />}
        {tab === 'sleep' && <SleepAnalyzer />}
        {tab === 'medicine' && <MedicineLookup />}
        {tab === 'diet' && <DietRecommendation />}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="tools-field">
      <span className="tools-field__label">{label}</span>
      {children}
    </label>
  )
}

function ResultCard({ children }) {
  return <div className="tools-result animate-fadeInUp">{children}</div>
}

/* ---------------- Water Intake Calculator ---------------- */
function WaterCalculator() {
  const [age, setAge] = useState(25)
  const [weight, setWeight] = useState(65)
  const [activity, setActivity] = useState('moderate')
  const [result, setResult] = useState(null)

  function calculate(e) {
    e.preventDefault()
    let base = weight * 0.033 // liters
    if (activity === 'light') base *= 1.0
    if (activity === 'moderate') base *= 1.15
    if (activity === 'active') base *= 1.3
    if (age > 55) base *= 0.95
    setResult(base.toFixed(2))
  }

  return (
    <form onSubmit={calculate} className="tools-form tools-form--3col">
      <Field label="Age (years)">
        <input type="number" min="1" max="120" value={age} onChange={(e) => setAge(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Weight (kg)">
        <input type="number" min="1" max="300" value={weight} onChange={(e) => setWeight(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Activity Level">
        <select value={activity} onChange={(e) => setActivity(e.target.value)} className="tools-input">
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>
      </Field>
      <div className="tools-form__full">
        <button type="submit" className="tools-submit">Calculate</button>
      </div>
      {result && (
        <div className="tools-form__full">
          <ResultCard>
            <p className="tools-result__label">Recommended daily water intake</p>
            <p className="tools-result__value">{result} L / day</p>
            <p className="tools-result__note">≈ {Math.round((result * 1000) / 250)} glasses (250ml each)</p>
          </ResultCard>
        </div>
      )}
    </form>
  )
}

/* ---------------- Calorie Calculator ---------------- */
function CalorieCalculator() {
  const [gender, setGender] = useState('female')
  const [height, setHeight] = useState(160)
  const [weight, setWeight] = useState(60)
  const [age, setAge] = useState(25)
  const [activity, setActivity] = useState('1.375')
  const [result, setResult] = useState(null)

  function calculate(e) {
    e.preventDefault()
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age
    bmr += gender === 'male' ? 5 : -161
    const maintenance = bmr * parseFloat(activity)
    setResult({
      maintenance: Math.round(maintenance),
      loss: Math.round(maintenance - 500),
      gain: Math.round(maintenance + 500),
    })
  }

  return (
    <form onSubmit={calculate} className="tools-form tools-form--3col">
      <Field label="Gender">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="tools-input">
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </Field>
      <Field label="Height (cm)">
        <input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Weight (kg)">
        <input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Age (years)">
        <input type="number" value={age} onChange={(e) => setAge(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Activity Level">
        <select value={activity} onChange={(e) => setActivity(e.target.value)} className="tools-input">
          <option value="1.2">Sedentary</option>
          <option value="1.375">Lightly active</option>
          <option value="1.55">Moderately active</option>
          <option value="1.725">Very active</option>
        </select>
      </Field>
      <div className="tools-form__full">
        <button type="submit" className="tools-submit">Calculate</button>
      </div>
      {result && (
        <div className="tools-form__full tools-form--3col-nested">
          <ResultCard>
            <p className="tools-result__label">Maintenance</p>
            <p className="tools-result__value tools-result__value--primary">{result.maintenance} kcal</p>
          </ResultCard>
          <ResultCard>
            <p className="tools-result__label">Weight Loss</p>
            <p className="tools-result__value tools-result__value--warning">{result.loss} kcal</p>
          </ResultCard>
          <ResultCard>
            <p className="tools-result__label">Weight Gain</p>
            <p className="tools-result__value tools-result__value--success">{result.gain} kcal</p>
          </ResultCard>
        </div>
      )}
    </form>
  )
}

/* ---------------- Sleep Analyzer ---------------- */
function SleepAnalyzer() {
  const [sleepTime, setSleepTime] = useState('23:00')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [result, setResult] = useState(null)

  function calculate(e) {
    e.preventDefault()
    const [sh, sm] = sleepTime.split(':').map(Number)
    const [wh, wm] = wakeTime.split(':').map(Number)
    let minutes = (wh * 60 + wm) - (sh * 60 + sm)
    if (minutes <= 0) minutes += 24 * 60
    const hours = minutes / 60

    let quality = 'Good'
    let suggestion = 'Your sleep duration looks healthy — keep a consistent schedule.'
    if (hours < 6) {
      quality = 'Poor'
      suggestion = 'You may be sleep-deprived. Try to add 1-2 more hours and limit screens before bed.'
    } else if (hours < 7) {
      quality = 'Fair'
      suggestion = 'Slightly under the recommended range. A small adjustment to bedtime could help.'
    } else if (hours > 9) {
      quality = 'Fair'
      suggestion = 'Oversleeping regularly can affect energy levels — aim for a more consistent 7-9 hours.'
    }

    setResult({ hours: hours.toFixed(1), quality, suggestion })
  }

  return (
    <form onSubmit={calculate} className="tools-form tools-form--2col">
      <Field label="Sleep Time">
        <input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="tools-input" />
      </Field>
      <Field label="Wake Time">
        <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="tools-input" />
      </Field>
      <div className="tools-form__full">
        <button type="submit" className="tools-submit">Analyze Sleep</button>
      </div>
      {result && (
        <div className="tools-form__full">
          <ResultCard>
            <div className="tools-result__row">
              <div>
                <p className="tools-result__label">Duration</p>
                <p className="tools-result__value tools-result__value--primary">{result.hours} hrs</p>
              </div>
              <div>
                <p className="tools-result__label">Quality</p>
                <p className="tools-result__value tools-result__value--secondary">{result.quality}</p>
              </div>
            </div>
            <p className="tools-result__note tools-result__note--body">{result.suggestion}</p>
          </ResultCard>
        </div>
      )}
    </form>
  )
}

/* ---------------- Medicine Lookup ---------------- */
function MedicineLookup() {
  const [query, setQuery] = useState('')
  const filtered = medicines.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <div className="tools-medicine-search">
        <Search size={16} className="tools-medicine-search__icon" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicine, e.g. Panadol"
          className="tools-input tools-medicine-search__input"
        />
      </div>
      {query && filtered.length === 0 && (
        <p className="tools-medicine-empty">No matching medicine found in our sample database.</p>
      )}
      <div className="tools-medicine-grid">
        {(query ? filtered : medicines).map((m) => (
          <div key={m.name} className="tools-medicine-card">
            <h3 className="tools-medicine-card__title">{m.name}</h3>
            <p className="tools-medicine-card__label tools-medicine-card__label--primary">Uses</p>
            <p className="tools-medicine-card__text">{m.uses.join(', ')}</p>
            <p className="tools-medicine-card__label tools-medicine-card__label--warning">Side Effects</p>
            <p className="tools-medicine-card__text">{m.sideEffects.join(', ')}</p>
            <p className="tools-medicine-card__label tools-medicine-card__label--secondary">Dosage</p>
            <p className="tools-medicine-card__text">{m.dosage}</p>
            <p className="tools-medicine-card__label tools-medicine-card__label--danger">Precautions</p>
            <p className="tools-medicine-card__text tools-medicine-card__text--last">{m.precautions}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Diet Recommendation ---------------- */
function DietRecommendation() {
  const [age, setAge] = useState(25)
  const [weight, setWeight] = useState(65)
  const [height, setHeight] = useState(165)
  const [disease, setDisease] = useState('none')
  const [goal, setGoal] = useState('maintain')
  const [preference, setPreference] = useState('balanced')
  const [plan, setPlan] = useState(null)

  const mealPlans = {
    lose: {
      vegetarian: {
        breakfast: 'Vegetable oats with a boiled egg substitute (tofu scramble)',
        lunch: 'Chickpea salad with olive oil dressing and greens',
        dinner: 'Lentil soup with steamed vegetables',
        snacks: 'A handful of almonds or a piece of fruit',
      },
      nonVegetarian: {
        breakfast: 'Oats with berries and a boiled egg',
        lunch: 'Grilled chicken salad with olive oil dressing',
        dinner: 'Grilled fish with steamed vegetables',
        snacks: 'A handful of almonds or a piece of fruit',
      },
      balanced: {
        breakfast: 'Oats with berries and a boiled egg',
        lunch: 'Grilled chicken salad with olive oil dressing',
        dinner: 'Lentil soup with steamed vegetables',
        snacks: 'A handful of almonds or a piece of fruit',
      },
    },
    gain: {
      vegetarian: {
        breakfast: 'Paratha with paneer bhurji and a glass of milk',
        lunch: 'Rajma with brown rice and yogurt',
        dinner: 'Daal makhani with whole wheat roti and ghee',
        snacks: 'Peanut butter banana smoothie',
      },
      nonVegetarian: {
        breakfast: 'Paratha with eggs and a glass of milk',
        lunch: 'Chicken karahi with brown rice',
        dinner: 'Beef stew with whole wheat roti',
        snacks: 'Peanut butter banana smoothie',
      },
      balanced: {
        breakfast: 'Paratha with eggs and a glass of milk',
        lunch: 'Chicken karahi with brown rice and yogurt',
        dinner: 'Daal with roti, ghee, and sautéed spinach',
        snacks: 'Peanut butter banana smoothie',
      },
    },
    maintain: {
      vegetarian: {
        breakfast: 'Vegetable omelet substitute (besan chilla) with toast',
        lunch: 'Grilled paneer with quinoa and salad',
        dinner: 'Daal with roti and sautéed spinach',
        snacks: 'Greek yogurt with honey',
      },
      nonVegetarian: {
        breakfast: 'Vegetable omelet with whole wheat toast',
        lunch: 'Grilled fish with quinoa and salad',
        dinner: 'Grilled chicken with roti and sautéed spinach',
        snacks: 'Greek yogurt with honey',
      },
      balanced: {
        breakfast: 'Vegetable omelet with whole wheat toast',
        lunch: 'Grilled fish with quinoa and salad',
        dinner: 'Daal with roti and sautéed spinach',
        snacks: 'Greek yogurt with honey',
      },
    },
  }

  function generate(e) {
    e.preventDefault()

    // BMI calculation
    const heightM = height / 100
    const bmi = (weight / (heightM * heightM)).toFixed(1)
    const bmiCategory =
      bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'

    // Approx daily calorie need (Mifflin-St Jeor, gender-neutral average)
    let bmr = 10 * weight + 6.25 * height - 5 * age
    let calories = bmr * 1.4 // light activity multiplier
    if (goal === 'lose') calories -= 400
    if (goal === 'gain') calories += 400
    calories = Math.round(calories)

    const water = (weight * 0.033).toFixed(1)

    const notes =
      disease === 'diabetes'
        ? 'Favor low-glycemic foods, avoid sugary drinks, and space meals evenly through the day.'
        : disease === 'hypertension'
        ? 'Reduce salt intake and favor potassium-rich vegetables like spinach and bananas.'
        : disease === 'heart'
        ? 'Choose lean proteins, healthy fats like olive oil, and limit fried foods.'
        : 'No specific dietary restrictions noted — focus on balance and variety.'

    const meals = mealPlans[goal][preference]

    setPlan({ ...meals, water, notes, bmi, bmiCategory, calories })
  }

  return (
    <form onSubmit={generate} className="tools-form tools-form--4col">
      <Field label="Age (years)">
        <input type="number" value={age} onChange={(e) => setAge(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Weight (kg)">
        <input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Height (cm)">
        <input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="tools-input" />
      </Field>
      <Field label="Condition">
        <select value={disease} onChange={(e) => setDisease(e.target.value)} className="tools-input">
          <option value="none">None</option>
          <option value="diabetes">Diabetes</option>
          <option value="hypertension">Hypertension</option>
          <option value="heart">Heart Condition</option>
        </select>
      </Field>
      <Field label="Goal">
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="tools-input">
          <option value="lose">Weight Loss</option>
          <option value="maintain">Maintain</option>
          <option value="gain">Weight Gain</option>
        </select>
      </Field>
      <Field label="Food Preference">
        <select value={preference} onChange={(e) => setPreference(e.target.value)} className="tools-input">
          <option value="balanced">Balanced (Mixed)</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="nonVegetarian">Non-Vegetarian</option>
        </select>
      </Field>
      <div className="tools-form__full">
        <button type="submit" className="tools-submit">Generate Plan</button>
      </div>
      {plan && (
        <div className="tools-form__full tools-form--2col-nested">
          <ResultCard>
            <p className="tools-result__label tools-result__label--primary">BMI</p>
            <p className="tools-result__note tools-result__note--body">
              {plan.bmi} ({plan.bmiCategory})
            </p>
          </ResultCard>
          <ResultCard>
            <p className="tools-result__label tools-result__label--primary">Estimated Daily Calories</p>
            <p className="tools-result__note tools-result__note--body">{plan.calories} kcal</p>
          </ResultCard>
          {[
            ['Breakfast', plan.breakfast],
            ['Lunch', plan.lunch],
            ['Dinner', plan.dinner],
            ['Snacks', plan.snacks],
          ].map(([label, val]) => (
            <ResultCard key={label}>
              <p className="tools-result__label tools-result__label--primary">{label}</p>
              <p className="tools-result__note tools-result__note--body">{val}</p>
            </ResultCard>
          ))}
          <ResultCard>
            <p className="tools-result__label tools-result__label--primary">Water Intake</p>
            <p className="tools-result__note tools-result__note--body">{plan.water} L / day</p>
          </ResultCard>
          <ResultCard>
            <p className="tools-result__label tools-result__label--primary">Notes</p>
            <p className="tools-result__note tools-result__note--body">{plan.notes}</p>
          </ResultCard>
        </div>
      )}
    </form>
  )
}