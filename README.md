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
