import React from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    Tooltip,
    ButtonToolbar,
    Dropdown,
    DropdownButton,
    SplitButton,
    Form
} from 'react-bootstrap';
import {
    CardBody,
} from 'reactstrap';

import { InputWithText } from '../../App/components/ComponentModule'
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import UcFirst from "../../App/components/UcFirst";
import TableData from '../../App/components/Tables/TablesComp';
import './BranchesStyle.scss';
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';
import { StoreBranches } from '../../store/actions/BranchsAction';


class Branches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Branches: null,
            showAdd: false,
            showEdit: false,
            showDetails: false,
            selectedBranch: null,
            selectedBranchIndex: null,
            newBranch: {
                name: "",
                BrandId: "",
                isActive: true,
                isDeleted: false
            },
        }
    }

    headCells = [
        { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    ];


    DataShowPerTable = ["id", "name"];

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


    changeAddInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    newBranch: {
                        ...this.state.newBranch,
                        name: val
                    }
                })
                break;
        }

    }

    changeEditInput(Input, val) {
        switch (Input) {
            case 'name':
                this.setState({
                    selectedBranch: {
                        ...this.state.selectedBranch,
                        name: val
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

    Edit(item, index) {
        this.setState({ selectedBranch: item, selectedBranchIndex: index, showEdit: true })
    }



    Add() {
        this.setState({
            showAdd: true,
            newBranch: {
                ...this.state.newBranch,
                name: ""
            }
        });
    }

    AddForm() {
        const { showAdd, newBranch } = this.state;
        const { name } = newBranch
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
                                    <Col md={10}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeAddInput('name', val) }} />
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

    EditForm() {
        const { showEdit, selectedBranch } = this.state;
        const { name } = selectedBranch
        const handleClose = () => this.setState({ showEdit: false });
        return (
            <>
                <Modal show={showEdit} onHide={handleClose} dialogClassName="modal-70w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Branch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={10}>
                                        <InputWithText type="text" label={i18n.t("CompanyProfile.Name")} placeholder={i18n.t("Branches.NamePlacholder")} value={name} onChange={(val) => { this.changeEditInput('name', val) }} />
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
        const { name } = selectedBranch
        const handleClose = () => this.setState({ showDetails: false });
        return (
            <>
                <Modal show={showDetails} onHide={handleClose} dialogClassName="modal-70w BranchesDetails"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Branch Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md={10}>
                                        <h2 className="title">{i18n.t("CompanyProfile.Name")}</h2>
                                        <h3 className="Subtitle">{name}</h3>

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
        const { selectedBranch, selectedBranchIndex, Branches } = this.state;
        const { storeBranches } = this.props;
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
        const { newBranch, Branches } = this.state;
        const { OwnerProfile, storeBranches } = this.props;
        this.setState({ showAdd: false });
        newBranch.BrandId = OwnerProfile.id;
        HtttpPostDefult("branch/create", newBranch).then((res) => {
            if (res) {
                Branches.push(res);
                storeBranches(Branches);
                this.setState({ Branches: Branches });
                displayToast('Branch data is added succefully', true);
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

