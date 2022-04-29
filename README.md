# Darkvadar API
Develop a service via REST API that allows clients to communicate with the drones. In essence its a dispatch controller.

# STEPS TO RUN APP
### Step 1: Start up the containers
RUN `docker compose up --build` on the root directory of the project

### RUN migrations in docker container
`docker exec -it rali npm run migrations`
Note: All required data(drone models) are seeded into the application with this command

### RUN undo migrations in docker container
`docker exec -it rali npm run undo-migrations`

### RUN test in docker container
`docker exec -it rali npm run test`


### App Features
- Add a drone
- Get a drone
- Get all drones
- Update a drone
- Get all available drones
- Get drone battery audit
- Add a medication
- Get a medication
- Get all medications
- Get all drone models
- Load an item
- Get drone load
- Get an item for a drone
- Get all items for a drone
- offload an item for a drone
- offload all items for a drone

## View Application logs
Application logs are stored in logs folder in root directory


#### POSTMAN API Documentation.
[Postman Api documentation](https://documenter.getpostman.com/view/18184787/UyrEiveC)


