import React from 'react';
import {
    CardBody,
    FormGroup
} from 'reactstrap';
import {
    Row,
    Col,
    Button,
    Modal,
    Form
} from 'react-bootstrap';

import './CompanyProfileStyle.scss';
import i18n from '../../i18n';
import { InputWithText, DropDown } from '../../App/components/ComponentModule'
import { connect } from 'react-redux';
import { HtttpPutDefult, HtttpGetDefult, HtttpPostDefult } from '../../actions/httpClient';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast, getVariable } from '../../globals/globals';
import Card from "../../App/components/MainCard";
import alert from '../../assets/alert-icon.png';
import { PhotoshopPicker } from 'react-color';

class CompanyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileObject: null,
            editMode: false,
            btnDisable: true,
            EditArr: [],
            showPackages: false,
            packages: null,
            selectedPackage: null,
            displayColorPicker: false
        }
    }



    async componentDidMount() {
        this.getProfileInfo();
        this.getPackages();
    }

    getProfileInfo() {
        const { OwnerProfile } = this.props;
        HtttpGetDefult('brand/' + OwnerProfile._id + '', true).then((res) => {
            if (res) {
                this.setState({ profileObject: res });

            }
        })
    }

    getPackages() {
        HtttpGetDefult('package/list', false).then((res) => {
            if (res) {
                this.setState({ packages: res });
            }
        })
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
            this.checkDisableOrEnableBtn(16, EditArr);

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
        HtttpPutDefult('brand/' + OwnerProfile._id + '', res, true).then((res) => {
            if (res) {
                storeProfile(profileObject);
                displayToast('Profile data is updated successfully', true);
                this.setState({ editMode: false })
            }
        })
    }

    handleChangeComplete = (color) => {
        this.setState({
            profileObject: {
                ...this.state.profileObject,
                displayColor: color.hex
            }
        })

    };

    handleClosePicker(type) {
        this.setState({ displayColorPicker: false })
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
            case 'title':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        displayName: val
                    }
                })
                break;
            case 'description':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        displayDesc: val
                    }
                })
                break;
            case 'color':
                this.setState({
                    profileObject: {
                        ...this.state.profileObject,
                        displayColor: val
                    }
                })
                break;
        }



    }

    selectedPackage(val) {
        this.setState({ selectedPackage: val });
    }

    AddPackageFunc() {
        const { profileObject, selectedPackage } = this.state;
        let body = {
            packageID: selectedPackage._id,
            count: 1
        }
        HtttpPostDefult('brand/buy/package/' + profileObject._id + '', body).then((res) => {
            if (res) {
                displayToast('New package is added successfully', true);
                this.getProfileInfo();
                this.setState({ showPackages: false, selectedPackage: null })
            }
        })
    }

    AddPackage() {
        const { showPackages, packages, selectedPackage } = this.state;
        const handleClose = () => this.setState({ showPackages: false, selectedPackage: null });

        return (
            <>
                <Modal show={showPackages} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Package</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Packages</label>
                                            <DropDown label={"Package"} items={packages} onClick={(val) => { this.selectedPackage(val) }} selctedItem={selectedPackage} />
                                            {!selectedPackage && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={!selectedPackage} onClick={() => this.AddPackageFunc()}>Buy</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    render() {
        const { OwnerProfile } = this.props;
        const { editMode, profilePic, btnDisable, profileObject, showPackages } = this.state;
        const { name, email, password, address, contact, contactPerson, regID, taxID, smtpIntegration, smsApiKey, senderID, sendName, smsCount, emailCount, notificationCount, displayName, displayColor, displayDesc } = profileObject ? profileObject : OwnerProfile;

        return (
            <div className="content CompanyProfile">
                <Col md="12">
                    {showPackages && this.AddPackage()}

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
                                                            <InputWithText type="text" label={"Registration ID"} placeholder={"Enter Registration ID"} onChange={(val) => this.changeInput("regID", val)} value={regID} isRequired validation="number" onBlur={(val) => { this.checkValidation('5', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Tax ID"} placeholder={"Enter Tax ID"} onChange={(val) => this.changeInput("taxID", val)} value={taxID} isRequired validation="number" onBlur={(val) => { this.checkValidation('6', val) }} />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Integration Server"} placeholder={"Enter Integration Server"} onChange={(val) => this.changeInput("server", val)} value={smtpIntegration.server} isRequired onBlur={(val) => { this.checkValidation('7', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Integration Port"} placeholder={"Enter Integration Port"} onChange={(val) => this.changeInput("port", val)} value={smtpIntegration.port} isRequired onBlur={(val) => { this.checkValidation('8', val) }} />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Integration User Name"} placeholder={"Enter Integration User Name"} onChange={(val) => this.changeInput("username", val)} value={smtpIntegration.username} isRequired onBlur={(val) => { this.checkValidation('9', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="password" label={"Integration Password"} placeholder={"Enter Integration Password"} onChange={(val) => this.changeInput("passwordSMTP", val)} value={smtpIntegration.password} isRequired validation="password" onBlur={(val) => { this.checkValidation('10', val) }} />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={4}>
                                                            <InputWithText type="text" label={"SMS Api Key"} placeholder={"Enter SMS Api Key"} onChange={(val) => this.changeInput("smsApiKey", val)} value={smsApiKey} isRequired onBlur={(val) => { this.checkValidation('11', val) }} />
                                                        </Col>
                                                        <Col md={4}>
                                                            <InputWithText type="text" label={"SMS Sender ID"} placeholder={"Enter SMS Sender ID"} onChange={(val) => this.changeInput("senderID", val)} value={senderID} validation="number" isRequired onBlur={(val) => { this.checkValidation('12', val) }} />
                                                        </Col>
                                                        <Col md={4}>
                                                            <InputWithText type="text" label={"Send Name"} placeholder={"Enter Send Name"} onChange={(val) => this.changeInput("sendName", val)} value={sendName} isRequired onBlur={(val) => { this.checkValidation('13', val) }} />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Brand Title"} placeholder={"Enter the brand title"} onChange={(val) => this.changeInput("title", val)} value={displayName} isRequired onBlur={(val) => { this.checkValidation('14', val) }} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <InputWithText type="text" label={"Brand Description"} placeholder={"Enter the brand description"} onChange={(val) => this.changeInput("description", val)} value={displayDesc} isRequired onBlur={(val) => { this.checkValidation('15', val) }} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ display: 'flex', width: '80%', margin: 'auto', marginTop: 20, marginBottom: 20 }}>
                                                        <div className="colorSchemaPart1">
                                                            <label className="Title">Pick your color schema:</label>
                                                            <div className="pickColorOutter" onClick={() => { this.setState({ displayColorPicker: true }) }}>
                                                                <div className={"pickColorInner"} style={{ background: displayColor }}></div>
                                                            </div>
                                                            {
                                                                this.state.displayColorPicker &&
                                                                <PhotoshopPicker
                                                                    color={displayColor}
                                                                    onChangeComplete={this.handleChangeComplete}
                                                                    onCancel={(color) => this.handleClosePicker(color, 'close')}
                                                                    onAccept={(color) => this.handleClosePicker(color, 'accept')}
                                                                />
                                                            }
                                                        </div>
                                                        <div className="colorSchemaPart2">
                                                            <div className="Container">
                                                                <Row className="Row" style={{ borderColor: displayColor }}>
                                                                    <Col md="4" className="Left" style={{ background: displayColor }}>
                                                                        <p className="showTitle">{displayName}</p>
                                                                        <p className="showDesc">{displayDesc}</p>

                                                                    </Col>
                                                                    <Col md="6" className="Right">
                                                                        <p className="NumberTxt">Phone:</p>
                                                                        <div className="Number" style={{ borderColor: displayColor }}></div>
                                                                        <Button style={{ background: displayColor }}>Connect</Button>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
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
                                                            <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>INTEGRATION</h3>
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
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">SMS Sender ID:</label>
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

                                                    <Row>
                                                        <Col>
                                                            <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>COMMERCIAL</h3>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Registration ID:</label>
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
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Push Notification Count:</label>
                                                                <label className="subTitle">{notificationCount}</label>
                                                            </div>
                                                        </Col>

                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Email Count:</label>
                                                                <label className="subTitle">{emailCount}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="detailsContainer">
                                                                <label className="Title">SMS Count:</label>
                                                                <label className="subTitle">{smsCount}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <h3 style={{ marginBottom: '30px', marginTop: '30px' }}>LANDING PAGE CONFIGURATIONS:</h3>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="6">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Title:</label>
                                                                <label className="subTitle">{displayName}</label>
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="detailsContainer" style={{ whiteSpace: 'none' }}>
                                                                <label className="Title">Color Schema:</label>
                                                                <div className="pickColorOutter">
                                                                    <div className={"pickColorInner"} style={{ background: displayColor }}></div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <div className="detailsContainer">
                                                                <label className="Title">Description:</label>
                                                                <label className="subTitle">{displayDesc}</label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row className="buyBtnContainer">
                                                        <button type="button" className="btn btn-success buy" onClick={() => { this.setState({ showPackages: true }) }}>Buy Package</button>
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


