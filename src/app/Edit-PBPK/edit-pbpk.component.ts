import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { PBPK } from '../data';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pbpk',
  templateUrl: './edit-pbpk.component.html',
  styleUrls: ['./edit-pbpk.component.css']
})
export class EditPBPKComponent implements OnInit {

  pbpkStudyNumber: string;
  pbpkSource: string;
  pbpkFormalAnalysis: string;
  pbpkSecondarydrug: string;
  pbpkStudypopulation: string;
  pbpkCmax: string;
  pbpkTmax: string;
  pbpkToneandhalf: string;
  pbpkCminorCtau: string;
  pbpkAUC0t: string;
  pbpkAUC0inf: string;

  itemid: string;
  type: string;
  pbpkItem: PBPK;
  allCompound: Component;
  studiesobjLength: number;
  error: string;

  CompoundTitle: string;
  CompoundID: string;
  routeType: string;

  constructor(
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private router: Router,
    private _appService: AppService,
    private dynamicRoute: ActivatedRoute,
  ) {
    this.dynamicRoute.params.subscribe(params => {
      this.itemid = params['itemid'];
      this.type = params['type'];
      this.CompoundID = params['compoundID'];
      this.initializePage(this.itemid, this.type, this.CompoundID);
      this.routeType = "Edit";
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    this.getCompound();
  }

  initializePage(itemid: string, type: string, compoundID: string) {
    if (type === "New") {
      this.getCompoundonload();
    } else {
      this.getPBKB(itemid);
    }
  }

  getCompoundonload(): void {
    const select = '?$select=Id,Title';
    const filter = '&$filter=(Id eq ' + this.CompoundID + ')';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select + filter;
    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.CompoundTitle = compoundData.d.results[0].Title;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  getCompound(): void {
    const select = '?$select=Id,Title';
    const filter = '&$filter=(Id eq ' + this.CompoundID + ')';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select + filter;
    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.CompoundTitle = compoundData.d.results[0].Title;
            this.router.navigate(['/displayClinicPKData', this.CompoundID, this.CompoundTitle, "NCAandPBKB"]);
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

  postPBKB(form: NgForm): void {
    if (this.CompoundID !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'PBPK\')/items';
            this._appService.addDatatoList(url, {
              CompoundId: this.CompoundID,
              Title: this.pbpkStudyNumber,
              pbpkSource: this.pbpkSource,
              pbpkFormalAnalysis: this.pbpkFormalAnalysis,
              pbpkSecondarydrug: this.pbpkSecondarydrug,
              pbpkStudypopulation: this.pbpkStudypopulation,
              pbpkCmax: this.pbpkCmax,
              pbpkTmax: this.pbpkTmax,
              pbpkToneandhalf: this.pbpkToneandhalf,
              pbpkCminorCtau: this.pbpkCminorCtau,
              pbpkAUC0t: this.pbpkAUC0t,
              pbpkAUC0inf: this.pbpkAUC0inf
            }, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  if (dataresponse.length === 0) {
                  } else {
                    this.toastr.success('Record Added successfully');
                    console.log(dataresponse);
                    console.log(dataresponse);
                    this.getCompound();
                  }
                },
                (error) => {
                  this.toastr.error('Problem creating record. Please contact IT.');
                  this.error = 'Problem creating record. Please contact IT.';
                });
          } else {
            this.toastr.error('Problem creating record. Please contact IT.');
            this.error = 'Problem creating record. Please contact IT.';
          }
        },
        (error) => {
          this.toastr.error('Problem creating record. Please contact IT.');
          this.error = 'Problem creating record. Please contact IT.';
        });
    }
  }

  editPBKB(form: NgForm): void {
    if (this.itemid !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'PBPK\')/items(' + this.itemid + ')';
            this._appService.editDatatoList(url, {
              Title: this.pbpkStudyNumber,
              pbpkSource: this.pbpkSource,
              pbpkFormalAnalysis: this.pbpkFormalAnalysis,
              pbpkSecondarydrug: this.pbpkSecondarydrug,
              pbpkStudypopulation: this.pbpkStudypopulation,
              pbpkCmax: this.pbpkCmax,
              pbpkTmax: this.pbpkTmax,
              pbpkToneandhalf: this.pbpkToneandhalf,
              pbpkCminorCtau: this.pbpkCminorCtau,
              pbpkAUC0t: this.pbpkAUC0t,
              pbpkAUC0inf: this.pbpkAUC0inf
            }, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.toastr.success('Record Updated successfully');
                  console.log(dataresponse);
                  this.getCompound();
                },
                (error) => {
                  this.toastr.error('Problem creating record. Please contact IT.');
                  this.error = 'Problem creating record. Please contact IT.';
                });
          } else {
            this.error = 'Problem creating record. Please contact IT.';
          }
        },
        (error) => {
          this.error = 'Problem creating record. Please contact IT.';
        });
    }
  }

  getPBKB(id: string): void {
    const select = '?$select=Id,Title,pbpkSource,pbpkFormalAnalysis,pbpkSecondarydrug,pbpkStudypopulation,pbpkCmax,pbpkTmax,pbpkToneandhalf,pbpkCminorCtau,pbpkAUC0t,pbpkAUC0inf,Modified,Editor/Title,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Id eq ' + id + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'PBPK\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (res) => {
          if (res == null) {
          } else {
            console.log(res);
            this.pbpkItem = res.d.results;
            this.setFormData(this.pbpkItem);
            this.studiesobjLength = res.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  setFormData(data: PBPK): void {
    this.pbpkStudyNumber = data[0].Title;
    this.pbpkSource = data[0].pbpkSource;
    this.pbpkFormalAnalysis = data[0].pbpkFormalAnalysis;
    this.pbpkSecondarydrug = data[0].pbpkSecondarydrug;
    this.pbpkStudypopulation = data[0].pbpkStudypopulation;
    this.pbpkCmax = data[0].pbpkCmax;
    this.pbpkTmax = data[0].pbpkTmax;
    this.pbpkToneandhalf = data[0].pbpkToneandhalf;
    this.pbpkCminorCtau = data[0].pbpkCminorCtau;
    this.pbpkAUC0t = data[0].pbpkAUC0t;
    this.pbpkAUC0inf = data[0].pbpkAUC0inf;
    this.CompoundID = data[0].Compound.Id;//.toString();
    this.CompoundTitle = data[0].Compound.Title;//.toString();

  }
}
