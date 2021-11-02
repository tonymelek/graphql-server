import './App.scss';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client'
import Transactions from './components/Transactions';
import NewTransaction from './components/NewTransaction';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NewUser from './components/NewUser';
import Users from './components/Users';
import { useReducer } from 'react';
import { actions } from './stateManagement/actions';
import { initialState } from './stateManagement/initialState';
import { AppContext } from './stateManagement/AppContext';
// const roles = ["servant", "priest", "merchant", "admin"]

function App() {
  const [state, dispatch] = useReducer(actions, initialState)
  const client = new ApolloClient({
    uri: 'http://localhost:3010/',
    cache: new InMemoryCache()
  });
  return (
    <div className="container my-5" >

      <ApolloProvider client={client}>
        <AppContext.Provider value={{ state, dispatch }}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Transactions />
              </Route>
              <Route exact path="/users">
                <Users />
              </Route>
              <Route exact path='/new-trans'>
                <NewTransaction />
              </Route>
              <Route exact path='/new-user'>
                <NewUser />
              </Route>
            </Switch>
          </Router>
        </AppContext.Provider>
      </ApolloProvider>

    </div>
  );
}

export default App;
