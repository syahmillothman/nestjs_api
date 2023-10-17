/// <reference types="passport" />
import { Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Request } from "express";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly repo;
    constructor(repo: Repository<User>);
    validate(payload: any, req: Request): Promise<Express.User>;
}
export {};
