import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/form"
import Status from "components/Appointment/status";
import Confirm from "components/Appointment/confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back
  } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      });
  };

  const edit = (id) => {
    transition(EDIT);
  }

  const cancel = (id) => {
    transition(SAVING);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      });
  }

  const beginCancel = () => {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
        }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={() => beginCancel(props.id)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          name={""}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          newName={props.interview.student}
          newInterviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
          onLoad={console.log(props)}
        />
      )}
      {mode === SAVING && (
        <Status/>
      )}
      {mode === CONFIRM && (
        <Confirm
        message={"Are you sure you would like to cancel this appoinment?"}
        onConfirm={() => cancel(props.id)}
        onCancel={back}
        />
      )}
    </article>
  );
}