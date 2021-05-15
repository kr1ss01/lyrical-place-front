import React, { Component } from 'react'

export default class TopTrendingTemplate extends Component {
    render() {
        return (
            <div style={{cursor: "default"}} className="d-flex flex-column justify-content-center align-items-center" id="topTrendingDiv">
                <h3 className="text-center mt-5 mb-3">{this.props.video.author} - {this.props.video.title} Lyrics</h3>
                <iframe src={this.props.video.src} title={this.props.video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen id="iframeTrending" className="mb-4 mt-3"></iframe>
                <div className="bg-dark text-light">
                    {this.props.video.lyrics} 
                </div>
            </div>
        )
    }
}