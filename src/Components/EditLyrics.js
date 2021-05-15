import React, { Component } from 'react';

export default class EditLyrics extends Component {

    state = {
        post: '',
        titleSong: '',
        authorSong: '',
        urlSong: '',
        songLyrics: '',
        albumSong: '',
        langSong: '',
        urlSongEmbed: '',
        emptyFields: undefined,
        apiResponse: undefined
    }

    async componentDidMount() {
        // Get current URL
        var currentUrl = window.location.href;

        // Split current URL on "/" 
        var currentUrlArray = currentUrl.split("/");

        // Get last item from array, witch is the username
        var postIdCheck = currentUrlArray[currentUrlArray.length - 1];

        // Start API Call
        const url = `https://lyricalplace-api.herokuapp.com/api/lyrics/post/${postIdCheck}`;

        const response = await fetch(url);

        const data = await response.json();
        
        this.setState({
            post: data.post,
            titleSong: data.post[0].songTitle,
            authorSong: data.post[0].songSinger,
            urlSong: data.post[0].songUrlYt,
            songLyrics: data.post[0].songLyrics,
            albumSong: data.post[0].songAlbum,
            langSong: data.post[0].songLang,
            urlSongEmbed: ''
        })

        this.convertUrltoUrlEmbed();

    }

    async handleUpdate(data, url) {
        try {

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

            if (result.status === 200) {
                this.setState({
                    apiResponse: true
                })
                return;
            } else {
                this.setState({
                    apiResponse: false
                })
                return;
            }


        } catch (e) {
            console.log(e)
        }
        


    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Reset State For EmptyFields Error and for API response
        this.setState({
            emptyFields: undefined,
            apiResponse: undefined
        })

        // Check For Empty Fields
        if (this.state.titleSong === "" || this.state.authorSong === "" || this.state.albumSong === "" || this.state.urlSong === "" || this.state.urlSongEmbed === "" || this.state.songLyrics === "" || this.state.langSong === "") {
            this.setState({
                emptyFields: "Please fill all the fields!"
            })
            return;
        }

        // Build API Object
        const updateLyrics = {
            songTitle: this.state.titleSong,
            songSinger: this.state.authorSong,
            songAlbum: this.state.albumSong,
            songUrlYt: this.state.urlSong,
            songUrlEmbed: this.state.urlSongEmbed,
            songLyrics: this.state.songLyrics,
            userAuthor: this.props.authInfo.username,
            songLang: this.state.langSong
        }

        const url = `https://lyricalplace-api.herokuapp.com/api/lyrics/update/${this.state.post[0]._id}`;

        this.handleUpdate(updateLyrics, url);

    }

    postHandler = () => {
        let objFetched = Object.entries(this.state.post);
            return (
                <div className="post" key={objFetched[0][1]._id}>
                    <h2>Song Info</h2>
                    <form onSubmit={this.handleSubmit} >
                        <label htmlFor="titleSong">Song Title: *</label>
                        <input type="text" name="titleSong" id="titleSong" className="form-control" value={this.state.titleSong} onChange={this.handleOnChangeInput} />
                        <label htmlFor="authorSong">Song Singer(s): *</label>                                              
                        <input type="text" name="authorSong" id="authorSong" className="form-control" value={this.state.authorSong} onChange={this.handleOnChangeInput} />
                        <label htmlFor="langSong">Song Language: *</label>
                        <input type="text" name="langSong" id="langSong" className="form-control" value={this.state.langSong} onChange={this.handleOnChangeInput} />
                        <label htmlFor="albumSong">Song Album: *</label>
                        <input type="text" name="albumSong" id="albumSong" className="form-control" value={this.state.albumSong} onChange={this.handleOnChangeInput} />
                        <label htmlFor="urlSong">Song URL: *</label>
                        <input type="text" name="urlSong" id="urlSong" className="form-control" value={this.state.urlSong} onChange={this.handleOnChangeInput} />
                        <label htmlFor="songLyrics">Song Lyrics: ( 10.000 Words Maximum ) *</label> 
                        <textarea name="songLyrics" id="songLyrics" cols="30" rows="10" className="form-control" maxLength="10000" value={this.state.songLyrics} onChange={this.handleOnChangeInput} ></textarea>
                        <div className="d-flex flex-row justify-content-end align-items-center">
                            <button type="submit" className="mt-3">Update</button>
                        </div>
                    </form>
                </div>
            )
       
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value
        });
        this.convertUrltoUrlEmbed();
    }

    convertUrltoUrlEmbed = () => {
        // Get URL from YouTube
        const url = this.state.urlSong;

        // Split URL on '=' to get Embed Code // arrUrl[1] -> Contains the Embed Code
        const arrUrl = url.split('=');

        // Build Embed URL 
        const embedUrl = "https://www.youtube.com/embed/" + arrUrl[1];

        this.setState({
            urlSongEmbed: embedUrl
        })
    }


    render() {
        return (
            <>
                <div className="lyricsEditMain">
                    <div className="verifyLE">
                        <h3>{this.props.authInfo.username}'s Post {this.state.post[0] === undefined ? "" : this.state.post[0].songTitle}</h3>
                        <h5 className="text-center text-danger">{this.state.emptyFields === undefined ? "" : this.state.emptyFields}</h5>
                        <h5 className="text-center text-danger">{this.state.apiResponse === false ? "Sorry, something went wrong contacting the server!" : ""}</h5>
                        <h5 className="text-center text-success">{this.state.apiResponse === true ? "Lyric Post Updated!" : ""}</h5>
                        <hr />
                    </div>
                    <div className="lyricPost">
                        { this.state.post[0] === undefined ? "" : this.postHandler() }
                        <div className="sideInfoCont">
                            <div className="sideInfo">
                                <h3>How do I update my lyric post?</h3>
                                <hr />
                                <p>
                                    Updating your own post is an easy-to-do task! Simply, change the values on the form given, check the preview, see if you like it, and finally click on the update button! Remeber, the preview is just a preview! It's not how your lyric post will appear, but will be close to that! <br />
                                    Also please make sure you fill all the fields, and leave no one empty! Values are pre-filled for you, you simply change what you need to change and leave the rest as it is! Of corse you can change multiple values at once!
                                </p>
                            </div>
                            <div className="preview">
                                <h3>{this.state.authorSong} - {this.state.titleSong} ({this.state.langSong})</h3>
                                <h6 className="text-center">{this.state.albumSong}</h6>
                                <hr />
                                <div className="d-flex flex-row justify-content-center align-items-center">
                                    <iframe width="280" height="157.5" src={this.state.urlSongEmbed} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                                <div className="bg-dark text-light p-4 rounded">
                                    {this.state.songLyrics}
                                </div>
                                <h6>Lyrics by: {this.props.authInfo.username}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
