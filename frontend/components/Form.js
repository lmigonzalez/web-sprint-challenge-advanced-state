import React, {useState} from 'react'
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { inputChange, resetForm, setMessage } from "../state/action-creators";
// import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const dispatch = useDispatch();

  const values = {
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  }



  const stateValues = props.data.form
  
  const [initialValues, setInitialValues] = useState(stateValues)
  console.log(initialValues)
  // console.log(initialValues.newFalseAnswer)
  // console.log(stateValues)


  const onChange = evt => {
   evt.preventDefault()
   setInitialValues({...initialValues, [evt.target.name]: evt.target.value})
  }
  
  dispatch(props.inputChange(initialValues))


  const onSubmit = evt => {
  evt.preventDefault()
  axios.post('http://localhost:9000/api/quiz/new', {"question_text": initialValues.newQuestion, "true_answer_text": initialValues.newTrueAnswer, "false_answer_text": initialValues.newFalseAnswer})
  .then(res=>{
    // console.log(res)
    dispatch(props.setMessage(`Congrats: "${res.data.question}" is a great question!`))
    props.resetForm(values)
    setInitialValues(values)
  })
  .catch(err=>{
    console.log(err)
  })

  }

 
// console.log(props.data.form)
 

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>

      <input maxLength={50} onChange={onChange} name = 'newQuestion' id="newQuestion" placeholder="Enter question" value={initialValues.newQuestion}/>

      <input maxLength={50} onChange={onChange} name = 'newTrueAnswer' id="newTrueAnswer" placeholder="Enter true answer" value={initialValues.newTrueAnswer}/>

      <input maxLength={50} onChange={onChange} name = 'newFalseAnswer' id="newFalseAnswer" placeholder="Enter false answer" value={initialValues.newFalseAnswer}/>

      <button id="submitNewQuizBtn" disabled = {initialValues.newQuestion.trim().length && initialValues.newTrueAnswer.trim().length && initialValues.newFalseAnswer.trim().length > 1? false: true}>Submit new quiz</button>

    </form>
  )
}



const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, {inputChange, resetForm, setMessage })(
  Form
);