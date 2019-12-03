import { useReducer, useEffect } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  })
  
  const setDay = day => dispatch({ type: SET_DAY, value: day});
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      dispatch({ type: SET_APPLICATION_DATA, value: {
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }});
    });
  }, []);
  
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        if (res.status === 204) {
          const day = getDayByInterview(id);
          day.spots--;
          const days = state.days;
          days[day.id - 1] = day
          dispatch({ type: SET_INTERVIEW, value: 
            { appointments, days }
          });
        }
        else throw new Error("Unexpected response");
      });
  }
  
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        if (res.status === 204) {
          const day = getDayByInterview(id);
          
          day.spots++;
          const days = state.days;
          days[day.id - 1] = day;

          const appointment = {
            ...state.appointments[id],
            interview: null
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          
          dispatch({
            type: SET_INTERVIEW, value: 
              { appointments, days }
          });
        }
      });
  }

  const getDayByInterview = (interviewId) => {
    for (const day of state.days) {
      if (day.appointments.includes(interviewId))
        return day;
    }
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

