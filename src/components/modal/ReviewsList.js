import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewList extends Component {

  // for dev
  constructor(props) {
    super(props);

    this.state = {
      // reviews: [
      //   {
      //     // "_id" : ObjectId("5b5794adac0149234d4ad6e6"),
      //     "locationId" : "5b3cfa5f8b3c33973279e839",
      //     "date" : "2018-07-01",
      //     "review" : "Sweet Stuff"
      //   },
      //   {
      //     // "_id" : ObjectId("5b5794cfac0149234d4ad6e7"),
      //     "locationId" : "5b3cfa5f8b3c33973279e8c1",
      //     "date" : "2018-07-02",
      //     "review" : "This ain't Jimmy John's."
      //   },
      //   {
      //     // "_id" : ObjectId("5b5794e2ac0149234d4ad6e8"),
      //     "locationId" : "5b3cfa5f8b3c33973279e8b6",
      //     "date" : "2018-07-03",
      //     "review" : "Darn good BBQ!"
      //   },
      //   {
      //     // "_id" : ObjectId("5b57951bac0149234d4ad6e9"),
      //     "locationId" : "5b3cfa5f8b3c33973279e7c1",
      //     "date" : "2018-07-16",
      //     "review" : "Zema?  Wasn't that a really bad drink form the 90's?"
      //   },
      //   {
      //     // "_id" : ObjectId("5b57c49992535b2361b7b2e0"),
      //     "locationId" : "5b3cfa5f8b3c33973279e7b9",
      //     "date" : "2018-07-01",
      //     "review" : "Elfs's Den review"
      //   },
      //   {
      //     // "_id" : ObjectId("5b57d33bacf989053f4b5da1"),
      //     "locationId" : "5b3cfa5f8b3c33973279e96a",
      //     "date" : "2018-07-01",
      //     "review" : "yummy"
      //   }
      // ]
    }
  }

  renderList() {
    const locationId = this.props.mapData.locationId;
    console.log('ReviewList.js this.props = ', this.props);

    // production
    return this.props.reviews.map((review, index) => {
    // for dev
    // return this.state.reviews.map((review) => {

      if (review.locationId === locationId) {
        return (
          <li
            key={index}
            className="review_list_li"
          >
            <div className="review_date">Date Visited:<span>{review.date}</span></div>
            <div className="review_review_header">Review:</div>
            <div className="review_review">{review.review}</div>
          </li>
        )
      }
    });

  }

  render() {
    return (
      <ul className="review_list_ul">
        {this.renderList()}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    reviews: state.reviews.reviews
  }
};

export default connect(mapStateToProps, null)(ReviewList);