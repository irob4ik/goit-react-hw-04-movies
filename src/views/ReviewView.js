import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as SearchApi from '../services/SearchApi';

export default function ReviewView() {
    const [reviews, setReviews] = useState([]);
    const { moviesId } = useParams();

    useEffect(() => {
        SearchApi.fetchReviewById(moviesId)
        .then(data => {
            setReviews(data.results)
        })
    }, [moviesId])
    
    return (
        <>
            {reviews &&
            reviews.length > 0 &&
            <><ul>
                {reviews.map(review =>
                    <li key={review.id}>
                        <p>{`Author: ${review.author}`}</p>
                        <p>{`Review: ${review.content}`}</p>                            
                    </li>)}
            </ul></>
            }

            {reviews.length === 0 &&
            <p>No reviews yet</p>}
        </>
    );
}