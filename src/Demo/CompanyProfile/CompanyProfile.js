import React from 'react';
import {
    Col, Row, Form,
    CardHeader,
    CardBody,
    FormGroup,
    Input
} from 'reactstrap';

import './CompanyProfileStyle.scss';
import i18n from '../../i18n';
import { InputWithText } from '../../App/components/ComponentModule'
import { connect } from 'react-redux';
import { HtttpPutDefult } from '../../actions/httpClient';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast, getVariable } from '../../globals/globals';
import Card from "../../App/components/MainCard";
import alert from '../../assets/alert-icon.png';
class CompanyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileObject: null,
            editMode: false,
            btnDisable: true,
            EditArr: []
        }
    }



    async componentDidMount() {
        const { OwnerProfile } = this.props;
        await this.setState({ profileObject: OwnerProfile });
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


    checkValidation(index, val) {
        const { OwnerProfile } = this.props;

        const { EditArr } = this.state;
        let updatedArr;
        updatedArr = EditArr;
        updatedArr[index] = val;
        this.setState({ EditArr: updatedArr })
        if (OwnerProfile.loginType == "ADMIN") {
            this.checkDisableOrEnableBtn(3, EditArr);
        }
        else {
            this.checkDisableOrEnableBtn(14, EditArr);

        }
    }


    checkDisableOrEnableBtn(num, arr) {
        let result;

        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnDisable: true })
            }
            else {
                this.setState({ btnDisable: false })
            }
        }
        else {
            this.setState({ btnDisable: true })
        }
    }


    submit() {
        const { profileObject } = this.state;
        const { storeProfile, OwnerProfile } = this.props;
        let res = profileObject;
        HtttpPutDefult('brand/' + OwnerProfile._id + '', res).then((res) => {
            if (res) {
                storeProfile(profileObject);
                displayToast('Profile data is updated successfully', true);
                this.setState({ editMode: false })
            }
        })
    }

    changeInput(Input, val) {
        const { smtpIntegration } = this.state.profileObject;

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
                        contactPerson: val
                    }
                })
                break;
            case 'regID':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        regID: val
                    }
                })
                break;
            case 'taxID':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        taxID: val
                    }
                })
                break;
            case 'server':
                smtpIntegration.server = val;
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'port':
                smtpIntegration.port = val;
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'username':
                smtpIntegration.username = val;
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'passwordSMTP':
                smtpIntegration.password = val;
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        smtpIntegration: smtpIntegration
                    }
                })
                break;
            case 'sendName':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        sendName: val
                    }
                })
                break;
            case 'senderID':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        senderID: val
                    }
                })
                break;
            case 'smsApiKey':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        smsApiKey: val
                    }
                })
                break;
            case 'name':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        name: val
                    }
                })
                break;
            case 'email':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        email: val
                    }
                })
                break;
        }



    }


    render() {
        const { OwnerProfile } = this.props;
        const { editMode, profilePic, btnDisable, profileObject } = this.state;
        const { name, email, password, address, contact, contactPerson, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName } = profileObject ? profileObject : OwnerProfile;

        return (
            <div className="content CompanyProfile">
                <Col md="12">
                    <Card isOption title={editMode ? "Edit your profile" : "Profile Data"}>
                        {OwnerProfile.loginType == "NotActiveAdmin" || OwnerProfile.loginType == "NotActiveBrand" &&
                            <React.Fragment>  <img src={alert} style={{ width: '3%' }} /> <p className="alertTxt">You need to activate your account</p></React.Fragment>
                        }

                        <CardBody>
                            {profileObject ?
                                editMode ?
                                    <Form>
                                        {
                                            OwnerProfile.loginType == "OWNER" || OwnerProfile.loginType == "NotActiveBrand" ?
                                                <React.Fragment>
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
                                                            <InputWithText type="text" label={i18n.t("CompanyProfile.Email")} placeholder={i18n.t("CompanyProfile.EmailPlacholder")} onChange={(val) => this.changeInput("email", val)} isRequired validation="email" onBlur={(val) => { this.checkValidation('0', val) }} value={email} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeInput("password", val)} value={password} validation="password" isRequired onBlur={(val) => { this.checkValidation('1', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={i18n.t("CompanyProfile.Address")} placeholder={i18n.t("CompanyProfile.AddressPlacholder")} onChange={(val) => this.changeInput("address", val)} value={address} isRequired onBlur={(val) => { this.checkValidation('2', val) }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={i18n.t("CompanyProfile.Contact")} placeholder={"01222****"} onChange={(val) => this.changeInput("contact", val)} value={contact} validation="phone" isRequired onBlur={(val) => { this.checkValidation('3', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={i18n.t("CompanyProfile.ContactPersonal")} placeholder={"01222****"} onChange={(val) => this.changeInput("contactPersonal", val)} value={contactPerson} validation="phone" isRequired onBlur={(val) => { this.checkValidation('4', val) }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Register ID"} placeholder={"Enter Register ID"} onChange={(val) => this.changeInput("regID", val)} value={regID} isRequired validation="number" onBlur={(val) => { this.checkValidation('5', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} onChange={(val) => this.changeInput("taxID", val)} value={taxID} isRequired validation="number" onBlur={(val) => { this.checkValidation('6', val) }} />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"SMTP Integration Server"} placeholder={"Enter SMTP Integration Server"} onChange={(val) => this.changeInput("server", val)} value={smtpIntegration.server} isRequired onBlur={(val) => { this.checkValidation('7', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"SMTP Integration Port"} placeholder={"Enter SMTP Integration Port"} onChange={(val) => this.changeInput("port", val)} value={smtpIntegration.port} isRequired onBlur={(val) => { this.checkValidation('8', val) }} />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"SMTP Integration User Name"} placeholder={"Enter SMTP Integration User Name"} onChange={(val) => this.changeInput("username", val)} value={smtpIntegration.username} isRequired onBlur={(val) => { this.checkValidation('9', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="password" label={"SMTP Integration Password"} placeholder={"Enter SMTP Integration Password"} onChange={(val) => this.changeInput("passwordSMTP", val)} value={smtpIntegration.password} isRequired validation="password" onBlur={(val) => { this.checkValidation('10', val) }} />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key"} onChange={(val) => this.changeInput("smsApiKey", val)} value={smsApiKey} isRequired onBlur={(val) => { this.checkValidation('11', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Sender ID"} placeholder={"Enter Sender ID"} onChange={(val) => this.changeInput("senderID", val)} value={senderID} validation="number" isRequired onBlur={(val) => { this.checkValidation('12', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name"} onChange={(val) => this.changeInput("sendName", val)} value={sendName} isRequired onBlur={(val) => { this.checkValidation('13', val) }} />
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>

                                                :
                                                <React.Fragment>
                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={i18n.t("CompanyProfile.Email")} placeholder={i18n.t("CompanyProfile.EmailPlacholder")} onChange={(val) => this.changeInput("email", val)} value={email} validation="email" isRequired onBlur={(val) => { this.checkValidation('0', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="password" label={i18n.t("CompanyProfile.Password")} placeholder={"********"} onChange={(val) => this.changeInput("password", val)} value={password} validation="password" isRequired onBlur={(val) => { this.checkValidation('1', val) }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Name"} placeholder={'Enter your name'} onChange={(val) => this.changeInput("name", val)} value={name} isRequired onBlur={(val) => { this.checkValidation('2', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            {/* <InputWithText type="text" label={"Phone"}  placeholder={"01222****"} onChange={(val) =>{}} value={"01118717611"} validation="phone" isRequired onBlur={(val) => { this.checkValidation('3', val) }} /> */}
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>
                                        }
                                        <button type="button" className={"btn btn-primary"} disabled={btnDisable} onClick={() => { this.submit() }}>{i18n.t("global.submit")}</button>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.setState({ editMode: false }) }}>{i18n.t("global.cancel")}</button>
                                    </Form>
                                    :
                                    <div className="Details">
                                        {OwnerProfile.loginType == "ADMIN" || OwnerProfile.loginType == "NotActiveAdmin" ?

                                            <i class={"far fa-edit"} style={{ top: '30%' }} onClick={() => { this.setState({ editMode: true }) }}></i>

                                            :
                                            <i class={["far fa-edit"]} onClick={() => { this.setState({ editMode: true }) }}></i>

                                        }
                                        {
                                            OwnerProfile.loginType == "OWNER" || OwnerProfile.loginType == "NotActiveBrand" ?
                                                <React.Fragment>
                                                    <Row>
                                                        <Col>
                                                            <h3 style={{ marginBottom: '30px' }}>INFO</h3>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Name:</label>
                                                                <label className="subTitle">{name ? name : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">{i18n.t("CompanyProfile.Email")}:</label>
                                                                <label className="subTitle">{email ? email : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">{i18n.t("CompanyProfile.Address")}:</label>
                                                                <label className="subTitle">{address ? address : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">{i18n.t("CompanyProfile.Contact")}:</label>
                                                                <label className="subTitle">{contact ? contact : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">{i18n.t("CompanyProfile.ContactPersonal")}:</label>
                                                                <label className="subTitle">{contactPerson ? contactPerson : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>SMTP INTEGRATION</h3>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Server:</label>
                                                                <label className="subTitle">{smtpIntegration.server ? smtpIntegration.server : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Port:</label>
                                                                <label className="subTitle">{smtpIntegration.port ? smtpIntegration.port : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">User Name:</label>
                                                                <label className="subTitle">{smtpIntegration.username ? smtpIntegration.username : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">SMS Api Key:</label>
                                                                <label className="subTitle">{smsApiKey ? smsApiKey : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col>
                                                            <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>COMMERCIAL</h3>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Register ID:</label>
                                                                <label className="subTitle">{regID ? regID : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Tax ID:</label>
                                                                <label className="subTitle">{taxID ? taxID : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Sender ID:</label>
                                                                <label className="subTitle">{senderID ? senderID : "No value"}</label>
                                                            </div>
                                                        </Col>

                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Send Name:</label>
                                                                <label className="subTitle">{sendName ? sendName : "No value"}</label>
                                                            </div>
                                                        </Col>

                                                    </Row>

                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <Row>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">{i18n.t("CompanyProfile.Email")}:</label>
                                                                <label className="subTitle">{email ? email : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Name:</label>
                                                                <label className="subTitle">{name ? name : "No value"}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Phone:</label>
                                                                <label className="subTitle">01118717611</label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>
                                        }

                                    </div>
                                : null}
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        OwnerProfile: state.storage.ProfileState.OwnerProfile,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        storeProfile: (val) => dispatch(StoreProfile(val)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);


