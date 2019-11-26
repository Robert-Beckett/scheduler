import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";

export default function Appointment({id, time, ...props}) {
  return (
    <article className="appointment">
      <Header time={time}/>
      {props.interview ? <Show /> : <Empty />}
    </article>
  );
}