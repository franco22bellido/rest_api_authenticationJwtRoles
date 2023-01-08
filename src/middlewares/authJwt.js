import jwt from 'jsonwebtoken';
import config from '../config.js';
import pool from '../database/database.js';


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({
            message: 'no token provide'
        });

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        //verificar si el usuario existe.
        //esto es adicional. porque si existe un token, existe un usuario.
        const user = await pool.query('select * from users where id =?', [req.userId]);
        if (user.length == 0) return res.status(404).json({ message: 'usuario no encontrado' });

        next();
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
export const isModerator = async (req, res, next) => {

    const user = await pool.query('select * from users where id = ?', [req.userId]);
    
    const roles = await pool.query('select * from roles where id = ?', [user[0].roles_id]);

    if (roles[0].name == 'moderator') {
        next();
    } else {
        return res.status(403).json({ message: 'requiere roles de moderador' });
    }
}

export const isAdmin = async (req, res, next) => {
    const user = await pool.query('select * from users where id = ?', [req.userId]);
    const roles = await pool.query('select * from roles where id = ?', [user[0].roles_id]);

    if (roles[0].name == 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'requiere roles de administrador' });

    }
}