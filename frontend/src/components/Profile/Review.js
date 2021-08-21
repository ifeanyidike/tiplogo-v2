import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { ReviewContainer, ProfileButtonAlt, ReviewedOverlay } from '../../styles/ProfileStyle';
import { Message as MessageIcon } from '@material-ui/icons'
import { TextareaAutosize, FormControl, InputAdornment } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux"
import Loader from "../Loaders/SimpleLoader"
import LockIcon from '@material-ui/icons/Lock';
import { createReview, listReviewDetailsByUser } from "../../redux/actions/reviewActions"
import { REVIEW_CREATE_RESET } from "../../redux/constants/reviewConstants"

const labels = {
    0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+', 2.5: 'Ok',
    3: 'Ok+', 3.5: 'Good', 4: 'Good+', 4.5: 'Excellent', 5: 'Excellent+'
};

export default function Review() {

    const [value, setValue] = useState(4);
    const [hover, setHover] = useState(-1);
    const [description, setDescription] = useState("");
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({ type: REVIEW_CREATE_RESET })
        dispatch(listReviewDetailsByUser())
    }, [dispatch])

    const { loading, error, result } = useSelector(state => state.reviewCreate)
    const { loading: loadingUser, review } = useSelector(state => state.reviewDetailsByUser)

    useEffect(() => {

        if (review) {
            setValue(review.value)
            setDescription(review.description)
        }
    }, [review])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createReview({ value, description }))
    }


    return (
        <ReviewContainer onSubmit={handleSubmit}>

            {
                review &&
                <ReviewedOverlay>
                    <LockIcon />
                </ReviewedOverlay>
            }
            <h2>Drop a review</h2>
            {
                loading ? <Loader />
                    :
                    loadingUser ? <Loader />
                        :

                        error ? <div className="error">{error}</div>

                            :
                            result ? <div className="error">{result}</div>
                                :
                                <div>
                                    <div className="rating">
                                        <Rating
                                            value={value}
                                            precision={0.5}
                                            onChange={(e, val) => setValue(val)}
                                            onChangeActive={(e, newHover) => setHover(newHover)}
                                        />
                                        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                                    </div>
                                    <div className="fullwidth">
                                        <FormControl className="form__control">
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                onChange={e => setDescription(e.target.value)}
                                                required
                                                value={description}
                                                rowsMin={5}
                                                startAdornment={<InputAdornment position="start"><MessageIcon /> </InputAdornment>}
                                                placeholder="Additional Information" />
                                        </FormControl>
                                    </div>
                                    <div className="button">
                                        <ProfileButtonAlt type="submit">
                                            Save Review
                                    </ProfileButtonAlt>
                                    </div>
                                </div>
            }
        </ReviewContainer>
    );
}
