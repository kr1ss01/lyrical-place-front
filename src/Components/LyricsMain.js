import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

export default class LyricsMain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            record: '',
            error: false,
            success: false,
            loading: false
        }
    }

    

    async componentDidMount() {
        
        try {
            const pathname = window.location.pathname;
            const lyricId = pathname.split("/");

            const url = "https://lyricalplace-api.herokuapp.com/api/lyrics/getItem"
            let result = await fetch(url , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({songId: lyricId[2]})
            });

            if (result.status === 200) {
                result.json().then(item => {
                    this.setState({
                        record: item.record[0],
                        loading: true
                    })
                })
            } else {
                console.log("ERROR 500")
            }
            
            
        } catch (e) {
            console.log(e)
        }
    }

    async handleReset() {
        
        try {
            const pathname = window.location.pathname;
            const lyricId = pathname.split("/");

            const url = "https://lyricalplace-api.herokuapp.com/api/lyrics/getItem"
            let result = await fetch(url , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({songId: lyricId[2]})
            });

            if (result.status === 200) {
                result.json().then(item => {
                    this.setState({
                        record: item.record[0]
                    })
                })
            } else {
                console.log("ERROR 500")
            }
            
            
        } catch (e) {
            console.log(e)
        }
    }

    async handleFavAPI() {
        const url = `https://lyricalplace-api.herokuapp.com/api/updateFav/${this.props.authInfo.username}`;

        const data = {
            id: this.state.record._id
        }

        // PUT Request Options
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(data)
        };

        const result = await fetch(url, requestOptions);

        // Reset States
        this.setState({
            error: false,
            success: false
        })

        if (result.status === 500 || result.status === 404) {
            this.setState({
                error: true
            })
        } else if (result.status === 200) {
            result.json().then(responseData => {
                this.setState({
                    success: responseData.message
                })
            })
            
        }

        this.handleReset();
    }

    handleFav = () => {
        // Check For Props
        if (this.props.authInfo.username !== undefined && this.props.authInfo.username !== '') {

            if (this.props.authInfo.username === this.state.record.userAuthor) {
                // Can't add to fav the song you written
                return null;
            } else {
                const likeArray = this.state.record.liked
                
                // Check Liked Songs Are Present
                if (likeArray !== undefined) {

                    if (likeArray.length === 0) {
                        return <button className="btn btn-danger ml-3" onClick={() => this.handleFavAPI(this.props.authInfo.username)}>Add  <i className="fa fa-heart" aria-hidden="true"></i></button>
                    } else {

                        var flag = false;
                        for (let i = 0; i < likeArray.length; i++) {
                            if (likeArray[i] === this.props.authInfo.username) {
                                // remove
                                flag = true;
                            }
                        }

                        if (flag === true) {
                            return <button className="btn btn-outline-danger ml-3" onClick={() => this.handleFavAPI(this.props.authInfo.username)}>Remove  <i className="fa fa-heart" aria-hidden="true"></i></button> 
                        } else {
                            return <button className="btn btn-danger ml-3" onClick={() => this.handleFavAPI(this.props.authInfo.username)}>Add  <i className="fa fa-heart" aria-hidden="true"></i></button> 
                        }

                    }

                }

            }
        } else {
            return null;
        }
    }

                
    render() {
        return (
            <>
                {this.state.loading ? 
                <>  
                    <div style={{cursor: "default"}} className="d-flex flex-column justify-content-center align-items-center" id="lyricsPages">
                        {this.state.error === true ? <h4 className="text-center text-danger">Something Went Wrong Contacting The Server...</h4> : ''}
                        {this.state.success !== false ? <h4 className="text-center text-success">{this.state.success}</h4> : ''}
                            <h3 className="text-center mt-5 mb-3">{this.state.record.userAuthor} - {this.state.record.songTitle} Lyrics 
                                {this.handleFav()}
                            </h3>
                            <button className="btn btn-outline-dark btn-sm" onClick={() => {let btn =  document.getElementById("sidenav-info-lyrics"); btn.style.display === "none" ? btn.style.display = "block" : btn.style.display = "none"}} id="btn-show-info">Show Info <i className="fa fa-eye" aria-hidden="true"></i></button>
                            <iframe src={this.state.record.songUrlEmbed} title={this.state.record.songTitle} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen id="iframeTrending" className="mb-4 mt-3"></iframe>
                            <div className="info-lyrics-small">
                                <h3>Song Info</h3>
                                <hr />
                                <h5>Singer(s): {this.state.record.songSinger}</h5>
                                <h5>Language: {this.state.record.songLang}</h5>
                                <h5>Album: {this.state.record.songAlbum}</h5>
                                <h5>Lyrics by: {this.state.record.userAuthor}</h5>
                            </div>
                            <div className="bg-dark text-light">
                                {this.state.record.songLyrics} 
                            </div>
                    </div>
                    <div className="sidenav-info-lyrics" id="sidenav-info-lyrics">
                        <h3>Song Info</h3>
                        <hr />
                        <h5>Singer(s): {this.state.record.songSinger}</h5>
                        <h5>Language: {this.state.record.songLang}</h5>
                        <h5>Album: {this.state.record.songAlbum}</h5>
                        <h5>Lyrics by: {this.state.record.userAuthor}</h5>
                    </div>
                </>
                : 
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <ReactBootStrap.Spinner animation="border" variant="dark" className="m-2" />
                </div>
                }
            </>
        )
    }
}