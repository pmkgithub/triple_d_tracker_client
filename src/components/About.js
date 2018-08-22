import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentRoute } from "../actions/action_currentRoute";
import ddd_gif from '../images/ddd.gif';
import map_usa from '../images/about_page/map_usa.png';
import map_state from '../images/about_page/map_state.png';
import map_nearme from '../images/about_page/map_nearme.png';
import map_visited from '../images/about_page/map_visited.png';
import review from '../images/about_page/review.png';
import './about.css';

class About extends Component {

  componentWillMount() {
    this.props.setCurrentRoute(window.location.pathname); // for Nav.js links logic.
  }

  render() {
    return (
      <div className="about_wrapper">
        <div className="about_title">About</div>

        <div className="about_sections_wrapper">

          <section className="about_overview_section">
            <div className="about_overview_section_title">Overview</div>

            <article className="about_overview_article">
              <img className="about_overview_article_image" src={ddd_gif} alt="Diners Driven-ins Dives gif"/>
              <div className="about_overview_content_wrapper">
                <div className="about_overview_content_title">Diners Drive-ins and Dives Tracker</div>
                <div className="about_overview_content">
                  <p>Discover and explore over 1000+ Triple D locations - the most complete listing found anywhere!&nbsp;&nbsp;New episodes added regulary.</p>
                  <p>Easily find any Triple D location.&nbsp;&nbsp;When you visit a Triple D location, write your own personal and private review to remember your experience.&nbsp;&nbsp;This site is all about you.</p>
                  <p>What could be simpler?</p>
                </div>
              </div>
            </article>

          </section>

          <section className="about_dashboard_section">
            <div className="about_dashboard_section_title">The Dashboard</div>

            <article className="about_dashboard_article">
                <img className="about_dashboard_article_image" src={map_usa} alt=""/>
                <div className="about_dashboard_content_wrapper">
                  <div className="about_dashboard_content_title">Filter By: USA</div>
                  <div className="about_dashboard_content">
                    <p>When the Diners Drive-ins and Dives Tracker application loads, the User is presented with all Triple D locations in the Lower 48 states.</p>
                    <p>Alaska and Hawaii Triple D locations can be found via the States Filter (see below).</p>
                  </div>
                </div>
            </article>

            <article className="about_dashboard_article">
              <img className="about_dashboard_article_image" src={map_state} alt=""/>
              <div className="about_dashboard_content_wrapper">
                <div className="about_dashboard_content_title">Filter By: States</div>
                <div className="about_dashboard_content">
                  <p>Find Triple D locations by State.</p>
                  <p>In any Filtered View, you can click a listed location and zoom into that particular location on the map.</p>
                  <p>Clicking the "Map All Listed Locations" button will zoom back out to display all locations in the current Locations List.</p>
                </div>
              </div>
            </article>

            <article className="about_dashboard_article">
              <img className="about_dashboard_article_image" src={map_nearme} alt=""/>
              <div className="about_dashboard_content_wrapper">
                <div className="about_dashboard_content_title">Filter By: Near Me</div>
                <div className="about_dashboard_content">
                  <p>When road tripping, Filter By Near Me comes in super handy.</p>
                  <p>Find locations within 20, 50, 100, 200 or 300 mile radii of your current location.</p>
                  <p>For this feature to work, one must allow the Browser to access your location.</p>
                </div>
              </div>
            </article>

            <article className="about_dashboard_article">
              <img className="about_dashboard_article_image" src={map_visited} alt=""/>
              <div className="about_dashboard_content_wrapper">
                <div className="about_dashboard_content_title">Filter By: Visited</div>
                <div className="about_dashboard_content">
                  <p>To see all the locations you have visited, simply click the Visited filter radio button.</p>
                </div>
              </div>
            </article>

          </section>

          <section className="about_review_section">
            <div className="about_review_section_title">Writing Reviews</div>

            <article className="about_review_article">
              <img className="about_review_article_image" src={review} alt=""/>
              <div className="about_review_content_wrapper">
                <div className="about_review_content_title">Reviews</div>
                <div className="about_review_content">
                  <p>Click Map Markers to view restaurant detail and reviews.</p>
                  <p>Each time you visit a Triple D location, write a review.  Reviews are private to you and only you.</p>
                  <p>When the review is saved, the Map Marker turns green indicating it has been Visited.</p>
                  <p>Save multiple reviews; one for each time you visit the same Triple D location.</p>
                </div>
              </div>
            </article>

          </section>

        </div>
      </div>
    )
  }
}

export default connect(null, {setCurrentRoute})(About);