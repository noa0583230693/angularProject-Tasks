import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorAllInterceptor } from './core/interceptors/interceptor-all-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([interceptorAllInterceptor])),
  ]
};
    // provideBrowserGlobalErrorListeners(),
    // provideRouter(routes,withComponentInputBinding()), 
    // provideClientHydration(withEventReplay())


    // provideZoneChangeDetection({ eventCoalescing: true }), 
    // provideRouter(routes), // השורה הזו פותרת את שגיאת ה-Router!
    // provideHttpClient()

    // provideRouter(routes),
    // provideHttpClient()
