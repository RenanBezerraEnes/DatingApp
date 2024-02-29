import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router, private toastr: ToastrService) {}
  
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe
//     (catchError((error: HttpErrorResponse) => {
//       if(error){
//         switch(error.status) {
//           case 400: 
//             if(error.error.errors){
//               const modelStateErrors = [];
//               for(const key in error.error.errors){
//                 if(error.error.errors[key]){
//                   modelStateErrors.push(error.error.errors[key])
//                 }
//               }
//               throw modelStateErrors.flat();
//             } else {
//               this.toastr.error(error.error, error.status.toString());
//             }
//             break;
//             case 401:
//               this.toastr.error('Unhathorised', error.status.toString());
//               break;
//             case 404:
//               this.router.navigateByUrl('/not-found');
//               break;
//             case 500:
//               const navigationExtras: NavigationExtras = {state: {error: error.error}};
//               this.router.navigateByUrl('/server-error', navigationExtras);
//               break;
//               default:
//               this.toastr.error('Something unexpected went wrong');
//               console.log(error);
//               break;
//         }
//       }
//       throw error;
//     }))
//   }
// }

export const ErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
    const router: Router = inject(Router);
    const toastr = inject(ToastrService);
    
    // return next(request).pipe
    // (catchError((error: HttpErrorResponse) => {
    //   if(error){
    //     switch(error.status) {
    //       case 400: 
    //         if(error.error.errors){
    //           const modelStateErrors = [];
    //           for(const key in error.error.errors){
    //             if(error.error.errors[key]){
    //               modelStateErrors.push(error.error.errors[key])
    //             }
    //           }
    //           throw modelStateErrors.flat();
    //         } else {
    //           this.toastr.error(error.error, error.status.toString());
    //         }
    //         break;
    //         case 401:
    //           this.toastr.error('Unhathorised', error.status.toString());
    //           break;
    //         case 404:
    //           this.router.navigateByUrl('/not-found');
    //           break;
    //         case 500:
    //           const navigationExtras: NavigationExtras = {state: {error: error.error}};
    //           this.router.navigateByUrl('/server-error', navigationExtras);
    //           break;
    //           default:
    //           this.toastr.error('Something unexpected went wrong');
    //           console.log(error);
    //           break;
    //     }
    //   }
    //   throw error;
    // }))

    return next(request).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 0:
            console.log("Network error");
            break;
          case 400:
            console.log("400 Bad Request. Server cannot process the request");
            break;
          case 401:
            console.log("401 Authentication Error");
            break;
          case 500:
            console.log("500 Internal Server Error");
            break;
          default:
            console.log(err.url);
            console.log(err.status + ", " + err.statusText);
            break;
        }
        router.navigateByUrl("globalError");
        return throwError(() => new Error('An error occurred. Please try again later.'));
      })
    );
  };

