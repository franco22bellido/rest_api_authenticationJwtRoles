import mysql from 'mysql';
import { promisify } from 'util';
import keys from '../keys.js';

const pool = mysql.createPool({
    host : keys.host,
    user : keys.userDB,
    password: keys.passDB,
    database: keys.database
});
pool.getConnection((err, conn)=>{
    try {
        if(err) throw new Error('error al conectarse a la bd');
        if(conn) return console.log('bd conectada');
    } catch (error) {
        console.log(error.message);
    }
});
pool.query = promisify(pool.query);

export default pool;