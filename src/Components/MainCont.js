import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';

export default class MainCont extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            data: '',
            querryData: '',
            titles: '',
            authors: '',
            artists: '',
            searchSongs: '',
            redirect: false,
            redirectInfo: null,
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    // API Call {: GETTER :}
    async componentDidMount() {
        const url = "https://lyricalplace-api.herokuapp.com/api/topTrendingSong";

        const response = await fetch(url);

        const data = await response.json();

        var titleArray = [];
        var artistArray = [];
        var authorArray = [];
        for (let i = 0; i < data.length; i++) {
            titleArray.push(data[i].songTitle);
            artistArray.push(data[i].songSinger);
            authorArray.push(data[i].userAuthor);
        }

        this.setState({
            data: data,
            titles: titleArray,
            artists: artistArray,
            authors: authorArray,
            loading: true
        })
    }

    handleSearch = () => {
        let fetchedData = Object.entries(this.state.data);
        let searchTerm = this.state.searchSongs;

        return fetchedData.filter((val) => 
            searchTerm === '' ? "" : val[1].songTitle.toLowerCase().includes(searchTerm.toLowerCase()) || val[1].songSinger.toLowerCase().includes(searchTerm.toLowerCase()) || val[1].songLang.toLowerCase().includes(searchTerm.toLowerCase()) ||  val[1].userAuthor.toLowerCase().includes(searchTerm.toLowerCase()) || val[1].songAlbum.toLowerCase().includes(searchTerm.toLowerCase())  ? val : ''
        ).map((val, key) => {
            if (key > 9) {
                return null
            }
            return (
                <a className="a-search" key={key} href={`/lyrics/${val[1]._id}`}>
                    {val[1].songTitle} - {val[1].songSinger}  by {val[1].userAuthor} ({val[1].songLang}) ({val[1].songAlbum})
                </a>
            )
        })
    }  
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        let fetchedData = Object.entries(this.state.data);
        let searchTerm = this.state.searchSongs;

        const array =  fetchedData.filter((val) => 
            searchTerm === '' ? "" : val[1].songTitle.toLowerCase().includes(searchTerm.toLowerCase()) || val[1].songSinger.toLowerCase().includes(searchTerm.toLowerCase()) || val[1].songLang.toLowerCase().includes(searchTerm.toLowerCase()) ||  val[1].userAuthor.toLowerCase().includes(searchTerm.toLowerCase()) || val[1].songAlbum.toLowerCase().includes(searchTerm.toLowerCase())  ? val : ''
        ).map((val, key) => {
            if (key > 9) {
                return null
            }
            return (
                [`/lyrics/${val[1]._id}`, val[1].songTitle]
            )
        })

        this.setState({
            redirect: true,
            redirectInfo: array[0][0]
        })
    }

    handleInputChange = (event) => {
        this.setState({
            searchSongs: event.target.value
        })
        this.handleSearch();
    }

    render () {
        const { data } = this.state
        return (
            <>
                {this.state.redirect === true ? <Redirect to={this.state.redirectInfo} /> : ''}
                <div className="top-side">
                    <h3>Welcome to Lyrical Place</h3>
                    <h5>The best place for songs lyrics!</h5>
                    <hr/>
                </div>
                <div className="content">
                    <div className="p-container"> 
                        <header style={{fontSize: 24}}>Our Goals!</header>
                        <p>
                            As an organizasion, we want to achieve the best quality Lyric Page on the internet. We continiously add new and new songs to reach this goal. Now, you can support us too by writing the lyrics of your faviourite song for yourself! This way, you help us cover more and more songs and you help the commuinty and anyone searching lyrics for any song they enjoy! Be a part of us <Link to="/register">today</Link>!
                        </p>
                    </div>
                    <div className="p-container">
                        <header style={{fontSize: 24}}>Lyrical Place!</header>
                        <p>
                            You can search any song you want on our site, from all over the world. If it does not exit yet, you can add it! Uploading a song is very easy, and user friendly. Just go to our <Link to="/contrib">contribute</Link> page ( you must be logged in ) and fill in the form while checking the preview model. Then press "Submit". Easy as that!
                        </p>
                    </div>
                </div>
                { this.state.loading ?   
                    <>
                    <div className="form-search">
                        <header className="text-center">You can search any song you like here!</header>
                        <small className="text-center text-dark pl-3 pr-3">You can search by any criteria, and the top ten suggestions will appear. Click one and you will be redirected to the lyric page of this song!</small>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="search-bar-dropdown">
                                <input type="text" className="form-control" name="searchSongs" id="searchSongs" required placeholder="Search your song here..." onChange={this.handleInputChange} autoComplete="off" />
                                <button type="submit">Search!</button>
                            </div>
                            {data[0] !== undefined ? this.handleSearch() : ""}
                        </form>
                    </div>
                    <div className="topTrending">
                        <header>{this.props.video.title}</header>
                        <small className="text-center text-dark pl-3 pr-3 mb-3">By {this.props.video.author}</small>
                        <iframe src={this.props.video.src} title={this.props.video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen id="iframeTrending"></iframe>
                        <div>
                            <h6><Link to="/lyrics/topTrendingSong">Check Lyrics</Link></h6>
                        </div>
                    </div>
                    </>
                :   <div className="d-flex justify-content-center align-items-center m-5 flex-column" style={{cursor: "default"}}>
                        <div>
                            <ReactBootStrap.Spinner animation="grow" variant="dark" className="m-2" />
                            <ReactBootStrap.Spinner animation="grow" variant="dark" className="m-2"  />
                            <ReactBootStrap.Spinner animation="grow" variant="dark" className="m-2"  />
                        </div>
                        <div>
                            <h3 className="mt-1 bg-dark rounded text-light" style={{padding: "5px 20px"}}>Loading...</h3>
                        </div>
                    </div>
                }
            </>
        );
    }
}

// params={this.props.video.lyrics}