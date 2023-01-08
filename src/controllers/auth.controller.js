import pool from "../database/database.js"
import { encriptarPass, compararPass } from '../libs/bcrypt.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const signUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const passwordEncript = await encriptarPass(password);

        const user = {
            username, email, password: passwordEncript
        };
        if (role) {
            const foundRoles = await pool.query('select * from roles where name = ?', [role]);
            user.roles_id = foundRoles[0].id;
        } else {
            const defaultRole = await pool.query('select * from roles where name = ?', ['user']);
            user.roles_id = defaultRole[0].id;
        }

        const userFound = await pool.query('select * from users where email = ?', [email]);
        if (userFound.length > 0) throw new Error('el usuario ya existe');

        const result = await pool.query('insert into users set ? ', [user]);
        console.log(result.insertId);
        const token = jwt.sign({ id: result.insertId }, config.SECRET, {
            expiresIn: 80000
        });
        res.json({
            user: user,
            token: token
        });

    } catch (error) {
        res.json(error.message);
    }
}



export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await pool.query('select * from users where email = ?', [email]);
        if (!userFound[0]) throw new Error('email no encontrado');


        const validPassword = await compararPass(password, userFound[0].password);

        if (!validPassword) throw new Error('contraseña no valida');

        const token = jwt.sign({ id: userFound[0].id }, config.SECRET, {
            expiresIn: 80000
        });
        res.json({
            token: token
        });
    } catch (error) {
        res.json(error.message);
    }

}