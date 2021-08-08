import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as SearchApi from '../services/SearchApi';
import styles from '../components/ReviewView/reviewView.module.css';

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
            <><ul className={styles.container}>
                {reviews.map(review =>
                    <li key={review.id} className={styles.item}>
                        <p className={styles.author}>{`Author: ${review.author}`}</p>
                        <p>{review.content}</p>                            
                    </li>)}
            </ul></>
            }

            {reviews.length === 0 &&
            <p className={styles.noReview}>No reviews yet... :/</p>}
        </>
    );
}