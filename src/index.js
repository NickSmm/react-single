// import './sass/style.scss';
// import * as _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import { FooterElem } from './pages/footer/footer';
import { HomeComponent } from "./pages/home/home";
class App extends React.Component {
    render() {
        return (
            <div>
                <header>我是头部</header>
                <section>
                    <HomeComponent></HomeComponent>
                </section>
                <FooterElem></FooterElem>
            </div>
        )
    }
}
ReactDom.render(<App/>, document.getElementById('app'));
