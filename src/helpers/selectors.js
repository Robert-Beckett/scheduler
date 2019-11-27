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