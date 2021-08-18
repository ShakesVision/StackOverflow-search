import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items = [];
  url = 'https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=angular-cli%20not%20available&site=stackoverflow';
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {    
  }
  search(url) {
    this.http.get(this.url).subscribe((res:any)=>{
      console.log(res);
      this.items = res.items;
    });
  }
  unescape(value){
    //html entity unescape
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent;
  }
  gotoDetail(qid:number){
    this.router.navigate(['/detail',qid]);
  }

}
