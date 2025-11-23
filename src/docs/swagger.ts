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
          "691dd69c995f75fa119432ba",
          "691dfae7ea29058ce9b8a226",
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
      CreateOrderRequest: {
        events: "event object id",
        ticket: "ticket object id",
        quantity: 1,
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);