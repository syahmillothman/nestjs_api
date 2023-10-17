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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.repo
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email: loginDto.email }).getOne();
        if (!user) {
            throw new common_1.UnauthorizedException('Bad credentials');
        }
        else {
            if (await this.verifyPassword(loginDto.password, user.password)) {
                const token = await this.jwtService.signAsync({
                    email: user.email,
                    id: user.id
                });
                delete user.password;
                return { token, user };
            }
            else {
                throw new common_1.UnauthorizedException('Bad credentials');
            }
        }
    }
    async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async register(createUserDto) {
        const { email } = createUserDto;
        const checkForUser = await this.repo.findOne({ where: { email } });
        if (checkForUser) {
            throw new common_1.BadRequestException('Email is already use');
        }
        else {
            const user = new user_entity_1.User();
            Object.assign(user, createUserDto);
            this.repo.create(user);
            await this.repo.save(user);
            delete user.password;
            return user;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map