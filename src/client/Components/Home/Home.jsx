import React from 'react';
import styles from './style.scss';
import { Link } from 'react-router-dom';


export default class Home extends React.Component {
    render() {
        return(
            <div className="container-fluid" id="home">
                <div className="row" id="row-1">
                    <div className="col s12 m12">
                        <div id="intro-text-1">ask Away</div>
                        <Link to="/new-post"><div id="intro-text-2">&lt; LET'S GO &gt;<br/></div></Link>
                    </div>
                </div>

                <div className="row intro-stuff" id="about">
                    <div className="col s12 m2 center">
                    </div>
                    <div className="col s12 m8 center">
                        <h4>who are we?</h4>
                        <p>Nunc mi mi, euismod eu nibh vel, aliquam malesuada massa. Vestibulum vel arcu ipsum. Curabitur ullamcorper non diam at feugiat. Donec vitae pellentesque risus.</p>
                        <div className="row">
                            <div className="col m6">
                            pic 1
                            </div>
                            <div className="col m6">
                            pic 2
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m2 center">
                    </div>
                </div>

                <div className="row intro-stuff" id="what">
                    <div className="col s12 m2 center">
                    </div>
                    <div className="col s12 m8 center">
                        <h4>what we do?</h4>
                        <p>Pellentesque in placerat quam, et faucibus sem. Nullam vel pellentesque justo, pellentesque faucibus justo. Nulla ornare laoreet dolor, eu sollicitudin felis aliquet vitae. Duis faucibus diam non metus pulvinar, sed sollicitudin ex dapibus. Nunc semper nisl et mattis tincidunt. Phasellus finibus eros ac luctus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                    </div>
                    <div className="col s12 m2 center">
                    </div>
                </div>

                <div className="row intro-stuff" id="how">
                    <div className="col s12 m2 center">
                    </div>
                    <div className="col s12 m8 center">
                        <h4>how to do?</h4>
                        <div className="row instructions">
                            <div className="col m4">
                                Step 1<br/>
                                sed sollicitudin ex dapibus. Nunc semper nisl et mattis tincidunt. Phasellus finibus eros ac luctus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            </div>
                            <div className="col m4">
                                Step 2<br/>
                                sed sollicitudin ex dapibus. Nunc semper nisl et mattis tincidunt. Phasellus finibus eros ac luctus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            </div>
                            <div className="col m4">
                                Step 3<br/>
                                sed sollicitudin ex dapibus. Nunc semper nisl et mattis tincidunt. Phasellus finibus eros ac luctus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m2 center">
                    </div>
                </div>

            </div>
        )
    }
}