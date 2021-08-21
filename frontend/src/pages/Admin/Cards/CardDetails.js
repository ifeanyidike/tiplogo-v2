import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Person as PersonIcon,
  Message as MessageIcon,
} from '@material-ui/icons'
import { Input, FormControl } from '@material-ui/core'
import { TextareaAutosize, InputLabel, InputAdornment } from '@material-ui/core'
import {
  UserProfileContainer,
  AdminButton,
  AdminButtonAlt,
  AdminButtonPro,
  RightAlign,
} from '../../../styles/AdminStyles'
import { colors } from '../../../styles/breakpoints'
import CurrencyFormat from 'react-currency-format'
import { Avatar, Card, CardContent, Divider } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../components/Loaders/LinearLoader'
import { DropzoneDialog } from 'material-ui-dropzone'
import {
  addCardItems,
  listCardDetails,
  listCards,
  updateCard,
} from '../../../redux/actions/cardActions'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import FixedTable from './FixedHeaderTable'
import MessageModal from '../../../components/Utils/MessageModal'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import { deleteCard } from '../../../redux/actions/cardActions'

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

const CardDetails = ({ setValue }) => {
  const classes = useStyles()
  const [deletePrompt, setDeletePrompt] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const { cardId } = queryString.parse(location.search)

  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (cardId) {
      dispatch(listCardDetails(cardId))
    }
  }, [dispatch, cardId])

  const headCells = [
    { id: '_id', label: 'Card ID', minWidth: 170 },
    { id: 'pin', label: 'PIN', minWidth: 170 },
    { id: 'serialNo', label: 'Serial No.' },
    { id: 'token', label: 'Token' },
  ]
  const { loading, error, card } = useSelector((state) => state.cardDetails)
  const { loading: updateLoading } = useSelector((state) => state.cardUpdate)
  const { loading: addLoading } = useSelector((state) => state.cardAddItem)

  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pin, setPin] = useState('')
  const [serialNo, setSerialNo] = useState('')
  const [token, setToken] = useState('')
  const [addPrompt, setAddPrompt] = useState('')

  const handleCardItemAdd = () => {
    //dispatch add card item
    dispatch(addCardItems(card._id, { pin, serialNo, token }))
    dispatch(listCardDetails(cardId))
    setPin('')
    setSerialNo('')
    setToken('')
    setAddPrompt(false)
  }

  useEffect(() => {
    if (card) {
      setName(card.name)
      setPrice(card.price)
      setDescription(card.description)
    }
  }, [card])

  const [upload, setUpload] = useState({
    open: false,
    files: [],
  })
  const handleCardDelete = () => {
    dispatch(deleteCard(card._id))
    dispatch(listCards())
    setValue(0)
  }

  const handleCardUpdate = () => {
    const formData = new FormData()
    formData.append('image', upload.files[0])
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    dispatch(updateCard(card._id, formData))
    dispatch(listCardDetails(cardId))
  }

  const isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  return (
    <UserProfileContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        error
      ) : updateLoading ? (
        <Loader />
      ) : !isEmpty(card) ? (
        <React.Fragment>
          <Card className="card__image">
            <CardContent>
              <Avatar
                className="profile_pic"
                src={card.upload && card.upload.image}
              />

              <div>
                <AdminButtonAlt
                  onClick={() => setUpload({ ...upload, open: true })}
                >
                  <PhotoCameraIcon />
                  Change
                </AdminButtonAlt>
                <DropzoneDialog
                  open={upload.open}
                  filesLimit={1}
                  clearOnUnmount={false}
                  // onChange={(files) => console.log('Files:', files)}
                  onSave={(files) => setUpload({ files: files, open: false })}
                  submitButtonText="Add image"
                  acceptedFiles={['image/jpeg', 'image/png']}
                  showPreviews={true}
                  maxFileSize={60000}
                  onClose={() => setUpload({ ...upload, open: false })}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="card__content">
            <CardContent>
              <div className="heading">
                <h2>{card.name}</h2>
                <div>
                  <span>Price:</span>

                  <CurrencyFormat
                    value={price}
                    thousandSeparator={true}
                    prefix={'₦'}
                    onValueChange={(values) => {
                      const { value } = values
                      setPrice(value)
                    }}
                  />
                </div>
              </div>
              <Divider />
              <div className="contents">
                <div>
                  <span>Created on:</span>
                  <span>{new Date(card.createdAt).toDateString()}</span>
                </div>
                <div>
                  <span>Updated on:</span>
                  <span>{new Date(card.updatedAt).toDateString()}</span>
                </div>
                <div className="fullwidth">
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-name">
                      Full Name
                    </InputLabel>
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
                </div>

                <div className="fullwidth">
                  <FormControl className={classes.formControl}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      rowsMin={5}
                      startAdornment={
                        <InputAdornment position="start">
                          <MessageIcon />{' '}
                        </InputAdornment>
                      }
                      placeholder="Additional Information (Optional)"
                    />
                  </FormControl>
                </div>
              </div>

              <Divider />
              <div className="actions">
                {userInfo.isAdmin && (
                  <>
                    <AdminButtonPro
                      color={colors.goldish}
                      onClick={handleCardUpdate}
                    >
                      Save Card
                    </AdminButtonPro>
                    <AdminButton onClick={() => setDeletePrompt(true)}>
                      Delete Card
                    </AdminButton>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {!isEmpty(card) && (
            <div className="carditems">
              {addLoading ? (
                <Loader />
              ) : (
                <FixedTable
                  columns={headCells}
                  rows={card.items && card.items}
                />
              )}
              <RightAlign>
                <AdminButtonPro
                  color={colors.goldish}
                  onClick={() => setAddPrompt(true)}
                >
                  Add card item
                </AdminButtonPro>
              </RightAlign>
            </div>
          )}

          <MessageModal
            open={deletePrompt}
            setOpen={setDeletePrompt}
            caption={`Delete ${card && card.name}`}
            message={
              <div className="delete">
                <h4 className="deleteheader">This action is not reversable</h4>
                <p>Are you sure you want to delete {card.name}?</p>
                <p>This will also delete the pin, serial no and token</p>
                <div className="deleteconfirm">
                  <AdminButton onClick={() => setDeletePrompt(false)}>
                    No
                  </AdminButton>
                  <AdminButton onClick={handleCardDelete}>Yes</AdminButton>
                </div>
              </div>
            }
          />

          <MessageModal
            open={addPrompt}
            setOpen={setAddPrompt}
            caption={`Enter ${card && card.name} Details`}
            message={
              <div className="add">
                <div className="fullwidth">
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-name">
                      PIN
                    </InputLabel>
                    <Input
                      id="standard-adornment-pin"
                      value={pin}
                      required
                      onChange={(e) => setPin(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon />{' '}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-name">
                      serialNo
                    </InputLabel>
                    <Input
                      id="standard-adornment-serialno"
                      value={serialNo}
                      required
                      onChange={(e) => setSerialNo(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon />{' '}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-name">
                      Token
                    </InputLabel>
                    <Input
                      id="standard-adornment-token"
                      value={token}
                      required
                      onChange={(e) => setToken(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon />{' '}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="deleteconfirm">
                  <AdminButton onClick={() => setAddPrompt(false)}>
                    Cancel
                  </AdminButton>
                  <AdminButton onClick={handleCardItemAdd}>Add</AdminButton>
                </div>
              </div>
            }
          />
        </React.Fragment>
      ) : (
        <Card>
          <CardContent>You have not selected any card</CardContent>
        </Card>
      )}
    </UserProfileContainer>
  )
}

export default CardDetails
