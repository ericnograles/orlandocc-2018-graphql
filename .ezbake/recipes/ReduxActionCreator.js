
module.exports = {
  destination: '/src/redux/actions',
  description: 'A generic Redux action creator to be created in /src/redux/actions',
  source: `
  export function someAction() {
    return async (dispatch, store) => {
      dispatch({
        type: 'EZBAKE:TEMPLATE:ACTION'
      });
    };
  }
  `,
  ingredients: [
    {
      type: "input",
      name: "actionCreatorName",
      message: "Enter an action creator name",
      default: "newActionCreator",
      filter: val => {
        // Converts to camelCase
        return val.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
      }
    }
  ],
  icing: []
}
