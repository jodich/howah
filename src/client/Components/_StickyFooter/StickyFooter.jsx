import React from 'react';
import styles from './style.scss';

export default class StickyFooter extends React.Component {
    render() {
        return(
            <div className="page-footer">
            <div className="container footer">
                <div className="row grey-text valign-wrapper">
                    <div className="col m6 s12">
                        <p>cuckooooos birdies</p>
                    </div>
                    <div className="col m6 s12">
                        <div className="row">
                        <div className="col m4 right-align">
                        </div>
                        <div className="col m2 right-align">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                        </div>
                        <div className="col m2 right-align">
                            <a href="#"><i className="fa fa-twitter"></i></a>
                        </div>
                        <div className="col m2 right-align">
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                        </div>
                        <div className="col m2 right-align">
                            <a href="#"><i className="fa fa-github"></i></a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}