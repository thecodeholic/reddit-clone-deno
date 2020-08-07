import {RouterContext} from '../deps.ts';
import router from '../router.ts';

export default class BaseController {

  route(method: string, path: string, ...callbacks: any[]) {
    switch (method) {
      case 'get':
        return router.get(path, ...callbacks);
      case 'post':
        return router.post(path, ...callbacks);
      case 'delete':
        return router.delete(path, ...callbacks);
      case 'put':
        return router.put(path, ...callbacks);
    }
  }

  response(ctx: RouterContext, body: any, status = 200) {
    ctx.response.status = status;
    ctx.response.body = body;
  }
}