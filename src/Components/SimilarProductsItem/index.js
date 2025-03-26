import './index.css'

const SimilarProductsItem = props => {
  const {itemdetails} = props
  const {
    id,
    imageUrl,
    price,
    title,
    brand,
    totalReviews,
    description,
    availability,
    rating,
  } = itemdetails
  console.log(id)

  return (
    <li className="list_item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similiar_png"
      />
      <h5>{title}</h5>
      <p>{brand}</p>
      <div className="price_rating">
        <p>Rs {price}/-</p>
        <div className="raing_div">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star_png"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductsItem
