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
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { InputWithText, DropDown } from '../../App/components/ComponentModule'
import Aux from "../../hoc/_Aux";
import TableData from '../../App/components/Tables/TablesComp';
import './AdminsStyle.scss';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { displayToast } from '../../globals/globals';
import { StoreAdmins } from '../../store/actions/AdminsAction';
import Card from "../../App/components/MainCard";
import Delete from '../../assets/delete.png';
import Add from '../../assets/add.png';


class Admins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Admins: [],
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
            selectedService: null,
            newAdminRoles: [],
            AddArr: [],
            btnAddDisable: true,
            EditArr: [],
            btnEditDisable: true,
            selectedServices: null,
            errorMsg: null
        }
    }



    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    ];

    headCellsAdminRoless = [
        { id: 'branchName', numeric: false, disablePadding: true, label: 'Branch Name' },
        { id: 'allowedServices', numeric: false, disablePadding: true, label: 'Services' },
    ]

    DataShowPerTableAdminRoles = ["branchName", "allowedServices"]

    DataShowPerTable = ["name", "email"];


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


    checkAddValidation(index, val, allLength) {
        const { AddArr } = this.state;
        let updatedArr;
        updatedArr = AddArr;
        updatedArr[index] = val;
        this.setState({ AddArr: updatedArr })
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


    checkEditValidation(index, val, allLength) {
        const { EditArr } = this.state;
        let updatedArr;
        updatedArr = EditArr;
        updatedArr[index] = val;
        this.setState({ EditArr: updatedArr })
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
            case 'name':
                await this.setState({
                    newAdmin: {
                        ...this.state.newAdmin,
                        name: val
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
            case 'name':
                await this.setState({
                    selectedAdmin: {
                        ...this.state.selectedAdmin,
                        name: val
                    }
                })
                break;
        }

    }



    Details(item) {
        this.setState({ selectedAdmin: item, showDetails: true })
    }

    async Edit(item, index) {
        await this.setState({ selectedAdmin: item, selectedAdminIndex: index, showEdit: true, newAdminRoles: item.adminRoles });
    }



    Add() {
        this.setState({ showAdd: true, newAdmin: {}, });
    }

    selectedServices(Item, Index) {
        const { availableServices, selectedServices } = this.state;
        let res = selectedServices;
        Item.checked = !Item.checked;
        availableServices[Index] = Item;
        res = availableServices.filter((Item) => {
            return Item.checked
        })
        this.setState({ availableServices: availableServices, selectedServices: res });
    }


    selectedBranch(val) {
        let Services;
        if (val.allowedServices.length > 0) {
            Services = val.allowedServices.split(',').map((item, index) => ({ checked: false, name: item }));
        }
        this.setState({ selectedBranch: val, availableServices: Services });

    }

    AddAdminRole() {
        const { availableServices, selectedServices, newAdminRoles, selectedBranch } = this.state;
        let newRole = { branch: {}, allowedServices: null }, services = selectedServices, res = [];
        if (selectedServices == null || selectedServices.length == 0) {
            this.setState({ errorMsg: 'You need to select at least one role' })
        }
        else {
            services.map((Item) => {
                res.push(Item.name)
            })
            newRole.branch = selectedBranch;
            newRole.allowedServices = res.join();
            newAdminRoles.push(newRole);
            availableServices.map((Item) => {
                if (Item.checked) {
                    Item.checked = false
                }
            })
            this.setState({ newAdminRoles: newAdminRoles, selectedServices: null, errorMsg: null, availableServices: availableServices })
        }
    }


    RemovedminRole(Item, index) {
        const { newAdminRoles } = this.state;
        newAdminRoles.splice(index, 1);
        this.setState({ newAdminRoles })
    }


    AddForm() {
        const { showAdd, newAdmin, selectedBranch, availableServices, selectedService, btnAddDisable, newAdminRoles, errorMsg } = this.state;
        const { Branches } = this.props;
        const { email, password, name } = newAdmin;

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
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Email"} placeholder={"Enter admin email"} value={email} onChange={(val) => { this.changeAddInput('email', val) }} validation="email" isRequired onBlur={(val) => { this.checkAddValidation('0', val, 3) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter admin name"} value={name} onChange={(val) => { this.changeAddInput('name', val) }} isRequired onBlur={(val) => { this.checkAddValidation('1', val, 3) }} />
                                    </Col>

                                    <Col md={4}>
                                        <InputWithText type="password" label={"Password"} placeholder={"Enter password"} value={password} onChange={(val) => { this.changeAddInput('password', val) }} validation="password" isRequired onBlur={(val) => { this.checkAddValidation('2', val, 3) }} />
                                    </Col>
                                </Row>
                                {newAdminRoles && newAdminRoles.length > 0 && <p className="AdminRolesTitle">Admin Roles:</p>}
                                {newAdminRoles && newAdminRoles.map((Item, index) => {
                                    return (
                                        <Row>
                                            <Col md="4">
                                                <p style={{ fontSize: '16px' }}>{Item.branch.name}</p>
                                            </Col>
                                            <Col md="6">
                                                {Item.allowedServices.split(',').map((ser) => {
                                                    return <Chip style={{ margin: '4px' }} label={ser} variant="outlined" avatar={<Avatar>R</Avatar>}
                                                    />
                                                })}

                                            </Col>
                                            <Col md="2">
                                                <img src={Delete} style={{ cursor: 'pointer', width: '27%' }} onClick={() => this.RemovedminRole(Item, index)} />
                                            </Col>
                                        </Row>
                                    )
                                })
                                }
                                <Row >
                                    <Col md={6} style={{ margin: 'auto' }}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Branches</label>
                                            <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.selectedBranch(val) }} selctedItem={selectedBranch} />
                                            {errorMsg && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{errorMsg}</label>}
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
                                <div className="text-center">
                                    <img src={Add} style={{ cursor: 'pointer', width: '6%' }} onClick={() => this.AddAdminRole()} />
                                </div>

                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnAddDisable} onClick={() => this.AddAdmin()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }



    EditForm() {
        const { showEdit, selectedAdmin, btnEditDisable, errorMsg, selectedBranch, availableServices, newAdminRoles } = this.state;
        const { Branches } = this.props;
        const { name, email, password } = selectedAdmin

        const handleClose = () => this.setState({ showEdit: false, newAdminRoles: [] });
        return (
            <>
                <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Email"} placeholder={"Enter admin email"} value={email} onChange={(val) => { this.changeEditInput('email', val) }} validation="email" isRequired onBlur={(val) => { this.checkEditValidation('0', val, 3) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter admin name"} value={name} onChange={(val) => { this.changeEditInput('name', val) }} isRequired onBlur={(val) => { this.checkEditValidation('1', val, 3) }} />
                                    </Col>

                                    <Col md={4}>
                                        <InputWithText type="password" label={"Password"} placeholder={"Enter password"} value={password} onChange={(val) => { this.changeEditInput('password', val) }} validation="password" isRequired onBlur={(val) => { this.checkEditValidation('2', val, 3) }} />
                                    </Col>
                                </Row>
                                {newAdminRoles && newAdminRoles.length > 0 && <p className="AdminRolesTitle">Admin Roles:</p>}
                                {newAdminRoles && newAdminRoles.map((Item, index) => {
                                    return (
                                        <Row>
                                            <Col md="4">
                                                <p style={{ fontSize: '16px' }}>{Item.branch.name}</p>
                                            </Col>
                                            <Col md="6">
                                                {Item.allowedServices.split(',').map((ser) => {
                                                    return <Chip style={{ margin: '4px' }} label={ser} variant="outlined" avatar={<Avatar>R</Avatar>}
                                                    />
                                                })}

                                            </Col>
                                            <Col md="2">
                                                <img src={Delete} style={{ cursor: 'pointer', width: '27%' }} onClick={() => this.RemovedminRole(Item, index)} />
                                            </Col>
                                        </Row>
                                    )
                                })
                                }
                                <Row >
                                    <Col md={6} style={{ margin: 'auto' }}>
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Branches</label>
                                            <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.selectedBranch(val) }} selctedItem={selectedBranch} />
                                            {errorMsg && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{errorMsg}</label>}
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
                                <div className="text-center">
                                    <img src={Add} style={{ cursor: 'pointer', width: '6%' }} onClick={() => this.AddAdminRole()} />
                                </div>

                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnEditDisable} onClick={() => this.EditAdmin()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selectedAdmin } = this.state;
        const { email, name, adminRoles } = selectedAdmin;
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Col md="12" >
                    <Card title={'Admin Details'}>
                        <CardBody>
                            <Form>
                                <div className="BranchesDetails">
                                    <Row>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Email:</label>
                                                <label className="subTitle">{email ? email : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Name:</label>
                                                <label className="subTitle">{name ? name : "No value"}</label>
                                            </div>
                                        </Col>

                                    </Row>
                                    {adminRoles && adminRoles.length > 0 && <p className="AdminRolesTitle">Admin Roles:</p>}
                                    {adminRoles && adminRoles.map((Item, index) => {
                                        return (
                                            <Row>
                                                <Col md="4">
                                                    <p style={{ fontSize: '16px' }}>{Item.branch.name}</p>
                                                </Col>
                                                <Col md="6">
                                                    {Item.allowedServices.split(',').map((ser) => {
                                                        return <Chip style={{ margin: '4px' }} label={ser} variant="outlined" avatar={<Avatar>R</Avatar>}
                                                        />
                                                    })}

                                                </Col>
                                            </Row>
                                        )
                                    })
                                    }
                                </div>
                                <Button variant="secondary" style={{ marginTop: '20px' }} onClick={handleClose}>Close</Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }


    EditAdmin() {
        const { selectedAdmin, newAdminRoles, Admins, selectedAdminIndex } = this.state;
        const { StoreAdmins } = this.props;
        selectedAdmin.adminRoles = newAdminRoles;
        this.setState({ showEdit: false });
        HtttpPutDefult("admin/" + selectedAdmin._id + "", selectedAdmin, true).then((res) => {
            if (res) {
                Admins[selectedAdminIndex] = selectedAdmin;
                this.setState({ Admins: Admins, newAdminRoles: [] });
                StoreAdmins(Admins)
                displayToast('The Admin is updated successfully', true);
            }
        })
    }

    AddAdmin() {
        const { newAdmin, Admins, newAdminRoles } = this.state;
        const { OwnerProfile, StoreAdmins } = this.props;
        newAdmin.brand = OwnerProfile._id;
        newAdmin.adminRoles = newAdminRoles;
        this.setState({ showAdd: false });
        HtttpPostDefult("admin/create", newAdmin, true).then(async (res) => {
            if (!res.errors) {
                newAdmin._id = res.id
                Admins.push(newAdmin);
                StoreAdmins(Admins);
                this.setState({ Admins: Admins, newAdminRoles: [] });
                displayToast('"The Admin is created successfully"', true);
            }
            else {
                displayToast('"The Admin is not created successfully"', false);
            }
        })
    }

    delete(Item, key) {
        const { Admins } = this.state;
        const { StoreAdmins } = this.props;
        HtttpDeleteDefult("admin/" + Item._id + "", true).then((res) => {
            if (res) {
                Admins.splice(key, 1);
                this.setState({ Admins: Admins })
                StoreAdmins(Admins)
                displayToast('Admin is deleted successfully', true);
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
                    {!showAdd && !showEdit && !showDetails &&

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
                                    showDelete
                                    noResultMSG={"There is no available admins"}
                                    addMSG={"add new admin"}
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
        Admins: state.storage.AdminsState.Admins,
        OwnerProfile: state.storage.ProfileState.OwnerProfile,
        Branches: state.storage.BranchesState.Branches,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        StoreAdmins: (val) => dispatch(StoreAdmins(val)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Admins);

