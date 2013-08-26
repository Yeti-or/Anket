'use strict';

(function(){
    var progressCircle = null;

    var expand = function(fieldSet){
        fieldSet.find('.toggle').slideDown(100,function(){
            fieldSet.find('input,textarea').last().focus();
        });

        fieldSet.find('p').first().css({
            'width': '100%',
            'white-space': 'normal'
        });
        fieldSet.css({
            'padding-bottom': '20px'
        });
        fieldSet.data('closed',false);
    };

    var collapse = function(fieldSet){
        fieldSet.find('.toggle').slideUp();
        fieldSet.find('p').first().css({
            'width': fieldSet.width(),
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis',
            'overflow': 'hidden'
        });
        fieldSet.css({
            'padding-bottom': 0
        });
        fieldSet.data('closed',true);
    };

    var toggle = function(fieldSet){
        if(fieldSet.data('closed')){
            expand(fieldSet);
        }else{
            collapse(fieldSet);
        }
    };

    var collapseAll = function(){
        var position = window.pageYOffset;
        $('fieldset').each(function(i,el){
            collapse($(el));
        });
        window.scrollTo(0,position);
    };

    var expandAll = function(){
        var position = window.pageYOffset;
        $('fieldset').each(function(i,el){
            expand($(el));
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
        var questions = $('.question_mark');

        questions.bind('click',function(){
            toggle($(this).parent());
        });

        $('fieldset').focusout(function(){
            var fieldSet = $(this);
            checkForPassing(fieldSet);
        });
        $('fieldset :radio').click(function(){
            var fieldSet = $(this).parents('fieldset');
            checkForPassing(fieldSet);
        });

        var paper = Raphael(0, 50, 300, 300);
        progressCircle = paper.createProgressBar(120,120,20,50,15,"#e74c3c","#1abc9c");
        $(paper.canvas).css({
            'position':'fixed',
            'left': '3%',
            'marginLeft': '-60px'
        });

        questions.each(function(i,question){
            progressCircle.sectors[i].click(function(){
                window.scrollTo(0,$(question).offset().top-155);
                expand($(question).parent());
            });
        });

    });

})();
