import { tokenService } from "../../services/token.service.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/connect.prisma.js";

export const protect = async (req,res,next) =>{
    //console.log("middleware protect");
    const authorization = req.headers.authorization;
    if (!authorization){
        throw new UnauthorizedException("Không có authorization")
    }
    const [type,token ] = authorization.split(" ");
    const {userId} = tokenService.verifyAccessToken(token);
    const userExist = await prisma.nguoi_dung.findUnique({
        where:{
            nguoi_dung_id:userId,
        }
    })
    //console.log({type,token});
    //console.log("decode",decode);
    //console.log({userExist});
    req.user = userExist
    next();
}