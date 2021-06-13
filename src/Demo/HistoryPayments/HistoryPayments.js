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
import { HtttpGetDefult } from '../../actions/httpClient';
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
            Payments: []
        }
    }


    headCells = [
        { id: 'paymentId', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
        { id: 'paymentMethod', numeric: false, disablePadding: true, label: 'Payment Method' },
        { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    ];




    DataShowPerTable = ["paymentId", "status", "paymentMethod", "type", "name"];

    async componentDidMount() {
        const { OwnerProfile } = this.props;
        this.getPayments(OwnerProfile._id);
    }


    async getPayments(id) {
        HtttpGetDefult('brands/' + id + '/payments', true).then(async (res) => {
            if (res) {
                this.setState({ Payments: res.payments });
                setTimeout(
                    () => this.setState({ Payments: res.payments }),
                    10
                );
            }
        })

    }





    render() {
        const { Payments } = this.state;
        return (
            <Aux>
                <div className="Branches">
                    <Row>
                        <Col md="12">
                            <TableData
                                headCells={this.headCells}
                                data={Payments}
                                DataShowPerTable={this.DataShowPerTable}
                                totalPages={1}
                                Title={"Payments History"}
                                showDelete={false}
                                noResultMSG={"There is no available payments history"}
                                showCheckBox={false}
                                noActionCol={true}
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

