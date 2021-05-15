import React from 'react';

export default class Footer extends React.Component {
    state = {
        facebook: "https://www.facebook.com/",
        twitter: "https://twitter.com/",
        instagram: "https://www.instagram.com/",
        gitHub: "https://github.com/",
        youTube: "https://www.youtube.com/",
        telegram: "https://telegram.org/",
        url: ""
    }
    render () {
        return (
            <footer className="sticky-bottom mt-5">
                <div className="social-media">
                    <a href={this.state.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href={this.state.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href={this.state.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href={this.state.gitHub} target="_blank" rel="noreferrer"><i className="fab fa-git-square"></i></a>
                    <a href={this.state.youTube} target="_blank" rel="noreferrer"><i className="fab fa-youtube-square"></i></a>
                    <a href={this.state.telegram} target="_blank" rel="noreferrer"><i className="fab fa-telegram"></i></a>
                </div>  
                <div className="footer-flex">
                    <div className="half-footer">
                        <header>Newsletter</header>
                        <p>
                            We don't like spam, and sure, so does you! So we only sent valiable emails, informing you only for the things that matter to you!
                        </p>
                        <div>
                            <form>
                                <label htmlFor="emailNewsletter">Your e-mail here:</label>
                                <input type="email" name="emailNewsletter" id="emailNewsletter" placeholder="Plaease, give your email here..." required className="form-control" />
                            </form>
                            <button type="button" id="formNewsletterBtn" name="formNewsletterBtn">Subscribe!</button>
                        </div>
                    </div>
                    <div className="half-footer">
                        <header>Usefull Links</header>
                        <ul className="list-group">
                            <a href={this.state.url} className="list-group-item">Our team</a>
                            <a href={this.state.url} className="list-group-item">Donate</a>
                            <a href={this.state.url} className="list-group-item">Contact us</a>
                        </ul>
                    </div>
                </div>
                <div className="col-12 text-center text-muted p-4">
                    <h6>All rights reserved &copy;2021 Lyrical Place</h6>
                </div>
            </footer>
        );
    }
}