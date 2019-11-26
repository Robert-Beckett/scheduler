export default function getAppointmentsForDay(state, day) {
  console.log(state);
  try {
    return state.days
      .filter(thisDay => thisDay.name === day)[0].appointments
      .map(appointId => state.appointments[appointId.toString()])
  } catch {
    return [];
  }
};