import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value }
      case SET_APPLICATION_DATA:
        return { ...state, ...action.value }
      case SET_INTERVIEW:
        return { ...state, appointments: action.appointments }
      default:
        throw new Error(
          `Tried to reduce wih unsupported action type: ${action.type}`
        );
      }
  }

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
          dispatch({ type: SET_INTERVIEW, appointments });
        }
        else throw new Error("Unexpected response");
      });
  }
  
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        if (res.status === 500) {
          const appointment = {
            ...state.appointments[id],
            interview: null
          };
  
          dispatch({
            type: SET_INTERVIEW, value: appointment
          });
        }
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

