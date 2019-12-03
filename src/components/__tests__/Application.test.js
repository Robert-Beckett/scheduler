import React from "react";

import { 
  render, cleanup, waitForElement, fireEvent, getByText,
  prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, waitForElementToBeRemoved
} from "@testing-library/react";

import axios from 'axios';

import Application from "components/Application";
import { debug } from "util";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const monday = getAllByTestId(container, "day")
      .find(element => queryByText(element, "Monday"));

    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(
      element => queryByText(element, "Archie Cohen")
    );
  
    
    // 3. Click the "Cancel" button on the first booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 4. Click confirm on the confirmation box.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 5. Check that the loading animation has appeared.
    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();
    
    // 6. Check that the empty box has appeared.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 7. Confirm that the DayListItem with the text "Monday" has increased the number of spots by one.
    const monday = getAllByTestId(container, "day")
      .find(element => queryByText(element, "Monday"));
    
    await waitForElementToBeRemoved(() => getByText(monday, '1 spot remaining'));
    console.log(prettyDOM(monday));
    // Working but not yet testing correctly.
    expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(
      element => queryByText(element, "Archie Cohen")
    );
    // 3. Click the "Edit" button on the first booked interview.
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Edit the name of the current student placed in that interview.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Ron Reeves"}
    });
    
    // 5. Select a new interviewer from the list.
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // 6. Click "Save".
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Confirm the loading animation has appeared.
    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();

    // 8. Confirm the show box has appeared.
    await waitForElementToBeRemoved(() => getByAltText(appointment, "Loading"));

    // 9. Confirm the show box shows the new student and interviewers name.
    expect(getByText(appointment, "Ron Reeves")).toBeInTheDocument();
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    // 10. Confirm that the spots remaining has not changed.
    const monday = getAllByTestId(container, "day")
      .find(element => queryByText(element, "Monday"));
    expect(getByText(monday, "1 spot remaining"));
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(
      element => queryByText(element, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElementToBeRemoved(() => getByAltText(appointment, "Loading"));

    expect(getByText(appointment, /There was an issue saving your appointment/i)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(
      element => queryByText(element, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));
    fireEvent.click(getByText(appointment, "Confirm"));
    await waitForElementToBeRemoved(() => getByAltText(appointment, "Loading"));

    expect(getByText(appointment, /There was an issue deleting your appointment/i)).toBeInTheDocument();
  });
});
