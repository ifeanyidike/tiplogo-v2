import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import queryString from "query-string"
import { useLocation } from "react-router-dom"
import { Person as PersonIcon, Message as MessageIcon } from '@material-ui/icons'
import { deleteCourse, listSchoolDetailsById, updateSchool } from '../../../redux/actions/schoolActions'
import { Card, CardContent, colors, Divider } from '@material-ui/core';
import { Input, FormControl } from '@material-ui/core'
import { TextareaAutosize, InputLabel, InputAdornment, IconButton } from '@material-ui/core'
import { SchoolsOverviewContainer, AdminButton, AdminButtonPro } from "../../../styles/AdminStyles"
import Loader from "../../../components/Loaders/SimpleLoader"
import ClearIcon from '@material-ui/icons/Clear';
import MessageModal from "../../../components/Utils/MessageModal"
import { setMessage } from '../../../redux/actions/utilActions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));


const Courses = ({ value }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const location = useLocation()
    const [programme, setProgramme] = useState("")
    const [institution, setInstitution] = useState("")
    const [course, setCourse] = useState("")
    const [courseToDelete, setCourseToDelete] = useState("")
    const [deletePrompt, setDeletePrompt] = useState(false)
    const [multiLineCourses, setMultiLineCourses] = useState("")

    const { schoolId } = queryString.parse(location.search)

    useEffect(() => {
        dispatch(listSchoolDetailsById(schoolId))
    }, [dispatch, schoolId])

    useEffect(() => {
        dispatch(listSchoolDetailsById(schoolId))
    }, [dispatch, schoolId])

    const { loading, error, school } = useSelector(state => state.schoolDetails)

    useEffect(() => {
        if (school) {
            setInstitution(school.institution)
            setProgramme(school.programme)
        }
    }, [school])

    const handleSchoolUpdate = e => {
        e.preventDefault()
        const newSchool = { ...school, programme: programme, institution: institution, courses: [] }
        dispatch(updateSchool(newSchool))
        dispatch(listSchoolDetailsById(schoolId))
    }

    const handleCourseDelete = (course) => {
        const newCourses = school.courses.filter(prevCourse => prevCourse !== course)
        // const newSchool = { ...school, courses: newCourses }
        dispatch(deleteCourse(schoolId, newCourses))
        dispatch(listSchoolDetailsById(schoolId))
        setDeletePrompt(false)
    }

    const handleCourseAdd = (e) => {
        e.preventDefault()
        const newCourses = school.courses.map(prevCourse => prevCourse)
        if (!newCourses.includes(course)) {
            const newSchool = { ...school, courses: [course] }
            dispatch(updateSchool(newSchool))
            dispatch(listSchoolDetailsById(schoolId))
            setDeletePrompt(false)
        } else {
            dispatch(setMessage("Course already exists"))
        }

    }

    const handleDeletePrompt = (course) => {
        setCourseToDelete(course)
        setDeletePrompt(true)
    }

    const handleMultipleCoursesAdd = () => {
        const courses = multiLineCourses.split("\n")

        const newCourses = school.courses.map(prevCourse => prevCourse)
        for (let course of courses) {
            if (newCourses.includes(course)) {
                dispatch(setMessage(`${course} already exists`))
                return
            }
            if (course === '') {
                dispatch(setMessage(`White space not allowed! Course cannot be empty.`))
                return
            }
        }
        const newSchool = { ...school, courses }
        dispatch(updateSchool(newSchool))
        dispatch(listSchoolDetailsById(schoolId))
    }

    return (

        <SchoolsOverviewContainer>

            {
                loading ? <Loader />
                    :
                    error ?
                        <Card>
                            <CardContent>
                                No school selected.
                            </CardContent>
                        </Card>
                        :
                        school ?
                            <div>
                                <Card className="card__content">
                                    <CardContent>
                                        <div className="heading">

                                            <h2>{school.institution}</h2>
                                            <span>{school.programme}</span>
                                        </div>
                                        <Divider />
                                        <form className="contents" onSubmit={handleSchoolUpdate}>
                                            <div>
                                                <span>Created on:</span>
                                                <span>{new Date(school.createdAt).toDateString()}</span>
                                            </div>
                                            <div>
                                                <span>Updated on:</span>
                                                <span >
                                                    {new Date(school.updatedAt).toDateString()}</span>
                                            </div>
                                            <div className="fullwidth">
                                                <FormControl fullWidth className={classes.formControl}>
                                                    <InputLabel htmlFor="standard-adornment-programme">Programme</InputLabel>
                                                    <Input
                                                        id="standard-adornment-programme"
                                                        value={programme}
                                                        required
                                                        onChange={(e) => setProgramme(e.target.value)}
                                                        startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="fullwidth">
                                                <FormControl fullWidth className={classes.formControl}>
                                                    <InputLabel htmlFor="standard-adornment-institution">Institution</InputLabel>
                                                    <Input
                                                        id="standard-adornment-institution"
                                                        value={institution}
                                                        required
                                                        onChange={(e) => setInstitution(e.target.value)}
                                                        startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="actions">

                                                <AdminButtonPro
                                                    color={colors.goldish}
                                                    type="submit"
                                                >Save School Details</AdminButtonPro>

                                            </div>
                                        </form>

                                        <div className="courses">
                                            <h2>Courses</h2>
                                            <Divider />
                                            <div className="courseitems">
                                                {
                                                    school.courses &&
                                                    school.courses.map((course, index) => (
                                                        <span key={index}>
                                                            {course}
                                                            <IconButton onClick={() => handleDeletePrompt(course)}>
                                                                <ClearIcon fontSize="small" />
                                                            </IconButton>
                                                        </span>
                                                    ))
                                                }
                                                <form className="addcourse" onSubmit={handleCourseAdd}>
                                                    <FormControl fullWidth className={classes.formControl}>
                                                        <InputLabel htmlFor="standard-adornment-course">Course</InputLabel>
                                                        <Input
                                                            id="standard-adornment-course"
                                                            value={course}
                                                            required
                                                            onChange={(e) => setCourse(e.target.value)}
                                                            startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                                        />
                                                    </FormControl>
                                                    <AdminButton type="submit" >
                                                        Add course
                                            </AdminButton>
                                                </form>
                                            </div>
                                        </div>


                                        <MessageModal
                                            open={deletePrompt}
                                            setOpen={setDeletePrompt}
                                            caption={`Delete course`}
                                            message={
                                                <div className='delete'>
                                                    <p>Are you sure you want to delete {courseToDelete}?</p>
                                                    <div className="deleteconfirm">
                                                        <AdminButton onClick={() => setDeletePrompt(false)}>No</AdminButton>
                                                        <AdminButton onClick={() => handleCourseDelete(courseToDelete)}>Yes</AdminButton>
                                                    </div>
                                                </div>
                                            }
                                        />

                                    </CardContent>
                                </Card>
                                <Card className="multiline_courses">
                                    <h2>Add Multiple Courses</h2>
                                    <CardContent>
                                        <div className="fullwidth">
                                            <FormControl className={classes.formControl}>
                                                <TextareaAutosize
                                                    aria-label="minimum height"
                                                    onChange={e => setMultiLineCourses(e.target.value)}
                                                    value={multiLineCourses}
                                                    rowsMin={20}
                                                    startAdornment={<InputAdornment position="start"><MessageIcon /> </InputAdornment>}
                                                    placeholder="Add courses line by line. Remove every white space."
                                                />
                                            </FormControl>
                                            <div className="actions">
                                                <AdminButton onClick={handleMultipleCoursesAdd}>Add</AdminButton>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            :
                            <Card>
                                <CardContent>
                                    No school selected.
                            </CardContent>
                            </Card>
            }
        </SchoolsOverviewContainer>
    )
}

export default Courses
