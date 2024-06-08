import { Router, query } from 'express'
import * as db from '../db/index.js'

const router = Router()

//Obtener todas las bicicletas
router.get("/", async (req, res) =>{
    try {
        const text = 'SELECT * FROM bicicletas'
        const result = await db.query(text)
        res.json({
            bicicletas:result.rows
        })       
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 500,
            message: 'Error interno de servidor'
        })
        res.send("No encontramos bicicletas")
    }
})
export {router}
