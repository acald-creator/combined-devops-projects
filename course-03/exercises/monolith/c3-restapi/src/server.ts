import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { sequelize } from './sequelize'
import { V0MODELS } from './controllers/v0/model.index'
import { IndexRouter } from './controllers/v0/index.router'

(async () => {
    /* Add the models and sync with Sequelize */
    await sequelize.addModels(V0MODELS)
    await sequelize.sync()
    /* Initialize the Express backend */
    const app = express()
    const port = 8080
    /* Use body-parser for parsing JSON */
    app.use(bodyParser.json())
    /* Setup the CORS */
    app.use(function(req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Origin", "http://localhost:8100")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        next()
    })
    /* Direct to the index router which is the entry point for the feed and user */
    app.use('/api/v0', IndexRouter)
    /* Direct to /api/v0' */
    app.get('/', async(req: Request, res: Response) => {
        res.send("/api/v0/")
    })
    /* Start the server */
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`)
        console.log(`press CTRL+C to stop server`)
    })    
})()