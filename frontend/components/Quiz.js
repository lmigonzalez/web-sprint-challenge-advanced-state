import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux';
import { fetchQuiz, selectAnswer} from '../state/action-creators';

function Quiz(props) {

  const {loading} = props

  const dispatch = useDispatch()

  const data = {
    question: '',
    answer1: '',
    answer2: ''
  }

  const [answer1Btn, setAnswer1Btn] = useState(props.loading.selectedAnswer) 
  const [answer2Btn, setAnswer2Btn] = useState(props.loading.selectedAnswer)

  const [disableBtn, setDisableBtn] = useState(true)
  
  const handleAnswer1 = () =>{
    setAnswer1Btn(true)
    setAnswer2Btn(false)
    setDisableBtn(false)
    props.selectAnswer()
  }
  const handleAnswer2 = () =>{
    setAnswer1Btn(false)
    setAnswer2Btn(true)
    setDisableBtn(false)
    props.selectAnswer()
  }
 

  const [quizData, setQuizData] = useState(data)
  const {fetchQuiz} = props

  const getData = () =>{
    axios.get('http://localhost:9000/api/quiz/next')
    .then((res)=>{
      console.log(res)
      setQuizData({
        ...quizData, question: res.data.question, answer1: res.data.answers[0].text, answer2: res.data.answers[1].text
      })
  
      fetchQuiz()
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setAnswer1Btn(false)
    setAnswer2Btn(false)
    setDisableBtn(true)
    getData()
    fetchQuiz()
   }
 
  useEffect(()=>{
    getData()
    
  }, [])

 

  // useEffect(()=>{
  //   getData()
  // }, [handleSubmit])

 


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz... selected"

        loading.quiz?(
          <>
            <h2>{quizData.question}</h2>

            <div id="quizAnswers">
              <div className={!answer1Btn? 'answer': 'answer selected'}>
                {quizData.answer1}
                <button onClick= {handleAnswer1}>
                {answer1Btn? 'SELECTED': 'select'}
                </button>
              </div>

              <div className={!answer2Btn? 'answer': 'answer selected'}>
               {quizData.answer2}
                <button onClick= {handleAnswer2}>
                {answer2Btn? 'SELECTED': 'select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn"  disabled={disableBtn} onClick={handleSubmit} >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}


const mapStateToProps = state =>{
  return({
    loading: state
  })
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz)