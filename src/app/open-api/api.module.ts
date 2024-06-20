import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdressenControllerService } from './api/adressenController.service';
import { CustomFieldControllerService } from './api/customFieldController.service';
import { EmaControllerService } from './api/emaController.service';
import { KontaktControllerService } from './api/kontaktController.service';
import { KundenControllerService } from './api/kundenController.service';
import { LeitstellenControllerService } from './api/leitstellenController.service';
import { LieferantenControllerService } from './api/lieferantenController.service';
import { ObjektIdentControllerService } from './api/objektIdentController.service';
import { UserControllerService } from './api/userController.service';
import { UserLevelControllerService } from './api/userLevelController.service';
import { VideoControllerService } from './api/videoController.service';
import { WartungControllerService } from './api/wartungController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdressenControllerService,
    CustomFieldControllerService,
    EmaControllerService,
    KontaktControllerService,
    KundenControllerService,
    LeitstellenControllerService,
    LieferantenControllerService,
    ObjektIdentControllerService,
    UserControllerService,
    UserLevelControllerService,
    VideoControllerService,
    WartungControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
