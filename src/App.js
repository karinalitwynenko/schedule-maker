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
            email: "",
            password: "",
            loggedIn: false,
            username: "" // logged user login
        };

        this.scheduleRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logInResultCallback = this.logInResultCallback.bind(this);
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

        const authenticate = () => {
            Api.logIn(this.state.login, this.state.password, this.logInResultCallback);
        }

        const register = () => {
            Api.register(this.state.login, this.state.password, this.state.email, this.logInResultCallback);
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
                                <span className="App-form-label">Login</span>
                                <input
                                    autoComplete="on"
                                    type="text"
                                    name="login"
                                    value={this.state.login} onChange={(e) => this.handleInputChange(e, 'login')}/>
                            </label>
                            <label className={`${this.state.dialogType === "register" ? "" : "App-display-none"}`}>
                                <span className="App-form-label">E-mail</span>
                                <input
                                    autoComplete="on"
                                    type="email"
                                    name="email"
                                    value={this.state.email} onChange={(e) => this.handleInputChange(e, 'email')}/>
                            </label>
                            <label>
                                <span className="App-form-label">Password</span>
                                <input
                                    autoComplete="on"
                                    type="password"
                                    name="password"
                                    value={this.state.password} onChange={(e) => this.handleInputChange(e, 'password')}/>
                            </label>
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

    logInResultCallback(result) {
        if(result ==='success') {
            this.setState({
                username: this.state.login,
                loggedIn: true
            });

            this.setState({isDialogVisible: false});
            this.scheduleRef.current.fetchSchedule();
        }
        else {
            window.alert("Incorrect account data.");
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
