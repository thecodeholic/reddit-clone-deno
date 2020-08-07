import {RouterContext} from '../deps.ts';
import router from '../router.ts';

export default class BaseController {

  response(ctx: RouterContext, body: any, status = 200) {
    ctx.response.status = status;
    ctx.response.body = body;
  }
}