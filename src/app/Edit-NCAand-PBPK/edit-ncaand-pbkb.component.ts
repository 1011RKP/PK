import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { NCAPBCAPK } from '../data';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-ncaand-pbkb',
  templateUrl: './edit-ncaand-pbkb.component.html',
  styleUrls: ['./edit-ncaand-pbkb.component.css']
})
export class EditNCAandPBKBComponent implements OnInit {
  ncaStudyNumber: string;
  ncaSource: string;
  ncaFormalAnalysis: string;
  ncaSecondarydrug: string;
  ncaStudypopulation: string;
  ncaCmax: string;
  ncaTmax: string;
  ncaToneandhalf: string;
  ncaCminorCtau: string;
  ncaAUC0t: string;
  ncaAUC0inf: string;

  poppkStudyNumber: string;
  poppkSource: string;
  poppkFormalAnalysis: string;
  poppkSecondarydrug: string;
  poppkStudypopulation: string;
  poppkCmax: string;
  poppkTmax: string;
  poppkToneandhalf: string;
  poppkCminorCtau: string;
  poppkAUC0t: string;
  poppkAUC0inf: string;

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
  ongItem: NCAPBCAPK;
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
      this.getNCAandPBKB(itemid);
    }
  }

  getCompoundonload(): void {
    // this.dynamicRoute.params.subscribe(params => {
    //   this.compoundID = params['compoundID'];
    // });
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
    // this.dynamicRoute.params.subscribe(params => {
    //   this.compoundID = params['compoundID'];
    // });
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

  posNCAandPBKB(form: NgForm): void {
    if (this.CompoundID !== '') {
      this._appService.getService().subscribe(
        (res) => {
          // console.log(res.length);
          // console.log(res);
          if (res.length !== 0) {
            // console.log('res' + res.d.GetContextWebInformation.FormDigestValue);
            // console.log('Inside Click');
            const url = '/_api/web/lists/getbytitle(\'NCAPBCAPK\')/items';
            this._appService.addDatatoList(url, {
              CompoundId: this.CompoundID,
              Title: this.ncaStudyNumber,
              ncaSource: this.ncaSource,
              ncaFormalAnalysis: this.ncaFormalAnalysis,
              ncaSecondarydrug: this.ncaSecondarydrug,
              ncaStudypopulation: this.ncaStudypopulation,
              ncaCmax: this.ncaCmax,
              ncaTmax: this.ncaTmax,
              ncaToneandhalf: this.ncaToneandhalf,
              ncaCminorCtau: this.ncaCminorCtau,
              ncaAUC0t: this.ncaAUC0t,
              ncaAUC0inf: this.ncaAUC0inf,
              poppkStudyNumber: this.poppkStudyNumber,
              poppkSource: this.poppkSource,
              poppkFormalAnalysis: this.poppkFormalAnalysis,
              poppkSecondarydrug: this.poppkSecondarydrug,
              poppkStudypopulation: this.poppkStudypopulation,
              poppkCmax: this.poppkCmax,
              poppkTmax: this.poppkTmax,
              poppkToneandhalf: this.poppkToneandhalf,
              poppkCminorCtau: this.poppkCminorCtau,
              poppkAUC0t: this.poppkAUC0t,
              poppkAUC0inf: this.poppkAUC0inf,
              pbpkStudyNumber: this.pbpkStudyNumber,
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
                  // console.log(dataresponse.length);
                  if (dataresponse.length === 0) {
                    // this.toastr.error('Problem creating record. Please contact IT.');
                    //this.error = 'Problem creating record. Please contact IT.';
                    // this.message = '';
                  } else {
                    this.toastr.success('Record Added successfully');
                    console.log(dataresponse);
                    console.log(dataresponse);
                    this.getCompound();
                    //this.router.navigate(['/displayClinicPKData', this.id, this.CompoundTitle]);
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

  editNCAandPBKB(form: NgForm): void {
    if (this.itemid !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'NCAPBCAPK\')/items(' + this.itemid + ')';
            this._appService.editDatatoList(url, {
              Title: this.ncaStudyNumber,
              ncaSource: this.ncaSource,
              ncaFormalAnalysis: this.ncaFormalAnalysis,
              ncaSecondarydrug: this.ncaSecondarydrug,
              ncaStudypopulation: this.ncaStudypopulation,
              ncaCmax: this.ncaCmax,
              ncaTmax: this.ncaTmax,
              ncaToneandhalf: this.ncaToneandhalf,
              ncaCminorCtau: this.ncaCminorCtau,
              ncaAUC0t: this.ncaAUC0t,
              ncaAUC0inf: this.ncaAUC0inf,
              poppkStudyNumber: this.poppkStudyNumber,
              poppkSource: this.poppkSource,
              poppkFormalAnalysis: this.poppkFormalAnalysis,
              poppkSecondarydrug: this.poppkSecondarydrug,
              poppkStudypopulation: this.poppkStudypopulation,
              poppkCmax: this.poppkCmax,
              poppkTmax: this.poppkTmax,
              poppkToneandhalf: this.poppkToneandhalf,
              poppkCminorCtau: this.poppkCminorCtau,
              poppkAUC0t: this.poppkAUC0t,
              poppkAUC0inf: this.poppkAUC0inf,
              pbpkStudyNumber: this.pbpkStudyNumber,
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
                  //this.router.navigate(['/displayClinicPKData', this.id, this.CompoundTitle]);
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

  getNCAandPBKB(id: string): void {
    const select = '?$select=Id,Title,ncaSource,ncaFormalAnalysis,ncaSecondarydrug,ncaStudypopulation,ncaCmax,ncaTmax,ncaToneandhalf,ncaCminorCtau,ncaAUC0t,ncaAUC0inf,poppkStudyNumber,poppkSource,poppkFormalAnalysis,poppkSecondarydrug,poppkStudypopulation,poppkCmax,poppkTmax,poppkToneandhalf,poppkCminorCtau,poppkAUC0t,poppkAUC0inf,pbpkStudyNumber,pbpkSource, pbpkFormalAnalysis,pbpkSecondarydrug,pbpkStudypopulation,pbpkCmax,pbpkTmax,pbpkToneandhalf,pbpkCminorCtau,pbpkAUC0t,pbpkAUC0inf,Created,Editor/Title,Modified,Compound/Id,Compound/Title';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Id eq ' + id + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'NCAPBCAPK\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (ongItem) => {
          if (ongItem == null) {
          } else {
            console.log(ongItem);
            this.ongItem = ongItem.d.results;
            this.setFormData(this.ongItem);
            this.studiesobjLength = ongItem.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  setFormData(data: NCAPBCAPK): void {
    this.ncaStudyNumber = data[0].Title;
    this.ncaSource = data[0].ncaSource;
    this.ncaFormalAnalysis = data[0].ncaFormalAnalysis;
    this.ncaSecondarydrug = data[0].ncaSecondarydrug;
    this.ncaStudypopulation = data[0].ncaStudypopulation;
    this.ncaCmax = data[0].ncaCmax;
    this.ncaTmax = data[0].ncaTmax;
    this.ncaToneandhalf = data[0].ncaToneandhalf;
    this.ncaCminorCtau = data[0].ncaCminorCtau;
    this.ncaAUC0t = data[0].ncaAUC0t;
    this.ncaAUC0inf = data[0].ncaAUC0inf;
    this.poppkStudyNumber = data[0].poppkStudyNumber;
    this.poppkSource = data[0].poppkSource;
    this.poppkFormalAnalysis = data[0].poppkFormalAnalysis;
    this.poppkSecondarydrug = data[0].poppkSecondarydrug;
    this.poppkStudypopulation = data[0].poppkStudypopulation;
    this.poppkCmax = data[0].poppkCmax;
    this.poppkTmax = data[0].poppkTmax;
    this.poppkToneandhalf = data[0].poppkToneandhalf;
    this.poppkCminorCtau = data[0].poppkCminorCtau;
    this.poppkAUC0t = data[0].poppkAUC0t;
    this.poppkAUC0inf = data[0].poppkAUC0inf;
    this.pbpkStudyNumber = data[0].pbpkStudyNumber;
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
