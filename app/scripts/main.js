'use strict';

(function(){

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
        if(passed){
            question.addClass('passed');
        }else{
            question.removeClass('passed');
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
    });

})();
