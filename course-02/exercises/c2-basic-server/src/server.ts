import express, { Request, Response } from "express"
import bodyParser from 'body-parser'

const app = express()
const port = 8082

app.use(bodyParser.json())

app.get('/', async(req: Request, res: Response) => {
    res.send("Welcome to the Cloud!")
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