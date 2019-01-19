import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import Header from './Header'
import all from './streams'
import history from '../history'

const {StreamList, StreamEdit, StreamDelete, StreamCreate, StreamShow} = all

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header/>
                    <div className="ui container">
                        <Switch>
                            <Route path="/" exact component={StreamList}/>
                            <Route path="/streams/new" exact component={StreamCreate}/>
                            <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                            <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                            <Route path="/streams/:id" exact component={StreamShow}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App