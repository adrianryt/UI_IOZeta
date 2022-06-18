# Getting Started

In the project directory, you can run:

### `npm install`

Provided you have NodeJS installed, it will download and install every necessary package the app uses.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


# Usage

## /

![logged](https://user-images.githubusercontent.com/19930849/174438113-8a089bb6-8f4a-44dd-89e2-f029012125d2.png)

### 1. Navbar

It's universal for every subpage. "Home" button leads to `/`. If you're logged in, clicking on your username will lead to teacher main page and "Logout" will log you out. Otherwise, "Login" button will lead to login subpage.
### 2. Username

In order to join the session, you need to provide your GitHub uername. It will be needed to create branches and generate certain commands to execute later.
### 3. Session code

Type code of the session you want to join, and join session when you're ready

## /login

![login](https://user-images.githubusercontent.com/19930849/174438509-58a0d3e3-fa0c-45d1-871c-2e5b8833a1f6.png)

### 1. GitHub username

Type your GitHub username you registered under
### 2. Password

Provide password for your account. Logging in will transfer you to teacher page.

## /signup

![signup](https://user-images.githubusercontent.com/19930849/174438786-635dd66f-b2fd-4080-a104-95c29e60266c.png)

### 1. Full name

Provide your name and surname
### 2. GitHub nickname

Provide your Github nickname, without "github.com/" prefix
### 3. GitHub token

The app requires user token in order to create repositories and branches. Instructions on how to obtain one are displayed when you click on "_i_" tooltip below
### 4. Password

Enter a secure password for your account.

If data provided is invalid, warnings will appear on what is incorrect. Otherwise, your account will be created and you will be redirected to teacher page.

## /teacher

This is a subpage for teachers. From here you can go to subjects list, add a new subject, or manage sessions.

## /topics/new

![topic](https://user-images.githubusercontent.com/19930849/174447749-69fbb911-b049-4e3a-994a-d3c6313d7475.png)

### 1. Topic title

Topic title, also visible to students
### 2. Repository name

Repository dedicated to the topic will have this name. If it does not exist, it will be created
### 3. Subject

Subject, to which the topic belongs
### 4. Number of checkpoints

Determines how many checkpoints will the topic have. A checkpoint is meant to be a _milestone_ or a small task; it is preferred if checkpoints can be rated separately
### 5. Checkpoint details

For every checkpoint, you can define a title and a description. Title should be brief, description should inform students what needs to be done 

After successfully adding a topic, a short guide will appear with instructions on how to upload files to repository, including README

## /topic/\[topic id\]

![session](https://user-images.githubusercontent.com/19930849/174449157-e08305b0-2d40-487d-89dd-7391504d486b.png)

### 1. Topic info

Topic name, subjects it belongs to, and hyperlink to repository on GitHub
### 2. Session name

You can give session a dedicated name, a current date for instance. Creating a session automatically opens it.
### 3. Session info

Session name and state (active/inactive)
### 4. Session code

Code necessary to join a session. Click on it in order to make it larger
### 5. Managing session

Closing session prevents anyone from joining it. You can always reopen it later

"Session details" will redirect you to session dashboard

## /dashboard/\[session id\]

![obraz](https://user-images.githubusercontent.com/19930849/174449505-cb7dd2b9-5349-47e1-a8b2-59d9f8499bb1.png)

This is a table with students' progress. First column contains usernames, others represent checkpoints. When student completes a checkpoint, a hyperlink to commit will be put in appropriate field

