import express, { Request, Response } from "express"

const app = express()
const port = 8082

app.get('/', async(req: Request, res: Response) => {
    res.send("Welcome to the Cloud!")
})

app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
})