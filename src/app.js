/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

import Navbar from './navbar';
import Home from './home';
import Reports from "./reports";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from "./about";

/*
The "App" function establishes a React component named "App". Within this component, it constructs a "Router"
component along with a "Navbar", and a "div" container that is styled with a "content" class. The "Router"
component is further equipped with a "Switch" component, which serves to determine which "Route" component to
display depending on the URL path.
 */

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/report">
                            <Reports/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App;