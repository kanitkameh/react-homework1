import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ReviewDTO } from './Review';
import { useParams } from 'react-router-dom';
import { eventRepository } from './EventRepository';

interface ReviewFormProps {
  onSubmit: (review: ReviewDTO) => void;
}

export const ReviewForm  = () => {
let { eventId } = useParams();
  const [reviewData, setReviewData] = useState<ReviewDTO>({
    authorId: '',
    stars: 0,
    text: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //TODO handle the empty string case properly
    eventRepository.reviewEvent(eventId??"", reviewData)
    // Clear the form after submission
    setReviewData({
      authorId: '',
      stars: 0,
      text: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="authorId">Author ID:</label>
      <input type="text" id="authorId" name="authorId" value={reviewData.authorId} onChange={handleInputChange} required />

      <label htmlFor="stars">Stars:</label>
      <input type="number" id="stars" name="stars" value={reviewData.stars.toString()} onChange={handleInputChange} required />

      <label htmlFor="text">Text:</label>
      <textarea id="text" name="text" value={reviewData.text} onChange={handleInputChange} required />

      <button type="submit">Submit Review</button>
    </form>
  );
};
