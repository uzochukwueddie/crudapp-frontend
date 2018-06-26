# Crud App Frontend
The CRUD application interfaces with the RESTful API built with node.js. The frontend app is built with Angular 6.
On the frontend, data can be sorted, filtered by date, edited and deleted from database. The app uses some components from angular material and materialize css.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# How to Run
First, install Angular version 6. Clone the project using ```git clone https://github.com/uzochukwueddie/crudapp-frontend.git```. You can also download the project as a zip file. Run ```npm install``` to install all dependencies inside package.json file. Run
`ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Project Structure
The src directory contains files and folder for development. The app folder contains required components, services and modules for the app. The Crud Table Component displays the data retrieved from the database. In this component, data can be sorted, filtered and deleted. The Edit item Component allows for updating a single item from the table. Toolbar Component displays toolbar on all components in the app. The Crud Service file contains http methods used in communicating with the backend of the app.