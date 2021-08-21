import axios from "axios"
import React, { useState } from 'react'
import { FormControl, InputAdornment, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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


const InstitutionChoice = ({ stage, programme, setProgramme,
    institution, setInstitution,
    course, setCourse, required }) => {
    const classes = useStyles();
    const [schools, setSchools] = useState([])
    const [courses, setCourses] = useState([])
    const [tempInstitution, setTempInstitution] = useState()

    const onProgrammeChange = (stage) => async (e) => {
        setProgramme({ ...programme, [stage]: e.target.value })
        const { data } = await axios.get(`/api/schools/programme/${e.target.value}`)
        setSchools(data)
        console.log(data)
    }

    const onInstitutionChange = (stage) => async (e) => {
        const index = e.target.selectedIndex
        const selectedText = e.target[index].text
        setTempInstitution(e.target.value)
        setInstitution({ ...institution, [stage]: selectedText })

        const { data } = await axios.get(`/api/schools/${e.target.value}`)
        setCourses(data.courses)
    }


    return (
        <div className="content">
            <FormControl fullWidth className={classes.formControl}>
                <TextField
                    select
                    id={`programme-${stage}`}
                    required={required}
                    label="Preferred Programme"
                    value={programme.[stage]}
                    onChange={onProgrammeChange(stage)}
                    SelectProps={{
                        native: true
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><LoyaltyIcon /> </InputAdornment>
                    }}
                    helperText="Please select preferred programme"
                >
                    <>
                        <option value="" ></option>
                        <option value="donotchange">Do not change</option>
                        <option value="degree">Degree</option>
                        <option value="hnd">HND</option>
                        <option value="nce">NCE</option>
                        <option value="iei">IEI</option>
                    </>
                </TextField>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <TextField
                    select
                    required={required}
                    value={tempInstitution}
                    label="Institution"
                    onChange={onInstitutionChange(stage)}
                    SelectProps={{
                        native: true
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SchoolIcon /> </InputAdornment>
                    }}
                    helperText="Please select institution"
                >
                    {
                        schools &&
                        <>
                            {
                                schools.length !== 0 &&
                                <option value="">Choose an institution</option>
                            }
                            {schools.map((school) => (
                                <option key={school._id} value={school._id}>
                                    {school.institution}
                                </option>
                            ))}
                        </>
                    }
                </TextField>
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
                <TextField
                    select
                    required={required}
                    label="Courses"
                    value={course.[stage]}
                    onChange={(e) => setCourse({ ...course, [stage]: e.target.value })}
                    SelectProps={{
                        native: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><MenuBookIcon /> </InputAdornment>
                    }}
                    helperText="Please select course"
                >

                    {
                        courses &&
                        <>
                            {
                                courses.length !== 0 &&
                                <option value="">Choose a course</option>
                            }
                            {courses.map((course, ind) => (
                                <option key={ind} value={course}>
                                    {course}
                                </option>
                            ))}
                        </>
                    }

                </TextField>
            </FormControl>
        </div>
    )
}

export default InstitutionChoice
