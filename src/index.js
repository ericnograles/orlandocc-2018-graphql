import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import DataHubClient from './graphql/client';

// Redux
import configureStore, { history } from './redux/store';

// Higher Order Components
import { connectAsAnonymous } from './redux/connectors';

// Routes
import Root from './pages/Root';
import NotFound from './pages/NotFound';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={DataHubClient}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={connectAsAnonymous(Root)} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
