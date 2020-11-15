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
import './HistoryPaymentsStyle.scss';
import i18n from '../../i18n';
import { HtttpDeleteDefult, HtttpPostDefult, HtttpPutDefult, HtttpGetDefult } from '../../actions/httpClient';
import { connect } from 'react-redux';
import { StoreProfile } from '../../store/actions/ProfileAction';
import { displayToast } from '../../globals/globals';
import { StoreBranches } from '../../store/actions/BranchsAction';
import DatePicker from "react-datepicker";
import moment from 'moment'
import Card from "../../App/components/MainCard";
import { StoreAdmins } from '../../store/actions/AdminsAction';


class HistoryPayments extends React.Component {

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



    headCells = [
        { id: 'Id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Branch Name' },
        { id: 'price', numeric: false, disablePadding: true, label: 'Total Price' },
        { id: 'createdDate', numeric: false, disablePadding: true, label: 'Created Date' },
    ];




    DataShowPerTable = ["Id", "type", "price", "name", "startDate", "createdDate"];

    async componentDidMount() {
        const { OwnerProfile } = this.props;
        this.getBranches(OwnerProfile._id);
    }


    async getBranches(id) {
        const { storeBranches, StoreAdmins } = this.props;
        HtttpGetDefult('brand/' + id + '', true).then(async (res) => {
            if (res) {
                storeBranches(res.branches);
                StoreAdmins(res.admins);
                if (res.branches && res.branches.length > 0) {
                    let result = await res.branches.filter((Item) => {
                        return Item.isDeleted == false;
                    })
                    await result.map((Item) => {
                        Item.checked = false;
                    })

                    this.setState({ Branches: result });
                    setTimeout(
                        () => this.setState({ Branches: result }),
                        10
                    );
                }
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
                    {!showAdd && !showEdit && !showDetails &&
                        <Row>
                            <Col md="12">
                                <TableData
                                    headCells={this.headCells}
                                    data={[]}
                                    DataShowPerTable={this.DataShowPerTable}
                                    totalPages={1}
                                    Title={"Payments History"}
                                    showDelete={false}
                                    noResultMSG={"There is no available payments history"}
                                    handlePay={() => { }}
                                    showCheckBox={false}
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
        StoreAdmins: (val) => dispatch(StoreAdmins(val)),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HistoryPayments);

