import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        /> 
        : 
        <Empty />}
    </article>
  );
}