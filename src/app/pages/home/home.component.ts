import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items = [];  
  p: number = 1;
  count: number = 10;
  requestPcount: number = 1;
  has_more:boolean;
  searchTxt:string;
  url:string;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {    
  }
  search() {
    this.reset();
    let additionalParams:string = "";
    let controlNames = ["title","body","tagged","nottagged","url","answers","views","user","accepted","closed","migrated","notice","wiki","page","pagesize","sort","order"];
    controlNames.forEach(cN => {
      let e = document.getElementsByName(cN)[0];
      if(e["value"] !=="") {
        console.log(e["value"]);
        additionalParams += `&${cN}=${e["value"]}`;
      }
    });
  this.url = `https://api.stackexchange.com/2.3/search/advanced?site=stackoverflow&q=${encodeURIComponent(this.searchTxt)}`;
  this.url+=additionalParams;
    this.http.get(this.url).subscribe((res:any)=>{
      console.log(this.url,res);
      this.has_more = res.has_more;
      this.items = res.items;
    });
  }
  reset() {
    this.items = [];
    this.requestPcount = 1;
    this.p = 1;
    this.has_more = false;    
  }
  unescape(value){
    //html entity unescape
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent;
  }
  gotoDetail(qid:number){
    /* let navExtra: NavigationExtras = {
      state: { qid }
    }; */
    this.router.navigate(['/detail',qid]);
  }
  pageChanged(event) {
    console.log(event);
    this.p = event;
    if(this.p%3==0 && this.has_more) {
      console.log("Load now...");
      this.requestPcount++;
      this.url+="&page="+this.requestPcount;
      this.http.get(this.url).subscribe((res:any)=>{
        console.log(this.url,res);
        this.items = [...this.items,...res.items];
      });
    }
  }
  pageBound(event) {
    console.log(event);
  }

}
