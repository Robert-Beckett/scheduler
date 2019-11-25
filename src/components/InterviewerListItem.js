import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem({
  name, avatar, selected, onChange
}) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const intImageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected,
  });

  return (
    <li className={interviewerClass} onClick={onChange}>
      <img
        className={intImageClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}