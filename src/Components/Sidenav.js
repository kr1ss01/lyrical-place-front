import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

export default class Sidenav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            data: '',
            loading: false
        }
    }

    // API Call Non AUTHED USER
    async componentDidMount() {
        const url = "https://lyricalplace-api.herokuapp.com/api/topTrendingSong";

        const response = await fetch(url);

        const data = await response.json();

        const slicedData = data.slice(-10).reverse();

        this.setState({
            data: slicedData,
            loading: true
        })
    }

    spreadData = () => {
        let objData = Object.entries(this.state.data)

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
    }

    render () {
        return (
            <div className="sideNav" id="sidenav">
                <button onClick={this.props.onClose}>{this.props.isAuth.isAuth === true  ? "" : "Hide Latest Uploads" } <i className="fa fa-times"></i></button>
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