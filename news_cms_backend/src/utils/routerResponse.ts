import { Context } from 'koa';

function routerResponse(option = {} as any) {
  return async function (ctx: Context, next: () => void) {
    ctx.success = function (data: any) {
      console.log(data);

      ctx.type = option.type || 'json';
      ctx.body = {
        code: option.successCode || 20000,
        msg: option.successMsg || 'success',
        data: data,
      };
    };

    ctx.fail = function (msg: string = 'fail', code: number = 10010) {
      ctx.type = option.type || 'json';
      ctx.body = {
        code: option.failCode || code,
        msg: option.successMsg || msg,
      };
    };

    await next();
  };
}

export { routerResponse };
