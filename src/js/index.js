$(function() {
  /** select插件 */
  $('#prop_20000')
    .selectmenu();
  /** 时间选择插件 */
  $.datetimepicker.setLocale('zh');
  $('#prop_13021751').datetimepicker({
    format: 'd.m.Y H:i'
  });

  /** 编辑插件 */
  KindEditor.ready(function (K) {
    var editor = K.create('textarea[name="text"]', {
      allowFileManager: true,
      loadStyleMode: false,
      width: '800px',
      items: [
        'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'selectall', '|', 'fullscreen', '/',
        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
        'table', 'hr', 'emoticons', 'link'
      ]
    });
  });
});


