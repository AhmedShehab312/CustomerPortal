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
    FormGroup
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


class Branches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Branches: null,
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selectedBranch: null,
            selectedIntervals: null,
            selectedBranchIndex: null,
            newBranch: {},
        }
    }

    intervals = [
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


    DataShowPerTable = ["name", "startDate", "interval", "notificationEmail"];

    async componentDidMount() {
        const { Branches } = this.props;

        let result = await Branches.filter((Item) => {
            return Item.isDeleted == false;
        })

        this.setState({ Branches: result });
        setTimeout(
            () => this.setState({ Branches: result }),
            10
        );
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
                displayToast('branch is deleted succefully', true);

            }
        })
    }


    Details(item) {
        this.setState({ selectedBranch: item, showDetails: true })

    }

    async Edit(item, index) {
        let selectedInterval;
        if (item.interval) {
            selectedInterval = await this.intervals.filter((Item) => {
                return item.interval == Item.name
            })
        }
        await this.setState({ selectedBranch: item, selectedBranchIndex: index, showEdit: true, selectedIntervals: selectedInterval[0] });
    }



    Add() {
        this.setState({
            showAdd: true,
            newBranch: {},
            selectedIntervals: null,

        });

    }

    AddForm() {
        const { showAdd, newBranch, selectedIntervals } = this.state;
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
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeAddInput('name', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <label className="Title">Start Date:</label>
                                        <div>
                                            <DatePicker className="DatePicker" selected={moment(startDate).toDate()} onChange={date => this.changeAddInput('startDate', moment(date).format('DD-MMM-YYYY'))} />
                                            <i class="fas fa-calendar-alt"></i>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"flash Start Username"} placeholder={"Enter flash Start Username"} value={flashStartUsername} onChange={(val) => { this.changeAddInput('flashStartUsername', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Intervals</label>
                                            <DropDown label={"Interval"} items={this.intervals} onClick={(val) => { this.selectedInterval(val) }} selctedItem={selectedIntervals} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Notification Email"} placeholder={"Enter Notification Email"} value={notificationEmail} onChange={(val) => { this.changeAddInput('notificationEmail', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"nas Name"} placeholder={"Enter nasName"} value={nasName} onChange={(val) => { this.changeAddInput('nasName', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Type"} placeholder={"Enter Notification Type"} value={type} onChange={(val) => { this.changeAddInput('type', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Price"} placeholder={"Enter Price"} value={price} onChange={(val) => { this.changeAddInput('price', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="password" label={"Flash Start Pass"} placeholder={"Enter Flash Start Pass "} value={flashStartPass} onChange={(val) => { this.changeAddInput('flashStartPass', val) }} />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={4}>
                                        <InputWithText type="text" label={"currency"} placeholder={"Enter Currency"} value={currency} onChange={(val) => { this.changeAddInput('currency', val) }} />
                                    </Col>
                                </Row>


                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => this.AddBranch()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    selectedInterval(val) {
        this.setState({ selectedIntervals: val });
    }


    EditForm() {
        const { showEdit, selectedBranch, selectedIntervals } = this.state;
        const { name, startDate, flashStartUsername, notificationEmail, nasName, type, price } = selectedBranch

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
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeEditInput('name', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <label className="Title">Start Date:</label>
                                        <div>
                                            <DatePicker className="DatePicker" selected={moment(startDate).toDate()} onChange={date => this.changeEditInput('startDate', moment(date).format('DD-MMM-YYYY'))} />
                                            <i class="fas fa-calendar-alt"></i>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"flash Start Username"} placeholder={"Enter flash Start Username"} value={flashStartUsername} onChange={(val) => { this.changeEditInput('flashStartUsername', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Intervals</label>
                                            <DropDown label={"Interval"} items={this.intervals} onClick={(val) => { this.selectedInterval(val) }} selctedItem={selectedIntervals} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Notification Email"} placeholder={"Enter Notification Email"} value={notificationEmail} onChange={(val) => { this.changeEditInput('notificationEmail', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"nas Name"} placeholder={"Enter nasName"} value={nasName} onChange={(val) => { this.changeEditInput('nasName', val) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Type"} placeholder={"Enter Notification Type"} value={type} onChange={(val) => { this.changeEditInput('type', val) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Price"} placeholder={"Enter Price"} value={price} onChange={(val) => { this.changeEditInput('price', val) }} />
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => this.EditBranch()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selectedBranch } = this.state;
        const { name, startDate, renewalDate, interval, flashStartUsername, notificationEmail, nasName, type, price, allowedServices } = selectedBranch
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Modal show={showDetails} onHide={handleClose} dialogClassName="modal-70w BranchesDetails">
                    <Modal.Header closeButton>
                        <Modal.Title>Branch Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Name:</label>
                                            <label className="subTitle">{name ? name : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Start Date:</label>
                                            <label className="subTitle">{startDate ? startDate : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Renewal Date:</label>
                                            <label className="subTitle">{renewalDate ? renewalDate : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Interval:</label>
                                            <label className="subTitle">{interval ? interval : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Flash Start Username:</label>
                                            <label className="subTitle">{flashStartUsername ? flashStartUsername : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Notification Email:</label>
                                            <label className="subTitle">{notificationEmail ? notificationEmail : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Nas Name:</label>
                                            <label className="subTitle">{nasName ? nasName : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Type:</label>
                                            <label className="subTitle">{type ? type : "No value"}</label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Price:</label>
                                            <label className="subTitle">{price ? price : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="10">
                                        <div className="detailsContainer">
                                            <label className="Title">Allowed Services:</label>
                                            <label className="subTitle">{allowedServices ? allowedServices : "No value"}</label>
                                        </div>
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    EditBranch() {
        const { selectedBranch, selectedBranchIndex, Branches, selectedIntervals } = this.state;
        const { storeBranches } = this.props;
        selectedBranch.interval = selectedIntervals.name;
        this.setState({ showEdit: false });
        HtttpPutDefult("branch/" + selectedBranch.id + "", selectedBranch).then((res) => {
            if (res) {
                Branches[selectedBranchIndex] = selectedBranch;
                this.setState({ Branches: Branches });
                storeBranches(Branches)
                displayToast('Branch is updated succefully', true);
            }
        })
    }

    AddBranch() {
        const { newBranch, Branches, selectedIntervals } = this.state;
        const { OwnerProfile, storeBranches } = this.props;
        this.setState({ showAdd: false });
        newBranch.BrandId = OwnerProfile.id;
        newBranch.isActive = true;
        newBranch.isDeleted = false;
        newBranch.renewalDate = null;
        newBranch.interval = selectedIntervals.name;
        newBranch.allowedServices = "";
        HtttpPostDefult("branch/create", newBranch).then((res) => {
            if (!res.errors) {
                Branches.push(res);
                storeBranches(Branches);
                this.setState({ Branches: Branches });
                displayToast('Branch data is added succefully', true);
            }
            else {
                displayToast('Branch data is not added succefully', false);
            }
        })
    }


    render() {
        const { Branches, showAdd, showDetails, showEdit } = this.state;
        return (
            <Aux>
                <div className="Branches">
                    {showAdd && this.AddForm()}
                    {showEdit && this.EditForm()}
                    {showDetails && this.DetailsForm()}
                    <Row>
                        <Col md="12">
                            {
                                Branches && Branches.length > 0 ?
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
                                    />
                                    :
                                    <p className="noResult">No Branches Found</p>

                            }

                        </Col>
                    </Row>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Branches: state.BranchesState.Branches,
        OwnerProfile: state.ProfileState.OwnerProfile,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeBranches: (val) => dispatch(StoreBranches(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Branches);

