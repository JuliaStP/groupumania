import React from 'react';
import Logo from '../assets/icon-above-font.svg';
import '../styles/Header.css';
import { signOut, deleteUser, setUserId } from "../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  componentDidMount() {
    const { setUserId } = this.props;
    const id = localStorage.getItem('id');
    if (id) {
      setUserId(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id, setUserId } = this.props;
    if (!id && localStorage.getItem('id')) {
      setUserId(localStorage.getItem('id'));
    }
  }

  handleDeleteAccount = async () => {
    const { deleteUser, signOut } = this.props;
    const id = localStorage.getItem('id');

    console.log('User ID:', id);  // Debugging line to check if ID is passed

    if (!id) {
      console.error('User ID is missing');
      return;
    }

    try {
      const success = await deleteUser(id);
      if (success) {
        signOut();
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
    }
  };

  unauthenticate = () => {
    this.props.signOut();
  };

  render() {
    console.log('Header props:', this.props);  // Debugging line to check props

    return (
      <header className="header">
        <div className="content">
          <img className="mainlogo" src={Logo} alt='Company Logo' />
          <nav className="nav">
            <ul className="list">
              <li className="nav-item">
                <Link to="/main" className="link">Main</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="link">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={this.unauthenticate} className="link">
                  Log out
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={this.handleDeleteAccount} className="link">
                  Delete account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('Redux state in mapStateToProps:', state);  // Debugging line to check Redux state
  return {
    id: state.auth.id,
  };
};

export default connect(mapStateToProps, { signOut, deleteUser, setUserId })(Header);


