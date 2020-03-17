import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {KeycloakService, KeycloakAngularModule, KeycloakBearerInterceptor} from 'keycloak-angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {AppConfigService} from "./app.config.service";
import {MainSidebarComponent} from "./main/sidebar/main.sidebar.component";
import {MainToolbox} from "./main/sidebar/main.toolbox/main.toolbox";

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MainSidebarComponent,
    MainToolbox,
    FooterComponent
  ], 
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [ HttpClient ]
      }
    }),
    KeycloakAngularModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          console.log('fotz kapurtz');
          return appConfigService.loadConfig();
        }
      }
    },
    KeycloakService,
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    keycloakService.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'TooManyThoughts',
        clientId: 'tmt-frontend'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: [
        '/assets'
      ]
    }).then(() => {
      appRef.bootstrap(AppComponent);
    }).catch(error => {
      throw Error('init Keycloak failed');
    });
  }
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
