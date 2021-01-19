import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async () => {
    try {
        const token = req.headers["x-access-token"];
    
        if (!token) return resizeBy.status(403).json({message: 'No token provided'})

        const decoded = jwt.verify(token , config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });

        if(!user) return res.status(404).json({message:'no existing user'})

        next();
    } catch (error) {
        res.status(401).json({message: 'unauthorized'}); 
    }
}

export const isCustomer = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for (let i = 0; i < roles.length; i++){
        if (roles[i].name === "customer") {
            next();
            return;
        }        
    }   
    return res.status(403).json({message: "not enough privileges! REQUIRES AT LEAST CUSTOMER"})
}

export const isAdmin = async (req, res, next) => {

}