import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), TooltipModule]
};
