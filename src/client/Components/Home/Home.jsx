import React from 'react';
import styles from './style.scss'

export default class Home extends React.Component {
    render() {
        return(
            <div className="container-fluid" id="home">
                <div className="row" id="row-1">
                    <div className="col s12 m12">
                        <div className="intro-1">Who? What? When? Where? Why? How?</div>
                        <div className="intro-2">too many choices to make? let's decide together!</div>
                    </div>
                </div>
                <div className="container">
                <div className="row" id="row-2">
                    <div className="col s12 m4 center">
                        <h4>who we are?</h4>
                        <p>Nunc mi mi, euismod eu nibh vel, aliquam malesuada massa. Vestibulum vel arcu ipsum. Curabitur ullamcorper non diam at feugiat. Donec vitae pellentesque risus, sed congue nibh. Nulla faucibus et enim sed egestas. Donec sit amet magna convallis, mattis ligula auctor, rhoncus sem. In tristique, leo sed gravida convallis, elit risus fermentum orci, congue eleifend dolor diam at nulla.</p>
                    </div>
                    <div className="col s12 m4 center">
                        <h4>what we do?</h4>
                        <p>Pellentesque in placerat quam, et faucibus sem. Nullam vel pellentesque justo, pellentesque faucibus justo. Nulla ornare laoreet dolor, eu sollicitudin felis aliquet vitae. Duis faucibus diam non metus pulvinar, sed sollicitudin ex dapibus. Nunc semper nisl et mattis tincidunt. Phasellus finibus eros ac luctus egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                    </div>
                    <div className="col s12 m4 center">
                        <h4>how to do?</h4>
                        <ul>
                            <li>item</li>
                            <li>item</li>
                            <li>item</li>
                            <li>item</li>
                            <li>item</li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}