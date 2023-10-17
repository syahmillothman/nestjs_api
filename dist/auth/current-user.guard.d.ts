declare const CurrentUserGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CurrentUserGuard extends CurrentUserGuard_base {
    handleRequest(err: any, user: any): any;
}
export {};
