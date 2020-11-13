import React from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    Form
} from 'react-bootstrap';
import {
    CardBody,
    FormGroup,
} from 'reactstrap';

import { InputWithText, DropDown } from '../../App/components/ComponentModule'
import Aux from "../../hoc/_Aux";
import TableData from '../../App/components/Tables/TablesComp';
import './BranchesStyle.scss';
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';
import { StoreBranches } from '../../store/actions/BranchsAction';
import DatePicker from "react-datepicker";
import moment from 'moment'
import Card from "../../App/components/MainCard";


class Branches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Branches: [],
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selectedBranch: null,
            selectedIntervals: null,
            selectedBranchIndex: null,
            newBranch: {},
            EditArr: [],
            AddArr: [],
            btnEditDisable: true,
            btnAddDisable: true,
            NewAccessPoints: {},
            showAddAccessPoint: false,
            AccessPointsValidationArr: [],
            btnAddDisableAccessPoints: true,
            SelectedAccessPoints: null,
            SelectedAccessPointsIndex: null,
            showEditAccessPoint: false,
            btnEditDisableAccessPoints: true,
        }
    }

    intervals = [
        { id: "0", name: "1" },
        { id: "1", name: "3" },
        { id: "2", name: "6" },
        { id: "3", name: "9" },
        { id: "4", name: "12" },
    ]

    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'startDate', numeric: false, disablePadding: true, label: 'Date of Creation' },
        { id: 'interval', numeric: false, disablePadding: true, label: 'Interval' },
        { id: 'notificationEmail', numeric: false, disablePadding: true, label: 'Notification Email' },
    ];

    headCellsAccessPoints = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'macAddress', numeric: false, disablePadding: true, label: 'Mac Address' },
    ]

    DataShowPerTableAccessPoints = ["name", "macAddress"];

    DataShowPerTable = ["name", "startDate", "interval", "notificationEmail"];

    async componentDidMount() {
        const { Branches } = this.props;
        if (Branches && Branches.length > 0) {
            let result = await Branches.filter((Item) => {
                return Item.isDeleted == false;
            })

            this.setState({ Branches: result });
            setTimeout(
                () => this.setState({ Branches: result }),
                10
            );
        }

    }



    checkEditValidation(index, val, allLength) {
        const { EditArr } = this.state;
        let updatedArr;
        updatedArr = EditArr;
        updatedArr[index] = val;
        this.setState({ EditArr: updatedArr })
        console.log(updatedArr);
        this.checkDisableOrEnableBtnEdit(allLength, EditArr);

    }

    checkDisableOrEnableBtnEdit(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnEditDisable: true })
            }
            else {
                this.setState({ btnEditDisable: false })

            }
        }
        else {
            this.setState({ btnEditDisable: true })
        }
    }



    checkAddValidation(index, val, allLength) {
        const { AddArr } = this.state;
        let updatedArr;
        updatedArr = AddArr;
        updatedArr[index] = val;
        this.setState({ AddArr: updatedArr })
        console.log(updatedArr);
        this.checkDisableOrEnableBtnAddd(allLength, AddArr);

    }

    checkDisableOrEnableBtnAddd(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnAddDisable: true })
            }
            else {
                this.setState({ btnAddDisable: false })
            }
        }
        else {
            this.setState({ btnAddDisable: true })
        }
    }



    async changeAddInput(Input, val) {
        switch (Input) {
            case 'name':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        name: val
                    }
                })
                break;
            case 'startDate':
                this.checkAddValidation('1', true, 9);
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        startDate: val
                    }
                })
                break;
            case 'interval':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        interval: val
                    }
                })
                break;
            case 'flashStartUsername':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        flashStartUsername: val
                    }
                })
                break;
            case 'notificationEmail':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        notificationEmail: val
                    }
                })
                break;
            case 'nasName':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        nasName: val
                    }
                })
                break;
            case 'type':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        type: val
                    }
                })
                break;
            case 'price':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        price: val
                    }
                })
                break;
            case 'flashStartPass':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        flashStartPass: val
                    }
                })
                break;
            case 'currency':
                await this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        currency: val
                    }
                })
                break;
        }

    }

    async changeEditInput(Input, val) {

        switch (Input) {
            case 'name':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        name: val
                    }
                })
                break;
            case 'startDate':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        startDate: val
                    }
                })
                break;
            case 'interval':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        interval: val
                    }
                })
                break;
            case 'flashStartUsername':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        flashStartUsername: val
                    }
                })
                break;
            case 'notificationEmail':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        notificationEmail: val
                    }
                })
                break;
            case 'nasName':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        nasName: val
                    }
                })
                break;
            case 'type':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        type: val
                    }
                })
                break;
            case 'price':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        price: val
                    }
                })
                break;
            case 'currency':
                await this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        currency: val
                    }
                })
                break;


        }

    }

    delete(Item, key) {
        const { Branches } = this.state;
        const { storeBranches } = this.props;
        HtttpDeleteDefult("branch/" + Item.id + "").then((res) => {
            if (res) {
                Branches.splice(key, 1);
                this.setState({ Branches: Branches })
                storeBranches(Branches)
                displayToast('branch is deleted successfully', true);

            }
        })
    }


    Details(item, index) {
        this.setState({ selectedBranch: item, showDetails: true, selectedBranchIndex: index })

    }

    async Edit(item, index) {
        let selectedInterval;
        if (item.interval) {
            selectedInterval = await this.intervals.filter((Item) => {
                return item.interval == Item.name
            })
        }
        if (item.startDate) this.checkEditValidation('1', true, 7);
        await this.setState({ selectedBranch: item, selectedBranchIndex: index, showEdit: true, selectedIntervals: selectedInterval[0] });
    }



    Add() { this.setState({ showAdd: true, newBranch: {}, selectedIntervals: null }); }

    AddAccessPoint() { this.setState({ showAddAccessPoint: true, NewAccessPoints: {} }) }
    EditAccessPoint(item, index) { this.setState({ showEditAccessPoint: true, SelectedAccessPoints: item, SelectedAccessPointsIndex: index }) }
    selectedInterval(val) {
        this.setState({ selectedIntervals: val });

    }


    AddForm() {
        const { showAdd, newBranch, selectedIntervals, AddArr, btnAddDisable } = this.state;
        const { name, startDate, flashStartUsername, notificationEmail, nasName, type, price, flashStartPass, currency } = newBranch;
        const handleClose = () => this.setState({ showAdd: false });
        return (
            <>
                <Modal show={showAdd} onHide={handleClose} dialogClassName="modal-70w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Branch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeAddInput('name', val) }} isRequired onBlur={(val) => { this.checkAddValidation('0', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <label className="Title">Start Date:</label>
                                        <div>
                                            <DatePicker className="DatePicker" selected={startDate ? moment(startDate).toDate() : null} onChange={date => this.changeAddInput('startDate', moment(date).format('DD-MMM-YYYY'))} onBlur={(val) => { this.checkAddValidation('1', val.target.value ? true : false, 9) }} />
                                            <i class="fas fa-calendar-alt"></i>
                                            {!AddArr[1] && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}

                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Flash Start Username"} placeholder={"Enter Flash Start Username"} value={flashStartUsername} onChange={(val) => { this.changeAddInput('flashStartUsername', val) }} isRequired onBlur={(val) => { this.checkAddValidation('2', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Intervals</label>
                                            <DropDown label={"Interval"} items={this.intervals} onClick={(val) => { this.selectedInterval(val) }} selctedItem={selectedIntervals} />
                                            {!selectedIntervals && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}

                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Notification Email"} placeholder={"Enter Notification Email"} value={notificationEmail} onChange={(val) => { this.changeAddInput('notificationEmail', val) }} validation="email" isRequired onBlur={(val) => { this.checkAddValidation('3', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"NAS Name"} placeholder={"Enter NAS Name"} value={nasName} onChange={(val) => { this.changeAddInput('nasName', val) }} isRequired onBlur={(val) => { this.checkAddValidation('4', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Type"} placeholder={"Enter Notification Type"} value={type} onChange={(val) => { this.changeAddInput('type', val) }} isRequired onBlur={(val) => { this.checkAddValidation('5', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Price"} placeholder={"Enter Price"} value={price} onChange={(val) => { this.changeAddInput('price', val) }} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('6', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="password" label={"Flash Start Passoword"} placeholder={"Enter Flash Start Passoword "} value={flashStartPass} onChange={(val) => { this.changeAddInput('flashStartPass', val) }} validation="password" isRequired onBlur={(val) => { this.checkAddValidation('7', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"currency"} placeholder={"Enter Currency"} value={currency} onChange={(val) => { this.changeAddInput('currency', val) }} validation="number" isRequired onBlur={(val) => { this.checkAddValidation('8', val, 9) }} />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnAddDisable && !selectedIntervals} onClick={() => this.AddBranch()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    EditForm() {
        const { showEdit, selectedBranch, selectedIntervals, btnEditDisable, EditArr } = this.state;
        const { name, startDate, flashStartUsername, notificationEmail, nasName, type, price, currency } = selectedBranch
        const handleClose = () => this.setState({ showEdit: false });
        return (
            <>
                <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Branch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeEditInput('name', val) }} isRequired onBlur={(val) => { this.checkEditValidation('0', val, 8) }} />
                                    </Col>
                                    <Col md={4}>
                                        <label className="Title">Start Date:</label>
                                        <div>
                                            <DatePicker className="DatePicker" selected={moment(startDate).toDate()} onChange={date => this.changeEditInput('startDate', moment(date).format('DD-MMM-YYYY'))} onBlur={(val) => { this.checkEditValidation('1', val.target.value ? true : false, 8) }} />
                                            <i class="fas fa-calendar-alt"></i>
                                            {!EditArr[1] && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Flash Start Username"} placeholder={"Enter Flash Start Username"} value={flashStartUsername} onChange={(val) => { this.changeEditInput('flashStartUsername', val) }} isRequired onBlur={(val) => { this.checkEditValidation('2', val, 8) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Intervals</label>
                                            <DropDown label={"Interval"} items={this.intervals} onClick={(val) => { this.selectedInterval(val) }} selctedItem={selectedIntervals} />
                                            {!selectedIntervals && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>This field is required</label>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Notification Email"} placeholder={"Enter Notification Email"} value={notificationEmail} onChange={(val) => { this.changeEditInput('notificationEmail', val) }} isRequired validation="email" onBlur={(val) => { this.checkEditValidation('3', val, 8) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"NAS Name"} placeholder={"Enter NAS Name"} value={nasName} onChange={(val) => { this.changeEditInput('nasName', val) }} isRequired onBlur={(val) => { this.checkEditValidation('4', val, 8) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Type"} placeholder={"Enter Notification Type"} value={type} onChange={(val) => { this.changeEditInput('type', val) }} isRequired onBlur={(val) => { this.checkEditValidation('5', val, 8) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Price"} placeholder={"Enter Price"} value={price} onChange={(val) => { this.changeEditInput('price', val) }} isRequired validation="number" onBlur={(val) => { this.checkEditValidation('6', val, 8) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"currency"} placeholder={"Enter Currency"} value={currency} onChange={(val) => { this.changeEditInput('currency', val) }} validation="number" isRequired onBlur={(val) => { this.checkEditValidation('7', val, 8) }} />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnEditDisable && selectedIntervals} onClick={() => this.EditBranch()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selectedBranch, showAddAccessPoint, showEditAccessPoint } = this.state;
        const { name, startDate, renewalDate, interval, flashStartUsername, notificationEmail, nasName, type, price, allowedServices, accessPoints, currency } = selectedBranch
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                {showAddAccessPoint && this.AddFormAccessPoint()}
                {showEditAccessPoint && this.EditFormAccessPoint()}


                <Col md="12" >
                    <Card title={'Branch Details'}>
                        <CardBody>
                            <Form>
                                <div className="BranchesDetails">
                                    <Row>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Name:</label>
                                                <label className="subTitle">{name ? name : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Start Date:</label>
                                                <label className="subTitle">{startDate ? startDate : "No value"}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Renewal Date:</label>
                                                <label className="subTitle">{renewalDate ? renewalDate : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Interval:</label>
                                                <label className="subTitle">{interval ? interval : "No value"}</label>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Flash Start Username:</label>
                                                <label className="subTitle">{flashStartUsername ? flashStartUsername : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Notification Email:</label>
                                                <label className="subTitle">{notificationEmail ? notificationEmail : "No value"}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Nas Name:</label>
                                                <label className="subTitle">{nasName ? nasName : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Type:</label>
                                                <label className="subTitle">{type ? type : "No value"}</label>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Price:</label>
                                                <label className="subTitle">{price ? price : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">currency:</label>
                                                <label className="subTitle">{currency ? currency : "No value"}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <div className="detailsContainer">
                                                <label className="Title">Allowed Services:</label>
                                                <label className="subTitle">{allowedServices ? allowedServices : "No value"}</label>
                                            </div>
                                        </Col>

                                    </Row>
                                </div>
                                <Row>
                                    <Col md="12">
                                        <TableData
                                            headCells={this.headCellsAccessPoints}
                                            data={accessPoints}
                                            DataShowPerTable={this.DataShowPerTableAccessPoints}
                                            // handleDelete={(val, index) => { this.delete(val, index) }}
                                            // handleDetails={(val, index) => { this.Details(val, index) }}
                                            handleEdit={(val, index) => { this.EditAccessPoint(val, index) }}
                                            totalPages={1}
                                            Title={"Access Points"}
                                            handleAdd={() => { this.AddAccessPoint() }}
                                        />
                                    </Col>
                                </Row>
                                <Button variant="secondary" style={{ marginTop: '20px' }} onClick={handleClose}>Close</Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }


    EditBranch() {
        const { selectedBranch, selectedBranchIndex, Branches, selectedIntervals } = this.state;
        const { storeBranches } = this.props;
        selectedBranch.interval = selectedIntervals.name;
        this.setState({ showEdit: false });
        HtttpPutDefult("branch/" + selectedBranch._id + "", selectedBranch).then((res) => {
            if (res) {
                Branches[selectedBranchIndex] = selectedBranch;
                this.setState({ Branches: Branches });
                storeBranches(Branches)
                displayToast('Branch is updated successfully', true);
            }
        })
    }

    AddBranch() {
        const { newBranch, Branches, selectedIntervals } = this.state;
        const { OwnerProfile, storeBranches } = this.props;
        this.setState({ showAdd: false });
        newBranch.brand = OwnerProfile._id;
        newBranch.isActive = true;
        newBranch.isDeleted = false;
        newBranch.renewalDate = null;
        newBranch.interval = selectedIntervals.name;
        newBranch.allowedServices = "";
        newBranch.accessPoints = null
        HtttpPostDefult("branch/create", newBranch).then((res) => {
            if (!res.errors) {
                Branches.push(newBranch);
                storeBranches(Branches);
                this.setState({ Branches: Branches });
                displayToast(res.message, true);
            }
            else {
                displayToast('Branch data is not added successfully', false);
            }
        })
    }

    async changeAddInputAccessPoint(Input, val) {
        switch (Input) {
            case 'name':
                await this.setState({
                    NewAccessPoints: {
                        ...this.state.NewAccessPoints,
                        name: val
                    }
                })
                break;
            case 'macAddress':
                await this.setState({
                    NewAccessPoints: {
                        ...this.state.NewAccessPoints,
                        macAddress: val
                    }
                })
                break;
        }
    }




    async changeEditInputAccessPoint(Input, val) {
        switch (Input) {
            case 'name':
                await this.setState({
                    SelectedAccessPoints: {
                        ...this.state.SelectedAccessPoints,
                        name: val
                    }
                })
                break;
            case 'macAddress':
                await this.setState({
                    SelectedAccessPoints: {
                        ...this.state.SelectedAccessPoints,
                        macAddress: val
                    }
                })
                break;
        }
    }






    checkAddValidationAccessPoint(index, val, allLength) {
        const { AccessPointsValidationArr } = this.state;
        let updatedArr;
        updatedArr = AccessPointsValidationArr;
        updatedArr[index] = val;
        this.setState({ AccessPointsValidationArr: updatedArr })
        console.log(updatedArr);
        this.checkDisableOrEnableBtnAP(allLength, AccessPointsValidationArr);

    }

    checkDisableOrEnableBtnAP(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnAddDisableAccessPoints: true })
            }
            else {
                this.setState({ btnAddDisableAccessPoints: false })
            }
        }
        else {
            this.setState({ btnAddDisableAccessPoints: true })
        }
    }

    checkDisableOrEnableBtnEditAP(num, arr) {
        let result;
        if (arr.length == num) {
            result = arr.filter((Item) => {
                return Item
            });
            if (result.length != num) {
                this.setState({ btnEditDisableAccessPoints: true })
            }
            else {
                this.setState({ btnEditDisableAccessPoints: false })
            }
        }
        else {
            this.setState({ btnEditDisableAccessPoints: true })
        }
    }




    checkEditValidationAccessPoint(index, val, allLength) {
        const { AccessPointsValidationArr } = this.state;
        let updatedArr;
        updatedArr = AccessPointsValidationArr;
        updatedArr[index] = val;
        this.setState({ AccessPointsValidationArr: updatedArr })
        console.log(updatedArr);
        this.checkDisableOrEnableBtnEditAP(allLength, AccessPointsValidationArr);

    }


    AddAccessPointSubmit() {
        const { selectedBranch, selectedBranchIndex, Branches, NewAccessPoints } = this.state;
        const { storeBranches } = this.props;
        debugger
        selectedBranch.accessPoints ? selectedBranch.accessPoints.push(NewAccessPoints) : selectedBranch.accessPoints = [NewAccessPoints];
        this.setState({ showAddAccessPoint: false });
        HtttpPutDefult("branch/" + selectedBranch._id + "", selectedBranch).then((res) => {
            if (res) {
                Branches[selectedBranchIndex] = selectedBranch;
                this.setState({ Branches: Branches });
                storeBranches(Branches)
                displayToast('The access point is created successfully', true);
            }
        })
    }

    EditAccessPointSubmit() {
        const { selectedBranch, selectedBranchIndex, Branches, SelectedAccessPointsIndex, SelectedAccessPoints } = this.state;
        const { storeBranches } = this.props;
        selectedBranch.accessPoints[SelectedAccessPointsIndex] = SelectedAccessPoints;
        this.setState({ showEditAccessPoint: false });
        HtttpPutDefult("branch/" + selectedBranch._id + "", selectedBranch).then((res) => {
            if (res) {
                Branches[selectedBranchIndex] = selectedBranch;
                this.setState({ Branches: Branches });
                storeBranches(Branches)
                displayToast('The access point is updated successfully', true);
            }
        })
    }




    AddFormAccessPoint() {
        const { showAddAccessPoint, NewAccessPoints, btnAddDisableAccessPoints } = this.state;
        const { name, macAddress } = NewAccessPoints;
        const handleClose = () => this.setState({ showAddAccessPoint: false });
        return (
            <>
                <Modal show={showAddAccessPoint} onHide={handleClose} dialogClassName="modal-70w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Access Points</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter access point name"} value={name} onChange={(val) => { this.changeAddInputAccessPoint('name', val) }} isRequired onBlur={(val) => { this.checkAddValidationAccessPoint('0', val, 2) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Mac Address "} placeholder={"Enter mac address"} value={macAddress} onChange={(val) => { this.changeAddInputAccessPoint('macAddress', val) }} isRequired onBlur={(val) => { this.checkAddValidationAccessPoint('1', val, 2) }} />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnAddDisableAccessPoints} onClick={() => this.AddAccessPointSubmit()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    EditFormAccessPoint() {
        const { showEditAccessPoint, SelectedAccessPoints, btnEditDisableAccessPoints, SelectedAccessPointsIndex } = this.state;
        const { name, macAddress } = SelectedAccessPoints
            ;
        const handleClose = () => this.setState({ showEditAccessPoint: false });
        return (
            <>
                <Modal show={showEditAccessPoint} onHide={handleClose} dialogClassName="modal-70w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Access Points</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter access point name"} value={name} onChange={(val) => { this.changeEditInputAccessPoint('name', val) }} isRequired onBlur={(val) => { this.checkEditValidationAccessPoint('0', val, 2) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Mac Address "} placeholder={"Enter mac address"} value={macAddress} onChange={(val) => { this.changeEditInputAccessPoint('macAddress', val) }} isRequired onBlur={(val) => { this.checkEditValidationAccessPoint('1', val, 2) }} />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnEditDisableAccessPoints} onClick={() => this.EditAccessPointSubmit()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    render() {
        const { Branches, showAdd, showDetails, showEdit } = this.state;
        return (
            <Aux>
                <div className="Branches">
                    {showAdd && this.AddForm()}
                    {showEdit && this.EditForm()}
                    {showDetails && this.DetailsForm()}
                    {!showAdd && !showEdit && !showDetails &&
                        <Row>
                            <Col md="12">
                                <TableData
                                    headCells={this.headCells}
                                    data={Branches}
                                    DataShowPerTable={this.DataShowPerTable}
                                    handleDelete={(val, index) => { this.delete(val, index) }}
                                    handleDetails={(val, index) => { this.Details(val, index) }}
                                    handleEdit={(val, index) => { this.Edit(val, index) }}
                                    totalPages={1}
                                    Title={"Branches"}
                                    handleAdd={() => { this.Add() }}
                                    showDelete={false}
                                />
                            </Col>
                        </Row>
                    }
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Branches: state.storage.BranchesState.Branches,
        OwnerProfile: state.storage.ProfileState.OwnerProfile,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeBranches: (val) => dispatch(StoreBranches(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Branches);

