import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Loader from "../../components/Loaders/SimpleLoader"
import ForwardIcon from '@material-ui/icons/Forward';
import { getComparator, stableSort, EnhancedTableHead } from "../../components/Admin/adminUtils"
import { useToolbarStyles, useTableStyles } from "../../components/Admin/adminThemes"


const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { caption, handleOverview, id, numSelected } = props;

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
            {caption}
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="View details">
          <IconButton aria-label="forward" onClick={() => handleOverview(id)} >
            <ForwardIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">

            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export default function EnhancedTable({
  caption,
  headCells,
  setValue,
  handleOverview,
  error,
  loading,
  items,
  anchor,
  displayArr,
  showUser,
  showCost
}) {


  const classes = useTableStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [itemId, setItemId] = useState("")

  // const itemsList = useSelector(state => state.itemsList)
  // const { loading, error, items } = itemsList

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name, id) => {
    setItemId(id)
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    items && rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);



  return (
    <div className={classes.root}>

      {
        loading ? <Loader />
          :
          error ? error
            :
            <>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar
                  caption={caption}
                  setValue={setValue}
                  id={itemId}
                  numSelected={selected.length}
                  handleOverview={handleOverview}
                />
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHead
                      headCells={headCells}
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={items && items.length}
                    />
                    <TableBody>
                      {items && stableSort(items, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => {
                          const isItemSelected = isSelected(item.[anchor]);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, item.[anchor], item._id)}
                              role="checkbox"
                              style={{ cursor: 'pointer' }}
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={item.[anchor]}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>

                              {
                                item.hasOwnProperty('orderItems') ?
                                  displayArr.map((el, index) =>
                                    <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                                      {item.orderItems.isArray ?
                                        item.orderItems[0].[el] :
                                        item.orderItems.[el]
                                      }
                                    </TableCell>
                                  )
                                  :
                                  displayArr.map((el, index) =>
                                    <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                                      {item.[el]}</TableCell>
                                  )
                              }
                              {
                                showCost && <TableCell align="right">
                                  {item.price}
                                </TableCell>
                              }
                              {
                                showUser && <TableCell align="right">
                                  {item.user && item.user.name}
                                </TableCell>
                              }
                              {
                                item.createdAt && <TableCell align="right">
                                  {new Date(item.createdAt).toDateString()}
                                </TableCell>
                              }
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 9, 12, 15, 18, 21]}
                  component="span"
                  count={items && items.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
              />
            </>
      }

    </div>
  );
}
