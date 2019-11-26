export function getAppointmentsForDay(state, day) {
  try {
    return state.days
      .filter(thisDay => thisDay.name === day)[0].appointments
      .map(appointId => state.appointments[appointId.toString()])
  } catch {
    return [];
  }
};