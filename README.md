# Asset GPS Tracker
## Overview

A mini platform used for asset tracking. View current location of an asset on the map, along with its telemetry (ignition status, door status, arm/disarm status and a lot more).

<img src="/src/assets/screenshot4.jpeg">

### Key Features

- **Real-Time GPS Tracking**: Connects with GPS Tracker devices to provide real-time location data.

### Roadmap Features
- **User Authentication**: Secure user accounts allowing for personalized access and control. ✅
- **Device Management**: Users can add and manage multiple GPS devices. ✅
- **Live Map Updates**: Automatic updates on the map as the tracked asset moves. ✅
- **Search by IMEI**: Ensures data access is specific to the user's devices. ✅

### Technical
This is a learning experience project to hone my ReactJS skills using Typescript for the first time and also integrating a basic Firebase db to bring the app to life.
Tech used is <b>ReactJS</b> with <b>TypeScript</b> and <b>Firebase</b> while there's some <b>Node</b> logic using <em>ExpressJS</em> running on a server for the assets to point to.

How it works:
- A GPS Tracker device is installed in an asset (car/motorcycle/boat) and is set up to point to my server (https://api.[domain].com).
- Then the server stores this data in a json format.
- The Front End (this app here) is used for the user to:
    - Create an account with their Email or Google Account
    - Add a new asset to their account by providing the GPS Tracker's IMEI and a name for convenience later when they select from their saved.
- The user then can either select their saved asset or use the search input to search for another IMEI 
- The FE uses the IMEI provided and calls the server check if there's data from this IMEI
- If there is, a comprehensive list of all the information that the tracker provides is returns to the user in an easy to read UI along with a map view of the asset's current location.
- If there is no asset with the provided IMEI stored to the server or if the IMEI is wrong, the user gets an error message that explains what went wrong.
- The user then has the option to also delete the asset from their account.

### Screenshots

<img src="/src/assets/screenshot1.jpeg">

<img src="/src/assets/screenshot2.jpeg">

<img src="/src/assets/screenshot3.jpeg">

<img src="/src/assets/screenshot4.jpeg">

<img src="/src/assets/screenshot5.jpeg">