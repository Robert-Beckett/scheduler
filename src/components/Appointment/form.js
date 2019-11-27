import React, { useState } from 'react';

import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


export default function Form({
  interviewers, onSave, onCancel, newName, newInterviewer
}) {
  console.log('TEST');
  const [name, setName] = useState(newName || "");
  const [interviewer, setInterviewer] = useState(
    newInterviewer || null
  );

  

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {
            reset(); cancel();
          }}>
            Cancel
          </Button>
          
          <Button confirm onClick={() => onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}