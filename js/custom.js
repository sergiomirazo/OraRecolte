// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


$('.custom_slick_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    fade: true,
    adaptiveHeight: true,
    asNavFor: '.slick_slider_nav',
    responsive: [{
        breakpoint: 768,
        settings: {
            dots: false
        }
    }]
})

$('.slick_slider_nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.custom_slick_slider',
    centerMode: false,
    focusOnSelect: true,
    variableWidth: true
});


/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(29.0884798,-110.9509581),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// valves modal window

$(document).ready(function() {
    let valvulasPerPage = 10;
    let currentPage = 1;
    let valvulasData = [];

    // Load valvulas_data.json
    $.getJSON('/js/valvulas_data.json', function(data) {
        valvulasData = data;
        renderValvulas(valvulasData, currentPage, valvulasPerPage);
        renderPagination(valvulasData, valvulasPerPage);
    });

    function renderValvulas(data, page, itemsPerPage) {
        let content = '';
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = Object.keys(data).slice(start, end);

        $.each(paginatedItems, function(index, key) {
            let valvula = data[key];
            content += `
                <div class="valvula-item">
                    <img src="/images/valvulas/${key}.png" alt="${valvula.title}" class="img-fluid">
                    <h3>${valvula.title}</h3>
                    <figcaption>${valvula.figcaption}</figcaption>
                </div>
                <hr>
            `;
        });

        $('#valvulas-content').html(content);
    }

    function renderPagination(data, itemsPerPage) {
        let pageCount = Math.ceil(Object.keys(data).length / itemsPerPage);
        let paginationContent = '';

        for (let i = 1; i <= pageCount; i++) {
            paginationContent += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        $('#pagination').html(paginationContent);
    }

    // Pagination click event
    $('#pagination').on('click', '.page-link', function(e) {
        e.preventDefault();
        currentPage = $(this).data('page');
        renderValvulas(valvulasData, currentPage, valvulasPerPage);
        renderPagination(valvulasData, valvulasPerPage);
    });
});