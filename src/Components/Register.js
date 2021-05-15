import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Register extends React.Component {

    state = {
        registerfname: '',
        registerUsername: '',
        registerEmail: '',
        registerPassword: '',
        registerPasswordRe: '',
        errorHandler: false,
        resultHandler: false,
        resultError: false
    }

    // API Fetch -- Method POST
    async postData(data) {

        try {
            const url = "https://lyricalplace-api.herokuapp.com/api/user/signup"
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
            if (result.status === 201) {
                this.setState({
                    resultHandler: true
                })
                // Redirect User
                // window.location.href = "http://192.168.1.114:3000/login";
            } 
            // Check for response, if it's not 200 (OK), output an error message
            if (result.status !== 201) {
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
        if (data.registerfname === '' || data.registerUsername === '' || data.registerEmail === '' || data.registerPassword === '' || data.registerPasswordRe === '') {
            this.setState({
                errorHandler: true
            })
            return;
        }

        // Check Password Validation
        if (data.registerPassword !== data.registerPasswordRe) {
            // Passwords Don't Match Error
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

        // Build API Send Data POST
        const fullDataAPI = {
            email: data.registerEmail,
            username: data.registerUsername,
            fullName: data.registerfname,
            password: data.registerPassword
        }

        // Call Fetch Function Passing In Data
        this.postData(fullDataAPI);

        // Test Outputs
        console.log(data, fullDataAPI)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value
        });
    }

    render () {
        return (
            <>
                {this.props.isAuth.isAuth === true ? <Redirect to="/"></Redirect> : ""}
                <div className="register-outer">
                    <div className="register-init">
                        <header>Register Form</header>
                        <h6>It's free!</h6>
                            {this.state.errorHandler === true ? <h4 className="text-danger text-center">Please fill all the fields!</h4> : ""}
                            {this.state.resultError === true ? <h4 className="text-danger text-center">Something went wrong while contacting server!</h4> : ""}
                            {this.state.resultHandler === true ? <h4  className="text-success text-center">Your account created succesfully!</h4> : ""}                    
                            <form  onSubmit={this.handleSubmit}>
                            <label htmlFor="registerfname">Full Name: *</label>
                            <input type="text" name="registerfname" id="registerfname" placeholder="Full Name" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="registerUsername">Username: *</label>
                            <input type="text" name="registerUsername" id="registerUsername" placeholder="Username" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="registerEmail">Email: *</label>
                            <input type="email" name="registerEmail" id="registerEmail" placeholder="Email" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="registerPassword">Password: *</label>
                            <input type="password" name="registerPassword" id="registerPassword" placeholder="Password" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="registerPasswordRe">Confirm Password: *</label>
                            <input type="password" name="registerPasswordRe" id="registerPasswordRe" placeholder="Confirm Password" className="form-control" onChange={this.handleOnChangeInput} />
                            <div className="text-right mt-4">
                                <small className="text-right mr-4">Already have an account? <Link to="/login">Sign in</Link></small>
                                <button type="submit">Register!</button>
                            </div>
                        </form>
                    </div>
                    <div className="register-info">
                        <header id="main-header-register">Register Info <i className="fa fa-info-circle"></i></header>
                        <div>
                            <header>Account and data policy</header>
                            <div>
                                <p>
                                    We do not share any information about you with anyone. Lyrical Place is an organizasion, and we support freedom. We keep these data stricktly for ourselfs. We offered and will continue to offer complitly free servises for everyone. Our register will always be free of charge. Lyrical Place, is 100% founded by donations!
                                </p>
                            </div>
                        </div>
                        <div>
                            <header>Benefits of having an account</header>
                            <div>
                                <p>
                                    We offer a variaty of benefits for members of Lyrical Place. Members will have access to the Contribute page, where they can write lyrics for any song they like. Also, they have access to their profile page, where thay can customize their account setting and see their liked song lyrics. Make a new account today! It's free and will always be!  
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}