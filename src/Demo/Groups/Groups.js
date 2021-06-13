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
import './GroupsStyle.scss';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { displayToast } from '../../globals/globals';
import { StoreGroups } from '../../store/actions/GroupsAction';
import Card from "../../App/components/MainCard";
import Delete from '../../assets/delete.png';
import Add from '../../assets/add.png';
import moment from 'moment'


class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Groups: [],
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selecteGroup: null,
            selectedIntervals: null,
            selecteGroupIndex: null,
            Branches: null,
            selectedBranch: null,
            newGroups: {},
            availableServices: null,
            selectedService: null,
            AddArr: [],
            btnAddDisable: true,
            EditArr: [],
            btnEditDisable: true,
            selectedServices: null,
            errorMsg: null,
            GroupsCopy: []
        }
    }



    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'createdAt', numeric: false, disablePadding: true, label: 'Created At' },
        { id: 'downloadSpeed', numeric: false, disablePadding: true, label: 'Bandwidth Down' },
        { id: 'uploadSpeed', numeric: false, disablePadding: true, label: 'Bandwidth Up' },
    ];




    DataShowPerTable = ["name", "createdAt", "downloadSpeed", 'uploadSpeed'];


    async componentDidMount() {
        this.getGroups();
    }

    getGroups = () => {
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
                        RedirectionURL: Item.redirectionUrl?.value || '',
                        branchId: Item.branchId,
                        name: Item.name,
                        _id: Item._id
                    })
                })
                this.setState({ GroupsCopy: res.data });

                StoreGroups(groups)
            }
        })

        this.setState({ Groups: groups });
        setTimeout(
            () => this.setState({ Groups: groups }),
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
        if (arr.length >= num) {
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
            case 'name':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        name: val
                    }
                })
                break;
            case 'downloadSpeed':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        downloadSpeed: val
                    }
                })
                break;
            case 'uploadSpeed':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        uploadSpeed: val
                    }
                })
                break;
            case 'quotaLimitDaily':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        quotaLimitDaily: val
                    }
                })
                break;
            case 'quotaLimitWeekly':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        quotaLimitWeekly: val
                    }
                })
                break;
            case 'quotaLimitMonthly':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        quotaLimitMonthly: val
                    }
                })
                break;
            case 'timeLimitDaily':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        timeLimitDaily: val
                    }
                })
                break;
            case 'timeLimitWeekly':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        timeLimitWeekly: val
                    }
                })
                break;
            case 'timeLimitMonthly':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        timeLimitMonthly: val
                    }
                })
                break;
            case 'RedirectionURL':
                await this.setState({
                    newGroups: {
                        ...this.state.newGroups,
                        RedirectionURL: val
                    }
                })
                break;
        }
    }


    async changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        name: val
                    }
                })
                break;
            case 'downloadSpeed':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        downloadSpeed: val
                    }
                })
                break;
            case 'uploadSpeed':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        uploadSpeed: val
                    }
                })
                break;
            case 'quotaLimitDaily':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        quotaLimitDaily: val
                    }
                })
                break;
            case 'quotaLimitWeekly':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        quotaLimitWeekly: val
                    }
                })
                break;
            case 'quotaLimitMonthly':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        quotaLimitMonthly: val
                    }
                })
                break;
            case 'timeLimitDaily':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        timeLimitDaily: val
                    }
                })
                break;
            case 'timeLimitWeekly':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        timeLimitWeekly: val
                    }
                })
                break;
            case 'timeLimitMonthly':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        timeLimitMonthly: val
                    }
                })
                break;
            case 'RedirectionURL':
                await this.setState({
                    selecteGroup: {
                        ...this.state.selecteGroup,
                        RedirectionURL: val
                    }
                })
                break;
        }
    }



    Details(item) {
        this.setState({ selecteGroup: item, showDetails: true })
    }

    async Edit(item, index) {
        const { Branches } = this.props;
        let slectedBranchIndex = null
        slectedBranchIndex = Branches.filter((Item, index) => {
            console.log(index , Item._id == item.branchId)
            if (Item._id == item.branchId) return index
        })

        console.log(item.branchId, slectedBranchIndex,  )
        await this.setState({ selecteGroup: item, selecteGroupIndex: index, showEdit: true, selectedBranch: slectedBranchIndex ? Branches[slectedBranchIndex] : null });
    }



    Add() {
        const { Branches } = this.props
        this.setState({ showAdd: true, newGroups: {}, selectedBranch: Branches[0] });
    }



    AddForm() {
        const { showAdd, newGroups, btnAddDisable, selectedBranch, errorMsg } = this.state;
        const { downloadSpeed, name, uploadSpeed, quotaLimitDaily, quotaLimitWeekly, quotaLimitMonthly, timeLimitDaily, timeLimitWeekly, timeLimitMonthly, RedirectionURL } = newGroups;
        const { Branches } = this.props
        const handleClose = () => this.setState({ showAdd: false });
        return (
            <>
                <Modal show={showAdd} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter group name"} value={name} onChange={(val) => { this.changeAddInput('name', val) }} isRequired onBlur={(val) => { this.checkAddValidation('0', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Download Speed"} placeholder={"Enter download speed"} value={downloadSpeed} onChange={(val) => { this.changeAddInput('downloadSpeed', val) }} isRequired onBlur={(val) => { this.checkAddValidation('1', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Upload Speed"} placeholder={"Enter upload speed"} value={uploadSpeed} onChange={(val) => { this.changeAddInput('uploadSpeed', val) }} isRequired onBlur={(val) => { this.checkAddValidation('2', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Quota Limit Daily"} placeholder={"Enter quota limit Daily"} value={quotaLimitDaily} onChange={(val) => { this.changeAddInput('quotaLimitDaily', val) }} isRequired onBlur={(val) => { this.checkAddValidation('3', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Quota Limit Weekly"} placeholder={"Enter quota limit Weekly"} value={quotaLimitWeekly} onChange={(val) => { this.changeAddInput('quotaLimitWeekly', val) }} isRequired onBlur={(val) => { this.checkAddValidation('4', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Quota Limit Monthly"} placeholder={"Enter quota limit Monthly"} value={quotaLimitMonthly} onChange={(val) => { this.changeAddInput('quotaLimitMonthly', val) }} isRequired onBlur={(val) => { this.checkAddValidation('5', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Time limit Daily"} placeholder={"Enter time limit Daily"} value={timeLimitDaily} onChange={(val) => { this.changeAddInput('timeLimitDaily', val) }} isRequired onBlur={(val) => { this.checkAddValidation('6', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Time limit Weekly"} placeholder={"Enter time limit Weekly"} value={timeLimitWeekly} onChange={(val) => { this.changeAddInput('timeLimitWeekly', val) }} isRequired onBlur={(val) => { this.checkAddValidation('7', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Time limit Monthly"} placeholder={"Enter time limit Monthly"} value={timeLimitMonthly} onChange={(val) => { this.changeAddInput('timeLimitMonthly', val) }} isRequired onBlur={(val) => { this.checkAddValidation('8', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Redirection URL"} placeholder={"Enter redirection URL"} value={RedirectionURL} onChange={(val) => { this.changeAddInput('RedirectionURL', val) }} />
                                    </Col>
                                    <Col md={6} >
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Branches</label>
                                            <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.selectedBranch(val) }} selctedItem={selectedBranch} />
                                            {errorMsg && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{errorMsg}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnAddDisable} onClick={() => this.AddGroup()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    EditForm() {
        const { showEdit, selecteGroup, btnEditDisable, selectedBranch, errorMsg } = this.state;
        const { downloadSpeed, name, uploadSpeed, quotaLimitDaily, quotaLimitWeekly, quotaLimitMonthly, timeLimitDaily, timeLimitWeekly, timeLimitMonthly, RedirectionURL } = selecteGroup
        const { Branches } = this.props

        const handleClose = () => this.setState({ showEdit: false });
        return (
            <>
                <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-70w">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Name"} placeholder={"Enter group name"} value={name} onChange={(val) => { this.changeEditInput('name', val) }} isRequired onBlur={(val) => { this.checkEditValidation('0', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Download Speed"} placeholder={"Enter download speed"} value={downloadSpeed} onChange={(val) => { this.changeEditInput('downloadSpeed', val) }} isRequired onBlur={(val) => { this.checkEditValidation('1', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Upload Speed"} placeholder={"Enter upload speed"} value={uploadSpeed} onChange={(val) => { this.changeEditInput('uploadSpeed', val) }} isRequired onBlur={(val) => { this.checkEditValidation('2', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Quota Limit Daily"} placeholder={"Enter quota limit Daily"} value={quotaLimitDaily} onChange={(val) => { this.changeEditInput('quotaLimitDaily', val) }} isRequired onBlur={(val) => { this.checkEditValidation('3', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Quota Limit Weekly"} placeholder={"Enter quota limit Weekly"} value={quotaLimitWeekly} onChange={(val) => { this.changeEditInput('quotaLimitWeekly', val) }} isRequired onBlur={(val) => { this.checkEditValidation('4', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Quota Limit Monthly"} placeholder={"Enter quota limit Monthly"} value={quotaLimitMonthly} onChange={(val) => { this.changeEditInput('quotaLimitMonthly', val) }} isRequired onBlur={(val) => { this.checkEditValidation('5', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Time limit Daily"} placeholder={"Enter time limit Daily"} value={timeLimitDaily} onChange={(val) => { this.changeEditInput('timeLimitDaily', val) }} isRequired onBlur={(val) => { this.checkEditValidation('6', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Time limit Weekly"} placeholder={"Enter time limit Weekly"} value={timeLimitWeekly} onChange={(val) => { this.changeEditInput('timeLimitWeekly', val) }} isRequired onBlur={(val) => { this.checkEditValidation('7', val, 9) }} />
                                    </Col>
                                    <Col md={4}>
                                        <InputWithText type="text" label={"Time limit Monthly"} placeholder={"Enter time limit Monthly"} value={timeLimitMonthly} onChange={(val) => { this.changeEditInput('timeLimitMonthly', val) }} isRequired onBlur={(val) => { this.checkEditValidation('8', val, 9) }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputWithText type="text" label={"Redirection URL"} placeholder={"Enter redirection URL"} value={RedirectionURL} onChange={(val) => { this.changeEditInput('RedirectionURL', val) }} />
                                    </Col>
                                    <Col md={6} >
                                        <FormGroup className="dropDownContainer">
                                            <label className="title">Branches</label>
                                            <DropDown label={"Branches"} items={Branches} onClick={(val) => { this.selectedBranch(val) }} selctedItem={selectedBranch} />
                                            {errorMsg && <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{errorMsg}</label>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" disabled={btnEditDisable || selectedBranch == null} onClick={() => this.EditGroup()}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    DetailsForm() {
        const { showDetails, selecteGroup } = this.state;
        const { downloadSpeed, name, uploadSpeed, quotaLimitDaily, quotaLimitWeekly, quotaLimitMonthly, timeLimitDaily, timeLimitWeekly, timeLimitMonthly, RedirectionURL } = selecteGroup
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Col md="12" >
                    <Card title={'Group Details'}>
                        <CardBody>
                            <Form>
                                <div className="BranchesDetails">
                                    <Row>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Name:</label>
                                                <label className="subTitle">{name ? name : "No value"}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Download Speed:</label>
                                                <label className="subTitle">{downloadSpeed}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Upload Speed:</label>
                                                <label className="subTitle">{uploadSpeed}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Quota Limit Daily:</label>
                                                <label className="subTitle">{quotaLimitDaily}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Quota Limit Weekly:</label>
                                                <label className="subTitle">{quotaLimitWeekly}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">Quota Limit Monthly:</label>
                                                <label className="subTitle">{quotaLimitMonthly}</label>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">time Limit Daily:</label>
                                                <label className="subTitle">{timeLimitDaily}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">time Limit Weekly:</label>
                                                <label className="subTitle">{timeLimitWeekly}</label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="detailsContainer">
                                                <label className="Title">time Limit Monthly:</label>
                                                <label className="subTitle">{timeLimitMonthly}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <div className="detailsContainer">
                                                <label className="Title">Redirection URL:</label>
                                                <label className="subTitle">{RedirectionURL ? RedirectionURL : "No value"}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <Button variant="secondary" style={{ marginTop: '20px' }} onClick={handleClose}>Close</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }


    EditGroup() {
        const { selecteGroup, Groups, selecteGroupIndex, selectedBranch, GroupsCopy } = this.state;
        const { StoreGroups, OwnerProfile } = this.props;
        console.log(selectedBranch._id)
        let body = {
            bandwidthDetails: {
                bandwidthUp: {
                    value: selecteGroup.uploadSpeed,
                    id: GroupsCopy[selecteGroupIndex].bandwidthUp.id
                },
                bandwidthDown: {
                    value: selecteGroup.downloadSpeed,
                    id: GroupsCopy[selecteGroupIndex].bandwidthDown.id
                }
            },
            generalDetails: {
                quotaLimitDaily: {
                    value: selecteGroup.quotaLimitDaily,
                    id: GroupsCopy[selecteGroupIndex].quotaLimitDaily.id
                },
                quotaLimitWeekly: {
                    value: selecteGroup.quotaLimitWeekly,
                    id: GroupsCopy[selecteGroupIndex].quotaLimitWeekly.id
                },
                quotaLimitMonthly: {
                    value: selecteGroup.quotaLimitMonthly,
                    id: GroupsCopy[selecteGroupIndex].quotaLimitMonthly.id
                },
                timeLimitDaily: {
                    value: selecteGroup.timeLimitDaily,
                    id: GroupsCopy[selecteGroupIndex].timeLimitDaily.id
                },
                timeLimitWeekly: {
                    value: selecteGroup.timeLimitWeekly,
                    id: GroupsCopy[selecteGroupIndex].timeLimitWeekly.id
                },
                timeLimitMonthly: {
                    value: selecteGroup.timeLimitMonthly,
                    id: GroupsCopy[selecteGroupIndex].timeLimitMonthly.id
                }
            },
            _id: selecteGroup._id,
            branchId: selectedBranch._id,
            brandId: OwnerProfile._id,
            name: selecteGroup.name,
        }

        this.setState({ showEdit: false });
        HtttpPutDefult("groups/" + selecteGroup._id + "", body, true).then((res) => {
            if (res) {
                console.log('!#$@#$@#$@#$' , selectedBranch._id)
                Groups[selecteGroupIndex].branchId = selectedBranch._id
                Groups[selecteGroupIndex] = selecteGroup;
                this.setState({ Groups: Groups });
                StoreGroups(Groups)
                displayToast('The Group is updated successfully', true);
            }
        })
    }

    AddGroup() {
        const { newGroups, Groups, selectedBranch } = this.state;
        const { OwnerProfile, StoreGroups } = this.props;
        newGroups.brand = OwnerProfile._id;
        this.setState({ showAdd: false });
        let body = {
            brand_id: OwnerProfile._id,
            name: newGroups.name,
            branch_id: selectedBranch._id,
            bandwidthDetails: {
                bandwidthUp: newGroups.uploadSpeed,
                bandwidthDown: newGroups.downloadSpeed
            },
            generalDetails: {
                quotaLimitDaily: newGroups.quotaLimitDaily,
                quotaLimitWeekly: newGroups.quotaLimitWeekly,
                quotaLimitMonthly: newGroups.quotaLimitMonthly,
                timeLimitDaily: newGroups.timeLimitDaily,
                timeLimitWeekly: newGroups.timeLimitWeekly,
                timeLimitMonthly: newGroups.timeLimitMonthly,
                redirectionUrl: newGroups.redirectionUrl
            }
        }


        HtttpPostDefult("groups", body, true).then(async (res) => {
            if (!res.errors) {
                newGroups._id = res.id;
                newGroups.createdAt = moment(new Date()).format('DD-MMM-YYYY')
                Groups.push(newGroups);
                StoreGroups(Groups);
                this.setState({ Groups: Groups, selectedBranch: null });
                displayToast('"The Group is created successfully"', true);
            }
            else {
                displayToast('"The Group is not created successfully"', false);
            }
        })
    }

    delete(Item, key) {
        const { Groups } = this.state;
        const { StoreGroups } = this.props;
        HtttpDeleteDefult("groups/" + Item._id + "", null, true).then((res) => {
            if (res) {
                Groups.splice(key, 1);
                this.setState({ Groups: Groups })
                StoreGroups(Groups)
                displayToast('Groups is deleted successfully', true);
            }
        })
    }

    selectedBranch(val) {
        this.setState({ selectedBranch: val });

    }

    render() {
        const { Groups, showAdd, showDetails, showEdit, selectedBranch, errorMsg } = this.state;
        const { Branches } = this.props
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
                                    data={Groups}
                                    DataShowPerTable={this.DataShowPerTable}
                                    handleDelete={(val, index) => { this.delete(val, index) }}
                                    handleDetails={(val, index) => { this.Details(val, index) }}
                                    handleEdit={(val, index) => { this.Edit(val, index) }}
                                    totalPages={1}
                                    Title={"Groups"}
                                    handleAdd={() => { this.Add() }}
                                    showDelete
                                    noResultMSG={"There is no available groups"}
                                    addMSG={"add new group"}
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
        Groups: state.storage.GroupsState.Groups,
        OwnerProfile: state.storage.ProfileState.OwnerProfile,
        Branches: state.storage.BranchesState.Branches,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        StoreGroups: (val) => dispatch(StoreGroups(val)),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Groups);

