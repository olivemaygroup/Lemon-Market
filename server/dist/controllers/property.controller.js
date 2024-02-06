"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const checkAddress = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { property_id, fullAddress } = ctx.request.body;
        if (!property_id) {
            ctx.body = 'property_id undefined';
            ctx.status = 500;
        }
        const property = yield db_1.default.property.findFirst({
            where: {
                property_id: property_id,
            },
            include: {
                reviews: {
                    include: {
                        photos: true,
                    },
                },
            },
        });
        if (property) {
            if (property.num_of_reviews > 0) {
                ctx.body = property;
                ctx.status = 200;
                return;
            }
            else {
                ctx.body = property;
                ctx.status = 201;
                return;
            }
        }
        else {
            const newProperty = yield db_1.default.property.create({
                data: {
                    property_id,
                    fullAddress,
                },
            });
            ctx.body = newProperty;
            ctx.status = 202;
        }
        console.log('asdfasdf');
    }
    catch (err) {
        console.error(err);
        ctx.body = "error when looking for or creating address";
        ctx.status = 500;
    }
});
exports.default = { checkAddress };
