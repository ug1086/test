import React from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import PokemonList from './components/PokemonList'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="container">
        <Switch>
          <Route 
            path="/"
            render={(props) => (
              <PokemonList {...props} />
            )}
          />
        </Switch>
      </div>
  );
}

export default App;
