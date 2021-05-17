import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

export default class SidenavAuth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            data: '',
            dataInit: true,
            loading: false
        }
    }

    componentDidMount() {
        this.handleAuthAPI();
    }

    // API Call AUTHED USER
    async handleAuthData(user) {
        const url = `https://lyricalplace-api.herokuapp.com/api/getFav/${user}`;

        const response = await fetch(url);

        const data = await response.json();

        // Clear Output If No Songs Have Been Found
        if (data.message === "No favouarite songs found :(") {
            this.setState({
                dataInit: false,
                data: data.message
            })
            return;
        }

        const slicedData = data.fav.slice(-10).reverse();

        this.setState({
            data: slicedData,
            loading: true
        })
    }

    handleAuthAPI = () => {
        if (this.props.isAuth.isAuth) {
            // Call API Fav
            this.handleAuthData(this.props.isAuth.username)
        } 
    }

    spreadData = () => {
        let objData = Object.entries(this.state.data)
        if (this.state.dataInit === true) {
            return objData.map(item => {

                // Return Data
                return (
                    <a key={item[1]._id + "link"} href={`/lyrics/${item[1]._id}`}>
                        <span key={item[1]._id + "first_span"} className="sidenav-span" >{item[1].songTitle} - {item[1].songSinger} ({item[1].songLang})</span>
                        <br />
                        <span className="sidenav-by" key={item[1]._id + "second_span"}>Lyrics by: {item[1].userAuthor}</span>
                    </a> 
                )
            })
        } else if (this.state.dataInit === false) {
            return (
                <a href={`/lyrics/Titles`}>
                    <span className="sidenav-span">{this.state.data}</span>
                    <br />
                    <span className="sidenav-by">Let's add one now!</span>
                </a> 
            )
        }
        
    }

    render () {
        return (
            <div className="sideNav" id="sidenav">
                {/* {this.handleAuthAPI()} */}
                <button onClick={this.props.onClose}>{this.props.isAuth.isAuth === true  ? "Hide Favouarites" : "" } <i className="fa fa-times"></i></button>
                <hr/>
                {this.state.loading ? this.spreadData() : 
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <ReactBootStrap.Spinner animation="border" variant="dark" className="m-2" />
                </div>
                }
            </div>
        );
    }
}