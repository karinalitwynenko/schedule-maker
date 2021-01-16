import './App.css';
import Schedule from './schedule/Schedule'
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header App-color-main">
                    <img className="App-header-logo" src={process.env.PUBLIC_URL + '/clips.png'}/>
                    Schedule Maker
                </header>
                <Schedule />
            </div>
        );
    }
}

export default App;
