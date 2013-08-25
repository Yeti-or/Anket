'use strict';

$(function(){
  $('.question_mark').bind('click',function(){
      console.log('click');
      var question = $(this);
      //like label but better
      var fieldSet = question.parent();
      var inputs = fieldSet.find('input,textarea');
      inputs.last().focus();
      var title = fieldSet.find('p').first();

      fieldSet.find('.toggle').slideToggle(100);
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
  });
});