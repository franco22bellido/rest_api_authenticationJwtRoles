import { Router } from "express";
import {checkRolesExisted, isModerator, verifyToken} from '../middlewares/index.js';
const router = Router();

router.post('/createUser',verifyToken,isModerator,checkRolesExisted, (req, res )=>{
    res.json({
        ejemplo : "ruta protegida",
        data : "se crearon usuarios"
    })
})

export default router;