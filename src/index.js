import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import routes from './api/v1/routes'
import fileUpload from 'express-fileupload'
import CronService from './api/v1/services/CronService'

const app = express()

const DEV_PORT = process.env.PORT || 3000

const TEST_PORT = 4000

const PORT = (process.env.NODE_ENV == 'development') ?  DEV_PORT : TEST_PORT

app.use(json())
app.use(fileUpload())

app.use('/api/v1', routes)

app.get('/', async (req, res) => {
    res.status(200).json({ status: 200, message: "Welcome to dreliver" })
});

const server = app.listen(PORT, () => console.log(`App listening at port ${PORT}`)); 

if (process.env.NODE_ENV == 'development') CronService.runJobs()

export default app
module.exports = server