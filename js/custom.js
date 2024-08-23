$(document).ready(function() {
    let itemsPerPage = 9; // 3x3 grid

    // Function to determine number of items per row based on screen size
    function getItemsPerRow() {
        return window.innerWidth >= 992 ? 3 : 1; // 3 items per row for larger screens, 1 item per row for smaller screens
    }

    // Válvulas
    let currentPageValvulas = 1;
    let valvulasData = [];

    $.getJSON('../js/valvulas_data.json')
        .done(function(data) {
            valvulasData = data;
            renderItems(valvulasData, currentPageValvulas, itemsPerPage, '#valvulas-content');
            renderPagination(valvulasData, itemsPerPage, '#pagination-valvulas', currentPageValvulas);
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
        });

    // Medidores
    let currentPageMedidores = 1;
    let medidoresData = [];

    $.getJSON('../js/medidores_data.json')
        .done(function(data) {
            medidoresData = data;
            renderItems(medidoresData, currentPageMedidores, itemsPerPage, '#medidores-content');
            renderPagination(medidoresData, itemsPerPage, '#pagination-medidores', currentPageMedidores);
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
        });

    // Bombas
    let currentPageBombas = 1;
    let bombasData = [];

    $.getJSON('../js/bombas_data.json')
        .done(function(data) {
            bombasData = data;
            renderItems(bombasData, currentPageBombas, itemsPerPage, '#bombas-content');
            renderPagination(bombasData, itemsPerPage, '#pagination-bombas', currentPageBombas);
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
        });

    // Filtros
    let currentPageFiltros = 1;
    let filtrosData = [];

    $.getJSON('../js/filtros_data.json')
        .done(function(data) {
            filtrosData = data;
            renderItems(filtrosData, currentPageFiltros, itemsPerPage, '#filtros-content');
            renderPagination(filtrosData, itemsPerPage, '#pagination-filtros', currentPageFiltros);
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
        });

    // Abrazaderas
    let currentPageAbrazaderas = 1;
    let abrazaderasData = [];

    $.getJSON('../js/abrazadera_data.json')
        .done(function(data) {
            abrazaderasData = data;
            renderItems(abrazaderasData, currentPageAbrazaderas, itemsPerPage, '#abrazaderas-content');
            renderPagination(abrazaderasData, itemsPerPage, '#pagination-abrazaderas', currentPageAbrazaderas);
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
        });
    
    // LEEFO
    let currentPageLeefo = 1;
    let leefoData = [];

    $.getJSON('../js/leefo_data.json')
        .done(function(data) {
            leefoData = data;
            renderItems(leefoData, currentPageLeefo, itemsPerPage, '#leefo-content');
            renderPagination(leefoData, itemsPerPage, '#pagination-leefo', currentPageLeefo);
        })
        .fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ', ' + error;
        });

    function renderItems(data, page, itemsPerPage, containerSelector) {
        let content = '';
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = Object.keys(data).slice(start, end);
        let itemsPerRow = getItemsPerRow();

        content += `<div class="row">`;
        
        $.each(paginatedItems, function(index, key) {
            let item = data[key];
            let imgPath = containerSelector.includes('valvulas') ? 'valvulas' 
                         : containerSelector.includes('medidores') ? 'medidores' 
                         : containerSelector.includes('bombas') ? 'bombas' 
                         : containerSelector.includes('filtros') ? 'filtros'
                         : containerSelector.includes('leefo') ? 'leefo'
                         : 'abrazaderas';

            content += `
                <div class="col-md-${12/itemsPerRow} mb-4">
                    <div class="item">
                        <div class="zoom-img"><img width="300" src="/images/${imgPath}/${key}.png" alt="${item.title}" class="img-fluid"></div>
                        <h4 style="color: var(--secondary);">${item.title}</h4>
                        <p>${containerSelector.includes('valvulas') || containerSelector.includes('abrazaderas') ? item.figcaption : ''}</p>
                    </div>
                </div>`;
            if ((index + 1) % itemsPerRow === 0 && index < paginatedItems.length - 1) {
                content += `</div><div class="row">`;
            }
        });

        content += `</div>`;
        $(containerSelector).html(content);
    }

    function renderPagination(data, itemsPerPage, paginationSelector, currentPage) {
        let pageCount = Math.ceil(Object.keys(data).length / itemsPerPage);
        let paginationContent = '';

        for (let i = 1; i <= pageCount; i++) {
            paginationContent += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        $(paginationSelector).html(paginationContent);
    }

    $('#pagination-valvulas, #pagination-medidores, #pagination-bombas, #pagination-filtros, #pagination-abrazaderas, #pagination-leefo').on('click', '.page-link', function(e) {
        e.preventDefault();
        let page = $(this).data('page');
        if ($(this).parents('#pagination-valvulas').length) {
            currentPageValvulas = page;
            renderItems(valvulasData, currentPageValvulas, itemsPerPage, '#valvulas-content');
            renderPagination(valvulasData, itemsPerPage, '#pagination-valvulas', currentPageValvulas);
        } else if ($(this).parents('#pagination-medidores').length) {
            currentPageMedidores = page;
            renderItems(medidoresData, currentPageMedidores, itemsPerPage, '#medidores-content');
            renderPagination(medidoresData, itemsPerPage, '#pagination-medidores', currentPageMedidores);
        } else if ($(this).parents('#pagination-bombas').length) {
            currentPageBombas = page;
            renderItems(bombasData, currentPageBombas, itemsPerPage, '#bombas-content');
            renderPagination(bombasData, itemsPerPage, '#pagination-bombas', currentPageBombas);
        } else if ($(this).parents('#pagination-filtros').length) {
            currentPageFiltros = page;
            renderItems(filtrosData, currentPageFiltros, itemsPerPage, '#filtros-content');
            renderPagination(filtrosData, itemsPerPage, '#pagination-filtros', currentPageFiltros);
        } else if ($(this).parents('#pagination-leefo').length) {
            currentPageLeefo = page;
            renderItems(leefoData, currentPageLeefo, itemsPerPage, '#leefo-content');
            renderPagination(leefoData, itemsPerPage, '#pagination-leefo', currentPageLeefo);
        } else {
            currentPageAbrazaderas = page;
            renderItems(abrazaderasData, currentPageAbrazaderas, itemsPerPage, '#abrazaderas-content');
            renderPagination(abrazaderasData, itemsPerPage, '#pagination-abrazaderas', currentPageAbrazaderas);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const simulateDate = new Date();
    const today = simulateDate;
    console.log("Fecha simulada:", today);

    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();
    console.log("Fecha (Formateada):", `${yyyy}-${mm}-${dd}`);

    // Seleccionar elementos usando el atributo data-type
    const logoElements = document.querySelectorAll('[data-type="logo"]');
    const themeElements = document.querySelectorAll('[data-type="theme"]');

    const holidays = [
        { month: 1, day: 6, name: 'DIADEREYES' },
        { month: 2, day: 14, name: 'SANVALENTIN' },
        { month: 9, day: 16, name: 'INDEPENDENCIA' },
        { month: 10, day: 31, name: 'HALLOWEEN' },
        { month: 11, day: 2, name: 'DIADEMUERTOS' },
        { month: 12, day: 25, name: 'NAVIDAD' }
    ];

    let logoName = '../images/ORARECOLTE_LOGO.png';
    let themeName = '../images/THEME.png';

    holidays.forEach(holiday => {
        if (mm === holiday.month) {
            logoName = `../images/ORARECOLTE_LOGO_${holiday.name}.png`;
            themeName = `../images/${holiday.name}.png`;
        }
    });

    // Aplicar los cambios a todos los elementos seleccionados
    logoElements.forEach(logoElement => {
        logoElement.src = logoName;
    });

    themeElements.forEach(themeElement => {
        themeElement.src = themeName;
    });
});