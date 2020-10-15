import React from 'react';
import DEMO from './../../../../../store/constants/Global';
import Aux from "../../../../../hoc/_Aux";
import logo from "../../../../../assets/images/logo.webp";
import './NavLogostyle.scss';
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
                    <span className="b-title">WinFi</span>
                </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
