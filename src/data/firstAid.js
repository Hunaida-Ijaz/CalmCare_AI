import {
  Flame, Wind, Droplet, HeartPulse, Bone,
  Zap, Skull, ShieldAlert, Waves, AlertOctagon, Eye, Thermometer, Baby,
} from 'lucide-react'

export const FIRST_AID_TOPICS = [
  {
    icon: Flame,
    title: 'Burns',
    steps: [
      'Cool the burn under running lukewarm water for 10–20 minutes.',
      'Remove tight clothing/jewellery near the area before it swells.',
      "Do not apply ice, butter, or toothpaste — these can worsen the burn.",
      'Cover loosely with a clean, non-stick cloth.',
      'For large, deep, or facial burns, seek emergency care immediately.',
    ],
  },
  {
    icon: Wind,
    title: 'Choking',
    steps: [
      'Ask "Are you choking?" — if they can cough or speak, encourage coughing.',
      "If they can't breathe, cough, or speak: give 5 sharp back blows between the shoulder blades.",
      'Follow with 5 abdominal thrusts (Heimlich maneuver).',
      'Alternate back blows and abdominal thrusts until the object clears.',
      'If the person becomes unconscious, start CPR and call for help immediately.',
    ],
  },
  {
    icon: Droplet,
    title: 'Cuts & Bleeding',
    steps: [
      'Apply firm, direct pressure with a clean cloth for at least 10 minutes.',
      'Raise the injured area above heart level if possible.',
      "Don't remove the cloth to check — add more layers on top if it soaks through.",
      'Once bleeding slows, clean gently and cover with a sterile dressing.',
      'Seek medical care for deep cuts, spurting blood, or bleeding that won\'t stop.',
    ],
  },
  {
    icon: HeartPulse,
    title: 'CPR / Unconscious Person',
    steps: [
      'Check responsiveness — tap and shout. Call 1122 immediately if unresponsive.',
      "Check if they're breathing normally; if not, begin chest compressions.",
      'Push hard and fast in the centre of the chest, about 2 inches deep, 100–120 compressions/min.',
      'If trained, give 2 rescue breaths after every 30 compressions.',
      'Continue until emergency help arrives or the person starts breathing.',
    ],
  },
  {
    icon: Bone,
    title: 'Fractures & Sprains',
    steps: [
      "Don't move the injured area or try to realign it.",
      'Immobilize with a splint or sling using a firm object and cloth.',
      'Apply an ice pack wrapped in cloth to reduce swelling.',
      'Keep the limb elevated if possible.',
      'Get an X-ray/medical evaluation as soon as possible.',
    ],
  },
  {
    icon: Droplet,
    title: 'Nosebleed',
    steps: [
      'Sit upright and lean slightly forward (not back).',
      'Pinch the soft part of the nose firmly for 10–15 minutes continuously.',
      'Breathe through your mouth while pinching.',
      "Apply a cold compress to the bridge of the nose.",
      'Seek care if bleeding continues beyond 20 minutes or is heavy.',
    ],
  },
  {
    icon: AlertOctagon,
    title: 'Fainting',
    steps: [
      'Lay the person flat and raise their legs about 12 inches.',
      'Loosen tight clothing around the neck.',
      'Ensure fresh air and a bit of space around them.',
      'Once conscious, let them sit up slowly — don\'t rush.',
      'Seek medical care if fainting is repeated, sudden, or with chest pain.',
    ],
  },
  {
    icon: Zap,
    title: 'Seizures',
    steps: [
      "Don't restrain the person or put anything in their mouth.",
      'Clear the area of hard/sharp objects around them.',
      'Cushion their head and gently turn them onto their side.',
      'Time the seizure — call 1122 if it lasts more than 5 minutes.',
      'Stay with them until they\'re fully alert.',
    ],
  },
  {
    icon: Thermometer,
    title: 'Heatstroke',
    steps: [
      'Move the person to a cool, shaded place immediately.',
      'Remove excess clothing and cool the skin with a damp cloth or fan.',
      'Offer sips of water only if they\'re fully conscious.',
      "Apply cold packs to neck, armpits, and groin.",
      'Call 1122 if they\'re confused, unconscious, or not sweating despite heat.',
    ],
  },
  {
    icon: Skull,
    title: 'Snake Bite',
    steps: [
      'Keep the person calm and still — movement spreads venom faster.',
      'Keep the bitten limb below heart level.',
      "Remove tight items (rings, watches) near the bite before swelling starts.",
      "Don't cut the wound, apply ice, or try to suck out venom.",
      'Get to a hospital immediately — antivenom is time-critical.',
    ],
  },
  {
    icon: Zap,
    title: 'Electric Shock',
    steps: [
      "Don't touch the person if they're still in contact with the electrical source.",
      'Turn off the power source first, or use a dry, non-conductive object to separate them.',
      'Once safe, check breathing and begin CPR if needed.',
      'Cover any burns with a clean, dry cloth.',
      'Always get emergency care, even if they seem fine — internal injury is common.',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Poisoning',
    steps: [
      "Don't induce vomiting unless a poison control/medical professional tells you to.",
      'Identify the substance if possible — keep the container/packaging for doctors.',
      'If on skin, rinse with plenty of water; if in eyes, flush for 15–20 minutes.',
      'Call 1122 or rush to the nearest hospital immediately.',
      "Keep the person calm and monitor their breathing en route.",
    ],
  },
  {
    icon: AlertOctagon,
    title: 'Allergic Reaction (Anaphylaxis)',
    steps: [
      'Watch for swelling of face/throat, difficulty breathing, or widespread rash.',
      "If they have an epinephrine auto-injector, help them use it right away.",
      'Call 1122 immediately — anaphylaxis can worsen within minutes.',
      'Lay them flat with legs raised, unless they\'re struggling to breathe.',
      'Be ready to start CPR if they become unresponsive.',
    ],
  },
  {
    icon: Waves,
    title: 'Drowning',
    steps: [
      'Get the person out of the water safely — avoid becoming a second victim.',
      'Call 1122 immediately, even if they seem to recover.',
      'Check breathing; begin CPR right away if they\'re not breathing.',
      'Keep them warm with a blanket once out of the water.',
      'Always seek medical evaluation — water in the lungs can cause delayed complications.',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Chest Pain / Suspected Heart Attack',
    steps: [
      'Call 1122 immediately — every minute matters.',
      'Help them sit down in a comfortable, upright position.',
      'Loosen tight clothing around the chest and neck.',
      'If not allergic and available, chewing an aspirin can help (only if advised by emergency services).',
      'Be prepared to start CPR if they become unresponsive.',
    ],
  },
  {
    icon: Eye,
    title: 'Eye Injury',
    steps: [
      "Don't rub or apply pressure to the injured eye.",
      'For chemical exposure, flush with clean water for 15–20 minutes.',
      'For an object stuck in the eye, don\'t try to remove it — cover both eyes loosely and seek care.',
      'Avoid using cotton or tissues directly on the eyeball.',
      'Get emergency eye care as soon as possible — delay can affect vision.',
    ],
  },
  {
    icon: Baby,
    title: 'Choking (Infant, under 1 year)',
    steps: [
      'Lay the baby face-down along your forearm, head lower than chest.',
      'Give 5 firm back blows between the shoulder blades with the heel of your hand.',
      'Turn the baby face-up and give 5 chest thrusts with two fingers.',
      'Repeat until the object is dislodged or the baby starts crying/coughing.',
      'Call 1122 immediately if the baby becomes unresponsive.',
    ],
  },
]
