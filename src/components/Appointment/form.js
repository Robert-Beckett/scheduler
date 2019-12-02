import React, { useState } from 'react';

import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


export default function Form({
  interviewers, onSave, onCancel, newName, newInterviewer
}) {
  const [name, setName] = useState(newName || "");
  const [interviewer, setInterviewer] = useState(
    newInterviewer || null
  );
  const [error, setError] = useState("");

  

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    setError("");
    onCancel();
  };

  const validate = () => {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    setError("");

    onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section
          className="appointment__validation"
        >
          {error}
        </section>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {
            reset(); cancel();
          }}>
            Cancel
          </Button>
          
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}