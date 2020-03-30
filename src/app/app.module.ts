import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {AppConfigService} from "./app.config.service";
import {MainSidebarComponent} from "./main/sidebar/main.sidebar.component";
import {MainToolbox} from "./main/sidebar/main.toolbox/main.toolbox";
import {AuthHttpInterceptor} from "./auth/_services/auth.http.interceptor";
import {FeedComponent} from "./feed/feed.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FeedComponent,
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
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadConfig();
        }
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
