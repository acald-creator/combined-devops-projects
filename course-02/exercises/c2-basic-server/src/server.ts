import express, { Request, Response } from "express"

import bodyParser from 'body-parser'

import { Car, cars as carsList } from './models/cars'

const app = express()
const port = 8082

let cars:Car[] = carsList

app.use(bodyParser.json())
/* Get main page that says Welcome to the Cloud */
app.get('/', async(req: Request, res: Response) => {
    res.send("Welcome to the Cloud!")
})
/**@TODO Add an endpoint to GET a list of cars */
app.get('/cars/', (req: Request, res: Response) => {
    let { make } = req.query
    let carsList = cars
    if(make) {
        carsList = cars.filter((car) => car.make === make)
    }
    res.status(200).send(carsList)
})
/**@TODO Add an endpoint to GET a specific car */
app.get('/cars/:id', (req: Request, res: Response) => {
    let { id } = req.params
    if(!id) {
        return res.status(400).send(`ID is required`)
    }
    const car = cars.filter((car) => car.id)
    if(car && car.length === 0) {
        return res.status(404).send(`Car is not found`)
    }
    res.status(200).send(car)
})
/**@TODO Add an endpoint to post a new car to the list */
app.post('/cars/', (req: Request, res: Response) => {
    let { make, type, model, cost, id } = req.body
    if(!id || !type || !model || !cost) {
        return res.status(400).send(`make, type, model, cost, id are required`)
    }
    const newCar: Car = {
        make: make,
        type: type,
        model: model,
        cost: cost,
        id: id
    }
    cars.push(newCar)
    res.status(201).send(newCar)
})

/* Greet the person with the name
* http://localhost:8082/persons/{name}
*/
app.get('/persons/:name', async(req: Request, res: Response) => {
    let { name } = req.params
    if (!name) {
        return res.status(400).send(`Name is required`)
    }
    return res.status(200).send(`Welcome to the Cloud, ${name}!`)
})

/* Greet a specific person to demonstrate req.query
* http://localhost:8082/persons?name={name}
*/
app.get('/persons/', (req: Request, res: Response) => {
    let { name } = req.query
    if(!name) {
        return res.status(400).send(`Name is required`)
    }
    return res.status(200).send(`Welcome to the cloud, ${name}!`)
})

/* Post a greeting to the specific person
* curl -X POST -H "Content-Type: application/json" \
* -d '{"name": "{name}"}'
*/
app.post('/persons', async(req: Request, res: Response) => {
    let { name } = req.body
    if (!name) {
        return res.status(400).send(`Name is required`)
    }
    return res.status(200).send(`Welcome to the cloud, ${name}!`)
})
/* Start the server */
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
})