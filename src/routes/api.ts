import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";
import mediaMiddleware from "../middlewares/media.middleware";
import mediaController from "../controllers/media.controller";
import categoryController from "../controllers/category.controller";
import specificationController from "../controllers/specification.controller";
import materialController from "../controllers/material.controller";
import platformController from "../controllers/platform.controller";
import bannerController from "../controllers/banner.controller";
import ruleController from "../controllers/rule.controller";
import questionController from "../controllers/question.controller";
import consultationController from "../controllers/consultation.controller";
import adminDashboardController from "../controllers/adminDashboard.controller";

const router = express.Router();

router.post(
  "/auth/register",
  authController.register
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RegisterRequest"
    }
  }
  */
);
router.post(
  "/auth/login",
  authController.login
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/LoginRequest"
    }
  }
  */
);
router.get(
  "/auth/me",
  authMiddleware,
  authController.me
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.post(
  "/auth/activation",
  authController.activation
  /*
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/ActivationRequest"
    }
  }
  */
);

router.put(
  "/auth/update-profile",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  authController.updateProfile
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/UpdateProfileRequest"
    }
  }
  */
);
router.put(
  "/auth/update-password",
  [authMiddleware, aclMiddleware([ROLES.MEMBER])],
  authController.updatePassword
  /*
  #swagger.tags = ['Auth']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/UpdatePasswordRequest"
    }
  }
  */
);

router.get(
  "/admin/dashboard/consultation-statistics",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  adminDashboardController.consultationStatistics
  /*
#swagger.tags = ['Admin Dashboard']
#swagger.security = [{"bearerAuth": {}}]
*/
);

router.get(
  "/admin/dashboard/top-materials",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  adminDashboardController.topMaterials
    /*
    #swagger.tags = ['Admin Dashboard']
    #swagger.security = [{"bearerAuth": {}}]
    */
);


router.post(
  "/banners",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  bannerController.create
  /*
  #swagger.tags = ['Banners']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateBannerRequest"
    }
  }
  */
);
router.get(
  "/banners",
  bannerController.findAll
  /*
  #swagger.tags = ['Banners']
  */
);
router.get(
  "/banners/:id",
  bannerController.findOne
  /*
  #swagger.tags = ['Banners']
  */
);
router.put(
  "/banners/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  bannerController.update
  /*
  #swagger.tags = ['Banners']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateBannerRequest"
    }
  }
  */
);
router.delete(
  "/banners/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  bannerController.remove
  /*
  #swagger.tags = ['Banners']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.post(
  "/category",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.create
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateCategoryRequest"
    }
  }
  */
);
router.get(
  "/category",
  categoryController.findAll
  /*
  #swagger.tags = ['Category']
  */
);
router.get(
  "/category/:id",
  categoryController.findOne
  /*
  #swagger.tags = ['Category']
  */
);
router.put(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.update
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateCategoryRequest"
    }
  }
  */
);
router.delete(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.remove
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.post(
  "/materials",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  materialController.create
  /*
  #swagger.tags = ['Materials']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateMaterialRequest"
    }
  }
  */
);
router.get(
  "/materials",
  materialController.findAll
  /*
  #swagger.tags = ['Materials']
  #swagger.parameters['limit'] = {
    in: 'query',
    type: 'number',
    default: 10
  }
  #swagger.parameters['page'] = {
    in: 'query',
    type: 'number',
    default: 1
  }
  #swagger.parameters['category'] = {
    in: 'query',
    type: 'string'
  }
  #swagger.parameters['isPublish'] = {
    in: 'query',
    type: 'boolean'
  }
    #swagger.parameters['isSuperior'] = {
    in: 'query',
    type: 'boolean'
  }
  #swagger.parameters['characteristics'] = {
    in: 'query',
    type: 'array',
    collectionFormat: 'multi',
    description: 'Filter by specification IDs',
    items: {
      type: 'string'
    }
  }
  */
);
router.get(
  "/materials/:id",
  materialController.findOne
  /*
  #swagger.tags = ['Materials']
  */
);
router.put(
  "/materials/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  materialController.update
  /*
  #swagger.tags = ['Materials']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateMaterialRequest"
    }
  }
  */
);
router.delete(
  "/materials/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  materialController.remove
  /*
  #swagger.tags = ['Materials']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.get(
  "/materials/:slug/slug",
  materialController.findOneBySlug
  /*
  #swagger.tags = ['Materials']
  */
);

router.post(
  "/platforms",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  platformController.create
  /*
  #swagger.tags = ['Platforms']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreatePlatformRequest"
    }
  }
  */
);
router.get(
  "/platforms",
  platformController.findAll
  /*
  #swagger.tags = ['Platforms']
  */
);
router.get(
  "/platforms/:id",
  platformController.findOne
  /*
  #swagger.tags = ['Platforms']
  */
);
router.put(
  "/platforms/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  platformController.update
  /*
  #swagger.tags = ['Platforms']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreatePlatformRequest"
    }
  }
  */
);
router.delete(
  "/platforms/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  platformController.remove
  /*
  #swagger.tags = ['Platforms']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.get(
  "/platforms/:materialId/materials",
  platformController.findAllByMaterial
  /*
  #swagger.tags = ['Platforms']
  */
);

router.post(
  "/questions",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  questionController.create
  /*
  #swagger.tags = ['Questions']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateQuestionRequest"
    }
  }
  */
);

router.get(
  "/questions",
  questionController.findAll
  /*
  #swagger.tags = ['Questions']
  */
);

router.get(
  "/questions/:id",
  questionController.findOne
  /*
  #swagger.tags = ['Questions']
  */
);

router.put(
  "/questions/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  questionController.update
  /*
  #swagger.tags = ['Questions']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateQuestionRequest"
    }
  }
  */
);

router.delete(
  "/questions/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  questionController.remove
  /*
  #swagger.tags = ['Questions']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.post(
  "/rules",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ruleController.create
  /*
  #swagger.tags = ['Rules']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateRuleRequest"
    }
  }
  */
);

router.get(
  "/rules",
  ruleController.findAll
  /*
  #swagger.tags = ['Rules']
  */
);

router.get(
  "/rules/:id",
  ruleController.findOne
  /*
  #swagger.tags = ['Rules']
  */
);

router.put(
  "/rules/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ruleController.update
  /*
  #swagger.tags = ['Rules']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateRuleRequest"
    }
  }
  */
);

router.delete(
  "/rules/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  ruleController.remove
  /*
  #swagger.tags = ['Rules']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);


router.post(
  "/specification",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  specificationController.create
  /*
  #swagger.tags = ['Specification']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateSpecificationRequest"
    }
  }
  */
);
router.get(
  "/specification",
  specificationController.findAll
  /*
  #swagger.tags = ['Specification']
  */
);
router.get(
  "/specification-search",
  specificationController.findByName
  /*
  #swagger.tags = ['Specification']
  */
);
router.get(
  "/specification/:id",
  specificationController.findOne
  /*
  #swagger.tags = ['Specification']
  */
);
router.put(
  "/specification/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  specificationController.update
  /*
  #swagger.tags = ['Specification']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CreateSpecificationRequest"
    }
  }
  */
);
router.delete(
  "/specification/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  specificationController.remove
  /*
  #swagger.tags = ['Specification']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.post(
"/consultation/start",
[authMiddleware],
consultationController.start
/*
#swagger.tags = ['Consultation']
#swagger.security = [{"bearerAuth": {}}]
#swagger.responses[200] = {
schema: {
$ref: "#/components/schemas/StartSessionResponse"
}
}
*/
);


router.post(
"/consultation/answer",
[authMiddleware],
consultationController.answer
/*
#swagger.tags = ['Consultation']
#swagger.security = [{"bearerAuth": {}}]
#swagger.requestBody = {
required: true,
schema: {
$ref: "#/components/schemas/AnswerQuestionRequest"
}
}
*/
);

router.get(
  "/consultation/:id",
  [authMiddleware],
  consultationController.detail
);

router.get(
"/consultation",
[authMiddleware],
consultationController.history
/*
#swagger.tags = ['Consultation']
#swagger.security = [{"bearerAuth": {}}]
*/
);

router.post(
  "/media/upload-single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.single("file"),
  ],
  mediaController.single
  /*
  #swagger.tags = ['Media']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary"
            }
          }
        }
      }
    }
  }
  */
);
router.post(
  "/media/upload-multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.multiple("files"),
  ],
  mediaController.multiple
  /*
  #swagger.tags = ['Media']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            files: {
              type: "array",
              items: {
                type: "string",
                format: "binary"
              }
            }
          }
        }
      }
    }
  }
  */
);
router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  mediaController.remove
  /*
  #swagger.tags = ['Media']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/RemoveMediaRequest"
    }
  }
  */
);

export default router;