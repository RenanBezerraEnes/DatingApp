import { ApplicationConfig } from '@angular/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideClientHydration(),
      provideHttpClient(withFetch(), withInterceptors([JwtInterceptor])),
       TooltipModule,
        provideToastr(),
         provideAnimations(),
        //  {provide: BaseRouteReuseStrategy, useClass: CustomRouteReuseStrategy, multi: true},
        ]
};
