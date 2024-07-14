// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// valves modal window

$(document).ready(function() {
    let itemsPerPage = 10;
    
    // Válvulas
    let currentPageValvulas = 1;
    let valvulasData = [];

    $.getJSON('/js/valvulas_data.json')
        .done(function(data) {
            console.log('JSON de Válvulas Cargado Correctamente:', data);
            valvulasData = data;
            renderItems(valvulasData, currentPageValvulas, itemsPerPage, '#valvulas-content');
            renderPagination(valvulasData, itemsPerPage, '#pagination-valvulas');
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
            console.log('Fallo en la carga del JSON de Válvulas: ' + err);
        });

    // Medidores
    let currentPageMedidores = 1;
    let medidoresData = [];

    $.getJSON('/js/medidores_data.json')
        .done(function(data) {
            console.log('JSON de Medidores Cargado Correctamente:', data);
            medidoresData = data;
            renderItems(medidoresData, currentPageMedidores, itemsPerPage, '#medidores-content');
            renderPagination(medidoresData, itemsPerPage, '#pagination-medidores');
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
            console.log('Fallo en la carga del JSON de Medidores: ' + err);
        });

    // Bombas
    let currentPageBombas = 1;
    let bombasData = [];

    $.getJSON('/js/bombas_data.json')
        .done(function(data) {
            console.log('JSON de Bombas Cargado Correctamente:', data);
            bombasData = data;
            renderItems(bombasData, currentPageBombas, itemsPerPage, '#bombas-content');
            renderPagination(bombasData, itemsPerPage, '#pagination-bombas');
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
            console.log('Fallo en la carga del JSON de Bombas: ' + err);
        });

    // Filtros
    let currentPageFiltros = 1;
    let filtrosData = [];

    $.getJSON('/js/filtros_data.json')
        .done(function(data) {
            console.log('JSON de Filtros Cargado Correctamente:', data);
            filtrosData = data;
            renderItems(filtrosData, currentPageFiltros, itemsPerPage, '#filtros-content');
            renderPagination(filtrosData, itemsPerPage, '#pagination-filtros');
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
            console.log('Fallo en la carga del JSON de Filtros: ' + err);
        });

    function renderItems(data, page, itemsPerPage, containerSelector) {
        let content = '';
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = Object.keys(data).slice(start, end);

        console.log('Elementos Paginados:', paginatedItems);

        $.each(paginatedItems, function(index, key) {
            let item = data[key];
            let imgPath = containerSelector.includes('valvulas') ? 'valvulas' 
                         : containerSelector.includes('medidores') ? 'medidores' 
                         : containerSelector.includes('bombas') ? 'bombas' 
                         : 'filtros';
            content += `
                <div class="item">
                    <img width="200" src="/images/${imgPath}/${key}.png" alt="${item.title}" class="img-fluid">
                    <h3 style="color: var(--secondary);">${item.title}</h3>
                    <p>${containerSelector.includes('valvulas') ? item.figcaption : ''}</p>
                </div>
                <hr style="color: var(--primary);">
            `;
            console.log('Agregar ítem:', item);
        });

        $(containerSelector).html(content);
        console.log('Contenido Final:', content);
    }

    function renderPagination(data, itemsPerPage, paginationSelector) {
        let pageCount = Math.ceil(Object.keys(data).length / itemsPerPage);
        let paginationContent = '';

        for (let i = 1; i <= pageCount; i++) {
            paginationContent += `
                <li class="page-item ${i === (paginationSelector.includes('valvulas') ? currentPageValvulas : paginationSelector.includes('medidores') ? currentPageMedidores : paginationSelector.includes('bombas') ? currentPageBombas : currentPageFiltros) ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        $(paginationSelector).html(paginationContent);
    }

    // Manejar clics en paginación
    $('#pagination-valvulas, #pagination-medidores, #pagination-bombas, #pagination-filtros').on('click', '.page-link', function(e) {
        e.preventDefault();
        let page = $(this).data('page');
        if ($(this).parents('#pagination-valvulas').length) {
            currentPageValvulas = page;
            renderItems(valvulasData, currentPageValvulas, itemsPerPage, '#valvulas-content');
            renderPagination(valvulasData, itemsPerPage, '#pagination-valvulas');
        } else if ($(this).parents('#pagination-medidores').length) {
            currentPageMedidores = page;
            renderItems(medidoresData, currentPageMedidores, itemsPerPage, '#medidores-content');
            renderPagination(medidoresData, itemsPerPage, '#pagination-medidores');
        } else if ($(this).parents('#pagination-bombas').length) {
            currentPageBombas = page;
            renderItems(bombasData, currentPageBombas, itemsPerPage, '#bombas-content');
            renderPagination(bombasData, itemsPerPage, '#pagination-bombas');
        } else {
            currentPageFiltros = page;
            renderItems(filtrosData, currentPageFiltros, itemsPerPage, '#filtros-content');
            renderPagination(filtrosData, itemsPerPage, '#pagination-filtros');
        }
    });
});
