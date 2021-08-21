import React, { useState, useEffect } from 'react'
import {
  ButtonSingle,
  NextButton,
  NumRangeContainer,
} from '../../styles/ServiceStyle'
import { colors } from '../../styles/breakpoints'
import { makeStyles } from '@material-ui/core/styles'
import {
  Input,
  NativeSelect,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { InputLabel, InputAdornment } from '@material-ui/core'
import {
  Person as PersonIcon,
  TrendingFlat as TrendingFlatIcon,
} from '@material-ui/icons'
import { Code as CodeIcon, Remove as RemoveIcon } from '@material-ui/icons'
import { Add as AddIcon } from '@material-ui/icons'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Fab from '@material-ui/core/Fab'
import CurrencyFormat from 'react-currency-format'
import { DropzoneDialog } from 'material-ui-dropzone'
import NavigationIcon from '@material-ui/icons/Navigation'
import MessageModal from '../Utils/MessageModal'
import { useDispatch, useSelector } from 'react-redux'
import { WALLET_DEBIT_RESET } from '../../redux/constants/userConstants'
import { listServiceByName } from '../../redux/actions/serviceActions'
import { listSubjects } from '../../redux/actions/subjectActions'
import SchoolIcon from '@material-ui/icons/School'
import MergeTypeIcon from '@material-ui/icons/MergeType'
import UploadEntry from './UploadEntry'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const Options = () => {
  const { loading, error, subjects } = useSelector((state) => state.subjectList)

  return (
    <>
      {loading
        ? 'Loading...'
        : error
        ? { error }
        : subjects.map((subject) => (
            <option key={subject._id} value={subject.name}>
              {subject.name}
            </option>
          ))}
    </>
  )
}

const OLevelUploadForm = ({
  type,
  setType,
  name,
  setName,
  profileCode,
  setProfileCode,
  upload,
  setUpload,
  activeStep,
  setActiveStep,
  entries,
  setEntries,
  schoollAttended,
  setSchoolAttended,
  schoolType,
  setSchoolType,
}) => {
  const classes = useStyles()
  const [num, setNum] = useState(1)
  const [noFiles, setNoFiles] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listSubjects())
    dispatch(listServiceByName('o level result upload'))
    dispatch({ type: WALLET_DEBIT_RESET })
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (upload.files.length === 0) {
      setNoFiles(true)
      return
    }
    setActiveStep(activeStep + 1)
  }

  const handleNumIncrement = (e) => {
    e.preventDefault()
    const newNum = num === 2 ? num : num + 1
    setNum(newNum)
  }

  const handleNumDecrement = (e) => {
    e.preventDefault()
    const newNum = num === 1 ? num : num - 1
    setNum(newNum)
  }
  const { service } = useSelector((state) => state.serviceByName)

  return (
    <div>
      <div className="topmainitem">
        <div>
          <i className="fas fa-tags"></i>
          <CurrencyFormat
            value={service && service.cost}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
            renderText={(value) => <h3>{value}</h3>}
          />
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl}>
          <NativeSelect
            fullWidth
            required
            className={classes.selectEmpty}
            value={type}
            onChange={(e) => setType(e.target.value)}
            inputProps={{ 'aria-label': 'type' }}
            startAdornment={
              <InputAdornment position="start">
                <TrendingFlatIcon />
              </InputAdornment>
            }
          >
            <option value="WAEC">WAEC</option>
            <option value="NECO">NECO</option>
            <option value="NABTEB">NABTEB</option>
          </NativeSelect>
          <FormHelperText>Select Type</FormHelperText>
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="standard-adornment-name">Full Name</InputLabel>
          <Input
            id="standard-adornment-name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon />{' '}
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="standard-adornment-amount">
            ProfileCode
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={profileCode}
            required
            onChange={(e) => setProfileCode(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <CodeIcon />{' '}
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="standard-adornment-amount">
            Secondary School Attended
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={schoollAttended}
            required
            onChange={(e) => setSchoolAttended(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SchoolIcon />{' '}
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <NativeSelect
            fullWidth
            required
            className={classes.selectEmpty}
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
            inputProps={{ 'aria-label': 'type' }}
            startAdornment={
              <InputAdornment position="start">
                <MergeTypeIcon />
              </InputAdornment>
            }
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </NativeSelect>
          <FormHelperText>Select School Type</FormHelperText>
        </FormControl>

        <div className="numrange--services">
          <div className="label">Number of Sittings</div>
          <NumRangeContainer size={150}>
            <button onClick={handleNumDecrement}>
              <RemoveIcon />
            </button>
            <span>{num}</span>
            <button onClick={handleNumIncrement}>
              <AddIcon />
            </button>
          </NumRangeContainer>
        </div>

        <div className="filesection">
          <Fab
            onClick={() => setUpload({ ...upload, open: true })}
            variant="extended"
          >
            <NavigationIcon className={classes.extendedIcon} />
            Add File{num === 2 ? 's' : ''}
          </Fab>

          <DropzoneDialog
            open={upload.open}
            filesLimit={num}
            required
            clearOnUnmount={false}
            // onChange={(files) => console.log('Files:', files)}
            onSave={(files) => setUpload({ files: files, open: false })}
            submitButtonText={` Add File${num === 2 ? 's' : ''}`}
            acceptedFiles={['image/jpeg', 'image/png', 'application/pdf']}
            showPreviews={true}
            maxFileSize={60000}
            onClose={() => setUpload({ ...upload, open: false })}
          />
        </div>

        <h1>Please enter the subjects manually</h1>

        <div className="subjectselect">
          <UploadEntry
            num="1"
            entryState={entries.first}
            setEntryState={setEntries.first}
          />
          <UploadEntry
            num="2"
            entryState={entries.second}
            setEntryState={setEntries.second}
          />
          <UploadEntry
            num="3"
            entryState={entries.third}
            setEntryState={setEntries.third}
          />
          <UploadEntry
            num="4"
            entryState={entries.fourth}
            setEntryState={setEntries.fourth}
          />
          <UploadEntry
            num="5"
            entryState={entries.fifth}
            setEntryState={setEntries.fifth}
          />
          <UploadEntry
            num="6"
            entryState={entries.sixth}
            setEntryState={setEntries.sixth}
          />
          <UploadEntry
            num="7"
            entryState={entries.seventh}
            setEntryState={setEntries.seventh}
          />
          <UploadEntry
            num="8"
            entryState={entries.eighth}
            setEntryState={setEntries.eighth}
          />
          <UploadEntry
            num="9"
            entryState={entries.nineth}
            setEntryState={setEntries.nineth}
          />
        </div>

        <ButtonSingle>
          <NextButton variant={colors.darkblue} type="submit">
            Next <NavigateNextIcon />
          </NextButton>
        </ButtonSingle>
      </form>
      <MessageModal
        open={noFiles}
        setOpen={setNoFiles}
        caption="Files Empty"
        message="You need to add at least one file to proceed."
      />
    </div>
  )
}

export default OLevelUploadForm
