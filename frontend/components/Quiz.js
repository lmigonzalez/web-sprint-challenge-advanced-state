import React, { useEffect } from "react";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchQuiz, setQuiz, selectAnswer, setMessage } from "../state/action-creators";

function Quiz(props) {
  // const products = useSelector((state) => state.quiz)
  const dispatch = useDispatch();

  const { data } = props;

  

  const fetchData = () => {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(props.setQuiz(res.data));
        // console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(quizObj)

  const postData = () =>{
    axios
    .post('http://localhost:9000/api/quiz/answer', { "quiz_id": data.quiz.quiz_id, "answer_id": data.selectedAnswer })
    .then(res=>{

      dispatch(props.setMessage(res.data.message))
    })
    .catch(err=>{
      console.log(err)
    })
  }




  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data)
  // console.log(data.quiz.quiz_id)

  const handleSelect = (e) => {
    e.preventDefault();
    dispatch(props.selectAnswer(e.target.value));
    
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    fetchData()
    postData()
  }
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz... selected"

        props.data.quiz ? (
          <>
            <h2>{data.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={
                  data.quiz.answers[0].answer_id === data.selectedAnswer
                    ? "answer selected"
                    : "answer"
                }
              >
                {data.quiz.answers[0].text}
                <button
                  value={data.quiz.answers[0].answer_id}
                  onClick={handleSelect}
                >
                  {data.quiz.answers[0].answer_id === data.selectedAnswer
                    ? "SELECTED"
                    : "select"}
                </button>
              </div>

              <div
                className={
                  data.quiz.answers[1].answer_id === data.selectedAnswer
                    ? "answer selected"
                    : "answer"
                }
              >
                {data.quiz.answers[1].text}
                <button
                  value={data.quiz.answers[1].answer_id}
                  onClick={handleSelect}
                >
                  {data.quiz.answers[1].answer_id === data.selectedAnswer
                    ? "SELECTED"
                    : "select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled = {data.selectedAnswer? false: true} onClick = {handleSubmit}>
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, setQuiz, setMessage })(
  Quiz
);
