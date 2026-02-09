import { responseSuccess } from "../common/helpers/function.helper.js";
import { binhLuanService } from "../services/binhluan.service.js";

export const binhLuanController = {
   async create(req, res, next) {
      const result = await binhLuanService.create(req);
      const response = responseSuccess(result, `Create binhLuan successfully`);
      res.status(response.statusCode).json(response);
   },

   async findAll(req, res, next) {
      const result = await binhLuanService.findAll(req);
      const response = responseSuccess(result, `Get all binhLuans successfully`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await binhLuanService.findOne(req);
      const response = responseSuccess(result, `Get binhLuan #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async update(req, res, next) {
      const result = await binhLuanService.update(req);
      const response = responseSuccess(result, `Update binhLuan #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
      const result = await binhLuanService.remove(req);
      const response = responseSuccess(result, `Remove binhLuan #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};