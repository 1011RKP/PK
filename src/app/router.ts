import { RouterModule, Routes, Route } from '@angular/router'
import { ClinicPKDataComponent } from "./Clinic-PK-Data/clinic-pkdata.component";
import { EmptyComponentComponent } from './Empty-Component/empty-component.component';
import { EditCtdStudiesComponent } from './Edit-Completed-Studies/edit-ctd-studies.component';
import { EditstdStudiesComponent } from './Edit-Studies-Ongoing/editstd-studies.component';
import { EditNCAComponent } from './Edit-NCA/edit-nca.component';
import { EditPBPKComponent } from './Edit-PBPK/edit-pbpk.component';
import { EditPopPKComponent } from './Edit-PopPK/edit-pop-pk.component'
import { EditNCAandPBKBComponent } from './Edit-NCAand-PBPK/edit-ncaand-pbkb.component';

export const appRoutes: Routes = [

    // { path: 'newItemOngoingStudies', component: OngoingStudiesComponent },
    // { path: 'editItem/:id', component: EditCompundComponent },
    //{ path: 'editNcapbpk/:itemid/:type/:compoundID', component: EditNCAandPBKBComponent },
    { path: 'editNCA/:itemid/:type/:compoundID', component: EditNCAComponent },
    { path: 'editPBPK/:itemid/:type/:compoundID', component: EditPBPKComponent },
    { path: 'editPopPK/:itemid/:type/:compoundID', component: EditPopPKComponent },
    { path: 'editCtdStudies/:itemid/:type/:compoundID', component: EditCtdStudiesComponent },
    { path: 'editStdStudies/:itemid/:type/:compoundID', component: EditstdStudiesComponent },
    { path: 'empty', component: EmptyComponentComponent },
    { path: 'displayClinicPKData/:id/:title/:type', component: ClinicPKDataComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full' }

]