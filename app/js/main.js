"use strict";

Number.prototype.toDate = function() { 
    let datastring = '';
    const  months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
                ];
    if(this){
        let d = new Date(this);
        datastring = d.getHours() +':'+ d.getMinutes()+" "+d.getDate() +"" + months[d.getMonth()] +""+ d.getFullYear();
    }     
    return datastring;
};

//////////
var myToDO={

    data: [],
    showData: function (action) {
        if(action==='update'){
         this.data = this.getLocalStor();            
        }

        let taskList = document.getElementById('task-list'); 
        taskList.innerHTML = '';
        if(this.data){
            this.data.forEach(function(element,i){
            let taskRow = document.createElement("tr");
            taskRow.setAttribute("id", i);
            
            let order = document.createElement("td");
            order.innerHTML = i+1;
            taskRow.appendChild(order);

            let day = document.createElement("td");
            day.innerHTML = element.day.toDate();            
            taskRow.appendChild(day);

            let dayOf = document.createElement("td");
            dayOf.innerHTML = element.dayOf === 'undefined' ?element.dayOf.toDate():'no deadline';           
            taskRow.appendChild(dayOf);

            let taskName = document.createElement("td");
            taskName.innerHTML = element.name;
            taskRow.appendChild(taskName);

            let actions = document.createElement("td");
            this.actionBar(actions, element.status);
            taskRow.appendChild(actions );

            taskList.appendChild(taskRow);           
            },this)         
        }        
    },
    
    addNew:function () {
        $('#nameToDo').val();
        $('#textToDo').val();
        this.data.push({day: this.dateStamp(), dayOf: '', name: $('#nameToDo').val(), text:$('#textToDo').val(), status: 0 });
        this.setLocalStor();
        this.showData('update');
    },
    
    showDetail: function (item) {
        let numberTodo =  parseInt(item,16)+1;       
        let dataItem = this.data[item];
        $('#nameToDo').val(dataItem.name);
        $('#textToDo').val(dataItem.text);
        $('#day').html('Start time: ' +   dataItem.day.toDate());
        $("#myModal").modal("show");    
        $("#modal-title").html('Task# '+ numberTodo);
        let btnSave = document.getElementById('save');
        btnSave.setAttribute("action", "update");
        btnSave.setAttribute("showed", item); 
    },
    
    update: function (item) {
        this.data[item].name = $('#nameToDo').val();
        this.data[item].text =  $('#textToDo').val(); 
        this.setLocalStor();
        this.showData('update'); 
    },
    
    actionBar: function (taskRow,status) {
        let del = `<i class="fas fa-trash-alt"></i>`;
        let edit = `<i class="fas fa-edit"></i>`;
        let wait = `<i class="far fa-square"></i>`;
        let done = `<i class="fas fa-check-square"></i>`;
        let taskStatus = 0;


        switch (status) {
            case 1:
                taskStatus =  done;
                break;
        
            default:
                taskStatus =  wait;
                break;
        }
        let donBtn = document.createElement("button");
        donBtn.classList.add("btn");
        donBtn.classList.add("btn-outline-success");
        donBtn.innerHTML  = taskStatus;
        donBtn.addEventListener("click", function(e){
            let idTask = e.target.parentNode.closest("tr").getAttribute("id");
            this.setDone(idTask);         
        }.bind(this), false);
        taskRow.appendChild(donBtn);

        let showBtn = document.createElement("button");
        showBtn.classList.add("btn");
        showBtn.classList.add("btn-outline-primary");
        showBtn.innerHTML  = edit;
        showBtn.addEventListener("click", function(e){
            let idTask = e.target.parentNode.closest("tr").getAttribute("id");
            this.showDetail(idTask);         
        }.bind(this), false);
        taskRow.appendChild(showBtn);
        
        let delBtn = document.createElement("button");
        delBtn.classList.add("btn");
        delBtn.classList.add("btn-outline-danger");
        delBtn.innerHTML  = del;
        delBtn.addEventListener("click", function(e){
            let idTask = e.target.parentNode.closest("tr").getAttribute("id");
            this.delete(idTask);         
        }.bind(this), false);
        taskRow.appendChild(delBtn);       
    },

    setDone: function(item){
        this.data[item].status === 1?this.data[item].status=0 : this.data[item].status=1;
        this.setLocalStor();
        this.showData('update');  
    },
    
    delete: function (item){
        this.data.splice(item, 1);
        this.setLocalStor();
        this.showData('update');  
    },
    dateStamp: function () {
        const c  = new Date();       
        return c.getTime();     
    },

    setLocalStor: function(){
        window.localStorage.setItem('data', JSON.stringify(this.data)) ;
    },
    getLocalStor: function(){
        let dataStor = JSON.parse(window.localStorage.getItem('data'));
        if(dataStor){
            return dataStor;
        }
        else{
            return [];
        }       
    },

    sort:function(){        
        this.data.reverse(); 
        this.showData();
    }
}

$(document).ready(function(){

    myToDO.showData('update');
    $('#createNew').click(function(event ){
        event .preventDefault();
        let btnSave = document.getElementById('saveNew');
        btnSave.setAttribute("action", "saveNew"); 
        $('#nameToDo').val('');
        $('#textToDo').val('');
        $('#day').html('');
        $("#myModal").modal("show"); 
        $("#modal-title").html('ADD New Task');
        document.getElementById('saveNew').addEventListener("click", function(e){
            myToDO.addNew();         
        }.bind(this), false);
                    
      });
    
      document.getElementById('save').addEventListener("click", function(e){
        let action =  e.target.getAttribute("action");
        if(action === 'saveNew'){
            myToDO.addNew();
        }
        if(action === 'update'){
            myToDO.update(e.target.getAttribute("showed"));
        }
        $("#myModal").modal("hide");         
    }); 




    $('#sort').on("click", function(){        
        myToDO.sort();      
    })  

})
