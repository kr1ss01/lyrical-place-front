import React, { Component } from 'react';
import { Redirect } from 'react-router';
import * as ReactBootStrap from 'react-bootstrap';

export default class Favouarites extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: '',
            loading: false
        }
    }

    async componentDidMount() {
        // Make API call to retrive faviouarite posts
        if (this.props.location.state !== undefined) {
            const url = `https://lyricalplace-api.herokuapp.com/api/getFav/${this.props.location.state.name}`;

            const response = await fetch(url);
    
            const data = await response.json();
    
            // Check For Un-Authorizes User
            if (data.message === "No favouarite songs found :(") {
                return;
            }
    
            const slicedData = data.fav.slice(-10).reverse();
    
            // Set status 
            this.setState({
                data: slicedData,
                loading: true
            })
        }
        
    }

    handleAuth = () => {
        // Handle AUTH Logic
        var recieved = this.props.location.state;

        // If user is not sent via link in <Profile /> , redirect him!
        if (recieved === undefined) {
            return (
                <Redirect to="/" />
            )
        }
    }

    spreadData = () => {
        let objData = Object.entries(this.state.data)

        if (objData.length === 0) {
            return (
                <>
                    <h5>Sorry, seems like you have no favouarite songs :(</h5>
                    <a href="/lyrics/Titles" className="btn btn-dark">
                        Let's add one now!
                    </a>
                </>
            )
        } else {
            return objData.map(item => {

                // Return Data
                return (
                    <a key={item[1]._id + "link"} href={`/lyrics/${item[1]._id}`} className="success-a-fav">
                        <span key={item[1]._id + "first_span"} >{item[1].songTitle} - {item[1].songSinger} ({item[1].songLang}) ({item[1].songAlbum})</span>
                        <br />
                        <span key={item[1]._id + "second_span"}>Lyrics by: {item[1].userAuthor}</span>
                    </a> 
                )
            })
        }
    }

    render() {
        return (
            <>
                <div className="fav-outer-div">
                    <div className="fav-info">
                        <h3><i className="fa fa-heart text-danger" aria-hidden="true"></i> Your Favouarite Page <i className="fa fa-heart text-danger" aria-hidden="true"></i></h3>
                        <hr />
                        <p>
                            Here, you can see all the songs you liked! You can navigate to each song individualy and revisit it easily! 
                        </p>
                    </div>
                    <div className="fav-main">
                        <div className="fav-main-cont mt-4">
                            <div className="fav-h4-a">
                                <h4>Total songs you like: {this.state.data.length} </h4>
                                <a href="/lyrics/Titles" id="explore-link">Explore new songs now!</a>
                            </div>
                            { this.state.loading ? this.spreadData() : 
                            <div className="d-flex justify-content-center align-items-center mt-3 w-100">
                                <ReactBootStrap.Spinner animation="border" variant="dark" className="m-2" />
                            </div>
                            }
                            {this.handleAuth()}
                        </div>
                        <div className="fav-main-info mt-4">
                            <div className="fav-info-side">
                                <header>How "Favourites" Side-nav works? <i className="fa fa-info-circle" aria-hidden="true"></i></header>
                                <hr />
                                <p>
                                    We designed this simple sidenav, keeping in mind your ease-of-use. Practicaly, the sidenav displays the 10 most-recent songs you added to your faviouarite list. If there are less than 10 or exactly 10, it displays them all. <br />
                                    Sidenav, works this way, for a couple of reasons. First, we wanted to maintain the look, feel and factionality of the "Latest Updates" sidenav, witch you see, if you are not logged-in. So, as the "Latest Updates" sidenav displays the 10 most-recent updates this one does the same but for your favouarites! Secondly, we wanted it to make it simple to use and help you access the songs you might be searching the most!
                                </p>
                            </div>
                            <div className="fav-info-side">
                                <header>Can I see how many people liked my posts?</header>
                                <p>
                                    Currenlty, we don't support this option. But of course we will implement it in the future. For now, you can only see your likes and not how many or who has liked your post. <br />
                                    Also, in the future we might make the favouarites public, so that any user can see how many "favouarites" a song has and judge which one probably is the best quick and easy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
