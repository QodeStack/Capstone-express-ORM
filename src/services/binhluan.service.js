import { prisma } from "../common/prisma/connect.prisma.js";

export const binhLuanService = {
   async create(req) {
      const {nguoi_dung_id,hinh_id,noi_dung} = req.body;
      const comment = await prisma.binh_luan.create({
         data:{
            nguoi_dung_id:nguoi_dung_id,
            hinh_id:hinh_id,
            noi_dung:noi_dung
         }
      })
      return comment;
   },

   async findAll(req) {
      return `This action returns all binhLuan`;
   },

   async findOne(req) {
      return `This action returns a id: ${req.params.id} binhLuan`;
   },

   async update(req) {
      return `This action updates a id: ${req.params.id} binhLuan`;
   },

   async remove(req) {
      return `This action removes a id: ${req.params.id} binhLuan`;
   }
};