"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.UserRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "Admin";
    UserRoles["Reader"] = "Reader";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles.grant(UserRoles.Reader)
    .readAny(['posts'])
    .grant(UserRoles.Admin)
    .extend(UserRoles.Reader)
    .updateAny(['post'])
    .createAny(['post'])
    .deleteAny(['post']);
//# sourceMappingURL=user-roles.js.map