import React from 'react';
import ShoppingList from './ShoppingList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import UserInvitations from './UserInvitations';
import ShoppingListManager from './ShoppingListManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Route for managing multiple shopping lists */}
          <Route path="/lists" component={ShoppingListManager} />

          {/* Route for viewing individual shopping lists */}
          <Route path="/list/:id" component={ShoppingList} />

          {/* Default route (you can redirect to /lists or any other route as needed) */}
          <Route path="/" component={ShoppingListManager} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
