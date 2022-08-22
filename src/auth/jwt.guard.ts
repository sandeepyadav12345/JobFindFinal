import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class AdminJwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
