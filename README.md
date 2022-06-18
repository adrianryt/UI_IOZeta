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
