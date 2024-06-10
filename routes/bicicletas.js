import { Router, query } from 'express';
import * as db from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router()

//Obtener todas las bicicletas
router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
    const {marca, modelo, precio} = req.body

    if(marca && modelo && precio){
        //Solicitud correcta
        try {
            const text = 'INSERT INTO bicicletas (id, marca, modelo, precio) VALUES ($1, $2, $3, $4) RETURNING *'
            const values = [uuidv4(), marca, modelo, Number(precio)]

            const result = await db.query(text, values)

            res.status(201).json({
                status: 201,
                message: "Bicicleta creada con éxito",
                bicicleta: result.rows
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                status: 500,
                message: 'Error interno de servidor'   
            })
        }
    }else {
        //Solicitud erroneo
        res.status(400).json({
            status: 400,
            message: "Bad request"
        })
    }
})

router.put("/", async (req,res) => {
    const {id, marca, modelo, precio} = req.body

    if(id && marca && modelo && precio){
        //Solicitud correcta
    try {
        const text = 'UPDATE bicicletas SET marca=$2, modelo=$3, precio=$4 WHERE id =$1 RETURNING *'
        const values = [id, marca, modelo, precio]

        const result = await db.query(text, values)

        res.status(202).json({
            message:'Bicicleta actualizada con éxito',
            bicicleta: result.rows
        })
    } catch (error){
        console.error(error)
        res.status(500).json({
        status: 500,
        message: 'Error interno de servidor'   
    })
}
    }else {
    //Solicitud erroneo
    res.status(400).json({
        status: 400,
        message: "Bad request"
    })
}
})

export {router}
