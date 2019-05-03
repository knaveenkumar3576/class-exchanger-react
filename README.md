- Create a firebase project. Now go to Settings -> General.
-Now click the web icon and copy the settings for firebase and paste it inside the firebaseConfig.js file located in the home folder.
- Now run 'npm install'.
- Now run 'npm start' to start the web server and open https://localhost:3000 in the browser.

// HOW TO HOST THE APPLICATION IN APP ENGINE
- Follow the above steps.
- Now run 'npm build' to make a production build for deployment
- gcloud app deploy to push the changes to app engine and restart the service.
