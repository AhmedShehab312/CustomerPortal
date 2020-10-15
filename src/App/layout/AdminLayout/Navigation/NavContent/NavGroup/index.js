import React from 'react';
import Aux from "../../../../../../hoc/_Aux";
import NavCollapse from './../NavCollapse';
import NavItem from './../NavItem';
import { connect } from 'react-redux';

const navGroup = (props) => {

    let navItems = '';
    if (props.group.children) {
        const groups = props.group.children;
        navItems = Object.keys(groups).map(item => {
            item = groups[item];
            switch (item.type) {
                case 'collapse':
                    if (item.role.indexOf(props.OwnerProfile.role) == -1) return false
                    else return <NavCollapse key={item.id} collapse={item} type="main" />;

                case 'item':
                    if (item.role.indexOf(props.OwnerProfile.role) == -1) return false
                    else return <NavItem layout={props.layout} key={item.id} item={item} />;
                default:
                    return false;
            }
        });
    }

    return (
        <Aux>
            <li key={props.group.id} className="nav-item pcoded-menu-caption"><label>{props.group.title}</label></li>
            {navItems}
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        layout: state.GlobalState.layout,
        isOpen: state.GlobalState.isOpen,
        isTrigger: state.GlobalState.isTrigger,
        OwnerProfile: state.ProfileState.OwnerProfile,

    }
};

export default connect(mapStateToProps, null)(navGroup);

