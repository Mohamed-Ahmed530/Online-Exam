import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (localStorage.getItem('user-token')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('user-token')!,
      },
    });
  }

  return next(req);
};
