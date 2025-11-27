import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API Expert System FDP",
        description: "Dokumentasi API Expert System FDP",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server",
        },
        {
            url: "https://back-end-es.vercel.app/api",
            description: "Deploy Server",
        },
    ],
    components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "dwiarza0",
        password: "Dwiarza0!",
      },
      RegisterRequest: {
        fullName: "member2025",
        username: "member2025",
        email: "member2025@yopmail.com",
        password: "Member2025!",
        confirmPassword: "Member2025!",
      },
      ActivationRequest: {
        code: "abcdef",
      },
      UpdateProfileRequest: {
        fullName: "",
        profilePicture: "",
      },
      UpdatePasswordRequest: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      CreateCategoryRequest: {
        name: "",
        description: "",
        icon: "",
      },
      CreateSpecificationRequest: {
        name: "",
        description: "",
      },
      CreateMaterialRequest: {
        name: "",
        description: "",
        banner: "fileUrl",
        category: "category ObjectID",
        characteristics: [
          "specificationObjectId",
          "specificationObjectId",
        ],
        isPublish: false,
      },
      RemoveMediaRequest: {
        fileUrl: "",
      },
      CreateBannerRequest: {
        title: "Banner 3 - Title",
        image:
          "https://res.cloudinary.com/five-code/image/upload/v1734918925/f70vpihmblj8lvdmdcrs.png",
        isShow: false,
      },
      CreatePlatformRequest: {
        name: "Material A Platform",
        description: "Material A Platform - Description",
        url: "Link Url Platform",
        icon: "",
        materials: "materialObjectId",
      },
      CreateRuleRequest: {
        name: "A02",
        conditions: [
          "specificationObjectId",
          "specificationObjectId",
          "specificationObjectId"
        ],
        result: "materialObjectId"
      },
      CreateQuestionRequest: {
        code: "Q01",
        questionText: "Apa kebutuhan cetak Anda?",
        options: [
          {
            label: "Stiker",
            value: "stiker",
            specification: "specificationObjectId",
            nextQuestion: "nextQuestionObjectId"
          },
          {
            label: "Kartu Ucapan / Hangtag",
            value: "S02",
            specification: "specificationObjectId",
            nextQuestion: "nextQuestionObjectId"
          }
        ],
        isFirst: false
      },
      StartSessionResponse: {
        type: 'object',
        properties: {
        sessionId: { type: 'string' },
        question: { $ref: '#/components/schemas/CreateQuestionRequest' }
        }
      },
      AnswerQuestionRequest: {
        sessionId: "sessionObjectId",
        optionValue: "value"
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);