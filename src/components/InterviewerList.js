import React from 'react';
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";

import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList({
  interviewers, value, onChange
}) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewers.map((current) => {
          return <InterviewerListItem
            key={current.id}
            name={current.name}
            avatar={current.avatar}
            selected={current.id === value}
            onChange={() => onChange(current.id)}
          />
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};