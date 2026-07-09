import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/dataservice/in-memory-data-service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppHttpInterceptorService } from './service/dataservice/AppHttpInterceptorService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService,
      multi: true
    },
    /*
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      {
        apiBase: '',
        dataEncapsulation: false,
        delay: 0
      }
        
    ))
*/
  ]
};
