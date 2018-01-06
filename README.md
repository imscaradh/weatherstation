# Weatherstation


### Prerequirements

- [Node.js](https://nodejs.org/en/) >= 6.x
- npm >= 3.x
- Python 3 with PIP



## Development


#### Backend

The backend uses Flask and can be requested with RESTful services. It uses a
file-based Sqlite database.

To install all required dependencies, do:
    
    (venv)$ pip install -r requirements.txt
    
For running the server instance with Werkzeug, run the following command
inside the project directory:

    (venv)$ python backend/app/app.py [development|production]



#### Frontend

The frontend is developed with the Aurelia web framework + webpack. 

First of all the necessary dependencies have to be installed:

    npm install
    
Afterwards one can run a live-serving with the following:

    npm run serve
    
To build the frontend to `dist`, do:

    npm run build


## Production usage

To use the frontend and backend modules in a operational environment, one can
simply use `docker-compose` with the according configuration files inside this 
repo.
