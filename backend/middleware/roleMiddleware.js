export const roleMiddleware=(...allowedRoles)=>{
    return (req,resp,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return resp.status(401).json({
                message:"Access Denied",
                succes:false
            })
        }
        next();
    }
}