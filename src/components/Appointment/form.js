import React, { useState } from 'react';

import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


export default function({
  interviewers, onSave, onCancel, ...prop
}) {
  const [name, setName] = useState(prop.name || "");
  const [interviewer, setInterviewer] = useState(
    prop.interviewer || null
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
          {/* Ask Jensen why this has to be wrapped in a function to work. */}
          <Button confirm onClick={() => onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}