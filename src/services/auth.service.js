import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from 'bcrypt'
import { tokenService } from "./token.service.js";
export const authService = {
   async create(req) {
      return `This action create`;

   },

   async login(req) {
      const { email, password } = req.body;
      const userExist = await prisma.nguoi_dung.findUnique({
         where: {
            email: email,
         },
      })
      if (!userExist) {
         throw new BadRequestException("Người dùng không tồn tại");
      }
      userExist.password
      const isPassword = bcrypt.compareSync(password, userExist.mat_khau);
      if (!isPassword) {
         throw new BadRequestException("Sai mật khẩu ")
      }
      const token = tokenService.createTokens(userExist.nguoi_dung_id);
      return token;
   },
   async register(req) {
      const { email, password, hoten, tuoi } = req.body;

      const userExist = await prisma.nguoi_dung.findUnique({
         where: {
            email: email,
         }
      })
      if (userExist) {
         throw new BadRequestException("Người dùng đã tồn tại ")
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      await prisma.nguoi_dung.create({
         data: {
            email: email,
            mat_khau: hashPassword,
            ho_ten: hoten,
            tuoi: tuoi
         }
      })
      return true;
   },
   async getInfo(req) {
      delete req.user.mat_khau;
      return req.user;

   },
   async refreshToken(req) {
      //console.log(req.body);
      const {accessToken,refreshToken} = req.body;
      const decodeAccessToken = tokenService.verifyAccessToken(accessToken,{ignoreExpiration:true});
      const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

      if (decodeAccessToken.userId !== decodeRefreshToken.userId){
         throw new UnauthorizedException("Refresh Token Không hợp lệ")
      }
      const userExist = await prisma.nguoi_dung.findUnique({
         where:{
            nguoi_dung_id:+decodeAccessToken.userId,
         }
      })
      if (!userExist){
         throw new UnauthorizedException("Không có người dùng ");
      }
      const tokens = tokenService.createTokens(userExist.nguoi_dung_id);

      return tokens;

   },
   async findAll(req) {
      return true; 
   },

   async findOne(req) {
      return `This action returns a id: ${req.params.id} auth`;
   },

   async update(req) {
      return `This action updates a id: ${req.params.id} auth`;
   },

   async remove(req) {
      return `This action removes a id: ${req.params.id} auth`;
   }
};