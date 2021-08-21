import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { listSchools } from '../../../redux/actions/schoolActions'
import FixedTable from "./FixedTable"
import Loader from "../../../components/Loaders/SimpleLoader"
import { AdminButtonPro, RightAlign } from "../../../styles/AdminStyles"
import { createSchool } from '../../../redux/actions/schoolActions'

const Schools = ({ setValue }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listSchools())
    }, [dispatch])

    const headCells = [
        { id: 'programme', numeric: false, disablePadding: true, label: 'Programme' },
        { id: 'institution', numeric: true, disablePadding: false, label: 'Institution' },
    ];
    const { loading, error, schools } = useSelector(state => state.schoolList)
    const { loading: createLoading, error: createError } =
        useSelector(state => state.schoolCreate)



    const handleAddNew = () => {
        dispatch(createSchool())
        dispatch(listSchools())
    }

    return (
        <div>
            {
                loading ? <Loader />
                    :
                    error ? error
                        :
                        createLoading ? <Loader />
                            :
                            createError ? createError
                                :
                                <FixedTable
                                    columns={headCells}
                                    rows={schools && schools.schools}
                                    setValue={setValue}
                                />

            }

            <RightAlign >
                <AdminButtonPro onClick={handleAddNew}>Add a new card</AdminButtonPro>
            </RightAlign>

        </div>
    )
}

export default Schools
