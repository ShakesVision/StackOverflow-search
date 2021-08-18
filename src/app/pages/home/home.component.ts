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
  searchTxt:string;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {    
  }
  search() {
    let additionalParams:string = "";
    let controlNames = ["title","body","tagged","nottagged","url","answers","views","user","accepted","closed","migrated","notice","wiki"];    
    controlNames.forEach(cN => {
      let e = document.getElementsByName(cN)[0];
      if(e["value"] !=="") {
        console.log(e["value"]);
        additionalParams += `&${cN}=${e["value"]}`;
      }
    });
  let url = `https://api.stackexchange.com/2.3/search/advanced?site=stackoverflow&order=desc&sort=votes&q=${encodeURIComponent(this.searchTxt)}`;
  url+=additionalParams;
    this.http.get(url).subscribe((res:any)=>{
      console.log(url,res);
      this.items = res.items;
    });
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

}
