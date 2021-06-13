import React from 'react';
import DEMO from './../../../../../store/constants/Global';
import Aux from "../../../../../hoc/_Aux";
import logo from "../../../../../assets/images/logo.webp";
import './NavLogostyle.scss';
import { connect } from 'react-redux';

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo NavLogo">
                <a href={DEMO.BLANK_LINK} className="b-brand">
                    <img src={logo} alt="" />
                    <span className="b-title">{props.OwnerProfile?.name?.toUpperCase() || 'WINIFI'}</span>
                </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        OwnerProfile: state.storage.ProfileState.OwnerProfile,

    }
};

export default connect(mapStateToProps, null)(navLogo);

