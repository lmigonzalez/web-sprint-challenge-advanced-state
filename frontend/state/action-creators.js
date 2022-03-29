// ❗ You don't need to add extra action creators to achieve MVP

import axios from "axios"
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE} from "./action-types"


export function moveClockwise() {
  return{
     type: MOVE_CLOCKWISE
  }
 }

export function moveCounterClockwise() {
  return{
    type: MOVE_COUNTERCLOCKWISE
  }
 }

export function selectAnswer(quizID) {
  return{
    type: SET_SELECTED_ANSWER, payload: quizID
  }
 }

export function setMessage(message) { 
  return{

    type: SET_INFO_MESSAGE, payload: message

  }
  
}


export function setQuiz(data) { 
  return(
    {type: SET_QUIZ_INTO_STATE, payload: data}
  )
  
}


export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First , dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state//

    // dispatch(setQuiz())
    // axios
    // .get('http://localhost:9000/api/quiz/next')
    // .then(res =>{
    //   console.log(res)
    //   dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data})
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
    // dispatch({type: 'FETCH_QUIZ_SUCCESS', payload:data})
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
