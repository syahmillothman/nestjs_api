"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_login_dto_1 = require("./dto/user-login.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_decorator_1 = require("./user.decorator");
const user_entity_1 = require("./entities/user.entity");
const current_user_guard_1 = require("./current-user.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async userLogin(userLoginDto, res) {
        const { token, user } = await this.authService.login(userLoginDto);
        res.cookie('IsAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 });
        res.cookie('Authentication', token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000
        });
        return res.send({ success: true, user, token });
    }
    async userRegisteration(userCreateDto) {
        return this.authService.register(userCreateDto);
    }
    authStatus(user) {
        return { status: !!user, user };
    }
    logout(req, res) {
        res.clearCookie('Authentication');
        res.clearCookie('IsAuthentication');
        return res.status(200).send({ success: true });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegisteration", null);
__decorate([
    (0, common_1.Get)('authstatus'),
    (0, common_1.UseGuards)(current_user_guard_1.CurrentUserGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "authStatus", null);
__decorate([
    (0, common_1.Post)('authlogout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map