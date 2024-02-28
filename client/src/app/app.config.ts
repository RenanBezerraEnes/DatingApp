import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideClientHydration(),
      provideHttpClient(withFetch(), withInterceptors([JwtInterceptor])),
       TooltipModule,
        provideToastr(),
         provideAnimations(),
        //  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        ]
};
