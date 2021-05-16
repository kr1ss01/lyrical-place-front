import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Login extends Component {

    state = {
        loginUsername: '',
        loginPassword: '',
        errorHandler: false,
        resultHandler: false,
        resultError: false,
        noAuth: false,
    }

    // API Fetch -- Method POST
    async postData(data) {

        try {
            const url = "https://lyricalplace-api.herokuapp.com/api/user/login"
            let result = await fetch(url , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // console.log(result.status, "Reasult")

            // Check for response, if it's 200 (OK), output a success message
            if (result.status === 200) {
                this.setState({
                    errorHandler: false,
                    resultHandler: true,
                    resultError: false
                })
                result.json().then(responseData => {
                    const token = responseData.token;
                    const message = responseData.message;
                    const username = responseData.uid;
                    const userId = responseData.userId;
                    const email = responseData.email;

                    const storage = {
                        token: token,
                        message: message,
                        username: username,
                        userId: userId,
                        email: email,
                        isAuth: true
                    }

                    localStorage.setItem('authData', JSON.stringify(storage));
                    this.props.authInfo();
                })

                

                // Redirect User
                // window.location.href = "http://192.168.1.114:3000/";
            } 
            // Check For Invalid Data (not auth)
            if (result.status === 401) {
                this.setState({
                    noAuth: true
                })
            }
            // Check for response, if it's not 200 (OK), output an error message
            if (result.status !== 200 && result.status !== 401) {
                this.setState({
                    resultError: true
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Get data from state
        const data = this.state;

        // Check For Empty Fields
        if (data.loginUsername === '' || data.loginPassword === '') {
            this.setState({
                errorHandler: true
            })
            return;
        }

        // Set errorHandler to false in case user made a false request before
        this.setState({
            errorHandler: false
        })

        // Reset Request error/success variables
        this.setState({
            resultError: false,
            resultHandler: false
        })

        // Build Object For API POST
        const fullDataAPI = {
            username: data.loginUsername,
            password: data.loginPassword
        }

        // Call Fetch Function Passing In Data
        this.postData(fullDataAPI);
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value
        });
    }

    render() {
        return (
            <div className="login-outer">
                <div className="login-form">
                    <header>Login Form</header>
                    <h6>Welcome back!</h6>
                    {this.state.errorHandler === true ? <h4 className="text-danger text-center">Please fill all the fields!</h4> : ""}
                    {this.state.resultError === true ? <h4 className="text-danger text-center">Something went wrong while contacting server!</h4> : ""}
                    {this.state.resultHandler === true ? <h4  className="text-success text-center">Signed in succesfully!</h4> : ""}  
                    {this.state.noAuth === true ? <h4 className="text-danger text-center">Invalid Username / Password</h4> : ""}
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="loginUsername">Username: </label>
                        <input type="text" name="loginUsername" id="loginUsername" placeholder="Username..."  className="form-control" onChange={this.handleOnChangeInput} />
                        <label htmlFor="loginPassword">Password: </label>
                        <input type="password" name="loginPassword" id="loginPassword" placeholder="Password..."  className="form-control" onChange={this.handleOnChangeInput} />
                        <div className="login-form-buttons text-right">
                            <small>Don't have an account? <Link to="/register">Register!</Link></small>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className="login-info">
                    <div>
                        <header>Welcome back to Lyrical Place</header>
                        <div>
                            <p>
                                As a member you can enjoy multiple rewards, post lyrics and vote for other user's lyric posts! Happy writing!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
