import PeopleIcon from '@material-ui/icons/People'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PublicIcon from '@material-ui/icons/Public'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import SettingsIcon from '@material-ui/icons/Settings'
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'
import Checkbox from '@material-ui/core/Checkbox'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import PropTypes from 'prop-types'
import AddAlertIcon from '@material-ui/icons/AddAlert'

export const categories = [
  {
    id: 'Services',
    children: [
      { id: 'Announcement', icon: <AddAlertIcon />, href: 'announcement' },
      { id: 'Users', icon: <PeopleIcon />, href: 'users' },
      { id: 'Cards', icon: <DnsRoundedIcon />, href: 'cards' },
      { id: 'Card Orders', icon: <PhonelinkSetupIcon />, href: 'cardorders' },
      {
        id: 'Change of Course',
        icon: <PermMediaOutlinedIcon />,
        href: 'changeofcourse',
      },
      {
        id: 'Jamb Password Reset',
        icon: <PublicIcon />,
        href: 'jambpasswordreset',
      },
      {
        id: 'O Level Result Uploads',
        icon: <SettingsEthernetIcon />,
        href: 'olevelupload',
      },
      // { id: 'Users Reviews', icon: <SettingsInputComponentIcon />, href: 'reviews' },
    ],
  },
  {
    id: 'Miscellaneous',
    children: [
      { id: 'Email Manager', icon: <SettingsIcon />, href: 'emails' },
      {
        id: 'Service Settings',
        icon: <SettingsInputComponentIcon />,
        href: 'service-settings',
      },
    ],
  },
]

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export function EnhancedTableHead(props) {
  const {
    headCells,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

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
        {headCells.map((headCell) => (
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
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}
