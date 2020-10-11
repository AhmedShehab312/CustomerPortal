import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

class TableData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            page: 0,
            dense: false,
            rowsPerPage: 5
        }
    }

    data = [
        {
            id: '1',
            name: 'ahmed',
            UserName: 'saayed',
            adress: 'cairo'
        },
        {
            id: '2',
            name: 'ahmed',
            UserName: 'saayed',
            adress: 'cairo'
        },

    ]

    DataShowPerTable = ["id", "name"];

    componentDidMount() {
        this.InitializeRows(this.data, this.DataShowPerTable)
    }


    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    InitializeRows(data, DataShowPerTable) {
        data.map((Item, i) => {
            this.createdData(Item, DataShowPerTable);
        })
    }

    createdData(Item, DataShowPerTable) {
        let result = {};
        Object.entries(Item).map((value) => {
            DataShowPerTable.map((requiredData) => {
                if (requiredData == value[0]) {
                    result[requiredData] = value[1]
                }
            })
        })
        let a = [];
        a.push(result)

        console.log(a)


    }


    rows = [
        this.createData('Cupcake', 305, 3.7, 67, 4.3),
        this.createData('Donut', 452, 25.0, 51, 4.9),
        this.createData('Eclair', 262, 16.0, 24, 6.0),
        this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        this.createData('Gingerbread', 356, 16.0, 49, 3.9),
        this.createData('Honeycomb', 408, 3.2, 87, 6.5),
        this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        this.createData('Jelly Bean', 375, 0.0, 94, 0.0),
        this.createData('KitKat', 518, 26.0, 65, 7.0),
        this.createData('Lollipop', 392, 0.2, 98, 0.0),
        this.createData('Marshmallow', 318, 0, 81, 2.0),
        this.createData('Nougat', 360, 19.0, 9, 37.0),
        this.createData('Oreo', 437, 18.0, 63, 4.0),
    ];

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

    headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
        { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
        { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
        { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    ];

    EnhancedTableHead(classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort) {
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                    {this.headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }


    useToolbarStyles = makeStyles((theme) => ({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }));

    EnhancedTableToolbar = (numSelected) => {
        const classes = {
            // root: {
            //     paddingLeft: theme.spacing(2),
            //     paddingRight: theme.spacing(1),
            // },
            // highlight:
            //     theme.palette.type === 'light'
            //         ? {
            //             color: theme.palette.secondary.main,
            //             backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            //         }
            //         : {
            //             color: theme.palette.text.primary,
            //             backgroundColor: theme.palette.secondary.dark,
            //         },
            title: {
                flex: '1 1 100%',
            },
        }

        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Nutrition
                        </Typography>
                    )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            {/* <DeleteIcon /> */}
                            <i className="fas fa-trash-alt" />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="filter list">
                                {/* <FilterListIcon /> */}
                                <i className="fas fa-trash-alt" />

                            </IconButton>
                        </Tooltip>
                    )}
            </Toolbar>
        );
    };



    EnhancedTable() {
        console.log(this.rows)
        const classes = {
            root: {
                width: '100%',
            },
            paper: {
                width: '100%',
                // marginBottom: theme.spacing(2),
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

        const handleSelectAllClick = (event) => {
            if (event.target.checked) {
                const newSelecteds = this.rows.map((n) => n.name);
                this.setState({ selected: newSelecteds })
                return;
            }
            this.setState({ selected: [] })

        };

        const handleClick = (event, name) => {
            const selectedIndex = this.state.selected.indexOf(name);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(this.state.selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(this.state.selected.slice(1));
            } else if (selectedIndex === this.state.selected.length - 1) {
                newSelected = newSelected.concat(this.state.selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    this.state.selected.slice(0, selectedIndex),
                    this.state.selected.slice(selectedIndex + 1),
                );
            }

            // setSelected(newSelected);
            this.setState({ selected: newSelected })

        };

        const handleChangePage = (event, newPage) => {
            this.setState({ page: newPage })
        };

        const handleChangeRowsPerPage = (event) => {
            this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) })

        };

        const handleChangeDense = (event) => {
            this.setState({ dense: event.target.checked })
        };

        const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.rows.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {this.EnhancedTableToolbar(this.state.selected.length)}
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >

                            {this.EnhancedTableHead(classes, this.state.selected.length, this.state.order, this.state.orderBy, handleSelectAllClick, this.rows.length, handleRequestSort)}
                            <TableBody>
                                {this.stableSort(this.rows, this.getComparator(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={this.state.dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        );
    };


    render() {
        return (
            this.EnhancedTable()
        )
    }

}

export default TableData;