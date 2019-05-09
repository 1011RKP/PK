import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { PopPK } from '../data';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pop-pk',
  templateUrl: './edit-pop-pk.component.html',
  styleUrls: ['./edit-pop-pk.component.css']
})
export class EditPopPKComponent implements OnInit {


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


  itemid: string;
  type: string;
  poppkItem: PopPK;
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
      this.getPopPK(itemid);
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

  postPopPk(form: NgForm): void {
    if (this.CompoundID !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'PopPK\')/items';
            this._appService.addDatatoList(url, {
              CompoundId: this.CompoundID,
              Title: this.poppkStudyNumber,
              poppkSource: this.poppkSource,
              poppkFormalAnalysis: this.poppkFormalAnalysis,
              poppkSecondarydrug: this.poppkSecondarydrug,
              poppkStudypopulation: this.poppkStudypopulation,
              poppkCmax: this.poppkCmax,
              poppkTmax: this.poppkTmax,
              poppkToneandhalf: this.poppkToneandhalf,
              poppkCminorCtau: this.poppkCminorCtau,
              poppkAUC0t: this.poppkAUC0t,
              poppkAUC0inf: this.poppkAUC0inf
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

  editPopPk(form: NgForm): void {
    if (this.itemid !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'PopPK\')/items(' + this.itemid + ')';
            this._appService.editDatatoList(url, {
              Title: this.poppkStudyNumber,
              poppkSource: this.poppkSource,
              poppkFormalAnalysis: this.poppkFormalAnalysis,
              poppkSecondarydrug: this.poppkSecondarydrug,
              poppkStudypopulation: this.poppkStudypopulation,
              poppkCmax: this.poppkCmax,
              poppkTmax: this.poppkTmax,
              poppkToneandhalf: this.poppkToneandhalf,
              poppkCminorCtau: this.poppkCminorCtau,
              poppkAUC0t: this.poppkAUC0t,
              poppkAUC0inf: this.poppkAUC0inf
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

  getPopPK(id: string): void {
    const select = '?$select=Id,Title,poppkSource,poppkFormalAnalysis,poppkSecondarydrug,poppkStudypopulation,poppkCmax,poppkTmax,poppkToneandhalf,poppkCminorCtau,poppkAUC0t,poppkAUC0inf,Modified,Editor/Title,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Id eq ' + id + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'PopPK\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (res) => {
          if (res == null) {
          } else {
            console.log(res);
            this.poppkItem = res.d.results;
            this.setFormData(this.poppkItem);
            this.studiesobjLength = res.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  setFormData(data: PopPK): void {
    this.poppkStudyNumber = data[0].Title;
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
    this.CompoundID = data[0].Compound.Id;//.toString();
    this.CompoundTitle = data[0].Compound.Title;//.toString();
  }

}
