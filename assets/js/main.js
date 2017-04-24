$(document).ready(function(){
  $('textarea.bind-code').each(function(i, block) {
    var code = $(block).val()
    var mode = $(block).attr('mode')
    var border = $(block).attr('border')
    var absolute = $(block).attr('header-absolute')
    var replace = $(block).attr('replace')
    var hidden = $(block).attr('hidden')
    var multiplatform = $(block).attr('multiplatform')
    var heightPreview = $(block).attr('height-preview')
    var idResult = $(block).attr('id-result')
    var theme = 'default'
    if(replace) {
      replace = replace.split('|');
      for(var i in replace){
        code = code.replace(new RegExp(replace[i].split(',')[0], 'g'), replace[i].split(',')[1]);
      }
    }
    if(!mode) {
      mode = 'text/html'
    }
    var editor = CodeMirror.fromTextArea(block, {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
    if(absolute) {
      code = code.replace(new RegExp('"header', 'g'), '"header header-absolute')
    }
    var resultStyle = ''
    var resultClass = 'result'
    var id = idResult ? idResult : new Date().getTime();
    var attrs = ' id="'+id+'" '
    if(border) {
      resultClass += ' with-border'
    }
    if(heightPreview) {
      resultStyle += 'height:'+heightPreview
      resultClass += ' height-change'
    }
    var multiplatformHtml = '';
    if(multiplatform) {
      multiplatformHtml = '<div style="margin-bottom:10px">';
      multiplatformHtml += '<button class="small blue" onclick="previewPlatform(this, '+id+', 1)">Android</button>';
      multiplatformHtml += '<button class="small white" onclick="previewPlatform(this, '+id+', 2)">iOS</button>';
      multiplatformHtml += '</div>';
    }
    $(block).after(multiplatformHtml+'<div '+attrs+' class="'+resultClass+'" style="'+resultStyle+'">'+code+'<div class="cls"></div></div>')
  });

  var $document = $(document);
  var $element = $('.menuland');
  var className = 'hasScrolled';

  var checkScroll = function(){
    if ($document.scrollTop() >= 80) {
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  }
  var checkHashSection = function(){

  }

  checkScroll()
  checkHashSection()

  $document.scroll(function() {
    checkScroll()
    checkHashSection()
  });

})


window.openMenuLand = function(m){
  var m = document.getElementById(m);
  if(m.className.indexOf('menu') >= 0 && m.className.indexOf('open') < 0) {
    var e = document.createElement('div');
    e.className = 'backdrop backdrop-menu';
    $(m).parent().append(e)
    m.className += ' open';
    setTimeout(function(){
      e.className += ' show';
    });
    e.addEventListener('click', function(evt){
      m.className = m.className.replace('open','');
      e.className = e.className.replace('show','');
      setTimeout(function(){
        e.parentNode.removeChild(e);
      }, 500)
    }, false);
  }
}

window.previewPlatform = function(e, id, p){
  $(e).parent().find('.blue').removeClass('blue').addClass('white');
  $(e).removeClass('white').addClass('blue');
  if(p === 1){
    $('#'+id).removeClass('platform-ios').addClass('platform-android');
    SO.code = 1;
    $('#'+id).css('max-width','400px');
  } else {
    $('#'+id).removeClass('platform-android').addClass('platform-ios');
    SO.code = 2;
    $('#'+id).css('max-width','320px');
  }
}
