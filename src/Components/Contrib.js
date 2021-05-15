import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Contribute extends React.Component {

    state = {
        titleSong: '',
        authorSong: '',
        urlSong: '',
        songLyrics: '',
        albumSong: '',
        langSong: '',
        embedUrl: '',
        errorHandler: false,
        resultHandler: false,
        resultError: false,
        views: false
    }

    // API Fetch -- Method POST
    async postData(data) {

        try {
            const url = "https://lyricalplace-api.herokuapp.com/api/contrib/form"
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
        if (data.titleSong === '' || data.authorSong === '' || data.urlSong === '' || data.songLyrics === '' || data.albumSong === '' || data.langSong === '') {
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

        // Get URL from YouTube
        const url = this.state.urlSong;

        // Split URL on '=' to get Embed Code // arrUrl[1] -> Contains the Embed Code
        const arrUrl = url.split('=');

        // Build Embed URL 
        const embedUrl = "https://www.youtube.com/embed/" + arrUrl[1];

        // Rebuild Object For API POST
        const fullDataAPI = {
            titleSong: data.titleSong,
            authorSong: data.authorSong,
            urlSong: data.urlSong,
            embedUrl: embedUrl,
            songLyrics: data.songLyrics,
            albumSong: data.albumSong,
            lyricsAuthor: this.props.isAuth.username,
            songLang: data.langSong
        }

        // Call Fetch Function Passing In Data
        this.postData(fullDataAPI);

        // Test Outputs
        // console.log(data, arrUrl[1], embedUrl, fullDataAPI)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value
        });
        this.convertUrltoUrlEmbed();
    }

    handleViews = () => {
        this.setState({
            views: !this.state.views
        })
    }

    convertUrltoUrlEmbed = () => {
        // Get URL from YouTube
        const url = this.state.urlSong;

        // Split URL on '=' to get Embed Code // arrUrl[1] -> Contains the Embed Code
        const arrUrl = url.split('=');

        // Build Embed URL 
        const embedUrl = "https://www.youtube.com/embed/" + arrUrl[1];

        this.setState({
            embedUrl: embedUrl
        })
    }

    render () {
        return (
            <>
                {this.props.isAuth.isAuth === false ? <Redirect to="/"></Redirect> : ""}
                <h2 className="text-center m-5" style={{cursor: "default"}}>Help us improve and expand our collection!</h2>
                <div id="contrib-outer">                
                    <div className="contrib-form">
                        <header>Contribute Form</header>
                        {this.state.errorHandler === true ? <h4 className="text-danger text-center">Please fill all the fields!</h4> : ""}
                        {this.state.resultError === true ? <h4 className="text-danger text-center">Something went wrong while contacting server!</h4> : ""}
                        {this.state.resultHandler === true ? <h4  className="text-success text-center">Your lyrics are uploaded succesfully!</h4> : ""}
                        <form onSubmit={this.handleSubmit} >
                            <label htmlFor="titleSong">Song Title: *</label>
                            <input type="text" placeholder="Title of song..." name="titleSong" id="titleSong" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="authorSong">Song Singer(s): *</label>                                              
                            <input type="text" placeholder="Singer(s) of song..." name="authorSong" id="authorSong" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="langSong">Song Language: *</label>
                            <input type="text" placeholder="Song language..." name="langSong" id="langSong" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="albumSong">Song Album: *</label>
                            <br/>
                            <small className="text-danger ml-3">If the song is a Single, please write "Single" on the field!</small>
                            <input type="text" placeholder="Album of song..." name="albumSong" id="albumSong" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="urlSong">Song URL: *</label>
                            <input type="text" placeholder="YouTube URL of song..." name="urlSong" id="urlSong" className="form-control" onChange={this.handleOnChangeInput} />
                            <label htmlFor="songLyrics">Song Lyrics: ( 10.000 Words Maximum ) *</label> 
                            <br/>
                            <small className="text-danger ml-3">Note: Lyrics will display exactly as you wirte them here!</small>
                            <textarea name="songLyrics" id="songLyrics" cols="30" rows="10" placeholder="Write lyrics here..." className="form-control" maxLength="10000" onChange={this.handleOnChangeInput} ></textarea>
                            <button type="submit" className="mt-3">Submit</button>
                        </form>
                        
                    </div>
                    <hr className="bg-dark" style={{marginTop: 35}} />
                    <div className="contrib-info">
                        <div className="circle-cont">
                            {this.state.views === false ? 
                            <>
                                <i className="circle-fill"></i>
                                <i className="circle-outer"></i>
                            </>
                            : 
                            <>
                                <i className="circle-outer"></i>
                                <i className="circle-fill"></i>
                            </> 
                            }
                        </div>
                        {this.state.views === false ? 
                            <>
                            <header id="main-header">Contribute Info <i className="fa fa-info-circle"></i></header>
                            <div id="outer-col-6">
                                <button id="buttonPreview_Info" onClick={this.handleViews}>Switch to preview here...</button>
                                <div className="col-6 half-contrib">
                                    <header>How to Contribute?</header>
                                    <div>
                                        <p>
                                            Contrbuting for us is an easy-to-do task! As soon as you make an account, you can write lyric-posts and contribute! Beign here means you already meet this criteria, so the only thing left is to fill out the form with the song you want to write lyrics about. Remember two thing before you start writting! First, your lyric-post can be reported by other users if it's out of context or offensive! And secondly, we provide a render view wich you can access by pressing the "Preview" button any time you want. This will show a quck peek at a rendered view of your post. DISCLMAIMER: THIS VIEW WILL NOT BE EXCACTLY AS IT WILL APPEAR IN TERMS OF STYLING. IT'S HERE JUST TO HELP YOU SEE BETTER AND UNDERSTAND WHAT YOU WRITTING! Keep in mind, and happy writting!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6 half-contrib-work">
                                    <header>How it works?</header>
                                    <div>
                                        <p>
                                            We have a simple and elegant system for writting and uploading lyrics, to protect the website from spams and wrong lyrics. So here is how it works. Our site works some-what like a blog. You can post freely for whatever song you like, any time you like. Other users searching for this song's lyrics will see your submition, and other user's submitions. Gradually and over time some submitions will get more likes and will appear on the top. If you find any Lyrics containig non-valid content, they can be reported and will be checked by admins! Remember, you can change any misstakes you made anytime in the "MyProfile" section!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </>
                        : 
                        <>
                        <header>Preview</header>
                        <h6 className="text-center text-light">Here you can take a peek for your lyric-post.</h6>
                        <button id="buttonPreview_Info" onClick={this.handleViews}>Switch to info view here...</button>
                        <div className="preview-cont">
                            <h3>{this.state.authorSong} {this.state.authorSong !== "" && this.state.titleSong !== "" ? "-" : ""} {this.state.titleSong} {this.state.langSong === "" ? "" : <span>({this.state.langSong})</span> }</h3>
                            <h6 className="text-center">{this.state.albumSong}</h6>
                            <hr />
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <iframe width="280" height="157.5" src={this.state.embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="bg-dark text-light p-4 rounded">
                                {this.state.songLyrics}
                            </div>
                            <h6>Lyrics by: {this.props.isAuth.username}</h6>
                        </div>
                        </>
                        }
                    </div>
                </div>
            </>
        );
    }
}

// {/* <div id="outer-col-6">
//     <div className="col-6 half-contrib">
//         <header>How to Contribute?</header>
//         <div>
//             To contribute you must fullfill 3 specific criteria. These criteria are:
//             <ul>
//                 <li>Have an account on Lyrical Place.</li>
//                 <li>Your account must be verified.</li>
//                 <li>Be a member for at least 2 days on this site.</li>
//             </ul>
//             After these criteria are met, you can send us a request and upload the lyrics on the site if everything is fine!
//         </div>
//     </div>
//     <div className="col-6 half-contrib-work">
//         <header>How it works?</header>
//         <div>
//             The system we probive works with a simple and secure way to guarantee that lyrics provided by users are legit and well written! Here, we analyse for you how exactly our system works: 
//             <ul>
//                 <li>Send us a request for the lyrics of a song.</li>
//                 <li>We check it and if it's well written and legit we upload the lyrics</li>
//                 <li>Even if it doesn't get aprooved we send you an email informing you about mistakes and what is wrong.</li>
//             </ul>
//             Happy writting!
//         </div>
//     </div>
// </div> */}