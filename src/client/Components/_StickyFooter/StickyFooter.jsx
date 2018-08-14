import React from 'react';
import styles from './style.scss';

export default class StickyFooter extends React.Component {
    render() {
        return(
            <div className="page-footer">
            <div className="container footer">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="grey-text darken-4">Footer Content</h5>
                        <p className="grey-text darken-4">You can use rows and columns here</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="grey-text darken-4">Links</h5>
                        <ul>
                            <li><a className="grey-text darken-4" href="#!">Link 1</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}