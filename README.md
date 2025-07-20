# Chrome-Extension

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: BHUPATHIRAJU SURYA SRI ROHIT VARMA

*INTERN ID*: CT08DF1032

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 8 WEEKS

*MENTOR*: NEELA SANTHOSH KUMAR

# Project Description 

This is my 4th task, The **Chrome-Extension Time Tracker** is a productivity tool that tracks your web surfing activity, classifies visited websites as productive, unproductive, or neutral, and offers time spent analytics. 

*It is composed of* :

   - A Chrome extension (background.js) that monitors the time of active tabs.

   - A Node.js backend (server.js) to store and process web surfing data.

   - A MongoDB database for storing data persistently.

   - The tool assists users to learn their digital behavior, maximize productivity, and reduce        distractions.

*Features* :

1. Real-Time Tab Tracking -
   
      It records time on every active tab that were using.

      Reports to the server every 60 seconds to record browsing duration.

2. Automatic Focus Detection -

      It suspends tracking when Chrome loses focus, like when switching to a different app.

      Again it resumes tracking when Chrome gains focus.

3. URL Classification -

      It has pre-configured categories for typical domains, like github.com = productive, youtube.com = unproductive.

      The unclassified domains are defaulted to "neutral".

4. Analytics Dashboard -
 
      Backend API sums up time spent per domain.

      It returns structured data for visualisation.

5. Lightweight & Efficient -

      Minimal browser performance impact.

      Data asynchronously sent to not block the UI.

# Technical Architectue

1. Chrome Extension -

     `JavaScript` : Core tracking logic for tab activity.

     `Chrome Extensions API` : tabs.onActivated / tabs.onUpdated (Monitor tab switches and URL updates).

     `Manifest V3` : for permissions and service worker configuration.

2. Backend Server -
   
      `Node.js` : Runtime environment.

      `Express.js` : API endpoint framework.

      `Mongoose` : MongoDB ODM for interaction.

      `CORS` : Middleware for cross-origin requests from the extension.

3. Database -

      `MongoDB` : NoSQL database for storing logs, like url, duration, timestamp.

4. Data Processing -

      `URL Parsing` : Native URL API for extracting domains, like youtube.com.

      `Classification Logic` : Hardcoded domain-to-category mapping, github.com -> "productive".

5. Communication -

      `Fetch API` : Extension sends data to the server through HTTP POST.

      `JSON` : Data format for requests/responses.

6. Development Tools -

      `npm` : Dependency management (e.g., express, mongoose).

      `Chrome DevTools` : Extension log debugging.

# Setup Instructions

*Prerequisites* :

- Node.js (v14+).

- MongoDB.

- Google Chrome (for testing extensions).

*Steps* :

1. Backend Setup -

        bash

        # Clone the repository (if necessary)
        git clone <repo-url>
        cd time-tracker-server

   Install dependencies 

        npm install express mongoose cors

   Start the server

        node server.js
        #Confirm that MongoDB is running.

   Server runs at `http://localhost:3000`.

2. Chrome Extension Setup -

      - Go to `chrome://extensions`.

      - Turn on `Developer Mode`.

      - Click `Load Unpacked` and open the extension directory with background.js.

3. Testing -

      - Open Chrome DevTools -> Console to view extension logs.

      - Visit classified domains like GitHub, YouTube to initiate tracking.

      - Call http://localhost:3000/api/analytics to see aggregated data.

*Improvements that can be done* :

1. Frontend Dashboard -

      React/Vue app to display analytics.

2. Alerts & Limits -

      Notify users upon reaching time limits on non-productive sites.

*If youre thinking why this project, then* :

- Self-Awareness : Measure how much time you spend on the internet.

- Productivity: Onesself can find and minimize distractions.

- Learning Opportunity.

# OUTPUT

<img width="138" height="155" alt="Image" src="https://github.com/user-attachments/assets/10666212-f73b-4b79-9a7c-ca33711b9259" />

--------------------------------------------------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------------------------------

<img width="1920" height="1140" alt="Image" src="https://github.com/user-attachments/assets/b031500a-6bda-452d-99bf-585b71d40d4f" />



