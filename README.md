# Habitual Client Side
The project task given to us was to create a habit tracking web app where users can create an account, login and track their habits

This repository stores the client side code of the project

![habitual Logo](./client/assets/images/logo.png)

## Purpose
### Why Habit Tracking is important?
- Assists in beginning habits
- It boosts motivation to see your progress
- Provides a visual cue that can be a reminder to act

Habitual is a web app that helps you in building good habits and reaching your goals
A customisable tracker where you can create and track your own habits, and work towards building a streak to show off. 
Habitual: A platform for you to “become the best you”

## Our Process
- Day 0 (Design): Brainstorming and planning the steps of the project to achieve our desired goal
- Day 1: The initial building of both the client and server side
- Day 2: Connecting the client and server side together
- Day 3: Debugging and implementing desired functionality onto the site (i.e. editing and deleting habits)
- Day 4: Finishing touches to the website

## Functionality
For the design of Habitual, we took the user specifications and seperated them into system requirements.

### Requirements
- Users are able to login:
    - Users can create an account if they do not have one already
    - Users cannot access the website without an account logged in
    - Users passwords are not stored in plaintext in the database
- Users are be able to choose a habit they want to track and choose the frequency which the habit appears
    - Create a new habit, users can input:
        - name (required)
        - start date & end date (required)
        - interval in days/months (required)
        - note
        - colour
    - This habit will then appear on the users dashboard in either Overdue Habits, Todays Habits or Upcoming Habits
    - Users can also edit the name, note and color of their habit in the "All" tab
- Users are able to mark habits as complete and view a recent completion streak
    - A checkbox will be placed next to habits on the dashboard and users can click on the tick to mark the habit as complete
        - If an overdue habit is marked complete, it will disappear on a page refresh
        - If a today's habit is marked complete, it will be shown to the user so that they can view what has been completed for the day
        - Users cannot complete upcoming habits, only view it
    - A streak counter will be presented on the dashboard to the user


## Installation & Usage

### Installation
- Clone or download this repo
- Navigate to the 'client' folder
- Run the server and open register.html with a live server and you can test the site locally

### Usage
- Open register.html with a live server to run the site locally
- Or visit our [live website](https://relaxed-speculoos-a7d774.netlify.app/client/index.html) - deployed with Netlify.

## Technologies
- Express: Implement our Habits API
- Nodemon/Node: Running the API
- Bcrypt: Encrypting user passwords using hashes
- Dayjs: Used to perform arithmetic functions (i.e. add/subtract) on dates
- Postgres: We opted for a SQL database due to our data schema
- ElephantSQL: Used for database storage
- Jest and supertest: Testomg API routes, controllers and models
- Netlify: Client-side deployment

## Navigating through 'Habitual'
- First, create and log into a user through the register/login page, remember to make your username unique!
- Now you can access the dashboard, where you can create a habit using the 'Create New Habit' button
- A modal should have popped up asking for information on your habit and how frequent you want to complete it, fill out all the fields and click submit!
- The habit should now be presented to you in the different habit slots, if you created a habit to start tomorrow, it will appear in the upcoming habits section. If you created a habit to start today, you will see it in today's section and the next date to complete it in the upcoming section,
- If you happen to miss our one of your habits, it will be shown within the Overdue Habit section for you to completed
- You can create as many habits as you like which can be viewed in the 'All' tab where you can view, edit and delete your habits. The editing options provides a modal for you to change the name, note and colour of the habit
- Back on the dashboard, if you have finished the habit for the day, you can click the nice tick button next to the habit to mark it as completed, however, once you click complete you can't uncomplete it.
- Finally, there is a Streak numeric in the top right corner of the dashboard which will present you with a number that represents how good you have been at completing your habits. The Streak numeric on the dashboard only shows the habit with the highest streak but you can view your different habit streaks on the insight tab, where each habit is shown with their individual streak value.
- Once you are all done, you can logout and go about your day.

## Wins & Challenges
### Wins
- All Habits page: Pagination generated for multiple habits
- Home page: Habits are organised into ***Overdue***, ***Today*** and ***Upcoming***, with intuitive interaction
- Stylish *'Admin Dashboard'* design
### Challenges
- Achieving a *Single Page Application* feel when working with multiple HTML pages
- Limiting requests to the server which consequently results in slower load times or potentially blocked requests

## Future Features
- Implementing a categories tab that can filter through different types of habits
- Add more visual data on the insights page such as graphs for users to view
- Create a info/landing page for users before they create an account or login

## Licence

[MIT licence](https://opensource.org/licenses/mit-license.php)

