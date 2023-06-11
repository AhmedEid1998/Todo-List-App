import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators, FormRecord } from '@angular/forms';
declare var $ :any;


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit{
  constructor(private _AuthService:AuthService){ }
  
  myDate:any  = new Date()
  
    // the form of creating new task 
    createTask:FormGroup = new FormGroup({
      id: new FormControl (0),
      title: new FormControl ('string'),
      description: new FormControl (null, [Validators.required, 
                                           Validators.minLength(5),
                                           Validators.maxLength(50)]),
      icon: new FormControl (null, [Validators.required, 
                                    Validators.minLength(5),
                                    Validators.maxLength(15)])
    })

    //create new task and send that to api, then get all tasks 
    submitTask(formInfo:FormGroup){

      this._AuthService.sendTask(formInfo.value).subscribe(()=>{
            this.getTasks()
      })      
    }


  ngOnInit(): void {
    this.getTasks()

    //get all tasks from localstorage 
    if('doneTasks'  in localStorage){
      this.doneTasks = (JSON.parse( localStorage.getItem('doneTasks' )!))
    }
  }



  //get all tasks in api and put them in (tasks method) 
  tasks:any [] = []
  getTasks(){
    this._AuthService.getTodo().subscribe((respose)=>{
      this.tasks = respose
    })
  }

  //Delete task from api, then get all tasks
  deleteTask(index:any){
    this._AuthService.deleteTask(this.tasks[index].id).subscribe(()=>{
    this.getTasks()
    // this.isDone = false
    })
  }


  //get task by id from api
  //put all done tasks in (doneTasks method), then in localStorage
  //can't do done taske twice on the same task

  doneTasks:any [] = []
  isDone:boolean = false
  getTaskById(index:any){
    this._AuthService.getTaskById(this.tasks[index].id).subscribe((response)=>{
      
      if('doneTasks'  in localStorage){
        this.doneTasks = JSON.parse( localStorage.getItem('doneTasks')!)
        let exist = this.doneTasks.find(member => member.title == this.tasks[index].title
          && member.description == this.tasks[index].description)
        if(exist){
          this.isDone = true
        }else{
          this.doneTasks.push(response)
          this.isDone = false
          localStorage.setItem('doneTasks' , JSON.stringify(this.doneTasks))
        }
      }else{
        this.doneTasks.push(response)
        this.isDone = false
        localStorage.setItem('doneTasks' , JSON.stringify(this.doneTasks))
      }
    })
    this.isDone = false
  }

  //remove done task which you want from localStorage
  removeDoneTask(index:any){
    this.doneTasks.splice(index,1)
    this.isDone = false
    localStorage.setItem('doneTasks' , JSON.stringify(this.doneTasks))
  }

  //jquery code
  clkDone(){
    $('.clck-done').toggleClass('done-tasks')
  }
  appearFRM(){
      $('.frm').addClass('appear')
  }
  disAappearFRM(){
    $('.frm').removeClass('appear')
  }

}




