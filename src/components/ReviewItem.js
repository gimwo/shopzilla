function ReviewItem({ review }) {
  return (
    <div className="p-5 user-review d-flex gap-5 justify-content-between">
      <img src={`https://ui-avatars.com/api/?name=${review.reviewer}`}></img>
      <div>
        <h3>"{review.headline}"</h3>
        <h5>{review.message}</h5>
        <h6>
          {review.reviewer} - posted on {review.dateCreated.slice(0, 10)}
        </h6>
      </div>
      <div>
        {" "}
        <h4>{"⭐".repeat(review.rating)}</h4>
      </div>
    </div>
  );
}

export default ReviewItem;
