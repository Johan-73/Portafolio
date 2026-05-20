export interface PersonalFacts {
  age: number;
  hobbies: string[];
  values: string[];
  beliefs: string;
  strengthsBeyondTech: string[];
  growthArea: string;
  workStyle: { whenSharp: string; collaborationPreference: string };
}

/**
 * IMPORTANT: when surfacing `growthArea`, ALWAYS include the second clause
 * about balancing. The first half alone reads as a junior humble-brag.
 */
export const personal: PersonalFacts = {
  age: 20,
  hobbies: ["Football", "Webcomics (superhero/action genre)", "Piano (plays + listens broadly)"],
  values: ["Family-oriented", "Service-driven"],
  beliefs:
    "Christian — passionate about serving people and serving God with his abilities and capabilities.",
  strengthsBeyondTech: [
    "Disciplined and focused on what he's building",
    "Strong follow-through — doesn't leave things uncompleted",
    "Finishes what he starts",
  ],
  growthArea:
    "I tend toward perfectionism — wanting things precise and exact. I'm actively learning to balance that with time, effort, and efficiency.",
  workStyle: {
    whenSharp: "Mornings / early-day focus — sharpest before noon",
    collaborationPreference:
      "Prefers sync / collaborative environments; thrives when pairing and talking through problems out loud",
  },
};
