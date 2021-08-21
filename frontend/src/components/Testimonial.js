import React, { useEffect } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import Loader from "./Loaders/SimpleLoader"
import { useSelector, useDispatch } from 'react-redux'
import { listReviews } from '../redux/actions/reviewActions';
import Rating from '@material-ui/lab/Rating';
import { Avatar } from '@material-ui/core';

const Testimonial = ({ perPage }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listReviews())
    }, [dispatch])


    const { loading, error, reviews } = useSelector(state => state.reviewList)

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            totalSlides={reviews && reviews.length}
            visibleSlides={perPage}
            infinite={true}
            isIntrinsicHeight={true}
        >
            <Slider>

                {
                    loading ? <Loader />
                        :
                        error ? error
                            :
                            reviews && reviews.map((review, index) => (
                                <Slide key={index} index={index}>
                                    <div className="slide__item">
                                        <Avatar className="avatar" src={
                                            review.user && review.user.profile &&
                                                review.user.profile.picture ?
                                                review.user.profile.picture :
                                                '/images/default-avatar.jpg'
                                        }
                                            alt={`${review.user && review.user.name} testimonial`} />
                                        <div>
                                            <p><Rating defaultValue={review.value} precision={0.5} readOnly /></p>
                                            <p>
                                                {
                                                    review.description.length > 70
                                                        ?

                                                        review.description.substring(0, 70)
                                                        + String.fromCharCode(8230)

                                                        :
                                                        review.description
                                                }
                                            </p>
                                            <small>{review.user && review.user.name}</small>
                                        </div>
                                    </div>
                                </Slide>
                            ))
                }


            </Slider>
            <ButtonBack><ArrowBackIcon fontSize='large' /></ButtonBack>
            <ButtonNext><ArrowForwardIcon fontSize='large' /></ButtonNext>

        </CarouselProvider>
    )
}

export default Testimonial
