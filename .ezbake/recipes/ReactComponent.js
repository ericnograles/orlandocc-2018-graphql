
module.exports = {
  destination: '<%= destination %>',
  description: 'A standard React Component with moment and lodash with a dynamic destination (defaults to /src/components)',
  source: `
  import React from 'react';
  import _ from 'lodash';
  import moment from 'moment';
  
  export default class <%= componentName %> extends React.Component {
    render() {
      return (
        <div>
          TODO: Implement <%= componentName %>
        </div>
      );
    }
  }
  `,
  ingredients: [
    {
      type: "input",
      name: "componentName",
      message: "What would you like to call this React Component?",
      default: "NewReactComponent"
    },
    {
      type: "input",
      name: "componentName",
      message: "What is the destination for this React Component?",
      default: "/src/components"
    }
  ],
  icing: []
}
