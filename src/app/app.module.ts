import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './main/header/header.component';
import {FooterComponent} from './main/footer/footer.component';
import {MainComponent} from './main/main.component';
import {AppConfigService} from "./app.config.service";
import {MainSidebarComponent} from "./main/sidebar/main.sidebar.component";
import {MainToolbox} from "./main/sidebar/main.toolbox/main.toolbox";
import {FeedComponent} from "./contentFM/feedFM/feed.component";
import {UtilsModule} from "./_utils/_utils.module";
import {AuthHttpInterceptor} from "./authFM/auth.http.interceptor";
import {AuthModule} from "./authFM/auth.module";
import {JwtModule} from "@auth0/angular-jwt";
import {HeaderHintComponent} from "./main/header/hint/header.hint.component";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./_store/reducers/app.reducers";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {environment} from "../environments/environment.prod";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {CommonModule} from "@angular/common";
import {AppJunctionBox} from "./app.junction.box";


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem('tmt_access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderHintComponent,
    MainComponent,
    FeedComponent,
    MainSidebarComponent,
    MainToolbox,
    FooterComponent,
  ], 
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['arsch.morz'],
      }
    }),
    StoreModule.forRoot(appReducers),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument(): [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [ HttpClient ]
      }
    }),
    UtilsModule
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
    },
    AppJunctionBox
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
