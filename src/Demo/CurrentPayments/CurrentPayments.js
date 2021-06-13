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
import './CurrentPaymentsStyle.scss';
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


class CurrentPayments extends React.Component {

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
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'price', numeric: false, disablePadding: true, label: 'Price' },
        { id: 'startDate', numeric: false, disablePadding: true, label: 'Start Date' },
        { id: 'renewalDate', numeric: false, disablePadding: true, label: 'Renewal Date' },

    ];


    DataShowPerTable = ["name", "price", "startDate", "renewalDate"];

    async componentDidMount() {
        const { OwnerProfile } = this.props;

        this.getBranches(OwnerProfile._id);
    }

    isWithinAWeek(momentDate) {
        let date = new Date();
        var REFERENCE = moment(date); // fixed just for testing, use moment();
        var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

        return momentDate.isAfter(A_WEEK_OLD);
    }

    async getBranches(id) {
        const { storeBranches, StoreAdmins } = this.props;


        HtttpGetDefult('brands/' + id + '', true).then(async (res) => {
            if (res) {
                storeBranches(res.branches);
                StoreAdmins(res.admins);
                if (res.branches && res.branches.length > 0) {
                    let result = await res.branches.filter((Item) => {
                        return Item.isDeleted == false && this.isWithinAWeek(moment(Item.renewalDate))
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


    handlePay(checkedItems) {
        const { OwnerProfile } = this.props;
        let ItemIds = [], TotalPrices = 0;
        checkedItems.map((Item) => {
            ItemIds.push(Item._id);
            TotalPrices += Item.price
        })
        let body = {
            branches: ItemIds,
            price: TotalPrices
        };
        HtttpPostDefult('brands/renew/' + OwnerProfile._id + '', body).then((res) => {
            displayToast('The branches renewed successfully', true);
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
                                    data={Branches}
                                    DataShowPerTable={this.DataShowPerTable}
                                    totalPages={1}
                                    Title={"Current Payments"}
                                    showDelete={false}
                                    noResultMSG={"There is no branches needed to renew"}
                                    handlePay={(checkedItems) => { this.handlePay(checkedItems) }}
                                    showCheckBox={Branches && Branches.length > 0 ? true : false}
                                    SelectAllPay={"select all branches"}
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


export default connect(mapStateToProps, mapDispatchToProps)(CurrentPayments);

