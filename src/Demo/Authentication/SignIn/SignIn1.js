import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { setLoggedIn, displayToast } from '../../../globals/globals';
import { StoreProfile } from '../../../store/actions/ProfileAction';
import { StoreBranches } from '../../../store/actions/BranchsAction';
import { StoreAdmins } from '../../../store/actions/AdminsAction';
import { StoreGroups } from '../../../store/actions/GroupsAction';
import { connect } from 'react-redux';
import { HtttpGetDefult, HtttpPostDefult } from '../../../actions/httpClient';
import moment from 'moment'


class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            Password: "",
            saveCredentials: false,
            showPassword: false,
            type: "password"
        }

    }


    submit() {
        const { UserName, Password } = this.state;
        let body = {
            email: UserName,
            password: Password,
        }
        HtttpPostDefult('auth/login', body).then((res) => {
            if (res) {
                this.InitialProfile(res);
            }
            else {
                displayToast('UserName or Password is wrong', false);
            }
        })
    }

    InitialProfile(data) {
        const { history, storeProfile } = this.props;
        if (data.loginType == "OWNER") {
            this.getBranches(data.id); // get branches
            if (data.isActivated) {
                data.details.loginType = "OWNER"
                history.push('/dashboard');
            }

            else {
                data.details.loginType = "NotActiveBrand"
                history.push('/CompanyProfile');
            }
            storeProfile(data.details);

        }
        else {
            if (data.isActivated) {
                data.details.loginType = "ADMIN"
                history.push('/dashboard');
            }

            else {
                data.details.loginType = "NotActiveAdmin"
                history.push('/CompanyProfile');
            }
            this.getAdminBranches(data.id); // get Admin branches
            storeProfile(data.details);
        }
        this.getGroups(data.id);
        setLoggedIn(true);
    }

    getBranches(id) {
        const { storeBranches, StoreAdmins } = this.props;
        HtttpGetDefult('brands/' + id + '').then((res) => {
            if (res) {
                storeBranches(res.branches);
                StoreAdmins(res.admins)
            }
        })
    }

    getAdminBranches(id) {
        const { storeBranches } = this.props;
        let adminBranches = [];
        HtttpGetDefult('admins/' + id + '').then((res) => {
            if (res) {
                if (res.adminRoles && res.adminRoles.length > 0) {
                    res.adminRoles.map((Item) => {
                        if (Item.branch) {
                            adminBranches.push(Item.branch);
                        }

                    })

                }
            }
        })
        storeBranches(adminBranches);
    }

    // saveCredentials(data) {
    //     if(data == "on"){
    //         this.setState({saveCredentials:false});

    //     }
    //     else{
    //         this.setState({saveCredentials:true});

    //     }
    // }

    showPassword() {
        const { showPassword } = this.state;
        this.setState({ showPassword: !showPassword }, () => {
            if (showPassword) {
                this.setState({ type: "password" })

            }
            else {
                this.setState({ type: "text" })

            }
        })

    }


    getGroups = (id) => {
        const { StoreGroups } = this.props;
        let groups = [];

        HtttpGetDefult('groups').then((res) => {
            if (res) {
                res.data.map((Item) => {
                    groups.push({
                        uploadSpeed: Item.bandwidthUp.value,
                        downloadSpeed: Item.bandwidthDown.value,
                        quotaLimitDaily: Item.quotaLimitDaily.value,
                        quotaLimitWeekly: Item.quotaLimitWeekly.value,
                        quotaLimitMonthly: Item.quotaLimitMonthly.value,
                        timeLimitDaily: Item.timeLimitDaily.value,
                        timeLimitWeekly: Item.timeLimitWeekly.value,
                        timeLimitMonthly: Item.timeLimitMonthly.value,
                        createdAt: moment(Item.createdAt).format('DD-MMM-YYYY'),
                        name: Item.name,
                        _id: Item._id
                    })
                })

                StoreGroups(groups)
            }
        })
    }

    render() {
        const { showPassword, type } = this.state;
        return (
            <Aux>
                <Breadcrumb />
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" onChange={(val) => { this.setState({ UserName: val.target.value }) }} />
                                </div>
                                <div className="input-group mb-4">
                                    <input type={type} className="form-control" placeholder="password" onChange={(val) => { this.setState({ Password: val.target.value }) }} />
                                    <i class={showPassword ? "fas fa-eye" : "fas fa-eye-slash"} style={{ position: 'absolute', top: '33%', right: '5%', cursor: 'pointer' }} onClick={() => { this.showPassword() }}></i>

                                </div>
                                {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" checked={saveCredentials} onChange={(val) => { this.saveCredentials(val.target.value) }} />
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div> */}
                                <button className="btn btn-primary shadow-2 mb-4" onClick={() => this.submit()}>Login</button>
                                {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
        storeBranches: (val) => dispatch(StoreBranches(val)),
        StoreAdmins: (val) => dispatch(StoreAdmins(val)),
        StoreGroups: (val) => dispatch(StoreGroups(val)),


    };
};

export default connect(null, mapDispatchToProps)(SignUp1);


