
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Sections from "./pages/Sections";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

import { questions } from "./data/questions";

import {
  getSectionCount,
  getNewQuestions,
  getSectionQuestions,
} from "./utils/quizUtils";

import {
  getCurrentUser,
  createNewUser,
  loginUser,
  logoutUser,
  updateCurrentUser,
  getAllUsers,
} from "./utils/storage";


function AppContent() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const currentUser =
    getCurrentUser();


  /* =================================
     DYNAMIC SECTION COUNT
  ================================= */

  const sectionCount =
    getSectionCount(
      questions
    );


  /* =================================
     NEW STUDENT
  ================================= */

  function handleNewStudent() {

    logoutUser();

    navigate("/");
  }


  /* =================================
     START NEW TEST
  ================================= */

  function handleStart(name) {

    const cleanName =
      name?.trim();


    if (!cleanName) {

      alert(
        "कृपया अपना नाम दर्ज करें।"
      );

      return;
    }


    const user =
      createNewUser(
        cleanName
      );


    if (!user) {

      alert(
        "Student create नहीं हो पाया।"
      );

      return;
    }


    navigate(
      "/sections"
    );
  }


  /* =================================
     EXISTING USER LOGIN
  ================================= */

  function handleLogin(userId) {

    const user =
      loginUser(
        userId
      );


    if (!user) {

      alert(
        "Student नहीं मिला।"
      );

      return;
    }


    navigate(
      "/sections"
    );
  }


  /* =================================
     SELECT NEW SECTION
  ================================= */

  function handleSection(
    sectionId
  ) {

    const user =
      getCurrentUser();


    if (!user) {

      alert(
        "कृपया पहले student name enter करें।"
      );

      navigate("/");

      return;
    }


    const sectionQuestions =
      getNewQuestions(
        questions,
        sectionId
      );


    if (!sectionQuestions.length) {

      alert(
        "इस Section के सभी questions आप पहले ही complete कर चुके हैं।"
      );

      return;
    }


    updateCurrentUser({

      selectedSection:
        sectionId,

      quizQuestions:
        sectionQuestions,

      currentAttempt: {

        sectionId,

        questionIds:
          sectionQuestions.map(
            (question) =>
              question.id
          ),

        startedAt:
          new Date().toISOString(),

      },

      lastResult:
        null,

    });


    navigate(
      `/quiz/${sectionId}`
    );
  }


  /* =================================
     RESTART COMPLETED SECTION
  ================================= */

  function handleRestartSection(
    sectionId
  ) {

    const user =
      getCurrentUser();


    if (!user) {

      navigate("/");

      return;
    }


    const sectionQuestions =
      getSectionQuestions(
        questions,
        sectionId
      );


    if (!sectionQuestions.length) {

      alert(
        "इस Section में questions नहीं मिले।"
      );

      return;
    }


    updateCurrentUser({

      selectedSection:
        sectionId,

      quizQuestions:
        sectionQuestions,

      currentAttempt:
        null,

      lastResult:
        null,

    });


    navigate(
      `/quiz/${sectionId}`
    );
  }


  /* =================================
     QUIZ COMPLETE
  ================================= */

  function handleQuizComplete(
    quizResult
  ) {

    const user =
      getCurrentUser();


    if (!user) {

      navigate("/");

      return;
    }


    updateCurrentUser({

      lastResult:
        quizResult,

      currentAttempt:
        null,

    });


    navigate(
      "/result"
    );
  }


  /* =================================
     RESTART FROM RESULT
  ================================= */

  function handleRestartQuiz() {

    const user =
      getCurrentUser();


    if (!user) {

      navigate("/");

      return;
    }


    const sectionId =
      user.lastResult?.sectionId ||
      user.selectedSection;


    if (!sectionId) {

      navigate(
        "/sections"
      );

      return;
    }


    const sectionQuestions =
      getSectionQuestions(
        questions,
        sectionId
      );


    if (!sectionQuestions.length) {

      navigate(
        "/sections"
      );

      return;
    }


    updateCurrentUser({

      selectedSection:
        sectionId,

      quizQuestions:
        sectionQuestions,

      currentAttempt:
        null,

      lastResult:
        null,

    });


    navigate(
      `/quiz/${sectionId}`
    );
  }


  /* =================================
     BACK
  ================================= */

  function handleBack() {

    navigate(-1);
  }


  /* =================================
     HOME
  ================================= */

  function handleHome() {

    navigate("/");
  }


  return (
    <>

      {/* HEADER */}

      <Header

        studentName={
          currentUser?.name || ""
        }

        page={
          location.pathname
        }

        onBack={
          handleBack
        }

        onHome={
          handleHome
        }

        onNewStudent={
          handleNewStudent
        }

      />


      {/* ROUTES */}

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={

            <Home

              studentName={
                currentUser?.name || ""
              }

              totalQuestions={
                questions.length
              }

              sectionCount={
                sectionCount
              }

              onContinue={
                handleStart
              }

              onNewStudent={
                handleNewStudent
              }

              users={
                getAllUsers()
              }

              onLogin={
                handleLogin
              }

            />

          }
        />


        {/* SECTIONS */}

        <Route
          path="/sections"
          element={

            currentUser ? (

              <Sections

                questions={
                  questions
                }

                onSelectSection={
                  handleSection
                }

                onRestartSection={
                  handleRestartSection
                }

              />

            ) : (

              <Navigate
                to="/"
                replace
              />

            )

          }
        />


        {/* QUIZ */}

        <Route
          path="/quiz/:sectionId"
          element={

            currentUser ? (

              <Quiz

                questions={
                  currentUser.quizQuestions ||
                  []
                }

                sectionId={
                  currentUser.selectedSection
                }

                studentName={
                  currentUser.name
                }

                onComplete={
                  handleQuizComplete
                }

              />

            ) : (

              <Navigate
                to="/"
                replace
              />

            )

          }
        />


        {/* RESULT */}

        <Route
          path="/result"
          element={

            currentUser ? (

              <Result

                result={
                  currentUser.lastResult
                }

                studentName={
                  currentUser.name
                }

                onRestart={
                  handleRestartQuiz
                }

                onSections={() =>
                  navigate(
                    "/sections"
                  )
                }

                onHome={
                  handleHome
                }

              />

            ) : (

              <Navigate
                to="/"
                replace
              />

            )

          }
        />


        {/* 404 */}

        <Route
          path="*"
          element={

            <Navigate
              to="/"
              replace
            />

          }
        />

      </Routes>


      {/* FOOTER */}

      <Footer />

    </>
  );
}


/* =================================
   APP
================================= */

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );
}


export default App;

