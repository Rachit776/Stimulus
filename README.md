<h1 align="center" id="title">STIMULUS</h1>

<p align="center"><img src="https://socialify.git.ci/Rachit776/Stimulus/image?font=Rokkitt&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;theme=Dark" alt="project-image"></p>

<p id="description">Stimulus is a software designed to automate the mapping of Internal Assessment Test marks to course outcomes and perform various marks calculations. It utilizes a database to store all necessary details allowing users to resume their work easily. The software includes built-in sanity checks and validations to minimize errors and it automatically generates attainment reports for each course outcome based on the specified criteria.</p>

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Electron
*   Material Design Lite
*   Google Firebase
*   Web Technologies(HTML CSS JS)

<h2>Implementation Summary</h2>

*   Teachers register using their official SFIT email (@sfitengg.org), with credentials stored in Firebase Auth.
*   After logging in, they input details like class and year.
*   The system checks if the student list for that class/year exists; if not, teachers upload an Excel sheet with student names, PID numbers, and roll numbers.
*   Teachers enter the Course Outcome (CO) mapping for each question unless it’s already saved in the Firebase Realtime Database.
*   Marks can be entered manually or uploaded via an Excel file (especially for past years).
*   Progress is saved in real time, allowing teachers to resume later, and a tick indicates which students’ marks are completed.
*   Once all marks are entered, the software generates the CO mapping table, calculates attainments, and allows automatic saving of the resulting PDF to the desktop.

## Key features

### Web based Software
- Being a web based software means we get to enjoy the ease of development usually associated with web projects.<br>
- Not running it in a browser as a website allows us to control flow of the software and prevent certain user actions (jumping to pages, back, forward, etc).<br>
- We also get access to some lower level system functions not easily available through browser (like directly saving pdf to desktop).<br>

### Restricted access
- The login, registration and related functions are all handled through the firebase auth database.<br>
- This keeps us from having to re-invent the wheel and provides us with all new and advanced security features from google.<br>
- Only users with confirmed-email @sfitengg.org can use the software.<br>
- Even if someone somehow gets access with another email id, the database read and write rules would prevent them from getting or modifying any data.<br>

### Read student list from excel
- The college has data of all students of a class for a particular year stored in an excel file.<br>
- This file can directly be parsed by Quibble to get the required student info and store it in the database so that teachers won’t have to repeatedly add it.<br>

### Read previous marks from excel
- Before Quibble, the college manually did all the work and stored all data in an excel file.<br>
- Quibble can read these old excel files and automatically store all required data in the database.<br>

### Automatic computations and color Coding
- Following important calculations are automated by Quibble: + Top 5 scorers + Total marks obtained and attempted per CO for each student + Total marks scored by each student + Attainment value for each CO for every student + Total attainment for each CO Quibble also automatically color-codes: + Attainment of each CO for every student + Total attainment of each CO.<br>

### All data in database
- All required data is collected and stored using Firebase Realtime database.<br>
- FRD stores all data in JSON format.<br>
- Storing data allows us to provide open-and-resume functionality as well as to prevent unnecessary repetitions.<br>
- The stored data will further be used for advanced data analytics and visualization.<br>
