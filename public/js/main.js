$(document).ready(function() {

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }

    var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');

        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });

    $('ul.setup-panel li.active a').trigger('click');

    $("[id^='activate-step']").on('click', function(e) {

        console.log("entered on click");
        e.preventDefault();
        console.log("default prevented");
        var x = document.forms["proposalForm"]["title"].value;
        console.log("value of x");
        console.log(x);
        if (x == null || x == "") {
            alert("Title must be filled out");
            return false;
        } else {
            var currentId = $(this).attr('id').split('-')[2];
            $('ul.setup-panel li:eq(' + (currentId - 1) + ')').removeClass('disabled');
            $('ul.setup-panel li a[href="#step-' + currentId + '"]').trigger('click');
            //$(this).remove();
        }
    })

    $('#createProposal').on('submit', function(e){

        $('#createProposal').submit()


    });


    $('#updateProposal').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            data: $('#updateProposal').serialize(),
            method: 'POST',
            url: $('#updateProposal').attr('action'),
            success: function(data) {
                toastr["success"]("Successfully Updated..")
            }
        });
    })

    $('#createItem').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            data: $('#createItem').serialize(),
            method: 'POST',
            url: $('#createItem').attr('action'),
            success: function(data) {
                toastr["success"]("Item created Successfully.." + JSON.stringify(data))
            }
        });
    });

    // $('#activate-step-2').on('click', function(e) {
    //     $('ul.setup-panel li:eq(1)').removeClass('disabled');
    //     $('ul.setup-panel li a[href="#step-2"]').trigger('click');
    //     //$(this).remove();
    // })

    // $('#activate-step-3').on('click', function(e) {
    //     $('ul.setup-panel li:eq(2)').removeClass('disabled');
    //     $('ul.setup-panel li a[href="#step-3"]').trigger('click');
    //     //$(this).remove();
    // })

    // $('#activate-step-4').on('click', function(e) {
    //     $('ul.setup-panel li:eq(3)').removeClass('disabled');
    //     $('ul.setup-panel li a[href="#step-4"]').trigger('click');
    //     //$(this).remove();
    // })

    // $('#activate-step-5').on('click', function(e) {
    //     $('ul.setup-panel li:eq(4)').removeClass('disabled');
    //     $('ul.setup-panel li a[href="#step-5"]').trigger('click');
    //     //$(this).remove();
    // })
});
