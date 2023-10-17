"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserGuard = void 0;
const passport_1 = require("@nestjs/passport");
class CurrentUserGuard extends (0, passport_1.AuthGuard)('jwt') {
    handleRequest(err, user) {
        if (user)
            return user;
        return null;
    }
}
exports.CurrentUserGuard = CurrentUserGuard;
//# sourceMappingURL=current-user.guard.js.map