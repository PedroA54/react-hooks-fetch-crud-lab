import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const dbUrl = 'http://localhost:4000/questions';

  useEffect(() => {
    fetch(dbUrl)
      .then(resp => resp.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  const deleteQuestion = (id) => {
    fetch(`${dbUrl}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete question');
      }
      
      setQuestions(questions.filter(q => q.id !== id));
    })
    .catch(error => console.error("Error deleting question:", error));
  };

  const editAnswer = (id, newCorrectIndex) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === id) {
        return { ...q, correctIndex: newCorrectIndex };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} setQuestions={setQuestions} dbUrl={dbUrl} /> : <QuestionList questions={questions} deleteQuestion={deleteQuestion} editAnswer={editAnswer} />}
    </main>
  );
}

export default App;