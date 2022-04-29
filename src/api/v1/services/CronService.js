import AssociationManager from '../helpers/AssociationsManager'
import { BadRequestError, NoContentError, NotFoundError } from '../helpers/exceptions'
import { DroneRepo, DroneModelRepo } from '../repositories'
import { BatteryAuditService, DroneModelService, DroneService } from '.'
import Logger from '../helpers/Logger'
import moment from 'moment'
import DRONE from '../constants/Drone'
import cron from 'node-cron'
import BaseController from '../controllers/BaseController'


export default class CronService {

    static runJobs() {
        const jobs = [this.runBatteryAudit()];

        Promise.all(jobs.map( job => {
            job()
        }) )
    }

    static async runBatteryAudit () {

        cron.schedule("*/1 * * * *", async () => {
                try {
                
                    const drones = await DroneService.findDrones()

                    let modifiedDrones = drones.rows.reduce(function (acc, curr) {

                        curr = curr.toJSON()

                        curr.drone_id = curr.id

                        delete curr.id

                        if ((curr.status != DRONE.IDLE || curr.status != DRONE.LOADING) && curr.battery_level > 0) curr.battery_level -= 5

                        acc.push(curr)

                        return acc

                    }, [])

                    await BatteryAuditService.createAudits(modifiedDrones)

                    const time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

                    Logger.info(`Battery audits run successfully and history created at ${time}`)

                    console.log(`Battery audits run successfully and history created at ${time}`)

                    return true
                } catch (error) {
                    Logger.info(`Battery audits error - ${error} - ${time}`)

                    console.log(`Battery audits error - ${error} - ${time}`)
                }
        })
    }
}