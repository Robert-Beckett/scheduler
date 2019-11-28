import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/form"
import Status from "components/Appointment/status";
import Confirm from "components/Appointment/confirm";
import Error from "components/Appointment/error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true));
  };

  const edit = () => {
    transition(EDIT);
  }

  const cancel = (id) => {
    transition(SAVING, true);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERROR_DELETE, true));
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
      {mode === ERROR_SAVE && (
        <Error
          message={"There was an issue saving your appointment.  Please try again later."}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"There was an issue deleting your appointment.  Please try again later."}
          onClose={back}
        />
      )}
    </article>
  );
}