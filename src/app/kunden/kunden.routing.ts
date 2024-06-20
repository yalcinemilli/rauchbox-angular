import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../_guards/auth.guard";
import { PrivateLayoutComponent } from "../_layout/private-layout/private-layout.component";
import { KundendetailsComponent } from "./kundendetails/kundendetails.component";
import { KundenhomeComponent } from "./kundenhome/kundenhome.component";

export const KUNDEN_ROUTE: Routes = [
    {path: 'kunden', component: PrivateLayoutComponent, children: [
        { path: '', component: KundenhomeComponent, canActivate: [AuthGuard] },
        { path: 'details', component: KundendetailsComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard]}
];

export const kundenRouting = RouterModule.forChild(KUNDEN_ROUTE);