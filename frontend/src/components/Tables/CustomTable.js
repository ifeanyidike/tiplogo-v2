import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePane } from "../../styles/TableStyle"
import { colors } from "../../styles/breakpoints"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colors.lightgray,
    color: theme.palette.common.white,
  },
  tableContainer: {
    maxWidth: 400,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    fontFamily: 'Jost',
    maxWidth: 500,
  },
});

export default function CustomizedTables({ cost, qty, name, orderId, paymentMethod }) {
  const classes = useStyles();

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData('order Id', orderId),
    createData('Item Name', name),
    createData('Quantity', qty),
    createData('Price', `₦${cost}`),
    createData('Payment Method ', paymentMethod),
  ];

  return (
    <TablePane>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TablePane>
  );
}
