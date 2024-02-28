import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private accountService: AccountService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     this.accountService.currentUser$.pipe(take(1)).subscribe({
//       next: user => {
//         if(user) {
//           request = request.clone({
//             setHeaders: {
//               Authorization: `Bearer ${user.token}`
//             }
//           })
//         }
//       }
//     })
//     return next.handle(request);
//   }
// };


export const JwtInterceptor: HttpInterceptorFn = (request, next) => {
  const accountService = inject(AccountService);
  accountService.currentUser$.pipe(take(1)).subscribe({
    next: user => {
      if(user) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        })
      }
    }
  })
  return next(request)
}
