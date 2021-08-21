import { FormControl, makeStyles, TextField } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const UploadChoices = ({ value, onChange, options, text }) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <TextField
                select
                value={value}
                label={text && `Please select ${text}`}
                onChange={onChange}
                SelectProps={{
                    native: true
                }}
            // InputProps={{
            //     startAdornment: <InputAdornment position="start"><LoyaltyIcon /> </InputAdornment>
            // }}

            >
                {options}

            </TextField>
        </FormControl>
    )
}

export default UploadChoices
