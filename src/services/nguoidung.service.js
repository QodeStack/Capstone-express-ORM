import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt"

export const nguoiDungService = {
    async create(req) {
        return `This action create`;
    },

    async findAll(req) {
        const { page, pageSize, where, index, filters } = buildQueryPrisma(req.query);

        const resultPrismaPromise = prisma.nguoi_dung.findMany({
            where: where,
            skip: index,
            take: pageSize,
        });


        const totalItemPromise = prisma.nguoi_dung.count({
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

    async findOne(req) {
        return `This action returns a id: ${req.params.id} nguoiDung`;
    },
    async listCreate(req) {
        const userId = req.params.id;
        const result = await prisma.hinh_anh.findMany({
            where:{
                nguoi_dung_id:+userId,
                isDeleted:false
            },
            select:{
                ten_hinh:true,
                duong_dan:true,
                mo_ta:true,
            }
        })
        return result;
    },
    async listSave(req) {
        const userId = req.params.id;
        const result = await prisma.luu_anh.findMany({
            where:{
                nguoi_dung_id:+userId,
                isDeleted:false
            },
            select:{
                hinh_anh:{
                    select:{
                        hinh_id:true,
                        ten_hinh:true,
                        duong_dan:true,
                    },
                },
                ngay_luu:true,
            }
        })
        return result;
    },

    async update(req) {
        const userId = req.params.id;
        const userExist = await prisma.nguoi_dung.findUnique({
            where:{
                nguoi_dung_id:+userId,
                isDeleted:false
            }
        })
        if (!userExist){
            throw new BadRequestException("Người dùng không tồn tại")
        };
        const {email,mat_khau,ho_ten,tuoi,anh_dai_dien} = req.body;
        const hashPassword = bcrypt.hashSync(mat_khau, 10);
        const userNew = await prisma.nguoi_dung.update({
            where:{
                nguoi_dung_id:+userId,
                isDeleted:false
            },
            data:{
                email:email,
                mat_khau:hashPassword,
                ho_ten:ho_ten,
                tuoi:tuoi,
                anh_dai_dien:anh_dai_dien,
            }
        })
        return userNew;
    },

    async remove(req) {
        return `This action removes a id: ${req.params.id} nguoiDung`;
    }
};