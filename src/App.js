import React from 'react';

// GraphQL
import { ApolloProvider } from 'react-apollo';
import GraphQLClient from './graphql/client';
import gql from 'graphql-tag';

// App-wide components
import TopAppBar from './components/TopAppBar';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './pages/Root';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';

// Connector
import connectToApp from './connectToApp';

// Constants
import { LOCAL_STORAGE } from './constants';

const initialState = {
  profile: {},
  error: null,
  loading: true
};

export default class App extends React.Component {
  state = initialState;

  logout = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    this.setState(Object.assign({}, initialState, { loading: false }));
  };

  setProfile = profile => {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(profile));
    this.setState({
      profile,
      loading: false
    });
  };

  async componentDidMount() {
    try {
      const profile = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN)) || {};
      const accessToken = profile.access_token;
      if (accessToken) {
        const query = gql`
          query profile($accessToken: String!) {
            current_user(access_token: $accessToken) {
              first_name
              last_name
              access_token
              refresh_token
              expires_in
            }
          }
        `;

        let results = await GraphQLClient.query({
          query,
          variables: {
            accessToken
          }
        });

        let { current_user } = results.data;
        this.setProfile(current_user);
      } else {
        this.setState({loading: false});
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      this.setState({ error, loading: false });
    }
  }

  render() {
    const state = this.state;
    const props = {
      logout: this.logout,
      setProfile: this.setProfile
    };
    const { loading, profile } = state;
    const ConnectedAppBar = connectToApp(TopAppBar, state, props);

    return (
      <ApolloProvider client={GraphQLClient}>
        <div>
          {loading && <div>Loading...</div>}
          {!loading && (
            <Router>
              <div>
                {profile.access_token && <ConnectedAppBar />}
                <Switch>
                  <Route exact path="/login" component={connectToApp(Login, state, props, false)} />
                  <Route
                    exact
                    path="/chat/:channel_name"
                    component={connectToApp(Chat, state, props)}
                  />
                  <Route
                    exact
                    path="/"
                    component={connectToApp(Root, state, props)}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Router>
          )}
        </div>
      </ApolloProvider>
    );
  }
}
