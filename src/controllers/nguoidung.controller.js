import { responseSuccess } from "../common/helpers/function.helper.js";
import { nguoiDungService } from "../services/nguoidung.service.js";

export const nguoiDungController = {
   async create(req, res, next) {
      const result = await nguoiDungService.create(req);
      const response = responseSuccess(result, `Create nguoiDung successfully`);
      res.status(response.statusCode).json(response);
   },

   async findAll(req, res, next) {
      const result = await nguoiDungService.findAll(req);
      const response = responseSuccess(result, `Get all nguoiDungs successfully`);
      res.status(response.statusCode).json(response);
   },
      async listCreate(req, res, next) {
      const result = await nguoiDungService.listCreate(req);
      const response = responseSuccess(result, `Get all pic create successfully`);
      res.status(response.statusCode).json(response);
   },
      async listSave(req, res, next) {
      const result = await nguoiDungService.listSave(req);
      const response = responseSuccess(result, `Get all pic save successfully`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await nguoiDungService.findOne(req);
      const response = responseSuccess(result, `Get nguoiDung #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async update(req, res, next) {
      const result = await nguoiDungService.update(req);
      const response = responseSuccess(result, `Update nguoiDung #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
      const result = await nguoiDungService.remove(req);
      const response = responseSuccess(result, `Remove nguoiDung #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};