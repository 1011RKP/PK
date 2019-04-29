import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Compound, CompletedStudies, OngoingStudies, NCAPBCAPK, Constents } from '../data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clinic-pkdata',
  templateUrl: './clinic-pkdata.component.html',
  styleUrls: ['./clinic-pkdata.component.css']
})
export class ClinicPKDataComponent implements OnInit {
  selectedData: Compound;
  ctdItem: CompletedStudies;
  ncapbcapkItem: NCAPBCAPK;
  ongItem: OngoingStudies;
  Compound: string;
  CompoundTitle: string;
  error: string;
  loading: boolean;
  adminURL = "https://incytedev.sharepoint.com/sites/ClinPK/Pages/ClinikPKAdmin.aspx"
  studiesobjLength: number; completedStudiesobjLength: number; NCAPBKBobjlength: number;
  title: string;
  routeType: string;
  CompoundID: string;
  type: string

  constructor(
    private router: Router,
    private dynamicRoute: ActivatedRoute,
    private _appService: AppService) {
    this.dynamicRoute.params.subscribe(params => {
      this.CompoundID = params['id'];
      this.type = params['type'];
      this.title = params['title'];
      this.routeType = "Edit";
      this.initializePage(params['id']);
    });
  }

  ngOnInit() {
    // this.dynamicRoute.params.subscribe(params => {
    //   this.CompoundID = params['id'];
    //   this.title = params['title'];
    // });
  }

  naviateToonGoingStudies(): void {
    this.router.navigate(['/editStdStudies', "NA", "New", this.CompoundID]);
  }
  naviateToCompletedStudies(): void {
    this.router.navigate(['/editCtdStudies', "NA", "New", this.CompoundID]);
  }

  naviateToNCAandPBKB(): void {
    this.router.navigate(['/editNcapbpk', "NA", "New", this.CompoundID]);
  }

  initializePage(id: string) {
    this.getOngoingStudiesData(id);
  }

  getOngoingStudiesData(compound: string): void {
    const select = '?$select=Id,Title,ongStudyName,ongClinicalPKrep,ongClinicalPKreport,ongClinPharmRep,Created,ongProtocol,Editor/Title,Modified,Compound/Id,Compound/Title';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items' + select + expand + filter + order;
    this._appService.getListItem(url)
      .subscribe(
        (ongItem) => {
          this.loading = true;
          if ((ongItem == null) || (ongItem.d.results.length === 0)) {
            this.studiesobjLength = ongItem.d.results.length;
            this.getCompound();
          } else {
            console.log(ongItem);
            this.CompoundTitle = ongItem.d.results[0].Compound.Title;
            this.ongItem = ongItem.d.results;
            this.studiesobjLength = ongItem.d.results.length
          }
          this.getCompletedStudiesData(this.CompoundID);
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getCompletedStudiesData(compound: string): void {
    const select = '?$select=Id,Title,ctdStudyName,ctdClinicalPKrep,ctdClinPharmRep,ctdProtocol,ctdClinicalPKreport,ctdStudyConclusion,Compound/Title,Editor/Title,Modified,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (ctdItem) => {
          if ((ctdItem == null) || (ctdItem.d.results.length === 0)) {
            this.completedStudiesobjLength = ctdItem.d.results.length
          } else {
            console.log(ctdItem);
            this.ctdItem = ctdItem.d.results;
            this.completedStudiesobjLength = ctdItem.d.results.length
          }
          this.getNCAPBKBData(this.CompoundID);
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  getNCAPBKBData(compound: string): void {
    const select = '?$select=Id,Title,ncaSource,ncaFormalAnalysis,ncaSecondarydrug,ncaStudypopulation,ncaCmax,ncaTmax,ncaToneandhalf,ncaCminorCtau,ncaAUC0t,ncaAUC0inf,pbpkStudyNumber,pbpkSource,pbpkFormalAnalysis,pbpkSecondarydrug,pbpkStudypopulation,pbpkCmax,pbpkTmax,pbpkToneandhalf,pbpkCminorCtau,pbpkAUC0t,pbpkAUC0inf,poppkStudyNumber,poppkSource,poppkFormalAnalysis,poppkSecondarydrug,poppkStudypopulation,poppkCmax,poppkTmax,poppkToneandhalf,poppkCminorCtau,poppkAUC0t,poppkAUC0inf,Modified,Editor/Title,Compound/Id';
    const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
    const filter = '&$filter=(Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'NCAPBCAPK\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (ncapbcapkItem) => {
          if ((ncapbcapkItem == null) || (ncapbcapkItem.d.results.length === 0)) {
            this.completedStudiesobjLength = ncapbcapkItem.d.results.length
          } else {
            console.log(ncapbcapkItem);
            this.ncapbcapkItem = ncapbcapkItem.d.results;
            this.NCAPBKBobjlength = ncapbcapkItem.d.results.length
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
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
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

}

//this.initialiseState(); // reset and set based on new parameter this time  
  // initialiseState() {
  // Set default values and re-fetch any data you need.
  //   console.log(this.CompoundID);
  //   console.log(this.title);
  //   this.getOngoingStudiesData(this.CompoundID);
  // }
  // ngOnDestroy() {
  // avoid memory leaks here by cleaning up after ourselves. If we  
  // don't then we will continue to run our initialiseInvites()   
  // method on every navigationEnd event.
  // if (this.dynamicRoute) {
  //   this.dynamicRoute.unsubscribe();
  // }
  // }
