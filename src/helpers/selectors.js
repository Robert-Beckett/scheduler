export function getAppointmentsForDay(state, day) {
  try {
    return state.days
      .filter(thisDay => thisDay.name === day)[0].appointments
      .map(appointId => state.appointments[appointId.toString()])
  } catch {
    return [];
  }
};

export function getInterviewersForDay(state, day) {
  try {
    return state.days
      .filter(thisDay => thisDay.name === day)[0].interviewers
      .map(appointId => state.interviewers[appointId.toString()])
  } catch {
    return [];
  }
};

export function getInterview(state, interview) {
  try {
    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    };
  } catch {
    return null;
  }
}

export function getInterviewsForDay(state, day) {
  for (const item of state.days) {
    if (item.name === day) {
      return item.appointments;
    }
  }
}

export function getAppointmentsById(state, appointmentIds) {
  const appointments = [];
  for (const appointment in state.appointments) {
    if (appointmentIds.includes(Number(appointment))) {
      appointments.push(state.appointments[appointment]);
    }
  }
  return appointments;
}

export function getSpotsForDay(state, day) {
  for (const day of state.days) {
    if (day.name === day) {
      return day;
    }
  }
}