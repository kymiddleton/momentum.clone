# Momentum Clone
This is a group project for a Full Stack Web Development Bootcamp. 

Google Chrome has a browser extension called Momentum. It's a custom page that replaces new tabs with a personal dashboard that provides a dedicated space to track todo's, store favorite links, check the local weather and get inspired with daily photos and quotes.  The purpose of the tool is to inspire productivity by helping to eliminate distractions and beat procrastination with todo reminders. 

The purpose of this project it to create a clone of the Momentum dashboard with the following features:  

• Keep track of tasks with Todo list.  
• Links and search
• Check the time
• See the weather and forecast
• New inspirational photo and quote each day

The attached images illustrate the homescreen for the completed project by greeting:

Morning: /images/Momentum_Morning_2.jpeg
Afternoon: /images/Momentum_Afternoon_2.jpeg
Evening: /images/Momentum_Evening_2.jpeg

# Getting Started
To start this project a clone of the repository needs to be made to a local machine.  Once the repository is cloned run <npm install> which is needed to run the app.  Once completed additional Node packages need to be installed.  

- NPM express
- NPM mongoose
- NPM moment

# Prerequisites:
The following applications need to be installed inorder to run the Momentum.clone app.
- Node.js
- Express
- Mongoose

# Deployment
The project is deployed with Heroku.
- Heroku add-ons:  mLab MongoDB

# Code Structure
Models
- index.js
- linksLog.js
- quotesLog.js
- todoLog.js

Public Files
- images
- javascript (js)
    * clock.js
    * greeting.js
    * links.js
    * quote.js
    * todo.js
- styles
    * reset.css
    * style.css
- index.html

Routes
- api-routes-links.js
- api-routes-quotes.js
- api-routes-todo.js
- html-routes.js

Other
- server.js
- node_modules
- .gitignore
- package-lock.json
- package.json
- README_projectInstructions
- README.md:  Project Overview

# Authors
- Alex Dominy - Clock 
- Robert Doughty - Links
- Sean Hance - Todo
- Kyla Middleton - Lead Architect
    * Created base HTML and CSS
    * Configured/tested models and routes.
    * Seeded database
    * Created greetings by time of day
    * Created inspirational quote.

# Acknowledgements
- Unsplash Photos
    * Photo by Jakub Kriz on Unsplash (https://unsplash.com/photos/q1wd1Q2LYHc)
    * Photo by Shane Perry on Unsplash (https://unsplash.com/photos/SH5yTzEdqfY)
    * Photo by Chris Liu-Beers on Unsplash (https://unsplash.com/photos/z6cFcCh60Aw)
