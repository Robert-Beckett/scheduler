import reducer from 'reducers/application';

describe("Reducer", () => {
  it('throws an error with an unsupported type', () => {
    const emptyState = {};
    const invalAction = { value: null };

    expect(() => reducer(emptyState, invalAction)).toThrowError(
      /tried to reduce with unsupported action type*/i

    );
  });
});