import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    login(loginDto: UserLoginDto): Promise<{
        token: string;
        user: User;
    }>;
    verifyPassword(password: string, hash: string): Promise<any>;
    register(createUserDto: CreateUserDto): Promise<User>;
}
