import React from "react";
import QuestionItem from './QuestionItem.js'

function QuestionList({ questions, deleteQuestion, editAnswer }) {

  const renderedQuestions = questions.map((q) => (
    <QuestionItem key={q.id} question={q} deleteQuestion={deleteQuestion} editAnswer={editAnswer} />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderedQuestions}</ul>
    </section>
  );
}

export default QuestionList;
