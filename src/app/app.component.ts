import { Component, OnInit } from '@angular/core';
import { Compound, CompletedStudies, OngoingStudies, NCAPBCAPK, Constents } from './data';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';
import { OrderByPipe } from './customPipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedCompound: Compound;
  allCompound: Compound[];
  cacadedCompound: Compound[];
  error: string;
  pleaseSelectCompound: any = '-- Select Compound --';
  Compound: string;
  CompoundTitle: string;
  selectedData: Compound;
  // constructor(
  //   private router: Router
  // ) {
  // }

  // ngOnInit() {
  //   this.router.navigate(['/home']);
  // }
  constructor(
    private router: Router,
    private _appService: AppService,
    private dynamicRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCompound();
  }

  onprogramselectionChanged() {
    this.selectedCompound;
    if (this.selectedCompound != null && this.selectedCompound !== <any>'-- Select Compound --') {
      this.Compound = this.selectedCompound.Id;
      this.CompoundTitle = this.selectedCompound.Title;
      this.router.navigate(['/displayClinicPKData', this.Compound, this.CompoundTitle, "studiesOngoing"]);
    } else {
      this.router.navigateByUrl('/empty');
      this.Compound = null;
    }
  }


  getCompound(): void {
    this.selectedCompound = this.pleaseSelectCompound;
    const select = '?$select=Id,Title';
    const url = '/_api/web/lists/getbytitle(\'Compound\')/items' + select;
    this._appService.getListItem(url)
      .subscribe(
        (compoundData) => {
          if (compoundData == null) {
            console.log('NO Data');
          } else {
            this.allCompound = compoundData.d.results;
            this.cacadedCompound = this.allCompound;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
          console.log(this.error);
        });
  }

}
// private dynamicRoute: ActivatedRoute,
  // private _appService: AppService

// export class AppComponent {
//   selectedData: Compound;
//   ctdItem: CompletedStudies;
//   ncapbcapkItem: NCAPBCAPK;
//   ongItem: OngoingStudies;
//   Compound: string;
//   CompoundTitle: string;
//   error: string;
//   loading: boolean;
//   adminURL = "https://incytedev.sharepoint.com/sites/ClinPK/Pages/ClinikPKAdmin.aspx"
//   studiesobjLength: number; completedStudiesobjLength: number; NCAPBKBobjlength: number;

//   constructor(
//     private router: Router,
//     private dynamicRoute: ActivatedRoute,
//     private _appService: AppService) {
//   }

//   ngOnInit() {

//     this.loading = false;
//   }

//   OnChange(response): void {
//     console.log(response);
//   }

//   OnSelectionChange(selectedData: Compound): void {
//     this.loading = false;
//     this.selectedData = selectedData;
//     if (selectedData != null && selectedData !== <any>'-- Select Compound --') {
//       this.Compound = this.selectedData.Id;
//       this.CompoundTitle = this.selectedData.Title;
//       this.router.navigate(['/displayClinicPKData', this.Compound, this.CompoundTitle]);
//     } else {
//       this.router.navigateByUrl('/empty');
//       this.Compound = null;
//     }
//   }

//   // getOngoingStudiesData(compound: string): void {
//   //   const select = '?$select=Id,Title,ongStudyName,ongClinicalPKrep,ongClinicalPKreport,ongClinPharmRep,Created,ongProtocol,Editor/Title,Modified,Compound/Id,Compound/Title';
//   //   const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
//   //   const filter = '&$filter=(Compound/Id eq ' + compound + ')';
//   //   const order = '&$orderby=Created desc';
//   //   const url = '/_api/web/lists/getbytitle(\'OngoingStudies\')/items' + select + expand + filter + order;
//   //   this._appService.getListItem(url)
//   //     .subscribe(
//   //       (ongItem) => {
//   //         this.loading = true;
//   //         if (ongItem == null) {
//   //         } else {
//   //           console.log(ongItem);
//   //           this.ongItem = ongItem.d.results;
//   //           this.studiesobjLength = ongItem.d.results.length
//   //         }
//   //         this.getCompletedStudiesData(this.Compound);
//   //       },
//   //       (error) => {
//   //         this.error = 'Problem accessing the Service';
//   //       });
//   // }

//   // getCompletedStudiesData(compound: string): void {
//   //   const select = '?$select=Id,Title,ctdStudyName,ctdClinicalPKrep,ctdClinPharmRep,ctdProtocol,ctdClinicalPKreport,ctdStudyConclusion,Compound/Title,Editor/Title,Modified,Compound/Id';
//   //   const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
//   //   const filter = '&$filter=(Compound/Id eq ' + compound + ')';
//   //   const order = '&$orderby=Created desc';
//   //   const url = '/_api/web/lists/getbytitle(\'CompletedStudies\')/items' + select + expand + filter + order;
//   //   // console.log(url);
//   //   this._appService.getListItem(url)
//   //     .subscribe(
//   //       (ctdItem) => {
//   //         if (ctdItem == null) {
//   //         } else {
//   //           console.log(ctdItem);
//   //           this.ctdItem = ctdItem.d.results;
//   //           this.completedStudiesobjLength = ctdItem.d.results.length
//   //         }
//   //         this.getNCAPBKBData(this.Compound);
//   //       },
//   //       (error) => {
//   //         this.error = 'Problem accessing the Service';
//   //       });
//   // }


//   // getNCAPBKBData(compound: string): void {
//   //   const select = '?$select=Id,Title,ncaSource,ncaFormalAnalysis,ncaSecondarydrug,ncaStudypopulation,ncaCmax,ncaTmax,ncaToneandhalf,ncaCminorCtau,ncaAUC0t,ncaAUC0inf,pbpkStudyNumber,pbpkSource,pbpkFormalAnalysis,pbpkSecondarydrug,pbpkStudypopulation,pbpkCmax,pbpkTmax,pbpkToneandhalf,pbpkCminorCtau,pbpkAUC0t,pbpkAUC0inf,poppkStudyNumber,poppkSource,poppkFormalAnalysis,poppkSecondarydrug,poppkStudypopulation,poppkCmax,poppkTmax,poppkToneandhalf,poppkCminorCtau,poppkAUC0t,poppkAUC0inf,Modified,Editor/Title,Compound/Id';
//   //   const expand = '&$expand=Compound/Id,Editor/Title,Compound/Title';
//   //   const filter = '&$filter=(Compound/Id eq ' + compound + ')';
//   //   const order = '&$orderby=Created desc';
//   //   const url = '/_api/web/lists/getbytitle(\'NCAPBCAPK\')/items' + select + expand + filter + order;
//   //   // console.log(url);
//   //   this._appService.getListItem(url)
//   //     .subscribe(
//   //       (ncapbcapkItem) => {
//   //         if (ncapbcapkItem == null) {
//   //         } else {
//   //           console.log(ncapbcapkItem);
//   //           this.ncapbcapkItem = ncapbcapkItem.d.results;
//   //           this.NCAPBKBobjlength = ncapbcapkItem.d.results.length
//   //         }
//   //       },
//   //       (error) => {
//   //         this.error = 'Problem accessing the Service';
//   //       });
//   // }

// }
