import React from 'react';
import classNames from 'classnames';

import "components/InterviewerListItem.scss";

import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList({
  interviewers, interviewer, setInterviewer
}) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewers.map((current) => {
          return <InterviewerListItem
            id={current.id}
            name={current.name}
            avatar={current.avatar}
            selected={current.id === interviewer}
            setInterviewer={setInterviewer}
          />
        })}
      </ul>
    </section>
  );
}