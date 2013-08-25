'use strict';

(function(){
    var progressCircle = null;
    var collapse = function(fieldSet){
        var question = fieldSet.children().first();
        var inputs = fieldSet.find('input,textarea');
        var title = fieldSet.find('p').first();

        fieldSet.find('.toggle').slideToggle(100,function(){
            inputs.last().focus();
        });
        if(question.data('closed')){
            title.css({
                'width': '100%',
                'white-space': 'normal'
            });
            fieldSet.css({
                'padding-bottom': '20px'
            });
            question.data('closed',false);
        }else{
            title.css({
                'width': fieldSet.width(),
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis',
                'overflow': 'hidden'
            });
            fieldSet.css({
                'padding-bottom': 0
            });
            question.data('closed',true);
        }
    };

    var collapseAll = function(){
        var position = window.pageYOffset;
        $('fieldset').each(function(i,el){
            collapse($(el));
        });
        window.scrollTo(0,position);
    };

    var checkForPassing = function(fieldSet){
        var question = fieldSet.children().first();
        var inputs = fieldSet.find('input,textarea');
        var passed = false;
        inputs.each(function(i,el){
            switch (el.type){
                case "textarea":
                case "text":
                    if(el.value.length > 0){
                        passed = true;
                        return false;
                    }
                    break;
                case "radio":
                    if(el.checked){
                        passed = true;
                        return false;
                    }
                    break;
            }
        });
        var label = question.children()[0];
        label.innerText = label.innerText / (7-1) === 7 ? '7' : label.innerText;//bonus
        if(passed){
            question.addClass('passed');
            if(progressCircle){
                progressCircle.turnOnSector(label.innerText - 1);
            }
        }else{
            question.removeClass('passed');
            if(progressCircle){
                progressCircle.turnOffSector(label.innerText - 1);
            }
        }
    };

    $(function(){
        $('.question_mark').bind('click',function(){
            console.log('click');
            collapse($(this).parent());
        });
        $('fieldset').focusout(function(){
            var fieldSet = $(this);
            checkForPassing(fieldSet);
        });
        $('fieldset :radio').click(function(){
            var fieldSet = $(this).parents('fieldset');
            checkForPassing(fieldSet);
        });

        var paper = Raphael(0, 50, 200, 200);
        progressCircle = paper.createProgressBar(70,120,20,50,15,"#e74c3c","#1abc9c");
        $(paper.canvas).css({
            'position':'fixed',
            'left': '3%',
            'zIndex':-1
        });

    });

})();
