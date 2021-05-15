import React from 'react';
import Navbar from './Components/Navbar.js';
import MainCont from './Components/MainCont.js';
import Sidenav from './Components/Sidenav.js';
import Footer from './Components/Footer.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contribute from './Components/Contrib.js';
import Register from './Components/Register.js';
import TopTrendingTemplate from './Components/TopTrendingTemplate.js';
import Login from './Components/Login.js';
import LyricsMain from './Components/LyricsMain.js';
import Profile from './Components/Profile.js';
import EditLyrics from './Components/EditLyrics.js';
import FindByArtist from './Components/findByArtist.js';
import FindByTitle from './Components/findByTitle.js';
import FindByAuthor from './Components/findByAuthor.js';
import FindByAlbum from './Components/findByAlbum.js';
import FindByLanguage from './Components/findByLang.js';
import SidenavAuth from './Components/SidenavAuth.js';
import Favouarites from './Components/Favouarites.js';

export default class App extends React.Component {
  // Main Constructor
  constructor(props) {
    super(props);
    
    // Constructor Binds
    this.handleSidenav = this.handleSidenav.bind(this);
    this.giveAuthInfo = this.giveAuthInfo.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  // Main State
  state = {
    sidenavFlag: true,
    topTrendingSong: {
      src: "",
      title: "",
      author: "",
      siteViews: null,
      lyricsURL: "",
      songId: null,
      lyrics: null
    },
    authConn: {
      token: '',
      message: '',
      username: '',
      userId: '',
      email: '',
      isAuth: false
    }
  }

  // API Call {: GETTER :}
  async componentDidMount() {
    const url = "https://lyricalplace-api.herokuapp.com/api/topTrendingSong";

    const response = await fetch(url);

    const data = await response.json();

    const dataLength = data.length;

    this.setState({
      topTrendingSong: {
        src: data[dataLength - 1].songUrlEmbed,
        title: data[dataLength - 1].songTitle,
        author: data[dataLength - 1].songSinger,
        songId: data[dataLength - 1]._id,
        lyrics: data[dataLength - 1].songLyrics
      }
    })

    this.giveAuthInfo();
  }

  // Pass-down Functions
  handleSidenav = () => {
    const flag = this.state.sidenavFlag;
    const sidenav = document.getElementById("sidenav");

    if (flag) {
      sidenav.style.display = "none";
    } else {
      sidenav.style.display = "block";
    }

    this.setState({
      sidenavFlag: !flag
    })
  }

  giveAuthInfo = () => {
    let AUTH = JSON.parse(localStorage.getItem('authData'));

    if (AUTH !== null) {
      this.setState({
        authConn: {
          token: AUTH.token,
          message: AUTH.message,
          username: AUTH.username,
          userId: AUTH.userId,
          email: AUTH.email,
          isAuth: AUTH.isAuth
        }
      })

    } else {
      return;
    }
    
    
  }

  handleLogOut = () => {
    this.setState({
      authConn: {
        token: '',
        message: '',
        username: '',
        userId: '',
        email: '',
        isAuth: false
      }
    })
  }


  render () {
    return (
      <Router>
        <Navbar onOpen={this.handleSidenav} isAuth={this.state.authConn} logOut={this.handleLogOut} />
        <Switch>
        <Route path="/" exact render={ (state) => (<MainCont video={this.state.topTrendingSong} />) } />
        <Route path="/contrib"  render={ (state) => (<Contribute isAuth={this.state.authConn} />) } />
        <Route path="/register" render={ (state) => (<Register isAuth={this.state.authConn} />) } />
        <Route path="/login" render={ (state) => (<Login authInfo={this.giveAuthInfo} />) } />
        <Route path="/lyrics/topTrendingSong" exact render={ (state) => (<TopTrendingTemplate video={this.state.topTrendingSong} />) } />
        <Route path="/lyrics/Artists" exact component={FindByArtist} />
        <Route path="/lyrics/Titles" exact component={FindByTitle} />
        <Route path="/lyrics/Authors" exact component={FindByAuthor} />
        <Route path="/lyrics/Album" exact component={FindByAlbum} />
        <Route path="/lyrics/Language" exact component={FindByLanguage} />
        <Route path="/lyrics/:id" render={ (state) => (<LyricsMain authInfo={this.state.authConn} />) } />
        <Route path="/profile/:name" exact render={ (state) => (<Profile authInfo={this.state.authConn} />) } />
        <Route path="/profile/:name/faviouarites" exact component={Favouarites} />
        <Route path="/profile/:username/:postId" exact render={ (state) => (<EditLyrics authInfo={this.state.authConn} />) } />
        </Switch>
        {this.state.authConn.username !== '' ? <SidenavAuth onClose={this.handleSidenav} isAuth={this.state.authConn} /> : <Sidenav onClose={this.handleSidenav} isAuth={this.state.authConn} />}
        {/* <Sidenav onClose={this.handleSidenav} isAuth={this.state.authConn} /> */}
        <Footer />
      </Router>
    );
  }
}

