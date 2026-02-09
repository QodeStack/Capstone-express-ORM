import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const pictureService = {
   async create(req) {
      const { ten_hinh, duong_dan, mo_ta, nguoi_dung_id } = req.body;
      //console.log({ten_hinh,duong_dan,mo_ta,nguoi_dung_id});
      const userExist = await prisma.nguoi_dung.findUnique({
         where: {
            nguoi_dung_id: nguoi_dung_id,
            isDeleted: false
         }
      })
      if (!userExist) {
         throw new BadRequestException("Người dùng không tồn tại");
      }
      const picNew = await prisma.hinh_anh.create({
         data: {
            ten_hinh: ten_hinh,
            duong_dan: duong_dan,
            mo_ta: mo_ta,
            nguoi_dung_id: nguoi_dung_id
         }
      })
      return picNew;
   },
   async findAll(req) {
      const { page, pageSize, where, index, filters } = buildQueryPrisma(req.query);

      const resultPrismaPromise = prisma.hinh_anh.findMany({
         where: where,
         skip: index,
         take: pageSize,
      });


      const totalItemPromise = prisma.hinh_anh.count({
         where: where,
      });

      const [resultPrisma, totalItem] = await Promise.all([resultPrismaPromise, totalItemPromise])

      return {
         page: page,
         pageSize: pageSize,
         totalItem: totalItem,
         totalPage: Math.ceil(totalItem / pageSize),
         items: resultPrisma
      };
   },
   async search(req) {
      const {ten_hinh} = req.body;
      const result = await prisma.hinh_anh.findMany({
         where:{
            ten_hinh:{
               contains:ten_hinh,
            },
            isDeleted:false
         },
      })
      return result;
   },
   async detailById(req) {
      const picId = req.params.id;
      const result = await prisma.hinh_anh.findFirst({
         where: {
            hinh_id: +picId,
            isDeleted: false
         },
         select: {
            ten_hinh: true,
            duong_dan: true,
            mo_ta: true,
            nguoi_dung: {
               select: {
                  ho_ten: true
               }
            }
         }
      });
      return result;
   },
   async binhLuanById(req) {
      const picId = req.params.id;
      const picExist = await prisma.binh_luan.findMany({
         where: {
            hinh_id: +picId,
            isDeleted: false,
         },
      })
      if (!picExist) {
         throw new BadRequestException("id ảnh không hợp lệ")
      }
      return picExist;
   },
   async findOne(req) {
      return `This action returns a id: ${req.params.id} picture`;
   },
   async update(req) {
      return `This action updates a id: ${req.params.id} picture`;
   },
   async remove(req) {
      const picId = req.params.id;
      await prisma.hinh_anh.update({
         where: {
            hinh_id: +picId,
         },
         data: {
            isDeleted: true,
         }
      })
      return true;
   }
};