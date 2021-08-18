import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
items = [];
qid:number;
  constructor(private http:HttpClient,private route: ActivatedRoute,private location:Location) { }

  ngOnInit() {
    this.route.params.subscribe(param=>this.qid = param['qid']);
    let url:string = `https://api.stackexchange.com/2.3/questions/${this.qid}?order=desc&sort=activity&filter=withbody&site=stackoverflow`;
    this.http.get(url).subscribe((res:any)=>{
      console.log(res);
      this.items = res.items;
    });
  }
  unescape(value){
    //html entity unescape
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent;
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  seeOnSO(url: string){
    window.open(url, "_blank");
}
}
