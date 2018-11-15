//variant 1

var mainFunction=function(){
    "use strict";
    

    $("div.bookMarks a:nth-child(1)").on("click", function(){
        
        $("div.bookMarks span").removeClass("ativated");//delete class"ativated" from all span element

        $("div.bookMarks a:nth-child(1) span").addClass("ativated");//add class"ativated" into first spanelement

        $("div.container .contentTaskPage").empty();//очищаем содержимое страницы

        return false;//мы не переходим по ссылке
    });

    $("div.bookMarks a:nth-child(2)").on("click",function(){

        $("div.bookMarks span").removeClass("ativated");

        $("div.bookMarks a:nth-child(2) span").addClass("ativated");

        $("div.container .contentTaskPage").empty();

        return false;
    });

    $("div.bookMarks a:nth-child(3)").on("click", function(){
        
        $("div.bookMarks span").removeClass("ativated");

        $("div.bookMarks a:nth-child(3) span").addClass("ativated");

        $("div.container contentTaskPage").empty();

        return false;

    });




    console.log("Ok");// проверка работы 
}

// variant 2(оптимизация)
var mainFunctionOptimizVariant_1=function(){
    "use strict";           

    var makeBookMarksActive=function(bookMarksValue){
        var bookMarkSelector="div.bookMarks a:nth-child("+bookMarksValue+") span";
        $("div.bookMarks span").removeClass("ativated");
        $(bookMarkSelector).addClass("ativated");
        $("div.container .contentTaskPage").empty();

    }

    $("div.bookMarks a:nth-child(1)").on("click", function(){
        
        makeBookMarksActive(1);

        return false;
    });

    $("div.bookMarks a:nth-child(2)").on("click",function(){

        makeBookMarksActive(2);

        return false;
    });

    $("div.bookMarks a:nth-child(3)").on("click", function(){
        
        makeBookMarksActive(3);
        
        return false;
    });

    console.log("Ok");// проверка работы 

}



$(document).ready(mainFunctionOptimizVariant_1)