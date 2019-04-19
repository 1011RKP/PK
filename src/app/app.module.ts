import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddCompundComponent } from './AddCompund/add-compund.component';
import { EditCompundComponent } from './EditCompund/edit-compund.component';
import { DeleteCompundComponent } from './DeleteCompund/delete-compund.component';
import { SelectCompoundComponent } from './SelectCompound/select-compound.component';
import { AppService } from './app.service';
import { OrderByPipe } from './customPipe';

@NgModule({
  declarations: [
    AppComponent,
    AddCompundComponent,
    EditCompundComponent,
    DeleteCompundComponent,
    SelectCompoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService, OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
