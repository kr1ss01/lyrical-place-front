import React, { Component } from 'react';

export default class FindByAlbum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            searchTerm: ''
        }
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
            data: data
        })
    }

    spreadData = () => {
        let fetchedData = Object.entries(this.state.data);
        let searchTerm = this.state.searchTerm;

        return fetchedData.filter((val) => 
            searchTerm === '' ? val : val[1].songAlbum.toLowerCase().includes(searchTerm.toLowerCase()) ? val : ''
        ).map((val, key) => {
            return (
                <a className="post-a" key={key} href={`/lyrics/${val[1]._id}`}>
                    {val[1].songSinger} - {val[1].songTitle} <strong>(Album: {val[1].songAlbum})</strong>  by {val[1].userAuthor} ({val[1].songLang})
                </a>
            )
        })
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [`${event.target.name}`]: event.target.value
        });
        this.spreadData();
    }

    render() {
        return (
            <div className="find-lyrics-outer">
                <div className="top-div-find">
                    <h2>Here, you find lyrics by Album</h2>
                    <hr />
                    <p>
                        Initialy, we display all Albums, but you can use the search bar to speed things up!
                    </p>
                </div>
                <div className="bottom-div-find">
                    <div className="filtered-lyrics">
                        <div className="search-fiald">
                            <form>
                                <input type="text" name="searchTerm" id="searchTerm" className="form-control" placeholder="Search lyrics by artsits..." onChange={this.handleOnChangeInput} />
                            </form>
                        </div>
                        <div className="output-div">
                            {this.state.data[0] !== undefined ? this.spreadData() : "" }
                        </div>
                    </div>
                    <div className="findInfo">
                        <div className="logInPromo">
                            <header>Don't found what you are looking?</header>
                            <p>
                                You can try and search via "Author", "Artist" or "Titles", "Languages"! If you still can't find what you are looking for, you can always log in and write your own lyric post to help others find what they are looking for! Happy searching!
                            </p>
                            <p>
                                Remember to add your favouarite songs to your collection! This way you can access them more easyly. <br />
                                But also remember, you can't add your own song to your collection. Your song's can be accessed via the "My Profile" section, where you can delete them or edit them!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
