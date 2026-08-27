import { Question, AnswerRegion, UnmatchedAnswer } from '../types/index';

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    qNumber: '1',
    displayLabel: '1',
    text: 'Which blood vessel carries blood away from the heart?',
    maxMarks: 2,
    obtainedMarks: 2,
    isSubPart: false,
    aiFeedback: 'Correct! Artery / Aorta correctly identified as the vessel carrying blood away from the heart.',
    answerRegionIds: ['r1']
  },
  {
    id: 'q2',
    qNumber: '2',
    displayLabel: '2',
    text: 'Which of the following organelles is primarily involved in photosynthesis?',
    maxMarks: 2,
    obtainedMarks: 2,
    isSubPart: false,
    aiFeedback: 'Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!',
    answerRegionIds: ['r2']
  },
  {
    id: 'q3',
    qNumber: '3',
    displayLabel: '3',
    text: 'Explain the role of chloroplasts in photosynthesis, naming the main pigments involved and briefly outlining the two major stages of the process.',
    maxMarks: 2,
    obtainedMarks: 2,
    isSubPart: false,
    aiFeedback: 'Great answer detailing chlorophyll and light/dark reactions clearly with chemical equation.',
    answerRegionIds: ['r3']
  },
  {
    id: 'q4',
    qNumber: '4',
    displayLabel: '4',
    text: 'Describe the flow of blood through the human heart starting from the right atrium and ending at the aorta; include the names of valves crossed.',
    maxMarks: 2,
    obtainedMarks: 0,
    isSubPart: false,
    isUnanswered: true,
    aiFeedback: 'No answer detected on any page for Question 4. Marked as unanswered.',
    answerRegionIds: []
  },
  {
    id: 'q5',
    qNumber: '5',
    displayLabel: '5',
    text: 'Draw a labelled diagram of an alveolus showing capillaries and air space (label alveolar sac, capillary, and direction of gas exchange).',
    maxMarks: 2,
    obtainedMarks: 2,
    isSubPart: false,
    isOutofOrder: true,
    aiFeedback: 'Nicely drawn alveolus diagram. Answer was found on page 2 out of order.',
    answerRegionIds: ['r5']
  },
  {
    id: 'q6',
    qNumber: '6',
    displayLabel: '6',
    text: 'Draw a neat labelled diagram of the human digestive system (stomach, small intestine, large intestine, liver, pancreas) and label the site where most absorption occurs.',
    maxMarks: 5,
    obtainedMarks: 4,
    isSubPart: false,
    aiFeedback: 'Diagram is clear. Minor label omission on pancreas, but absorption site (small intestine) is correctly identified.',
    answerRegionIds: ['r6']
  },
  {
    id: 'q7',
    qNumber: '7',
    displayLabel: '7',
    text: "Draw and label a nephron (Bowman's capsule, glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct).",
    maxMarks: 5,
    obtainedMarks: 5,
    isSubPart: false,
    aiFeedback: 'Perfect score. All parts of the nephron are accurately drawn and labeled.',
    answerRegionIds: ['r7']
  },
  {
    id: 'q8',
    qNumber: '8',
    displayLabel: '8',
    text: 'Explain the structural differences between palisade mesophyll and spongy mesophyll and state how each structure aids its function in the leaf.',
    maxMarks: 5,
    obtainedMarks: 3,
    isSubPart: false,
    aiFeedback: 'Good comparison of cell shape, but missing detail on air spaces for gas diffusion in spongy mesophyll.',
    answerRegionIds: ['r8']
  },
  {
    id: 'q9',
    qNumber: '9',
    displayLabel: '9',
    text: 'Describe the process of transpiration in plants in two to three sentences and name two environmental factors that increase its rate.',
    maxMarks: 5,
    obtainedMarks: 5,
    isSubPart: false,
    aiFeedback: 'Comprehensive answer mentioning stomatal water loss, temperature, and wind speed.',
    answerRegionIds: ['r9']
  },
  {
    id: 'q10',
    qNumber: '10',
    displayLabel: '10',
    text: 'Explain how the structure of xylem vessels facilitates water transport in plants (mention one structural feature and its role).',
    maxMarks: 5,
    obtainedMarks: 4,
    isSubPart: false,
    aiFeedback: 'Lignified walls and hollow tubes mentioned accurately.',
    answerRegionIds: ['r10']
  },
  {
    id: 'q11a',
    qNumber: '11a',
    displayLabel: '11. a.',
    text: 'A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.',
    maxMarks: 2,
    obtainedMarks: 2,
    isSubPart: true,
    parentQNumber: '11',
    aiFeedback: 'Sub-part 11a correctly answered: Etiolation explained.',
    answerRegionIds: ['r11a']
  },
  {
    id: 'q11b',
    qNumber: '11b',
    displayLabel: '11. b.',
    text: 'Suggest one practical measure to help Plant B recover.',
    maxMarks: 3,
    obtainedMarks: 1,
    isSubPart: true,
    parentQNumber: '11',
    aiFeedback: 'Moving to sunlight mentioned, but exposure duration and watering recovery steps were missing.',
    answerRegionIds: ['r11b']
  },
  {
    id: 'q12',
    qNumber: '12',
    displayLabel: '12',
    text: 'A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.',
    maxMarks: 5,
    obtainedMarks: 4,
    isSubPart: false,
    aiFeedback: 'Total ventilation calculation = 0.5 L x 12 = 6.0 L/min is correct.',
    answerRegionIds: ['r12']
  },
  {
    id: 'q13',
    qNumber: '13',
    displayLabel: '13',
    text: 'If dead space is 0.15 L per breath, calculate the alveolar ventilation per minute. Show working.',
    maxMarks: 5,
    obtainedMarks: 4,
    isSubPart: false,
    aiFeedback: '(0.5 - 0.15) x 12 = 4.2 L/min working shown correctly.',
    answerRegionIds: ['r13']
  }
];

export const SAMPLE_ANSWER_REGIONS: AnswerRegion[] = [
  {
    id: 'r1',
    questionId: 'q1',
    questionNumber: '1',
    boundingBoxes: [
      { x: 10, y: 5, width: 80, height: 8, page: 1 }
    ],
    transcribedText: 'Q1. Arteries carry oxygenated blood away from the heart to the rest of the body.',
    isOutofOrder: false
  },
  {
    id: 'r2',
    questionId: 'q2',
    questionNumber: '2',
    boundingBoxes: [
      { x: 8, y: 14, width: 84, height: 25, page: 1 },
      { x: 8, y: 64, width: 84, height: 26, page: 2 }
    ],
    transcribedText: 'Q2. Chloroplast. Photosynthesis is the process used by green plants to convert light energy into chemical energy. 6CO2 + 6H2O -> C6H12O6 + 6O2.',
    isOutofOrder: false
  },
  {
    id: 'r3',
    questionId: 'q3',
    questionNumber: '3',
    boundingBoxes: [
      { x: 8, y: 41, width: 84, height: 22, page: 1 }
    ],
    transcribedText: 'Q3. Chloroplasts contain chlorophyll pigment. 1. Light reaction - Captures light energy. 2. Dark reaction - Uses energy to make glucose.',
    isOutofOrder: false
  },
  {
    id: 'r5',
    questionId: 'q5',
    questionNumber: '5',
    boundingBoxes: [
      { x: 8, y: 5, width: 84, height: 35, page: 2 }
    ],
    transcribedText: 'Q5. [Diagram of Alveolus] Capillary blood flow, O2 diffusion into blood, CO2 diffusion into alveolus.',
    isOutofOrder: true
  },
  {
    id: 'r6',
    questionId: 'q6',
    questionNumber: '6',
    boundingBoxes: [
      { x: 8, y: 5, width: 84, height: 42, page: 3 }
    ],
    transcribedText: 'Q6. Digestive system diagram: Stomach -> Small Intestine (site of absorption) -> Large Intestine.',
    isOutofOrder: false
  },
  {
    id: 'r7',
    questionId: 'q7',
    questionNumber: '7',
    boundingBoxes: [
      { x: 8, y: 49, width: 84, height: 45, page: 3 }
    ],
    transcribedText: "Q7. Nephron structure: Glomerulus, Bowman's capsule, PCT, Loop of Henle, DCT, Collecting duct.",
    isOutofOrder: false
  },
  {
    id: 'r8',
    questionId: 'q8',
    questionNumber: '8',
    boundingBoxes: [
      { x: 8, y: 5, width: 84, height: 28, page: 4 }
    ],
    transcribedText: 'Q8. Palisade cells are elongated and packed with chloroplasts. Spongy cells are loose with air spaces.',
    isOutofOrder: false
  },
  {
    id: 'r9',
    questionId: 'q9',
    questionNumber: '9',
    boundingBoxes: [
      { x: 8, y: 35, width: 84, height: 20, page: 4 }
    ],
    transcribedText: 'Q9. Transpiration is the loss of water vapor from leaves through stomata. High temperature & wind increase rate.',
    isOutofOrder: false
  },
  {
    id: 'r10',
    questionId: 'q10',
    questionNumber: '10',
    boundingBoxes: [
      { x: 8, y: 57, width: 84, height: 18, page: 4 }
    ],
    transcribedText: 'Q10. Xylem vessels have hollow dead cells and lignified walls for continuous water column transport.',
    isOutofOrder: false
  },
  {
    id: 'r11a',
    questionId: 'q11a',
    questionNumber: '11a',
    boundingBoxes: [
      { x: 8, y: 77, width: 84, height: 10, page: 4 }
    ],
    transcribedText: 'Q11.a. Plant B suffers from etiolation due to lack of sunlight, causing pale yellow leaves.',
    isOutofOrder: false
  },
  {
    id: 'r11b',
    questionId: 'q11b',
    questionNumber: '11b',
    boundingBoxes: [
      { x: 8, y: 88, width: 84, height: 9, page: 4 }
    ],
    transcribedText: 'Q11.b. Move Plant B to direct sunlight and maintain adequate soil moisture.',
    isOutofOrder: false
  },
  {
    id: 'r12',
    questionId: 'q12',
    questionNumber: '12',
    boundingBoxes: [
      { x: 8, y: 5, width: 84, height: 12, page: 5 }
    ],
    transcribedText: 'Q12. Total ventilation = Tidal volume x Respiratory rate = 0.5 L x 12 breaths/min = 6.0 L/min.',
    isOutofOrder: false
  },
  {
    id: 'r13',
    questionId: 'q13',
    questionNumber: '13',
    boundingBoxes: [
      { x: 8, y: 19, width: 84, height: 14, page: 5 }
    ],
    transcribedText: 'Q13. Alveolar ventilation = (Tidal volume - Dead space) x Rate = (0.5 - 0.15) x 12 = 0.35 x 12 = 4.2 L/min.',
    isOutofOrder: false
  }
];

export const SAMPLE_UNMATCHED_ANSWERS: UnmatchedAnswer[] = [
  {
    id: 'u1',
    pageNumber: 2,
    textSnippet: 'Extra rough note written by student: "Remember light-independent reaction occurs in stroma!"',
    boundingBox: { x: 10, y: 91, width: 80, height: 7, page: 2 },
    note: 'Unmatched note found at bottom of answer sheet page 2.'
  }
];
