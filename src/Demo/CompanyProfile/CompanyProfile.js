import React from 'react';
import {
    Col, Row, Form,
    CardHeader,
    CardBody,
} from 'reactstrap';
import './CompanyProfileStyle.scss';
import i18n from '../../i18n';
import { InputWithText } from '../../App/components/ComponentModule'
import { connect } from 'react-redux';
import { HtttpPutDefult } from '../../actions/httpClient';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';
import Card from "../../App/components/MainCard";

class CompanyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileObject: {
                address: "",
                contact: "",
                contactPerson: "",
                logo: "",
                name: "",
                password: "",
                username: "",
            },
            editMode: false
        }
    }



    componentDidMount() {
        const { OwnerProfile } = this.props;
        this.setState({ profileObject: OwnerProfile });
    }

    changePhoto(event) {
        event.preventDefault();
        const file = event.currentTarget.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onloadend = function (e) {
            this.setState({
                profilePic: [reader.result]
            })
        }.bind(this);
    }

    checkValidation() {
        return true;
    }


    submit() {
        const { profileObject } = this.state;
        const { storeProfile } = this.props;
        if (this.checkValidation()) {
            HtttpPutDefult('brand/1', profileObject).then((res) => {
                if (res) {
                    storeProfile(profileObject);
                    displayToast('Profile data is updated succefully', true);
                    this.setState({ editMode: false })
                }
            })

        }
    }

    changeInput(Input, val) {
        switch (Input) {
            case 'password':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        password: val
                    }
                })
                break;
            case 'address':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        address: val
                    }
                })
                break;
            case 'contact':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        contact: val
                    }
                })
                break;
            case 'contactPersonal':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        contactPersonal: val
                    }
                })
                break;
        }

    }



    render() {
        const { editMode } = this.state;
        const { name, username, password, address, contact, contactPerson } = this.state.profileObject;
        return (
            <div className="content CompanyProfile">
                <Col md="12">
                    <Card isOption title={editMode ? "Edit your profile" : "Profile Data"}>
                        <CardBody>

                            {
                                editMode ?
                                    <Form>
                                        <Row>
                                            {/* <Col md={12}>
                                <FormGroup className="profilePicContainer">
                                    <label>{i18n.t("CompanyProfile.Logo")}</label>
                                    <Input ref="file" type="file" name="file" onChange={this.changePhoto.bind(this)} />
                                    <img alt="" src={profilePic} />
                                </FormGroup>
                            </Col> */}
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("CompanyProfile.NamePlacholder")} value={name} disabled />
                                            </Col>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("CompanyProfile.UserName")} placeholder={i18n.t("CompanyProfile.UserNamePlacholder")} disabled value={username} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeInput("password", val)} value={password} />
                                            </Col>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("CompanyProfile.Address")} placeholder={i18n.t("CompanyProfile.AddressPlacholder")} onChange={(val) => this.changeInput("address", val)} value={address} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("CompanyProfile.Contact")} placeholder={"01222****"} onChange={(val) => this.changeInput("contact", val)} value={contact} />
                                            </Col>
                                            <Col md={6}>
                                                <InputWithText type="text" label={i18n.t("CompanyProfile.ContactPersonal")} placeholder={"01222****"} onChange={(val) => this.changeInput("contactPersonal", val)} value={contactPerson} />
                                            </Col>
                                        </Row>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.submit() }}>{i18n.t("global.submit")}</button>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.setState({ editMode: false }) }}>{i18n.t("global.cancel")}</button>
                                    </Form>
                                    :
                                    <div className="Details">
                                        <i class="far fa-edit" onClick={() => { this.setState({ editMode: true }) }}></i>
                                        <Row>
                                            <Col>
                                                <div className="detailsContainer">
                                                    <label className="Title">Name:</label>
                                                    <label className="subTitle">{name ? name : "No value"}</label>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="detailsContainer">
                                                    <label className="Title">Username:</label>
                                                    <label className="subTitle">{username ? username : "No value"}</label>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <div className="detailsContainer">
                                                    <label className="Title">Address:</label>
                                                    <label className="subTitle">{address ? address : "No value"}</label>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="detailsContainer">
                                                    <label className="Title">Contact:</label>
                                                    <label className="subTitle">{contact ? contact : "No value"}</label>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <div className="detailsContainer">
                                                    <label className="Title">ContactPerson:</label>
                                                    <label className="subTitle">{contactPerson ? contactPerson : "No value"}</label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        OwnerProfile: state.ProfileState.OwnerProfile,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);


