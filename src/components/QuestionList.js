import React, { useEffect, useState }from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

useEffect(()=>{
  fetch("http://localhost:4000/questions")
  .then ((resp) => resp.json())
  .then ((questions) => setQuestions(questions))
},[])

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then((r)=> r.json())
    .then (()=>{
      const updatedQuestions = questions.filter((q)=> q.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  function handleAnswer(id, correctIndex){
    
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((r)=>r.json())
    .then((updatedQuestion) => {
      const updatedQuestions= questions.map((question)=>{
        if(question.id===updatedQuestion.id) return updatedQuestion; return question;
      });
      setQuestions(updatedQuestions)
    })
  }
  const questionList = questions.map((q)=>(
    <QuestionItem
    key={q.id}
    question={q}
    onHandleDelete={handleDelete}
    onHandleAnswer={handleAnswer}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
