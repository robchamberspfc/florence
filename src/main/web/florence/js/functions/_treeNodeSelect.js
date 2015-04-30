function treeNodeSelect(url){
  var baseURL = 'http://localhost:8081/index.html#!';
  var urlPart = url.replace(baseURL, '');
  var selectedListItem = $('.tree-nav-holder li').find('[data-url="' + urlPart + '"]'); //get first li with data-url with url
  $('.page-list li').removeClass('selected hello');
  $('.page-options').hide();

  $(selectedListItem).addClass('selected hello');
  $(selectedListItem).children('.page-options').show();

  //page-list-tree
  $('.tree-nav-holder ul').removeClass('active');
  $(selectedListItem).parents('ul').addClass('active');
  $(selectedListItem).closest('li').children('ul').addClass('active');
}