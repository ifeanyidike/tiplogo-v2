import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from "react-router-dom"


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable({ columns, rows, admin_upload, orderItems, orderHeaders }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const history = useHistory()

    const replacePdfExtWithJpg = (file) => {
        if (file.slice(-3) === 'pdf') {
          return file.replace(file.slice(-3), 'jpg')
        } else {
          return file
        }
      }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {orderHeaders.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {
                                admin_upload &&
                                <TableCell
                                    align="left"
                                    style={{ minWidth: 170 }}
                                >
                                    File
                                </TableCell>
                            }
                            <TableCell align="left" style={{ minWidth: 170 }}>
                                Created At </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push(`/profile/?itemId=${row._id}`)}
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                >

                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ?
                                                    column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    {
                                        orderItems &&
                                        orderItems.map((item, index) => (
                                            <TableCell align="left" key={index} >
                                                { row.orderItems.[item]}
                                            </TableCell>
                                        ))

                                    }
                                    {
                                        admin_upload &&
                                        <TableCell align="left" >
                                            {
                                                row.admin_upload && row.admin_upload.image ?
                                                    <>

                                                        <a href={replacePdfExtWithJpg(row.admin_upload?.image)} download
                                                            target="_blank" rel="noreferrer">
                                                            <img src={ replacePdfExtWithJpg(row.admin_upload?.image)}
                                                                alt="admin upload" width="50" height="50" />
                                                        </a>

                                                    </>
                                                    :
                                                    "No file yet"
                                            }
                                        </TableCell>
                                    }
                                    <TableCell align="left" >
                                        {
                                            new Date(row.createdAt).toDateString()
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows && rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
