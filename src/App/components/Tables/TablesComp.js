import { Button, Tooltip } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Col, Row, Dropdown } from 'react-bootstrap';
import swal from 'sweetalert';
import Aux from "../../../hoc/_Aux";
import './TableStyles.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class TableData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            rows: [],
            searchVal: null,
            originalRows: [],
            age: "",
            selectedFilter: null

        }
    }

    headCells;
    pageSizeOptions = [5, 10, 25]


    async componentDidMount() {
        const { headCells, data, DataShowPerTable } = this.props;
        this.headCells = headCells;
        this.setState({ selectedFilter: this.headCells[0].id })
        if (data) {
            await this.InitializeRows(data, DataShowPerTable);
        }
    }

    async componentWillReceiveProps() {
        const { headCells, data, DataShowPerTable } = this.props;
        this.headCells = headCells;
        this.setState({ selectedFilter: this.headCells[0].id })
        if (data) {
            await this.InitializeRows(data, DataShowPerTable);
        }

    }

    InitializeRows(data, DataShowPerTable) {
        this.setState({ rows: [] }, () => {
            data.map((Item, i) => {
                this.createData(Item, DataShowPerTable);
            })
        })



    }

    createData(Item, DataShowPerTable) {
        const { rows } = this.state;
        let result = {};

        DataShowPerTable.map((requiredData) => {
            Object.entries(Item).map((value) => {
                if (requiredData == value[0]) {
                    result[requiredData] = value[1]
                }
            })
        })

        rows.push(result);
        this.setState({ rows: rows, originalRows: rows }, () => {
        })
    }


    descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }



    EnhancedTableHead(order, orderBy, numSelected, rowCount, onRequestSort) {
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {this.headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'center'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}

                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell align={'center'} sortDirection={false} >
                        <TableSortLabel>Actions</TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }



    deleteAction(data, index) {
        const { handleDelete } = this.props;

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    handleDelete(data, index);
                }
            });
    }

    search(val) {
        this.setState({ search: val }, () => {
            this.filter(this.state.search);
        });
    }

    filter(val) {
        const { selectedFilter, originalRows } = this.state;
        let res = originalRows.filter((Item) => {
            return Item[selectedFilter].toString().indexOf(val) != -1
        })
        this.setState({ rows: res })
    }

    EnhancedTable() {
        const { handleDelete, handleDetails, handleEdit, totalPages, Title, handleAdd, data, DataShowPerTable, ActiveAction, deActiveAction } = this.props;
        const { rows } = this.state;
        const classes = {
            root: {
                width: '100%',
            },
            paper: {
                width: '100%',
            },
            table: {
                minWidth: 750,
            },
            visuallyHidden: {
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                top: 20,
                width: 1,
            },
        }

        const handleRequestSort = (event, property) => {
            const isAsc = this.state.orderBy === property && this.state.order === 'asc';
            this.setState({ order: isAsc ? 'desc' : 'asc', orderBy: property })
        };


        const handleChangePage = (event, newPage) => {
            this.setState({ page: (event - 1), rowsPerPage: newPage })
        };

        const handleChangeRowsPerPage = (value) => {
            this.setState({ page: 0, rowsPerPage: this.pageSizeOptions[value - 1] })

        };


        const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);



        return (
            <div style={{ width: '100%' }}>
                <Paper style={{ width: '100%' }}>
                    <Row className="headerContainer">
                        <Col md="6">
                            <h3>{Title}</h3>
                        </Col>
                        <Col md="6">
                            <div className="btnContainer">
                                {handleAdd && <Button variant="contained" onClick={() => handleAdd()}> <i className="fas fa-plus" /> New Record</Button>}
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic"><i className="fa fa-download" /><p className="ExportTxt">Export Table</p></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item ><i className="fa fa-file-excel" /> Excel</Dropdown.Item>
                                        <Dropdown.Item ><i className="fa fa-file-pdf" />PDF</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <hr />
                        {
                            rows && rows.length > 0 &&
                            <Col md="12" className="SpecRow">
                                <div id="main-search" className={'main-search'}>
                                    <Row>
                                        <Col md="2">
                                            <p className="SearchTxt">Search:</p>
                                        </Col>
                                        <Col md="10">
                                            <Row>
                                                <Col md="8">
                                                    <div className="input-group">
                                                        <input type="text" id="m-search" className="form-control" style={{ width: this.state.searchString }} onChange={(val) => this.search(val.target.value)} />
                                                        <a href={""} className="input-group-append search-close" onClick={this.searchOffHandler}>
                                                            <i className="feather icon-x input-group-text" />
                                                        </a>
                                                        <span className="input-group-append search-btn btn btn-primary" onClick={this.searchOnHandler}>
                                                            <i className="feather icon-search input-group-text" />
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col md="4">
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel id="demo-simple-select-label">Fields</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.selectedFilter}
                                                            onChange={(val) => { this.setState({ selectedFilter: val.target.value }) }}
                                                        >
                                                            {this.headCells &&
                                                                this.headCells.map((Item) => {
                                                                    return <MenuItem value={Item.id}>{Item.id}</MenuItem>
                                                                })

                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                        }

                    </Row>


                    <TableContainer>
                        {rows && rows.length > 0 ?
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                                aria-label="enhanced table"
                            >

                                {this.EnhancedTableHead(this.state.selected.length, this.state.order, this.state.orderBy, rows.length, handleRequestSort)}
                                <TableBody>
                                    {this.stableSort(rows, this.getComparator(this.state.order, this.state.orderBy))
                                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            return (
                                                <TableRow
                                                    hover
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                >

                                                    {Object.entries(row).map((Item) => {
                                                        return (<TableCell align="center">{Item[1]}</TableCell>)
                                                    })}

                                                    <TableCell align="center" className="IconContainers">
                                                        {/* {data[index] ?
                                                            data[index].isActive ?
                                                                <i className="fas fa-times-circle" onClick={() => { deActiveAction(data[index], index) }} /> :
                                                                <i className="fas fa-check-circle" onClick={() => { ActiveAction(data[index], index) }} />
                                                            : null
                                                        }
                                                        <i className="fas fa-trash-alt" onClick={() => { this.deleteAction(data[index], index) }} /> */}
                                                        <i className="far fa-list-alt" onClick={() => { handleDetails(data[index], index) }} data-toggle="tooltip" data-placement="top" title="Show Details" />
                                                        <i className="fas fa-edit" onClick={() => { handleEdit(data[index], index) }} data-toggle="tooltip" data-placement="top" title="Edit" />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 20 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            :
                            <p className="NoData">No Data</p>
                        }
                    </TableContainer>
                    <div className="TablePaginationContainer">
                        {
                            rows && rows.length > 0 &&
                            <Pagination
                                defaultCurrent={(this.state.page + 1)}
                                pageSize={this.state.rowsPerPage}
                                total={10}
                                pageSizeOptions={this.pageSizeOptions}
                                onShowSizeChange={(val) => handleChangeRowsPerPage(val)}
                                onChange={handleChangePage}
                                showSizeChanger={true}
                            />
                        }


                    </div>
                </Paper>

            </div >
        );
    };


    render() {
        const { rows } = this.state
        return (
            <Aux>
                <div className="TableContainer">
                    {rows && this.headCells && this.EnhancedTable()}
                </div>
            </Aux>
        )
    }

}

export default TableData;