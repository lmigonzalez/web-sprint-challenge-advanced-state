import React from 'react'
import { connect } from "react-redux";
import { setMessage } from "../state/action-creators";

function Message(props) {

// console.log(props.data)

  return <div id="message">{props.data.infoMessage != ""? props.data.infoMessage: '' }</div>
}




const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps, { setMessage })(Message);
