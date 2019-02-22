import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import Dashboard from './Dashboard'
import Widget from './Widget'
import WidgetBar from './WidgetBar'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
<App>
    <WidgetBar>
        <Widget title="Energy Consumption" backgroundColor="#5e96d6" content="View how much energy is consumed by each building"/>
        <Widget title="Solar Energy" backgroundColor="#a270a5" content="UWEC's solar energy yields by date"/>
    </WidgetBar>
    <Dashboard/>
</App>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
