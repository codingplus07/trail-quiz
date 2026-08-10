import {
  getCurrentUser,
  updateCurrentUser,
} from "./storage";

export const QUESTIONS_PER_ATTEMPT = 30;

export const TIME_PER_ATTEMPT = 30 * 60;

/* ================================
   SECTION COUNT
================================ */

export function getSectionCount(questions) {
  if (!questions || questions.length === 0) {
    return 0;
  }

  return Math.ceil(
    questions.length / QUESTIONS_PER_ATTEMPT
  );
}

/* ================================
   SECTION NUMBER
================================ */

export function getSectionNumber(index) {
  return (
    Math.floor(
      index / QUESTIONS_PER_ATTEMPT
    ) + 1
  );
}

/* ================================
   GET ALL SECTIONS
================================ */

export function getSections(questions) {
  const sections = {};

  if (!questions) {
    return sections;
  }

  questions.forEach((question, index) => {
    const sectionNumber =
      getSectionNumber(index);

    if (!sections[sectionNumber]) {
      sections[sectionNumber] = [];
    }

    sections[sectionNumber].push({
      ...question,

      section: sectionNumber,
    });
  });

  return sections;
}

/* ================================
   GET SECTION QUESTIONS
================================ */

export function getSectionQuestions(
  questions,
  sectionId
) {
  if (!questions) {
    return [];
  }

  const start =
    (sectionId - 1) *
    QUESTIONS_PER_ATTEMPT;

  const end =
    start + QUESTIONS_PER_ATTEMPT;

  return questions
    .slice(start, end)
    .map((question) => ({
      ...question,

      section: sectionId,
    }));
}

/* ================================
   GET ATTEMPTED QUESTION IDS
================================ */

export function getAttemptedQuestionIds() {
  const user = getCurrentUser();

  return user?.attemptedQuestionIds || [];
}

/* ================================
   GET NEW QUESTIONS
================================ */

export function getNewQuestions(
  questions,
  sectionId
) {
  const attemptedIds =
    getAttemptedQuestionIds();

  const sectionQuestions =
    getSectionQuestions(
      questions,
      sectionId
    );

  return sectionQuestions.filter(
    (question) =>
      !attemptedIds.includes(question.id)
  );
}

/* ================================
   MARK QUESTIONS ATTEMPTED
================================ */

export function markQuestionsAttempted(ids) {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  const previous =
    user.attemptedQuestionIds || [];

  const updatedIds = [
    ...new Set([
      ...previous,
      ...ids,
    ]),
  ];

  return updateCurrentUser({
    attemptedQuestionIds: updatedIds,
  });
}

/* ================================
   COMPLETED SECTIONS
================================ */

export function getCompletedSections() {
  const user = getCurrentUser();

  return user?.completedSections || [];
}

/* ================================
   SAVE COMPLETED SECTION
================================ */

export function saveCompletedSection(sectionId) {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  const previous =
    user.completedSections || [];

  if (previous.includes(sectionId)) {
    return user;
  }

  return updateCurrentUser({
    completedSections: [
      ...previous,
      sectionId,
    ],
  });
}

/* ================================
   SAVE RESULT
================================ */

export function saveAttemptResult(result) {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  const previousResults =
    user.results || [];

  const newResult = {
    ...result,

    id: `result_${Date.now()}`,

    createdAt:
      new Date().toISOString(),
  };

  return updateCurrentUser({
    results: [
      ...previousResults,
      newResult,
    ],

    lastResult: newResult,
  });
}

/* ================================
   CURRENT ATTEMPT
================================ */

export function saveCurrentAttempt(attempt) {
  return updateCurrentUser({
    currentAttempt: attempt,
  });
}

export function getCurrentAttempt() {
  const user = getCurrentUser();

  return user?.currentAttempt || null;
}

export function clearCurrentAttempt() {
  return updateCurrentUser({
    currentAttempt: null,
  });
}