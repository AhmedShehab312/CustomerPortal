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
import './AdminsStyle.scss';
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { displayToast } from '../../globals/globals';
import { StoreAdmins } from '../../store/actions/AdminsAction';
import DatePicker from "react-datepicker";
import moment from 'moment'


class Admins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Admins: null,
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selectedAdmin: null,
            selectedIntervals: null,
            selectedAdminIndex: null,
            Branches: null,
            selectedBranch: null,
            newAdmin: {},
            availableServices: null,
            selectedService: null
        }
    }



    headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    ];


    DataShowPerTable = ["id", "email"];

    async componentDidMount() {
        const { Admins } = this.props;
        // let result = await Admins.filter((Item) => {
        //     return Item.isDeleted == false;
        // })

        this.setState({ Admins: Admins });
        setTimeout(
            () => this.setState({ Admins: Admins }),
            10
        );
    }


    async changeAddInput(Input, val) {
        switch (Input) {
            case 'email':
                await this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        email: val
                    }
                })
                break;
            case 'password':
                await this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        password: val
                    }
                })
                break;
        }
    }


    async changeEditInput(Input, val) {
        switch (Input) {
            case 'email':
                await this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        email: val
                    }
                })
                break;
            case 'password':
                await this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        password: val
                    }
                })
                break;
        }

    }

    // delete(Item, key) {
    //     const { Branches } = this.state;
    //     const { storeBranches } = this.props;
    //     HtttpDeleteDefult("branch/" + Item.id + "").then((res) => {
    //         if (res) {
    //             Branches.splice(key, 1);
    //             this.setState({ Branches: Branches })
    //             storeBranches(Branches)
    //             displayToast('branch is deleted succefully', true);

    //         }
    //     })
    // }


    Details(item) {
        this.setState({ selectedAdmin: item, showDetails: true })
    }

    async Edit(item, index) {

        await this.setState({ selectedAdmin: item, selectedAdminIndex: index, showEdit: true });
    }



    Add() {
        this.setState({ showAdd: true, newAdmin: {}, });
    }

    selectedServices(Item, Index) {
        const { availableServices } = this.state;
        Item.checked = !Item.checked;
        availableServices[Index] = Item;
        this.setState({ availableServices: availableServices });
    }


    selectedBranch(val) {
        let Services;
        if (val.allowedServices.length > 0) {
            Services = val.allowedServices.split(',').map((item, index) => ({ checked: false, name: item }));
        }
        this.setState({ selectedBranch: val, availableServices: Services });

    }

    AddForm() {
        const { showAdd, newAdmin, selectedBranch, availableServices, selectedService } = this.state;
        const { Branches } = this.props;
        const { email, password } = newAdmin;

        const handleClose = () => this.setState({ showAdd: false });
        return (
            <>
                <Modal show={showAdd} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Email"} placeholder={"Enter  email"} value={email} onChange={(val) => { this.changeAddInput('email', val) }} />
                                    </Col>
                                    <Col md={6}>
                                        <InputWithText type="password" label={"Password"} placeholder={"Enter password"} value={password} onChange={(val) => { this.changeAddInput('password', val) }} />
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={6} style={{ margin: 'auto' }}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Branches</label>
                                            <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.selectedBranch(val) }} selctedItem={selectedBranch} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{ width: '45%', margin: 'auto' }}>
                                    {
                                        availableServices &&
                                        availableServices.map((Item, Index) => {
                                            return (
                                                <Col md={6} style={{ marginBottom: '10px' }}>
                                                    <Form.Check checked={Item.checked} label={Item.name} type={"checkbox"} id={Index} onChange={() => { this.selectedServices(Item, Index) }} />
                                                </Col>
                                            )
                                        })
                                    }

                                </Row>
                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => this.AddAdmin()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
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
        const { showDetails, selectedAdmin } = this.state;
        const { email } = selectedAdmin;
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Modal show={showDetails} onHide={handleClose} dialogClassName="modal-70w BranchesDetails">
                    <Modal.Header closeButton>
                        <Modal.Title>Admin Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="4">
                                        <div className="detailsContainer">
                                            <label className="Title">Email:</label>
                                            <label className="subTitle">{email ? email : "No value"}</label>
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

    AddAdmin() {
        const { newAdmin, Admins, selectedBranch } = this.state;
        const { OwnerProfile, StoreAdmins } = this.props;
        newAdmin.BrandId = OwnerProfile.id;
        newAdmin.BranchId = selectedBranch.id;
        this.setState({ showAdd: false });
        HtttpPostDefult("admin/create", newAdmin).then(async (res) => {
            if (!res.errors) {
                Admins.push(res);
                StoreAdmins(Admins);
                await this.attachRoleAdmin(res);
                this.setState({ Admins: Admins });

                displayToast('Admin data is added succefully', true);

            }
            else {
                displayToast('Admin data is not added succefully', false);
            }
        })


    }

    attachRoleAdmin(Admin) {
        const { Admins, selectedBranch, availableServices } = this.state;
        const { StoreAdmins } = this.props;
        let Services = [];
        availableServices.map((Item) => {
            if (Item.checked) {
                Services.push(Item.name)
            }
        });
        let body = {
            "BranchId": selectedBranch.id,
            "allowedServices": Services.join(","),
            "AdminId": Admin.id
        }

        HtttpPostDefult("role/create", body).then((res) => {
            if (!res.errors) {
            }
            else {
                displayToast('AttachRole is not added succefully', false);
            }
        })
    }

    render() {
        const { Admins, showAdd, showDetails, showEdit } = this.state;
        return (
            <Aux>
                <div className="Branches">
                    {showAdd && this.AddForm()}
                    {showEdit && this.EditForm()}
                    {showDetails && this.DetailsForm()}
                    <Row>
                        <Col md="12">
                            <TableData
                                headCells={this.headCells}
                                data={Admins}
                                DataShowPerTable={this.DataShowPerTable}
                                handleDelete={(val, index) => { this.delete(val, index) }}
                                handleDetails={(val, index) => { this.Details(val, index) }}
                                handleEdit={(val, index) => { this.Edit(val, index) }}
                                totalPages={1}
                                Title={"Admins"}
                                handleAdd={() => { this.Add() }}
                            />


                        </Col>
                    </Row>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Admins: state.AdminsState.Admins,
        OwnerProfile: state.ProfileState.OwnerProfile,
        Branches: state.BranchesState.Branches,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        StoreAdmins: (val) => dispatch(StoreAdmins(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Admins);

