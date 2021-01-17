import './App.css';
import Schedule from './schedule/Schedule'
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false
        };

        this.logIn = this.logIn.bind(this);
        this.register = this.register.bind(this);
    }


    render() {
        let dialogContainerRef = React.createRef();

        const closeDialog = () => {
            this.setState({isDialogVisible: false})
        };

        return (
            <div className="App">
                <header className="App-header App-color-main">
                    <div className="App-name App-center">
                        <img className="App-logo" src={process.env.PUBLIC_URL + "/clips.png"} alt="Three paper clips" />
                        Schedule Maker
                    </div>
                    <div>
                        <span onClick={() =>this.logIn()}>Log in</span>
                        <span onClick={this.register}>Register</span>
                    </div>
                </header>
                <Schedule />
                <div className={`App-dialog-container App-center ${this.state.isDialogVisible ? "" : "App-display-none"}`}>
                    <div className="App-form-container">
                        <form>
                            <label>
                                <span className="App-form-label">Login</span>
                                <input type="text" name="login" />
                            </label>
                            <label className={`${this.state.dialogType === "register" ? "" : "App-display-none"}`}>
                                <span className="App-form-label">E-mail</span>
                                <input type="email" name="email" />
                            </label>
                            <label>
                                <span className="App-form-label">Password</span>
                                <input type="password" name="login" />
                            </label>
                            <label className={`${this.state.dialogType === "register" ? "" : "App-display-none"}`}>
                                <span className="App-form-label">Confirm</span>
                                <input type="password" name="login" />
                            </label>
                        </form>
                        <div className="App-justify-end">
                            <button className="App-button App-small-margin">
                                {this.state.dialogType === "register" ? "Register" : "Log in"}
                            </button>
                            <button
                                className="App-button App-small-margin"
                                onClick={closeDialog}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }

    logIn() {
        this.setState({
            isDialogVisible: true,
            dialogType: 'login'
        });
    }

    register() {
        this.setState({
            isDialogVisible: true,
            dialogType: 'register'
        })
    }

}

export default App;
