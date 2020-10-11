import React from 'react';
import {
    Row,
    Col,
    Button,
    OverlayTrigger,
    Tooltip,
    ButtonToolbar,
    Dropdown,
    DropdownButton,
    SplitButton
} from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";
import Card from "../../../App/components/MainCard";
import UcFirst from "../../../App/components/UcFirst";
import TableData from '../../../App/components/Tables/TablesComp';
class BasicButton extends React.Component {
    headCells = [
        { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'UserName', numeric: false, disablePadding: true, label: 'UserName' },
        { id: 'address', numeric: false, disablePadding: true, label: 'address' },
    ];

    data = [
        {
            id: '1',
            name: 'ahmed',
            UserName: 'saayed',
            address: 'cairo'
        },
        {
            id: '2',
            name: 'tamer',
            UserName: 'saayed',
            address: 'cairo'
        },

    ]
    DataShowPerTable = ["id", "name", "UserName", "address"];

    delete(row) {
        console.log(row)
    }

    Details(row) {
        console.log(row)
    }

    Edit(row) {
        console.log(row)
    }

    Add() {

    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col md="12">
                        <TableData
                            headCells={this.headCells}
                            data={this.data}
                            DataShowPerTable={this.DataShowPerTable}
                            handleDelete={(val) => { this.delete(val) }}
                            handleDetails={(val) => { this.Details(val) }}
                            handleEdit={(val) => { this.Edit(val) }}
                            totalPages={2}
                            Title={"Cutomers"}
                            handleAdd={() => { this.Add() }}
                        />
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BasicButton;
