import React from 'react';

import DayListItem from 'components/DayListItem';


export default function DayList(props) {

  return (
    <ul>
      {props.days.map((day) => {
        return <DayListItem
        data-testid='day'
        key={day.id}
        id={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay} />
      })}
    </ul>
  );
}