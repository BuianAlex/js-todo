"use strict";

var myToDO={
    data: [
        {day: 111111,name: 'qqqqqqqqq', text: ''},
        {day: 222222,name: 'aaaaaaaa', text: ''},
        {day: 3333333,name: 'wwwwww', text: ''}
    ],
    showData: function () {
        $('.task-list').empty();
        this.data.forEach(function(element,i){
            $('.task-list').append(`<li>${element.day}   ${element.name} <button type="button" item=${i} action="delete" class="btn btn-outline-danger">Delete</button></li>`)
        })        
    },
    addNew:function () {
        console.log($('#nameToDo').val() + "---" +$('#textToDo').val()) ;
        $('#nameToDo').val();
        $('#textToDo').val();
        this.data.push({day: '',name: $('#nameToDo').val(), text:$('#textToDo').val() });
        this.showData();
    },
    delete: function (item){
        console.log('sdfs');
        
        this.data.splice(item, 1);
        this.showData();  
    }
}

$(document).ready(function(){

    myToDO.showData();
    $('#createNew').click(function(event ){
        event .preventDefault();
        $("#myModal").modal("hide");
        myToDO.addNew();
        
      });
    $('.task-list').on("click"," li button",  function(){   
        let toDelete = '';
        toDelete = $(this).attr('item');
        myToDO.delete(toDelete);       
    })  

})