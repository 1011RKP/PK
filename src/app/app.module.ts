import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppService } from './app.service';
//import { OrderByPipe } from './customPipe';
import { appRoutes } from './router';

import { AppComponent } from './app.component';
import { ClinicPKDataComponent } from "./Clinic-PK-Data/clinic-pkdata.component";
import { EmptyComponentComponent } from './Empty-Component/empty-component.component';
import { EditCtdStudiesComponent } from './Edit-Completed-Studies/edit-ctd-studies.component';
import { EditstdStudiesComponent } from './Edit-Studies-Ongoing/editstd-studies.component';
import { EditNCAandPBKBComponent } from './Edit-NCAand-PBPK/edit-ncaand-pbkb.component';
import { DeleteRecordComponent } from './Delete-Record/delete-record.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditNCAComponent } from './Edit-NCA/edit-nca.component';
import { EditPBPKComponent } from './Edit-PBPK/edit-pbpk.component';
import { EditPopPKComponent } from './Edit-PopPK/edit-pop-pk.component'

@NgModule({
  declarations: [
    AppComponent,
    ClinicPKDataComponent,
    EmptyComponentComponent,
    EditCtdStudiesComponent,
    EditstdStudiesComponent,
    EditNCAandPBKBComponent,
    DeleteRecordComponent,
    EditNCAComponent,
    EditPBPKComponent,
    EditPopPKComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
