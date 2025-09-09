import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DynamiConfigService } from './core/services/dynami-config.service';

// Function to load config at app initialization
export function loadConfig(configService: DynamiConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    DynamiConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [DynamiConfigService],
      multi: true
    },
  ],
};



