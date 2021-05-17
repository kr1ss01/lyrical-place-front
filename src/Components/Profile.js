import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';

export default class Profile extends Component {

    state = {
        fetchedData: "",
        oldPassword: '',
        newPwd1: '',
        newPwd2: '',
        oldEmail: '',
        newEmail1: '',
        newEmail2: '',
        emailsDontMatch: false,
        fillFieldsEmail: false,
        newEmailsDontMatch: false,
        emailSuccess: null,
        pwdDontMatch: false,
        fillFieldsPwd: false,
        newPwdDontMatch: false,
        pwdSuccess: null,
        url: "",
        loading: false
    }

    async componentDidMount() {
        try {

            const url = "https://lyricalplace-api.herokuapp.com/api/lyrics/getUser"
            let result = await fetch(url , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ username: this.props.authInfo.username })
            });

            if (result.status === 200) {
                result.json().then(responseData => {
                    this.setState({
                        fetchedData: responseData.posts,
                        loading: true
                    })
                })   
            }

        } catch (e) {
            console.log(e);
        }
    }

    async handleLyricDelete(delId, title) {
        if (window.confirm("Are you sure you want to delete the song with title " + title + "?")) {
            const url = `https://lyricalplace-api.herokuapp.com/api/lyrics/${delId}`;
            let result = await fetch(url, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                }
            })

            if (result.status === 200) {
                console.log("Lyric Post Deleted!")
            }
            else {
                console.log("Something went wrong!")
            }
        }
    }

    handleAuth = () => {
        // Get current URL
        var currentUrl = window.location.href;

        // Split current URL on "/" 
        var currentUrlArray = currentUrl.split("/");

        // Get last item from array, witch is the username
        var usernameCheck = currentUrlArray[currentUrlArray.length - 1]

        // If it's not the same for the logged in user, redirect him to the main page (Access Dined)
        if (this.props.authInfo.username !== usernameCheck) {
            return (
                <Redirect to="/" />
            )
        }
    }

    handleLyricPosts = () => {
        let objFetched = Object.entries(this.state.fetchedData);
        return objFetched.map(post => {
            return (
                <div className={`lyricPostIdiv ${post[1]._id}`} key={post[1]._id}>
                    <h3>Title: {post[1].songTitle}</h3>
                    <hr />
                    <p>
                        <span>Singer: {post[1].songSinger}</span>
                        <br />
                        <span>Song URL: {post[1].songUrlYt}</span>
                        <br />
                        <span>Album: {post[1].songAlbum}</span>
                        <br />
                        <span>Language: {post[1].songLang}</span>
                        <br />
                        <span>Lyrics: {post[1].songLyrics}</span>
                    </p>
                    <hr />
                    <div>
                        <div>
                            <span>{post[1].userAuthor}</span>
                        </div>
                        <div>
                            <a className="btn btn-secondary" href={`/profile/${this.props.authInfo.username}/${post[1]._id}`} >Edit</a>
                            <button className="btn btn-danger" onClick={() => {this.handleLyricDelete(post[1]._id, post[1].songTitle)}}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        });
    }

    handleSubmitChangeEmail = (event) => {
        event.preventDefault();

        // Reset State Error Handlers For Email
        this.setState({
            emailsDontMatch: false,
            fillFieldsEmail: false,
            newEmailsDontMatch: false,
            emailSuccess: null
        })

        if (this.state.newEmail1 === "" || this.state.newEmail2 === "" || this.state.oldEmail === "") {
            this.setState({
                fillFieldsEmail: true
            })
            return;
        }

        if (this.state.newEmail1 !== this.state.newEmail2) {
            this.setState({
                newEmailsDontMatch: true
            })
            return;
        }

        if (this.state.oldEmail !== this.props.authInfo.email) {
            this.setState({
                emailsDontMatch: true
            })
            return;
        }

        const data = {
            email: this.state.newEmail1
        }

        const url = `https://lyricalplace-api.herokuapp.com/api/user/updateInfo/${this.props.authInfo.userId}`;

        this.sendEmailChange(data, url);
    }

    async sendEmailChange(data, url) {
        // PUT Request Options
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, requestOptions);

        if (response.status === 500) {
            this.setState({
                emailSuccess: false
            })
            return;
        }
        if (response.status === 200) {
            this.setState({
                emailSuccess: true
            })
            return;
        }
        this.setState({
            emailSuccess: false
        })
    }

    handleSubmitChangePwd = (event) => {
        event.preventDefault();

        // Reset Values
        this.setState({
            pwdDontMatch: false,
            fillFieldsPwd: false,
            newPwdDontMatch: false,
            pwdSuccess: null
        })

        if (this.state.newPwd1 === "" || this.state.newPwd2 === "" || this.state.oldPassword === "") {
            this.setState({
                fillFieldsPwd: true
            })
            return;
        }

        if (this.state.newPwd1 !== this.state.newPwd2) {
            this.setState({
                newPwdDontMatch: true
            })
            return
        }

        const data = {
            newPwd: this.state.newPwd1,
            oldPwd: this.state.oldPassword
        }

        const url = `https://lyricalplace-api.herokuapp.com/api/user/updateInfo/${this.props.authInfo.userId}`;

        this.sendPwdChange(data, url);
    }

    async sendPwdChange(data, url) {
        // PUT Request Options
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, requestOptions);

        if (response.status === 500) {
            this.setState({
                pwdDontMatch: true
            })
            return;
        }
        if (response.status === 200) {
            this.setState({
                pwdSuccess: true
            })
            return;
        }
        this.setState({
            pwdDontMatch: true
        })
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value
        });
    }

    render() {
        return (
            <>
                {this.props.authInfo.isAuth === true ? "" : <Redirect to="/" />}
                {this.handleAuth()}
                <div className="profilePage">
                    <div className="profileMainCont">
                        <div className="yourProfile">
                            <h3>Welcome {this.props.authInfo.username}</h3>
                            <p>
                                This is your profile page. Here you can see and change almost anything! Below you can change your password and email, also you can see your lyric posts and edit them. And don't forget, here you are going to find every lyric post you liked, and your favouarites posts! 
                            </p>
                        </div>
                        <div className="profileChangePwd">
                            <h4>Password Change</h4>
                            <form onSubmit={this.handleSubmitChangePwd} >
                                {this.state.fillFieldsPwd === true ? <h6 className="text-center text-danger">Please Fill All The Fields!</h6> : "" }
                                {this.state.newPwdDontMatch === true ? <h6 className="text-center text-danger">Passwords Don't Match!</h6> : "" }
                                {this.state.pwdDontMatch === true ? <h6 className="text-center text-danger">Unexpected error, password could not be changed!</h6> : "" }
                                {this.state.pwdSuccess === true ? <h6 className="text-center text-success">Password Changed Succesfully!</h6> : ""}
                                <input type="password" name="oldPassword" id="oldPassword" placeholder="Your old password..." className="form-control" />
                                <input type="password" name="newPwd1" id="newPwd1" placeholder="Your new password..." className="form-control" />
                                <input type="password" name="newPwd2" id="newPwd2" placeholder="Your new password again..." className="form-control" />
                                <div>
                                    <button type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                        <div className="profileChangeEmail">
                            <h4>Email Change</h4>
                            {this.state.fillFieldsEmail === false ? "" : <h6 className="text-center text-danger">Please Fill All The Fields!</h6>}
                            {this.state.emailsDontMatch === false ? "" : <h6 className="text0-enter text-danger">Email Don't Match</h6> }
                            {this.state.newEmailsDontMatch === false ? "" : <h6 className="text-center text-danger">New Emails Don't Match</h6> }
                            {this.state.emailSuccess === true ? <h6 className="text-center text-success">Email Changed Successfully!</h6> : this.state.emailSuccess === false ? <h6 className="text-center text-danger">Unexpected error, email could not be changed!</h6> : "" }
                            <form onSubmit={this.handleSubmitChangeEmail} >
                                <input type="email" name="oldEmail" id="oldEmail" placeholder="Your old email..." className="form-control" onChange={this.handleOnChangeInput}  />
                                <input type="email" name="newEmail1" id="newEmail1" placeholder="Your new email..." className="form-control" onChange={this.handleOnChangeInput} />
                                <input type="email" name="newEmail2" id="newEmail2" placeholder="Your new email again..." className="form-control" onChange={this.handleOnChangeInput} />
                                <div>
                                    <button type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                        <div className="checkFav">
                            <Link to={{ pathname: `/profile/${this.props.authInfo.username}/faviouarites`, state: { props: this.props.authInfo, name: this.props.authInfo.username }}}>Navigate to your favourites</Link>
                        </div>
                    </div>
                    <div className="lyricPosts" style={{maxHeight: 700, overflowY: "scroll"}}>
                        <h3 className="text-center mb-3">Your Total Posts: {this.state.fetchedData.length}</h3>
                        { this.state.loading ? this.handleLyricPosts() : 
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <ReactBootStrap.Spinner animation="border" variant="dark" className="m-2" />
                        </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}
