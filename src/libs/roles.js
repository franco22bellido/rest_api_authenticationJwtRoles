import pool from "../database/database.js";

export const createRoles = async()=>{

    try {
        const roles = await pool.query('select * from roles');
    if(roles.length > 0 ) return;
    const createRoles = await pool.query('insert into roles set ?',[{name : 'user'}]);
    const createRoles2 = await pool.query('insert into roles set ?',[{name : 'moderator'}]);
    const createRoles3 = await pool.query('insert into roles set ?',[{name : 'admin'}]);
    console.log(createRoles);
    } catch (error) {
       console.log(error.message); 
    }
};
