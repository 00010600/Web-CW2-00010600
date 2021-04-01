# Brief Description
This website was made for WebTech module course work #2. This is a full-stack website.
The topic of the website is image gallery. For this project, I have used expressJS (backend),
multer (for uploading images), pug (for generating html), uuid (for unique ID generating)

## How to run the project
1. Download the project from github.
2. Open the terminal and go to the folder of project.
3. Write "npm install" to install the dependencies.
4. Write "npm run start" to run the project.

## Dependencies
express, multer, pug, uuid

## Dev Dependencies
nodemon

## User story
For the first enter, user goes to the main page where the greeting message is located. User is
offered to create his first image. When user clicks on a button, he is redirected to create image page where he can fill in
the form and create an image. Form has validation, so that user cannot leave empty fields, except for an image. If user
does not upload image, the default logo is used. Typically, user should enter his name, some description and upload a picture.
As user enters some data, ready image post is previewed on the right side.
After submission, image is added to the database and become available on the all images page, where user can see the details of each image as well as delete them.
There is also an authors page where the list of all authors in the database is presented. User can view images of particular author when clicks on corresponding author.

## The project on Glitch and GitHub:
https://github.com/00010600/Web-CW2-00010600 - GitHub

https://gallery-10600.glitch.me/ - Glitch
