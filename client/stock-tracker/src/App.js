import React, { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import usercontext from './Context/User/usercontext';
import home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Aboutus from './Pages/Aboutus';
import MyPortfolio from './Pages/MyPortfolio';
import StockDetail from './Pages/StockDetail';
import './app.css';


function App() {

  const context = useContext(usercontext)
  const { user } = context;

  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            {!user ?   // to show content as per login status
              (
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                </Switch>
              ) :
              (
                <>
                  <Route exact path="/" />
                  <Route path="/home" component={home} />
                  <Route path="/aboutus" component={Aboutus} />
                  <Route path="/myPortfolio" component={MyPortfolio} />
                  <Route path="/stock/:name" component={StockDetail} />
                </>
              )}
          </Switch>

          {!user ?  //to redirect as per login status
            (<Redirect to="/login" />)
            :
            (<Redirect to="/home" />)
          }
        </div>

      </Router>
    </Fragment>
  );
}

export default App;

