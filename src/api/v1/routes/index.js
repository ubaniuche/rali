import express from 'express'
import Drone from './Drone'
import Medication from './Medication'
import Loading from './Loading'
import DroneModel from './DroneModel'

const route = express.Router()

route.use('/drones', Drone)

route.use('/medications', Medication)

route.use('/loading', Loading)

route.use('/drone-models', DroneModel)

export default route