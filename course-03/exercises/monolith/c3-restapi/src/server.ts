import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 8080

app.use(bodyParser.json())

app.get('/', async(req: Request, res: Response) => {
    res.send("/api/v0/")
})

/* Start the server */
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
})