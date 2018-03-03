
module.exports = {
  destination: '/src/pages',
  description: 'A React Component enhanced by the connectAsAnonymous higher order component, created in /src/pages',
  source: `
  import React from 'react';
  import { connectAsAnonymous } from '../redux/connectors';
  
  class <%= componentName %> extends React.Component {
    render() {
      return (
        <div>
          TODO: Implement <%= componentName %>
        </div>
      );
    }
  }

  export default connectAsAnonymous(<%= componentName %>);
  `,
  ingredients: [
    {
      type: "input",
      name: "componentName",
      message: "What would you like to call this Anonymous Page?",
      default: "NewAnonymousPage"
    }
  ],
  icing: []
}
