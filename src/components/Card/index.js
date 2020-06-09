// @flow

import React, { Component } from "react";

// importing the style from the external css file
import "./card.css";

// importing necessary images to display
import IconRating from "../../images/rating.png";
import IconMoveToTop from "../../images/movetotop.png";
import IconDelete from "../../images/delete.svg";
import IconDefault from '../../images/default.webp';

// declaring the type of states used
type Props = {};
type State = {};

class Card extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};

    //  binding all the necessary functions to perform state operations
    (this: any).onClickDelete = this.onClickDelete.bind(this);
    (this: any).onClickMovetoTop = this.onClickMovetoTop.bind(this);
    (this: any).onCardClick = this.onCardClick.bind(this);
  }
  onClickDelete(e) {
    e.stopPropagation();
    this.props.onClickDelete(this.props.index);
  }
  onClickMovetoTop(e) {
    e.stopPropagation();
    this.props.onClickMovetoTop(this.props.index);
  }
  onCardClick(e) {
    this.props.onCardClick(this.props.index);
  }

  // displaying the restaurants in cards format
  render() {
    let phone_number =
      this.props.restaurant.phone_numbers.split(",")[0] || null;
    return (
      <div
        className="restaurant-card"
        style={{ background: this.props.is_selected ? "#fff6f6" : "#fff" }}
      >
        <div style={{ width: "100%" }} onClick={this.onCardClick}>
          <div className="restaurant-meta-details">
            <div className="restaurant-content">
              <div className="restaurant-img-container">
                <img
                  alt="restaurant"
                  src={
                    this.props.restaurant.featured_image ||
                    IconDefault
                  }
                  className="restaurant-img"
                />
              </div>
              <div className="restaurant-details">
                <div className="restaurant-type">
                  {this.props.restaurant.establishment &&
                  this.props.restaurant.establishment.length
                    ? this.props.restaurant.establishment.map(
                        (establishment, index) => (
                          <div key={index + "_" + establishment}>
                            {establishment}
                          </div>
                        )
                      )
                    : null}
                </div>
                <div className="restaurant-name">
                  {this.props.restaurant.name}
                </div>
                {this.props.restaurant.user_rating ? (
                  <div className="restaurant-review">
                    <img
                      alt="rating"
                      src={IconRating}
                      style={{ height: 16, marginRight: 3 }}
                    />
                    {this.props.restaurant.user_rating.aggregate_rating + " "}
                    <span style={{ color: "#89959b", marginLeft: 3 }}>
                      ({this.props.restaurant.user_rating.votes})
                    </span>
                  </div>
                ) : null}
                {this.props.restaurant.location ? (
                  <div style={{ width: "100%" }}>
                    <div className="restaurant-locality">
                      {this.props.restaurant.location.locality || null}
                    </div>
                    <div className="restaurant-location">
                      {this.props.restaurant.location.address || null}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="card-actions">
                <img
                  alt="to top"
                  src={IconMoveToTop}
                  className="card-action-icons"
                  onClick={this.onClickMovetoTop}
                  style={{ marginRight: 10 }}
                />
                <img
                  alt="delete"
                  src={IconDelete}
                  className="card-action-icons"
                  onClick={this.onClickDelete}
                />
              </div>
            </div>
          </div>
          <div className="restaurant-meta-desc">
            <div className="restaurant-desc-titles">
              <div>CUISINES:</div>
              <div>COST FOR TWO:</div>
              <div>HOURS:</div>
            </div>
            <div className="restaurant-desc-details">
              <div>{this.props.restaurant.cuisines}</div>
              <div>
                {this.props.restaurant.currency +
                  " " +
                  this.props.restaurant.average_cost_for_two}
              </div>
              <div>{this.props.restaurant.timings}</div>
            </div>
          </div>
        </div>
        <div className="restaurant-actions">
          {phone_number ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="restaurant-action-call"
              href={"tel:" + phone_number}
            >
              Call
            </a>
          ) : null}
          {this.props.restaurant.menu_url ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="restaurant-action-menu"
              href={this.props.restaurant.menu_url}
            >
              View Menu
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Card;
