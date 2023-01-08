const ROLES = ["user", "admin", "moderator"];

export const checkRolesExisted = (req, res , next)=>{
    if(req.body.role){
        for (let i = 0; i < ROLES.length; i++) {
            if(!ROLES.includes(req.body.role)){
                return res.status(400).json({
                    message: `role ${req.body.role} does not exist`
                })
            }
        }
    }
    next();
}