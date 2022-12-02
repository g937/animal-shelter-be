import {
    CanActivate,
    ExecutionContext,
    Injectable,
    mixin,
    Type,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserEntity } from '../../database/entities/user.entity';

export function RoleGuard(roles?: string[]): Type<any> {
    @Injectable()
    class MixinRolesGuard extends AuthGuard('token') implements CanActivate {
        private static hasRole(user: UserEntity): boolean {
            if (!roles || !roles?.length) {
                return true;
            }

            if (!user || !user?.role) {
                return false;
            }
            return roles.includes(user.role);
        }

        public async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest();

            return MixinRolesGuard.hasRole(request.user);
        }
    }

    return mixin(MixinRolesGuard);
}