import React from 'react';
import styles from './style.scss'

export default class Home extends React.Component {
    render() {
        return(
            <div className="container-fluid" id="home">
                <div className="row">
                    <div className="col s12 m12">
                        Who? What? When? Where? Why? How?
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m4 center">
                        <h4>what to do</h4>
                    </div>
                    <div className="col s12 m4 center">
                        <h4>how to do</h4>
                    </div>
                    <div className="col s12 m4 center">
                        <h4>who to  do</h4>
                    </div>
                </div>
            </div>
        )
    }
}