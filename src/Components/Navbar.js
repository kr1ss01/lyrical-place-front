import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    state = {
        url: "#"
    }

    handleClearLocalStorage = () => {
        window.localStorage.removeItem('authData');
        this.props.logOut();
    }

    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <Link className="navbar-brand" id="navbarTitle"  to="/">Lyrical Place</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href={this.state.url}>Home</a>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" id="navBtn" onClick={this.props.onOpen}>{this.props.isAuth.isAuth === true  ? "Favouarites" : "Latest Uploads" }</button>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href={this.state.url} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Find Lyrics
                    </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/lyrics/Artists">Artist</Link>
                                <Link className="dropdown-item" to="/lyrics/Album">Album</Link>
                                <Link className="dropdown-item" to="/lyrics/Authors">Author</Link>
                                <Link className="dropdown-item" to="/lyrics/Titles">Title</Link>
                                <Link className="dropdown-item" to="/lyrics/Language">Language</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contrib">Contribute</Link>
                        </li>
                        {this.props.isAuth.isAuth === true ? 
                        <li className="nav-item">
                            <Link className="nav-link" to={`/profile/${this.props.isAuth.username}`}>My Profile</Link>
                        </li>
                        : 
                        '' 
                        }
                        {this.props.isAuth.isAuth === true ? 
                        <li className="nav-item">
                            <Link className="nav-link" to={{ pathname: `/profile/${this.props.isAuth.username}/faviouarites`, state: { props: this.props.isAuth, name: this.props.isAuth.username }}}>My Favourites</Link>
                        </li>
                        : 
                        '' 
                        }
                    </ul> 
                        {this.props.isAuth.isAuth === true  ? 
                        <div className="form-row align-items-center">                            
                            <div className="col-auto my-1 btn-group align-items-center">
                                <small className="text-light">You are signed in as {this.props.isAuth.username}</small>
                                <button type="button" className="ml-1" id="navbarRegister" onClick={this.handleClearLocalStorage}>Logout</button>
                            </div>
                        </div> 
                        :                      
                        <div className="form-row align-items-center">                            
                            <div className="col-auto my-1 btn-group">
                                <Link type="submit" name="login-submit" id="navbarLogin" to="/login">Login</Link>
                                <Link type="button" className="ml-1" id="navbarRegister" to="/register">Register</Link>
                            </div>
                        </div>
                        }                 
                </div>
        </nav>
        );
    }
}