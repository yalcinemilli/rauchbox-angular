import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCarouselConfig, NgbCollapseModule, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthService } from './_services/auth.service';

// Routing
import { routing } from './app.routing';

// Components
import { AppComponent } from './app.component';

import { MenuSettingsConfig } from './_layout/settings/menu-settings.config';
import { SettingsModule } from './_layout/settings/settings.module';
import { ThemeSettingsConfig } from './_layout/settings/theme-settings.config';

import { FullLayoutNavbarComponent } from './_layout/header/full-layout-navbar/full-layout-navbar.component';
import { HeaderComponent } from './_layout/header/header.component';
import { HorizontalComponent as HeaderHorizontalComponent } from './_layout/header/horizontal/horizontal.component';
import { VerticalComponent as HeaderVerticalComponent } from './_layout/header/vertical/vertical.component';

import { FooterComponent } from './_layout/footer/footer.component';
import { NavigationComponent as AppNavigationComponent } from './_layout/navigation/navigation.component';

import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';

import { LoginComponent } from './login';

import { ChangelogComponent } from './changelog/changelog.component';

import { HorizontalnavComponent } from './_layout/navigation/horizontalnav/horizontalnav.component';
import { VerticalnavComponent } from './_layout/navigation/verticalnav/verticalnav.component';
import { NavbarService } from './_services/navbar.service';

// perfect scroll bar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// spinner
import { DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BlockUIModule } from 'ng-block-ui';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BlockTemplateComponent } from './_layout/blockui/block-template.component';
import { BreadcrumbModule } from './_layout/breadcrumb/breadcrumb.module';
import { CustomizerComponent } from './_layout/customizer/customizer.component';
import { HorizontalCustomizerComponent } from './_layout/customizer/horizontal-customizer/horizontal-customizer.component';
import { FullLayoutComponent } from './_layout/full-layout/full-layout.component';
import { DataApiService } from './_services/data.api';
import { DeviceDetectorService } from './_services/device-detector.service';
import { SarchandfilterService } from './_services/sarchandfilter.service';
import { TableApiService } from './_services/table-api.service';
import { MatchHeightModule } from './content/partials/general/match-height/match-height.module';
import { PartialsModule } from './content/partials/partials.module';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { EditprofilComponent } from './editprofil/editprofil.component';
import { QrcodeModalComponent } from './editprofil/qrcode-modal/qrcode-modal.component';
import { SaveModalComponent } from './editprofil/save-modal/save-modal.component';
import { KundenModule } from './kunden/kunden.module';
import { KundenService } from './kunden/kunden.service';
import { LeitstelleComponent } from './leitstelle/leitstelle.component';
import { LeitstellenKontaktModalComponent } from './leitstelle/leitstellen-kontakt-modal/leitstellen-kontakt-modal.component';
import { LeitstellenKontaktViewComponent } from './leitstelle/leitstellen-kontakt-view/leitstellen-kontakt-view.component';
import { LeitstellenModalComponent } from './leitstelle/leitstellen-modal/leitstellen-modal.component';
import { LieferantenModalComponent } from './lieferanten/lieferanten-modal/lieferanten-modal.component';
import { LieferantenComponent } from './lieferanten/lieferanten.component';
import { Login2famodalComponent } from './login/login2famodal/login2famodal.component';
import { LogoutComponent } from './login/logout/logout.component';
import { ApiModule, Configuration, ConfigurationParameters } from './open-api';
import { PasswordChangeModalComponent } from './users/password-change-modal/password-change-modal.component';
import { UsersDetailsModalComponent } from './users/users-details-modal/users-details-modal.component';
import { UsersComponent } from './users/users.component';

export function apiConfigFactory (): Configuration {
  const params: ConfigurationParameters = {
    apiKeys: {'X-API-KEY': '***********'},
    basePath:  "http://**********************",
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
    imports: [
        BrowserModule,
        PartialsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbCollapseModule,
        MatchHeightModule,
        ApiModule.forRoot(apiConfigFactory),
        BreadcrumbModule,
        UiSwitchModule,
        NgbModule,
        NgOtpInputModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxDatatableModule,
        KundenModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
         routing,
        // Settings modules
        SettingsModule.forRoot(ThemeSettingsConfig, MenuSettingsConfig),
        PerfectScrollbarModule,
        NgxSpinnerModule,
        LoadingBarRouterModule,
        BlockUIModule.forRoot({
          template: BlockTemplateComponent
        }),
    ],
    declarations: [
        AppComponent,
        PublicLayoutComponent,
        PrivateLayoutComponent,
        HeaderComponent,
        FullLayoutNavbarComponent,
        HeaderHorizontalComponent,
        HeaderVerticalComponent,
        FooterComponent,
        AppNavigationComponent,
        AlertComponent,
        LoginComponent,
        ChangelogComponent,
        VerticalnavComponent ,
        HorizontalnavComponent ,
        CustomizerComponent,
        HorizontalCustomizerComponent,
        BlockTemplateComponent,
        FullLayoutComponent,
        DeleteItemComponent,
        LeitstelleComponent,
        LieferantenComponent,
        UsersComponent,
        LeitstellenModalComponent,
        LeitstellenKontaktModalComponent,
        LeitstellenKontaktViewComponent,
        LieferantenModalComponent,
        UsersDetailsModalComponent,
        PasswordChangeModalComponent,
        EditprofilComponent,
        QrcodeModalComponent,
        Login2famodalComponent,
        SaveModalComponent,
        LogoutComponent
      ],
    providers: [
        AuthGuard,
        AlertService,
        NavbarService,
        DeviceDetectorService,
        TableApiService,
        ApiModule,
        KundenService,
        DataApiService,
        AuthService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerGestureConfig
        },
        NgbCarouselConfig,
        NgbModalConfig,
        DecimalPipe,
        SarchandfilterService
    ],
    entryComponents: [
      BlockTemplateComponent
    ],
    bootstrap: [AppComponent],
    exports: [RouterModule]
})

export class AppModule {

}
