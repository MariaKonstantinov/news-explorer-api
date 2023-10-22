# Final Project at TripleTen: News Explorer: Back-End :seedling:

### TripleTen Web Development Program 2023

### :four_leaf_clover: Overview

- Project Concept
- Project Technologies and Features
- Project Link

**:four_leaf_clover: Project Concept**

This project represents a service where users can search for news articles and save them to their profiles.

**:four_leaf_clover: Project Technologies and Features**

This is a backend part of News Explorer Final Project at TripleTen. Deployed on Google Cloud VM. The project was created with Express and MongoDB.

The website has 2 main features:

1. When the user enters a keyword in the search bar, the website sends a request to the News API service, finds all the relevant articles over the last week, and displays a list of cards for each of them.

2. The website displays all articles saved by a user in a special section of the website.

Back-End Implementation - two APIs:

1. The News API, which returns JSON data containing headlines, bylines and other data from keyword searches. Since requests will be sent to News API from the browser, there is no need to write the back end.

2. An API for user authentication and saving articles. Created this back-end server independently.

Technologies used:

- Express.js / Node.js / MongoDB / JWT server authorization / Joi requests validation / centralized Error Handling / localStorage / Google Cloud VM / Domain linked to the server.

**:four_leaf_clover: Project Link**

- [Project Link]()
