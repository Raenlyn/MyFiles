$(document).ready(function() {
 var $container = $(".grid"); // the container with all the elements to filter inside
 var filters = {}; //should be outside the scope of the filtering function
 /* --- read the documentation on isotope.metafizzy.co for more options --- */
 var $grid = $container.isotope({
   layoutMode: 'fitRows',
   itemSelector: ".character-box", // the elements to filter
   getSortData: {name: '[name]'}, 
   sortBy: 'name', 
   percentPosition: false // put true if you use percentage widths, otherwise put false
 });
 
 $(".option-set a").click(function(e) {
   var $this = $(this); // cache the clicked link
   var filterAttr = "data-filter-value";
   var filterValue = $this.attr(filterAttr); // cache the filter
   var $optionSet = $this.parents(".option-set"); // cache the parent element
   var group = $optionSet.attr("data-filter-group"); // cache the parent filter group
   var filterGroup = filters[group];
   if (!filterGroup) {
     filterGroup = filters[group] = [];
   }
   var $selectAll = $optionSet.find('a['+filterAttr+'=""]'); // the 'select all' button in the current group
   var activeClass = "selected", // the class for active links
     exclClass = "exclusive"; // the class for exclusive groups
 comboFiltering($this,filters,filterAttr,filterValue,$optionSet,group,$selectAll,activeClass,exclClass);
   var comboFilter = getComboFilter(filters);
   $grid.isotope({
     filter: comboFilter
   });
   $this.toggleClass(activeClass);
   e.preventDefault();
 });
});

function searchFilter() {
  var qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  var $container = $('.grid');
  $container.isotope({ filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    return searchResult
  } });
}

// use value of search field to filter
var $quicksearch = $('#quicksearch').keyup( debounce( searchFilter ) );

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  }
}

$(document).ready(function() {
// Tooltip only Text
$('.masterTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('fast');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX - -14;   //Get X cordinates
        var mousey = e.pageY - 20;   //Get Y cordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
});
});