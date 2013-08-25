'use strict';

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

$(function(){
  $('.question_mark').bind('click',function(){
      console.log('click');
      collapse($(this).parent());
  });
    window.collapseAll = collapseAll;
});