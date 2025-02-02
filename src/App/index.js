import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../utils/configureStore';
import Constants from '../constants';
import Toolbar from '../Toolbar';
import Canvas from '../Canvas';
import Sections from '../Sections';
import { MainArea } from '../Common/Styled';

const { ROUTES } = Constants;

class App extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Router>
            <Fragment>
              <Toolbar/>
              <MainArea>
                <Switch>
                  <Route path={ROUTES.ROOT} exact component={Sections}/>
                  <Route path={ROUTES.CANVAS} component={Canvas}/>
                  <Route path={ROUTES.NOT_FOUND} render={() => <div>Not found</div>}/>
                </Switch>
              </MainArea>
            </Fragment>
          </Router>
        </Provider>
      </DragDropContextProvider>
    );
  }
}

export default App;
