"use strict";

var myToDO={
    data: [
        {day: {sec:'1542000000000',string: '12 Nov 2018'},name: 'qqqqqqqqq', text: ''},
        {day: {sec:'1542111111111',string: '13 Nov 2018'},name: 'aaaaaaaa', text: ''},
        {day: {sec:'1542292222222',string: '15 Nov 2018'},name: 'wwwwww', text: ''}
    ],
    showData: function () {
        $('.task-list').empty();
        this.data.forEach(function(element,i){
            $('.task-list').append(`<tr ><td>${i+1}</td><td>${element.day.string}</td>   <td id="name-task" item=${i}>${element.name}</td> <td><button type="button" item=${i} action="delete" class="btn btn-outline-danger">Delete</button></td></tr>`)
        })        
    },
    addNew:function () {
        $('#nameToDo').val();
        $('#textToDo').val();
        this.data.push({day: this.dateStamp(), name: $('#nameToDo').val(), text:$('#textToDo').val() });
        this.showData();
    },
    showDetail: function (item) {
        let dataItem = this.data[item];
        $('#nameToDo').val(dataItem.name);
        $('#textToDo').val(dataItem.text);
        $('#day').html(dataItem.day);
        $("#myModal").modal("show");
    },
    delete: function (item){
        this.data.splice(item, 1);
        this.showData();  
    },
    dateStamp: function () {
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
        const c  = new Date();
        let prom = c.getTime();
        let d = new Date(prom);
        
        let dateStamp = d.getDate() +" " + months[d.getMonth()] +" "+ d.getFullYear();
        return {sec:prom,string:dateStamp};     
    },
    sort:function(){
        this.data.reverse(); 
        this.showData();
    }
}

$(document).ready(function(){

    myToDO.showData();
    $('#createNew').click(function(event ){
        event .preventDefault();
 
        $('#nameToDo').val('');
        $('#textToDo').val('');
        $('#day').html('');
        $("#myModal").modal("show");               
      });

    $('#saveNew').click(function(event ){
        event .preventDefault();
        $("#myModal").modal("hide");
        myToDO.addNew();
        
      });
    $('.task-list').on("click"," td button",  function(){   
        let toDelete = '';
        toDelete = $(this).attr('item');
        myToDO.delete(toDelete);       
    });
    $('.task-list').on("click",'#name-task', function(){   
        let item = $(this).attr('item');        
        myToDO.showDetail(item);      
    });
    $('#sort').on("click", function(){        
        myToDO.sort();      
    })  

})