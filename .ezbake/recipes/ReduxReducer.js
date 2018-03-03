
module.exports = {
  destination: '/src/redux/reducers',
  description: 'A generic Redux reducer to be created in /src/redux/reducers',
  source: `
  const initialState = {};
  
  export const <%= reducerName %> = (state = initialState, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  `,
  ingredients: [
    {
      type: "input",
      name: "reducerName",
      message: "Enter a reducer name",
      default: "newReducer",
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
