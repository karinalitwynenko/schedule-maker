import './App.css';
import Schedule from './schedule/Schedule'
import React from 'react';
import Api from './Api'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false,
            login: "",
            password: "",
            loggedIn: false,
            username: "", // logged user login
            error: "" // displayed form validation error
        };

        this.scheduleRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.authResultCallback = this.authResultCallback.bind(this);
        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        if(localStorage.getItem('username') && Api.getToken()) {
            this.setState({
                username: localStorage.getItem('username'),
                loggedIn: true,
            }, () => this.scheduleRef.current.fetchSchedule());
        }

    }

    render() {
        const closeDialog = () => {
            this.setState({isDialogVisible: false})
        };

        const displayDialog = (type) => {
            this.setState({
                isDialogVisible: true,
                dialogType: type
            });
        }

        const validate = () => {
             if(!/^[0-9a-zA-Z_-]{3,30}$/.test(this.state.login)) {
                this.setState({error: "Incorrect login format"})
                return false;
             }
            else if(!/^[a-zA-Z0-9@#$%^&+=]{3,30}$/.test(this.state.password)) {
                this.setState({error: "Incorrect password format"})
                return false;
            }

            this.setState({error: ""})
            return true;
        }

        const authenticate = () => {
            if(validate())
                Api.logIn(this.state.login, this.state.password, this.authResultCallback);
        }

        const register = () => {
            if(validate())
                Api.register(this.state.login, this.state.password, this.authResultCallback);
        }

        return (
            <div className="App">
                <header className="App-header App-color-main">
                    <div className="App-name App-center">
                        <img className="App-logo" src={process.env.PUBLIC_URL + "/clips.png"} alt="Three paper clips" />
                        Schedule Maker
                    </div>
                    <div>
                        <span
                            className={`${this.state.loggedIn ? "App-display-none" : ""}`}
                            onClick={() => displayDialog('login')}>
                                Log in
                        </span>
                        <span
                            className={`${this.state.loggedIn ? "App-display-none" : ""}`}
                            onClick={() => displayDialog('register')}>
                                Register
                        </span>
                        <span
                            className={`${this.state.loggedIn ? "" : "App-display-none"}`}
                            onClick={this.logOut}>
                                {`Log out (${this.state.username})`}
                        </span>
                    </div>
                </header>
                <Schedule
                    ref={this.scheduleRef}
                    username={this.state.username}
                />
                <div className={`App-dialog-container App-center ${this.state.isDialogVisible ? "" : "App-display-none"}`}>
                    <div className="App-form-container">
                        <form>
                            <label>
                                <span className="App-form-label App-center">Login</span>
                                <input
                                    autoComplete="on"
                                    type="text"
                                    name="login"
                                    value={this.state.login} onChange={(e) => this.handleInputChange(e, 'login')}/>
                            </label>
                            <label>
                                <span className="App-form-label App-center">Password</span>
                                <input
                                    autoComplete="on"
                                    type="password"
                                    name="password"
                                    value={this.state.password} onChange={(e) => this.handleInputChange(e, 'password')}/>
                            </label>
                            <div className={`App-error ${this.state.error.length === 0 ? 'App-hidden' : ''}`}>
                                {this.state.error}
                            </div>
                        </form>
                        <div className="App-justify-end">
                            <button
                                onClick={this.state.dialogType === "register" ? register : authenticate}
                                className="App-button App-small-margin">
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

    handleInputChange(e, name) {
        switch(name) {
            case 'login':
                this.setState({login: e.target.value})
                break;
            case 'email':
                this.setState({email: e.target.value})
                break;
            case 'password':
                this.setState({password: e.target.value})
                break;
            default:
        }
    }

    authResultCallback(result) {
        if(result === 'success') {
            this.setState({
                username: this.state.login,
                loggedIn: true,
                isDialogVisible: false
            }, () => this.scheduleRef.current.fetchSchedule());
        }
        else if(this.state.dialogType === 'register') {
            window.alert("Could not create user account.");
        }
        else {
            window.alert("Incorrect login or password.");
        }
    }

    logOut() {
        Api.removeToken();
        sessionStorage.setItem('username', '');
        this.scheduleRef.current.clearScheduleData();

        this.setState({
            loggedIn: false,
            username: ''
        })
    }
}

export default App;
