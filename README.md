<h1 align="center" id="title">Stimulus</h1>

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
*   As a web-based software, it benefits from the ease and flexibility typical of web development.<br>
*   Running it outside a standard browser (not as a regular website) gives better control over user flow, preventing actions like page jumping or using back/forward buttons.<br>
*   It also enables access to lower-level system functions, such as directly saving PDFs to the desktop — features not easily achievable in a browser environment.<br>

### Restricted access
*   Login, registration, and related functions are managed using Firebase Auth, avoiding the need to build a custom authentication system.<br>
*   This setup leverages Google’s advanced, up-to-date security features.<br>
*   Only users with verified @sfitengg.org email addresses can access the software.<br>
*   Even if someone gains access with an unauthorized email, Firebase’s database read/write rules prevent them from viewing or altering any data.<br>

### Read student list from excel
*   The college maintains Excel files containing student data (by class and year).<br>
*   Quibble can directly parse these files to extract student information and store it in the database, eliminating the need for teachers to repeatedly enter the same details.<br>

### Read previous marks from excel
*   Before Quibble, all work was done manually, with data stored in Excel files.<br>
*   Quibble can read these old Excel files and automatically import the necessary data into the database, streamlining and digitizing the process.<br>

### Automatic computations and color Coding

<h3>Quibble automates key calculations, including:</h3>
*   Top 5 scorers<br>
*   Total marks obtained and attempted per CO for each student<br>
*   Total marks scored by each student<br>
*   Attainment value for each CO per student<br>
*   Overall attainment for each CO<br>

<h3>It also automatically color-codes:</h3>
*   Attainment of each CO for every student<br>
*   Total attainment of each CO<br>

### All data in database
*   All necessary data is stored using Firebase Realtime Database (FRD), which saves data in JSON format.<br>
*   This storage enables features like open-and-resume and avoids redundant data entry.<br>
*   Additionally, the stored data can be leveraged for advanced analytics and visualizations in the future.<br>
