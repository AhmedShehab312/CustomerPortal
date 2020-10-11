import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './TableStyles.scss';
import { Row, Col } from 'react-bootstrap';


class TableData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            page: 0,
            rowsPerPage: 5,
        }
    }

    headCells;

    rows = [];


    async componentDidMount() {
        const { headCells, data, DataShowPerTable } = this.props;
        this.headCells = headCells;
        await this.InitializeRows(data, DataShowPerTable);

    }

    InitializeRows(data, DataShowPerTable) {
        data.map((Item, i) => {
            this.createData(Item, DataShowPerTable);
        })

    }

    createData(Item, DataShowPerTable) {
        let result = {};
        Object.entries(Item).map((value) => {
            DataShowPerTable.map((requiredData) => {
                if (requiredData == value[0]) {
                    result[requiredData] = value[1]
                }
            })
        })
        this.rows.push(result);
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



    EnhancedTable() {
        const { handleDelete, handleDetails, handleEdit, totalPages, Title, handleAdd } = this.props;
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
            this.setState({ page: newPage })
        };

        const handleChangeRowsPerPage = (event) => {
            this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) })

        };


        const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.rows.length - this.state.page * this.state.rowsPerPage);



        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Row className="headerContainer">
                        <Col md="6">
                            <h3>{Title}</h3>
                        </Col>
                        <Col md="6">
                            <div className="btnContainer">
                                {handleAdd && <Button variant="contained" onClick={() => handleAdd()}> <i className="fas fa-plus" /> New Record</Button>}
                                <Button variant="contained">Export Table</Button>
                            </div>
                        </Col>
                        <hr />
                        <Col md="12" className="SpecRow">
                            <div id="main-search" className={'main-search'}>
                                <div className="input-group">
                                    <input type="text" id="m-search" className="form-control" placeholder="Search . . ." style={{ width: this.state.searchString }} />
                                    <a href={""} className="input-group-append search-close" onClick={this.searchOffHandler}>
                                        <i className="feather icon-x input-group-text" />
                                    </a>
                                    <span className="input-group-append search-btn btn btn-primary" onClick={this.searchOnHandler}>
                                        <i className="feather icon-search input-group-text" />
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>


                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            aria-label="enhanced table"
                        >

                            {this.EnhancedTableHead(this.state.selected.length, this.state.order, this.state.orderBy, this.rows.length, handleRequestSort)}
                            <TableBody>
                                {this.stableSort(this.rows, this.getComparator(this.state.order, this.state.orderBy))
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
                                                    <i className="fas fa-trash-alt" onClick={() => { handleDelete(row) }} />
                                                    <i className="fas fa-info-circle" onClick={() => { handleDetails(row) }} />
                                                    <i className="fas fa-edit" onClick={() => { handleEdit(row) }} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 30 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={totalPages}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

            </div >
        );
    };


    render() {
        return (
            <div className="TableContainer">
                {this.rows && this.headCells && this.EnhancedTable()}
            </div>
        )
    }

}

export default TableData;