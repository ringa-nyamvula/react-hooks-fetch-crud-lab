import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  function fetchedData() {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }

  useEffect(() => {
    fetchedData();
  }, []);

  // addQuestion adds one more question to the ui after submit
  function addQuestion(data) {
    setQuestions((prevState) => [...prevState, data]);
  }

  function onDeleteQuestion(id) {
    setQuestions((prevState) => prevState.filter((item) => item.id !== id));
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={onDeleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
