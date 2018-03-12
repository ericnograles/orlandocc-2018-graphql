import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import GraphQLClient from './graphql/client';

// Localizes Roboto and Material Design
import 'roboto-fontface/css/roboto/roboto-fontface.css';

// Redux
import configureStore, { history } from './redux/store';

// App-wide components
import TopAppBar from './components/TopAppBar';

// Routes
import Root from './pages/Root';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={GraphQLClient}>
      <ConnectedRouter history={history}>
        <div>
          <TopAppBar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/" component={Root} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
