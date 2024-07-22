import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Blog from './Blog';
import CreatePost from './CreatePost';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <CreatePost/>
                <Blog />
            </div>
        );
    }
}

export default connect()(Main);

