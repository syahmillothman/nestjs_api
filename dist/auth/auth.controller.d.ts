import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    userLogin(userLoginDto: UserLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    userRegisteration(userCreateDto: CreateUserDto): Promise<User>;
    authStatus(user: User): {
        status: boolean;
        user: User;
    };
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
}
