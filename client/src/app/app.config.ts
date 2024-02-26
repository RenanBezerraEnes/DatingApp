import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideClientHydration(),
      provideHttpClient(withFetch()),
       TooltipModule,
        provideToastr(),
         provideAnimations(),
         {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
         {provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true},
        ]
};
