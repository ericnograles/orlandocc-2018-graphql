
module.exports = {
  destination: '/src/pages',
  description: 'A React Component enhanced by the connectAsAuthenticated higher order component, created in /src/pages',
  source: `
  import React from 'react';
  import { connectAsAuthenticated } from '../redux/connectors';
  
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
      message: "What is the name of this Anonymous Page?",
      default: "NewAuthenticatedPage"
    }
  ],
  icing: []
}
