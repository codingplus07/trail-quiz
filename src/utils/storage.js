const STORAGE_KEY = "bharatPrepApp";

const defaultStorage = {
  currentUserId: null,
  users: {},
};

/* ================================
   GET STORAGE
================================ */

export function getStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultStorage;
    }

    const parsed = JSON.parse(saved);

    return {
      currentUserId:
        parsed.currentUserId || null,

      users:
        parsed.users || {},
    };
  } catch (error) {
    console.error("Storage read error:", error);

    return defaultStorage;
  }
}

/* ================================
   SAVE STORAGE
================================ */

export function saveStorage(data) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Storage save error:", error);
  }
}

/* ================================
   UPDATE STORAGE
================================ */

export function updateStorage(updates) {
  const current = getStorage();

  const updated = {
    ...current,
    ...updates,
  };

  saveStorage(updated);

  return updated;
}

/* ================================
   GET CURRENT USER
================================ */

export function getCurrentUser() {
  const data = getStorage();

  if (!data.currentUserId) {
    return null;
  }

  return data.users[data.currentUserId] || null;
}

/* ================================
   CREATE NEW USER
================================ */

export function createNewUser(name) {
  const cleanName = name.trim();

  if (!cleanName) {
    return null;
  }

  const data = getStorage();

  const userId =
    `user_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

  const newUser = {
    id: userId,

    name: cleanName,

    attemptedQuestionIds: [],

    completedSections: [],

    results: [],

    quizHistory: [],

    currentAttempt: null,

    quizQuestions: [],

    selectedSection: null,

    lastResult: null,

    createdAt: new Date().toISOString(),

    lastActiveAt: new Date().toISOString(),
  };

  data.users[userId] = newUser;

  data.currentUserId = userId;

  saveStorage(data);

  return newUser;
}

/* ================================
   LOGIN EXISTING USER
================================ */

export function loginUser(userId) {
  const data = getStorage();

  if (!data.users[userId]) {
    return null;
  }

  data.currentUserId = userId;

  data.users[userId].lastActiveAt =
    new Date().toISOString();

  saveStorage(data);

  return data.users[userId];
}

/* ================================
   LOGOUT
================================ */

export function logoutUser() {
  const data = getStorage();

  data.currentUserId = null;

  saveStorage(data);
}

/* ================================
   UPDATE CURRENT USER
================================ */

export function updateCurrentUser(updates) {
  const data = getStorage();

  const userId = data.currentUserId;

  if (!userId) {
    return null;
  }

  if (!data.users[userId]) {
    return null;
  }

  data.users[userId] = {
    ...data.users[userId],

    ...updates,

    lastActiveAt: new Date().toISOString(),
  };

  saveStorage(data);

  return data.users[userId];
}

/* ================================
   GET ALL USERS
================================ */

export function getAllUsers() {
  const data = getStorage();

  return Object.values(data.users);
}

/* ================================
   DELETE USER
================================ */

export function deleteUser(userId) {
  const data = getStorage();

  if (!data.users[userId]) {
    return;
  }

  delete data.users[userId];

  if (data.currentUserId === userId) {
    data.currentUserId = null;
  }

  saveStorage(data);
}

/* ================================
   RESET CURRENT USER PROGRESS
================================ */

export function resetUserProgress() {
  updateCurrentUser({
    attemptedQuestionIds: [],

    completedSections: [],

    results: [],

    quizHistory: [],

    currentAttempt: null,

    quizQuestions: [],

    selectedSection: null,

    lastResult: null,
  });
}