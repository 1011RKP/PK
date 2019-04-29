import { RouterModule, Routes, Route } from '@angular/router'
import { ClinicPKDataComponent } from './ClinicPKData/clinic-pkdata.component'
import { EmptyComponentComponent } from "./Empty-component/empty-component.component";
import { EditCtdStudiesComponent } from './Edit-CompletedStudies/edit-ctd-studies.component';
import { EditstdStudiesComponent } from './Edit-StudiesOngoing/editstd-studies.component';
import { EditNCAandPBKBComponent } from './Edit-ncaand-pbkb/edit-ncaand-pbkb.component';

export const appRoutes: Routes = [

    // { path: 'newItemOngoingStudies', component: OngoingStudiesComponent },
    // { path: 'editItem/:id', component: EditCompundComponent },
    { path: 'editNcapbpk/:itemid/:type/:compoundID', component: EditNCAandPBKBComponent },
    { path: 'editCtdStudies/:itemid/:type/:compoundID', component: EditCtdStudiesComponent },
    { path: 'editStdStudies/:itemid/:type/:compoundID', component: EditstdStudiesComponent },
    { path: 'empty', component: EmptyComponentComponent },
    { path: 'displayClinicPKData/:id/:title/:type', component: ClinicPKDataComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full' }

]