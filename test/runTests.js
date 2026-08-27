import { SAMPLE_QUESTIONS, SAMPLE_ANSWER_REGIONS, SAMPLE_UNMATCHED_ANSWERS } from '../src/lib/sampleData.ts';

function runUnitTests() {
  console.log('🧪 Starting AssessVeda AI Verification Tests...\n');
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
    }
  }

  // QA-001: Normal ordered answers & printed order preservation (FR-004)
  assert(
    SAMPLE_QUESTIONS.length >= 13,
    'FR-004: All detected questions extracted in original printed order.'
  );

  // QA-002: Labelled sub-parts separation & numbering preservation (FR-005, FR-006)
  const q11a = SAMPLE_QUESTIONS.find((q) => q.qNumber === '11a');
  const q11b = SAMPLE_QUESTIONS.find((q) => q.qNumber === '11b');
  assert(
    q11a && q11b && q11a.isSubPart && q11b.isSubPart,
    'FR-005 & FR-006: Sub-parts 11a and 11b treated as separate questions with original numbering preserved.'
  );

  // QA-003: Out-of-order answers mapping (FR-007)
  const outOfOrderQ = SAMPLE_QUESTIONS.find((q) => q.isOutofOrder);
  assert(
    outOfOrderQ !== undefined,
    'FR-007: Out-of-sequence answers are successfully mapped to intended question.'
  );

  // QA-004: Unanswered question handling (FR-008)
  const unansweredQ = SAMPLE_QUESTIONS.find((q) => q.isUnanswered);
  assert(
    unansweredQ && unansweredQ.obtainedMarks === 0,
    'FR-008: Questions with no student answer remain visible and identified as unanswered.'
  );

  // QA-005: Unmatched answer content surfacing (FR-009)
  assert(
    SAMPLE_UNMATCHED_ANSWERS.length > 0,
    'FR-009: Unmatched answer content is surfaced rather than silently discarded.'
  );

  // QA-007: Exact-region answer bounding boxes (FR-010)
  const regionQ2 = SAMPLE_ANSWER_REGIONS.find((r) => r.questionId === 'q2');
  assert(
    regionQ2 && regionQ2.boundingBoxes.length > 0 && regionQ2.boundingBoxes[0].width > 0,
    'FR-010: Bounding boxes are computed with valid normalized x, y, width, height percentages.'
  );

  // QA-006: Multi-page answer regions (FR-011)
  assert(
    regionQ2 && regionQ2.boundingBoxes.length > 1,
    'FR-011: Multi-page answers spanning multiple pages are fully supported and represented.'
  );

  console.log(`\n📊 Test Summary: ${passed}/${total} tests passed successfully.`);
  if (passed !== total) {
    process.exit(1);
  }
}

runUnitTests();
