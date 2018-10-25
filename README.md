# [Diners, Drive-ins & Dives Tracker](https://rocky-bayou-25901.herokuapp.com/)

Easily find restaurants featured on Food Network's most successful and popular show.

Now, fans can write private reviews and track the locations they visit.
![triple d guy fieri animation](https://github.com/pmkgithub/triple_d_tracker_client/blob/master/src/images/ddd.gif)

## Overview

Triple D (Diners, Drive-ins & Dives) fans are not your typical foodie.  They are foodie fanatics!  It is not uncommon for fans to visit hundreds of different locations.

Until now, there was no easy way for Triple D fans to search locations and track the ones they visited.

Map Markers
* As you visit locations, write a review for each visit.  The map marker turns "green" indicating this is a visited location.
* Your reviews are private, and only you can see your reviews and visited locations.
* Non-visited restaurant location markers are Blue.
* Out of business locations are denoted by Red markers.

## Technology

### Front End
* React
* react-router
* Redux
* redux-thunk
* redux-form
* redux-modal
* react-google-maps

### Back End
* Node.js
* Express.js
* Express Router
* Express.js cors
* MongoDB (mLab)
* Mongoose

### Authentication
* bcryptjs
* jsonwebtoken
* passport
* passport-jwt
* passport-local

### Continuous Integration and Testing
* TravisCI
* mocha
* chai
***
# Using the App

## The Dashboard

### Filter by USA
When the Diners Drive-ins and Dives Tracker application loads, the User is presented with all Triple D locations in the Lower 48 states.

Alaska and Hawaii Triple D locations can be found via the States Filter (see below).
![on app load restaurants venues display](https://github.com/pmkgithub/triple_d_tracker_client/blob/master/src/images/about_page/map_usa.png)

### Filter by State
Find Triple D locations by State.

In any Filtered View, you can click a listed location and zoom into that particular location on the map.

Clicking the "Map All Listed Locations" button will zoom back out to display all locations in the current Locations List.
![on app load restaurants venues display](https://github.com/pmkgithub/triple_d_tracker_client/blob/master/src/images/about_page/map_state.png)

### Filter by Near Me
When road tripping, Filter By Near Me comes in super handy.

Find locations within 20, 50, 100, 200 or 300 mile radii of your current location.

For this feature to work, one must allow the Browser to access your location.
![on app load restaurants venues display](https://github.com/pmkgithub/triple_d_tracker_client/blob/master/src/images/about_page/map_nearme.png)

### Filter by Visited
To see all the locations you have visited, simply click the Visited filter radio button.
![on app load restaurants venues display](https://github.com/pmkgithub/triple_d_tracker_client/blob/master/src/images/about_page/map_visited.png)

## Writing Reviews

### Reviews
Click Map Markers to view restaurant detail and reviews.

Each time you visit a Triple D location, write a review. Reviews are private to you and only you.

When the review is saved, the Map Marker turns green indicating it has been Visited.

Save multiple reviews; one for each time you visit the same Triple D location.
![on app load restaurants venues display](https://github.com/pmkgithub/triple_d_tracker_client/blob/master/src/images/about_page/review.png)
