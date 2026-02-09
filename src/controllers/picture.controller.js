import { responseSuccess } from "../common/helpers/function.helper.js";
import { pictureService } from "../services/picture.service.js";

export const pictureController = {
   async create(req, res, next) {
      const result = await pictureService.create(req);
      const response = responseSuccess(result, `Create picture successfully`);
      res.status(response.statusCode).json(response);
   },
   async findAll(req, res, next) {
      const result = await pictureService.findAll(req);
      const response = responseSuccess(result, `Get all pictures successfully`);
      res.status(response.statusCode).json(response);
   },
   async search(req, res, next) {
      const result = await pictureService.search(req);
      const response = responseSuccess(result, `Get all pictures successfully`);
      res.status(response.statusCode).json(response);
   },
   async detailById(req, res, next) {
      const result = await pictureService.detailById(req);
      const response = responseSuccess(result, `Get all comment successfully`);
      res.status(response.statusCode).json(response);
   },
   async binhLuanById(req, res, next) {
      const result = await pictureService.binhLuanById(req);
      const response = responseSuccess(result, `Get all comment successfully`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await pictureService.findOne(req);
      const response = responseSuccess(result, `Get picture #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async update(req, res, next) {
      const result = await pictureService.update(req);
      const response = responseSuccess(result, `Update picture #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
      const result = await pictureService.remove(req);
      const response = responseSuccess(result, `Remove picture #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};