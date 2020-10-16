import React from 'react';
import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { setLoggedIn, displayToast } from '../../../globals/globals';
import { StoreProfile } from '../../../store/actions/ProfileAction';
import { StoreBranches } from '../../../store/actions/BranchsAction';
import { connect } from 'react-redux';
import { HtttpGetDefult, HtttpPostDefult } from '../../../actions/httpClient';

class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            Password: "",
            saveCredentials: false
        }
    }


    submit() {
        const { UserName, Password } = this.state;
        let body = {
            username: UserName,
            password: Password,
        }
        HtttpPostDefult('auth/login', body).then((res) => {
            if (res) {
                this.InitialProfile(res);
            }
            else {
                displayToast('UserName or Password is wrong', true);
            }
        })
    }

    InitialProfile(data) {
        const { history, storeProfile } = this.props;
        data.role = "SUPER";
        storeProfile(data);
        history.push('/dashboard');
        setLoggedIn(true);
        this.getBranches(data.id);
    }

    getBranches(id) {
        const { storeBranches } = this.props;
        HtttpGetDefult('brand/' + id + '').then((res) => {
            if (res) {
                storeBranches(res.branches);
            }
        })
    }

    // saveCredentials(data) {
    //     if(data == "on"){
    //         this.setState({saveCredentials:false});

    //     }
    //     else{
    //         this.setState({saveCredentials:true});

    //     }
    // }

    render() {
        const { saveCredentials } = this.state;
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
                                    <input type="password" className="form-control" placeholder="password" onChange={(val) => { this.setState({ Password: val.target.value }) }} />
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

    };
};

export default connect(null, mapDispatchToProps)(SignUp1);


