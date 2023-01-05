/**
 * Pico's Default Theme - JavaScript helper
 *
 * Pico is a stupidly simple, blazing fast, flat file CMS.
 *
 * @author  Daniel Rudolf
 * @link    https://picocms.org
 * @license https://opensource.org/licenses/MIT The MIT License
 * @version 3.0
 */

function main()
{
    // capability CSS classes
    document.documentElement.className = 'js';

    // wrap tables
    var tables = document.querySelectorAll('#main > .container > table');
    for (var i = 0; i < tables.length; i++) {
        if (!/\btable-responsive\b/.test(tables[i].parentElement.className)) {
            var tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-responsive';

            tables[i].parentElement.insertBefore(tableWrapper, tables[i]);
            tableWrapper.appendChild(tables[i]);
        }
    }

    // responsive menu
    var menu = document.getElementById('nav'),
        menuToggle = document.getElementById('nav-toggle');

    if (menu && menuToggle) {
        function toggleMenuEvent(event) {
            if (event.type === 'keydown') {
                if ((event.keyCode !== 13) && (event.keyCode !== 32)) {
                    return;
                }
            }

            event.preventDefault();

            if (menuToggle.getAttribute('aria-expanded') === 'false') {
                menuToggle.setAttribute('aria-expanded', 'true');
                utils.slideDown(menu, null, function () {
                    if (event.type === 'keydown') {
                        menu.focus();
                    }
                });
            } else {
                menuToggle.setAttribute('aria-expanded', 'false');
                utils.slideUp(menu);
            }
        }

        function onResizeEvent() {
            if (utils.isElementVisible(menuToggle)) {
                menu.className = 'hidden';
                menuToggle.addEventListener('click', toggleMenuEvent);
                menuToggle.addEventListener('keydown', toggleMenuEvent);
            } else {
                menu.className = '';
                menu.removeAttribute('data-slide-id');
                menuToggle.removeEventListener('click', toggleMenuEvent);
                menuToggle.removeEventListener('keydown', toggleMenuEvent);
            }
        }

        window.addEventListener('resize', onResizeEvent);
        onResizeEvent();
    }
}

main();
