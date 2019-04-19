import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Compound, ADMEData } from './data';

import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedData: Compound;
  seletedItem: ADMEData;
  Compound: string;
  error: string;

  constructor(
    private _appService: AppService) {
  }

  ngOnInit() {
  }

  OnChange(response): void {
    // console.log(response);
    this.getADMEData(this.Compound);
  }

  OnSelectionChange(selectedData: Compound): void {
    // console.log('selected Data');
    // console.log(selectedData);
    this.selectedData = selectedData;
    if (selectedData != null && selectedData !== <any>'-- Select Compound --') {
      this.Compound = this.selectedData.Id;
      this.getADMEData(this.Compound);
    } else {
      this.Compound = null;
    }
  }

  setseletedItem(data: ADMEData): void {
    // console.log(data);
    this.seletedItem = data;
  }

  getADMEData(compound: string): void {
    const select = '?$select=Id,StudyNumber,Dose,ImaxCmax,Igut,MW,LinMax,PlasmaPB,FaFg,Ka,Qh,Rb,' +
      'MicrosomalPB,StableDose,Microsomaltested,Comment,Created,Program/Id,Compound/Id';
    const expand = '&$expand=Program/Id,Compound/Id';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'GeneralADMEData\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (admeData) => {
          if (admeData == null) {
            // console.log('NO Data');
          } else {
            //this.admeDATA = admeData.d.results;
            console.log(admeData);
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          // console.log(this.error);
        });
  }
}
