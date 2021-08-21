import React, { useState, useEffect } from 'react'
import { Card, CardContent, FormControl, InputAdornment, TextField } from '@material-ui/core';
import { AdminPrice, AdminButtonAlt } from '../../../styles/AdminStyles';
import CurrencyFormat from 'react-currency-format'
import { listServiceDetailsById, listServices, updateService } from '../../../redux/actions/serviceActions'
import { useDispatch, useSelector } from "react-redux"
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { makeStyles } from '@material-ui/core/styles';
import Loader from "../../../components/Loaders/SimpleLoader"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const Services = ({ value }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [price, setPrice] = useState(0)
    const [serviceValue, setServiceValue] = useState("")



    const { loading, error, services } = useSelector(state => state.serviceList)
    const { loading: updateLoading, error: updateError } = useSelector(state => state.serviceUpdate)
    const { service } = useSelector(state => state.serviceDetails)


    useEffect(() => {
        dispatch(listServices())
        if (service) {
            setPrice(service.cost)
        }
    }, [dispatch, service])

    const handleServiceUpdate = () => {
        const servicesToUpdate = services.filter(service => service._id === serviceValue)
        const [serviceToUpdate] = servicesToUpdate
        const newService = { ...serviceToUpdate, cost: price }
        dispatch(updateService(newService))
    }

    const handleServiceChange = (e) => {
        const newService = e.target.value
        setServiceValue(newService)
        dispatch(listServiceDetailsById(newService))
    }

    return (
        <div>
            {
                loading ? <Loader />
                    :
                    updateLoading ? <Loader />
                        :
                        error ? error
                            :
                            updateError ? updateError
                                :
                                <AdminPrice >
                                    <Card >
                                        <CardContent>
                                            <h3>Set Service Cost</h3>

                                            <FormControl fullWidth className={classes.formControl}>
                                                <TextField
                                                    select

                                                    label="Services"
                                                    value={serviceValue}
                                                    onChange={handleServiceChange}
                                                    SelectProps={{
                                                        native: true
                                                    }}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><LoyaltyIcon /> </InputAdornment>
                                                    }}
                                                    helperText="Please select the service"
                                                >
                                                    <>
                                                        <option value="" ></option>
                                                        {
                                                            services && (
                                                                services.map(service => (
                                                                    <option key={service._id} value={service._id}>{service.name}</option>
                                                                ))
                                                            )
                                                        }

                                                    </>
                                                </TextField>
                                            </FormControl>

                                            <CurrencyFormat value={price} thousandSeparator={true} prefix={'₦'}
                                                onValueChange={(values) => {
                                                    const { value } = values;
                                                    setPrice(value)
                                                }}
                                            />
                                            <AdminButtonAlt onClick={handleServiceUpdate}>Save</AdminButtonAlt>
                                        </CardContent>
                                    </Card>
                                </AdminPrice>
            }

        </div>
    )
}

export default Services
