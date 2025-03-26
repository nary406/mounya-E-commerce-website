import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import { ThreeDots } from 'react-loader-spinner'

import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductsItem from '../SimilarProductsItem'

class ProductItemDetails extends Component {
  state = {productDetails: '', status: 'loading', count: 1}

  componentDidMount() {
    this.getProductCard()
  }

  getProductCard = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({status: 'loading'})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = ` https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(prod => ({
          id: prod.id,
          imageUrl: prod.image_url,
          title: prod.title,
          price: prod.price,
          description: prod.description,
          brand: prod.brand,
          totalReviews: prod.total_reviews,
          rating: prod.rating,
          availability: prod.availability,
        })),
      }
      this.setState({productDetails: updatedData, status: 'success'})
    } else {
      this.setState({status: 'failure'})
    }
  }

  onClickIncrease = () => {
    const {productDetails, count} = this.state
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onCickdecrease = () => {
    const {productDetails, count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  specificProduct = () => {
    const {productDetails, count} = this.state
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
    } = productDetails
    return (
      <div className="top_div">
        <img src={imageUrl} className="main_image" alt="product" />
        <div>
          <h1>{title}</h1>
          <p>Rs{price}/-</p>
          <div className="review_div">
            <div className="raing_div">
              <p>{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star_png"
              />
            </div>
            <p>{totalReviews} reviews</p>
          </div>
          <p>{description}</p>
          <p>available: {availability}</p>
          <p>brand: {brand}</p>
          <hr />
          <div className="cart_div">
            <button
              type="button"
              data-testid="minus"
              onClick={this.onCickdecrease}
            >
              <BsDashSquare alt="minus" />
            </button>
            <p>{count}</p>
            <button
              type="button"
              data-testid="plus"
              onClick={this.onClickIncrease}
            >
              <BsPlusSquare alt="plus" />
            </button>
          </div>
          <button className="add_div">ADD TO CART</button>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {productDetails} = this.state
    const {similarProducts} = productDetails
    return (
      <div className="allover_div">
        {this.specificProduct()}
        <h1>Similar Products</h1>

        <ul className="unOrder_list">
          {similarProducts?.map(item => (
            <SimilarProductsItem itemdetails={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => {
    const skfsf = 'sfksm'

    return (
      <div data-testid="loader">
        <ThreeDots type="ThreeDots" color="blue" height={80} width={80} />
      </div>
    )
  }

  renderFailureView = () => {
    const skfsf = 'sfksm'

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1>Product Not Found</h1>
        <Link to="/products">
          <button type="button">Continue Shopping</button>
        </Link>
      </div>
    )
  }

  switchStatus = () => {
    const {productDetails, status} = this.state
    const {similarProducts} = productDetails

    switch (status) {
      case 'success':
        return this.renderSuccessView()
      case 'loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {productDetails} = this.state
    const {similarProducts} = productDetails

    return (
      <div>
        <Header />
        {this.switchStatus()}
      </div>
    )
  }
}

export default ProductItemDetails
