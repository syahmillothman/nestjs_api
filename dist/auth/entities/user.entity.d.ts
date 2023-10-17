import { Post } from "src/post/entities/post.entity";
import { UserRoles } from "./user-roles";
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    profilePic: string;
    roles: UserRoles;
    posts: Post[];
    hashPassword(): void;
}
