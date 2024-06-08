import pg from 'pg'
const { Pool } = pg

const config = {
    database:process.env.DATABASE,
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USERDB,
    password:process.env.PASS
}
const pool = new Pool(config)

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}