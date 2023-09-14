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
The function defines a React component called App.
It returns a Router component with Navbar and a div container that has a content class.
The Router component contains a Switch component that determines
 which Route component to render based on the URL path.
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
