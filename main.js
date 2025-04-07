

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('compact');
        } else {
            header.classList.remove('compact');
        }
        
        lastScroll = currentScroll;
    });
});

(function () {
    "use strict";


    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }


    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    let selectTopbar = select('#topbar')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
                if (selectTopbar) {
                    selectTopbar.classList.add('topbar-scrolled')
                }
            } else {
                selectHeader.classList.remove('header-scrolled')
                if (selectTopbar) {
                    selectTopbar.classList.remove('topbar-scrolled')
                }
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)


    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });


    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    window.addEventListener('load', () => {
        let menuContainer = select('.menu-container');
        if (menuContainer) {
            let menuIsotope = new Isotope(menuContainer, {
                itemSelector: '.menu-item',
                layoutMode: 'fitRows'
            });

            let menuFilters = select('#menu-flters li', true);

            on('click', '#menu-flters li', function (e) {
                e.preventDefault();
                menuFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                menuIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                menuIsotope.on('arrangeComplete', function () {
                    AOS.refresh()
                });
            }, true);
        }

    });


    const glightbox = GLightbox({
        selector: '.glightbox'
    });


    new Swiper('.events-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });


    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });


    const galleryLightbox = GLightbox({
        selector: '.gallery-lightbox'
    });


    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

})()

// Add this to your script.js
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

let text = document.getElementById('text');
let right1 = document.getElementById('right1');
let left1 = document.getElementById('left1');
let right2 = document.getElementById('right2');
let left2 = document.getElementById('left2');

window.addEventListener('scroll', () => {
	let value = window.scrollY;
	
	text.style.marginTop = value * 1.0 + 'px';
	right1.style.left = value * -1.5 + 'px';
	left1.style.left = value * 1.5 + 'px';
	right2.style.left = value * 2.5 + 'px';
	left2.style.left = value * -2.5 + 'px';
});
    (function () { var on = addEventListener, off = removeEventListener, $ = function (q) { return document.querySelector(q) }, $$ = function (q) { return document.querySelectorAll(q) }, $body = document.body, $inner = $('.inner'), client = (function () { var o = { browser: 'other', browserVersion: 0, os: 'other', osVersion: 0, mobile: false, canUse: null, flags: { lsdUnits: false, }, }, ua = navigator.userAgent, a, i; a = [['firefox', /Firefox\/([0-9\.]+)/], ['edge', /Edge\/([0-9\.]+)/], ['safari', /Version\/([0-9\.]+).+Safari/], ['chrome', /Chrome\/([0-9\.]+)/], ['chrome', /CriOS\/([0-9\.]+)/], ['ie', /Trident\/.+rv:([0-9]+)/]]; for (i = 0; i < a.length; i++) { if (ua.match(a[i][1])) { o.browser = a[i][0]; o.browserVersion = parseFloat(RegExp.$1); break; } } a = [['ios', /([0-9_]+) like Mac OS X/, function (v) { return v.replace('_', '.').replace('_', ''); }], ['ios', /CPU like Mac OS X/, function (v) { return 0 }], ['ios', /iPad; CPU/, function (v) { return 0 }], ['android', /Android ([0-9\.]+)/, null], ['mac', /Macintosh.+Mac OS X ([0-9_]+)/, function (v) { return v.replace('_', '.').replace('_', ''); }], ['windows', /Windows NT ([0-9\.]+)/, null], ['undefined', /Undefined/, null]]; for (i = 0; i < a.length; i++) { if (ua.match(a[i][1])) { o.os = a[i][0]; o.osVersion = parseFloat(a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1); break; } } if (o.os == 'mac' && ('ontouchstart' in window) && ((screen.width == 1024 && screen.height == 1366) || (screen.width == 834 && screen.height == 1112) || (screen.width == 810 && screen.height == 1080) || (screen.width == 768 && screen.height == 1024))) o.os = 'ios'; o.mobile = (o.os == 'android' || o.os == 'ios'); var _canUse = document.createElement('div'); o.canUse = function (property, value) { var style; style = _canUse.style; if (!(property in style)) return false; if (typeof value !== 'undefined') { style[property] = value; if (style[property] == '') return false; } return true; }; o.flags.lsdUnits = o.canUse('width', '100dvw'); return o; }()), trigger = function (t) { dispatchEvent(new Event(t)); }, cssRules = function (selectorText) { var ss = document.styleSheets, a = [], f = function (s) { var r = s.cssRules, i; for (i = 0; i < r.length; i++) { if (r[i] instanceof CSSMediaRule && matchMedia(r[i].conditionText).matches) (f)(r[i]); else if (r[i] instanceof CSSStyleRule && r[i].selectorText == selectorText) a.push(r[i]); } }, x, i; for (i = 0; i < ss.length; i++)f(ss[i]); return a; }, thisHash = function () { var h = location.hash ? location.hash.substring(1) : null, a; if (!h) return null; if (h.match(/\?/)) { a = h.split('?'); h = a[0]; history.replaceState(undefined, undefined, '#' + h); window.location.search = a[1]; } if (h.length > 0 && !h.match(/^[a-zA-Z]/)) h = 'x' + h; if (typeof h == 'string') h = h.toLowerCase(); return h; }, scrollToElement = function (e, style, duration) { var y, cy, dy, start, easing, offset, f; if (!e) y = 0; else { offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize); switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') { case 'default': default: y = e.offsetTop + offset; break; case 'center': if (e.offsetHeight < window.innerHeight) y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset; else y = e.offsetTop - offset; break; case 'previous': if (e.previousElementSibling) y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset; else y = e.offsetTop + offset; break; } } if (!style) style = 'smooth'; if (!duration) duration = 750; if (style == 'instant') { window.scrollTo(0, y); return; } start = Date.now(); cy = window.scrollY; dy = y - cy; switch (style) { case 'linear': easing = function (t) { return t }; break; case 'smooth': easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }; break; }f = function () { var t = Date.now() - start; if (t >= duration) window.scroll(0, y); else { window.scroll(0, cy + (dy * easing(t / duration))); requestAnimationFrame(f); } }; f(); }, scrollToTop = function () { scrollToElement(null); }, loadElements = function (parent) { var a, e, x, i; a = parent.querySelectorAll('iframe[data-src]:not([data-src=""])'); for (i = 0; i < a.length; i++) { a[i].contentWindow.location.replace(a[i].dataset.src); a[i].dataset.initialSrc = a[i].dataset.src; a[i].dataset.src = ''; } a = parent.querySelectorAll('video[autoplay]'); for (i = 0; i < a.length; i++) { if (a[i].paused) a[i].play(); } e = parent.querySelector('[data-autofocus="1"]'); x = e ? e.tagName : null; switch (x) { case 'FORM': e = e.querySelector('.field input, .field select, .field textarea'); if (e) e.focus(); break; default: break; } }, unloadElements = function (parent) { var a, e, x, i; a = parent.querySelectorAll('iframe[data-src=""]'); for (i = 0; i < a.length; i++) { if (a[i].dataset.srcUnload === '0') continue; if ('initialSrc' in a[i].dataset) a[i].dataset.src = a[i].dataset.initialSrc; else a[i].dataset.src = a[i].src; a[i].contentWindow.location.replace('about:blank'); } a = parent.querySelectorAll('video'); for (i = 0; i < a.length; i++) { if (!a[i].paused) a[i].pause(); } e = $(':focus'); if (e) e.blur(); }; window._scrollToTop = scrollToTop; var thisUrl = function () { return window.location.href.replace(window.location.search, '').replace(/#$/, ''); }; var getVar = function (name) { var a = window.location.search.substring(1).split('&'), b, k; for (k in a) { b = a[k].split('='); if (b[0] == name) return b[1]; } return null; }; var errors = { handle: function (handler) { window.onerror = function (message, url, line, column, error) { (handler)(error.message); return true; }; }, unhandle: function () { window.onerror = null; } }; (function () { var initialSection, initialScrollPoint, initialId, header, footer, name, hideHeader, hideFooter, disableAutoScroll, h, e, ee, k, locked = false, scrollPointParent = function (target) { while (target) { if (target.parentElement && target.parentElement.tagName == 'SECTION') break; target = target.parentElement; } return target; }, scrollPointSpeed = function (scrollPoint) { let x = parseInt(scrollPoint.dataset.scrollSpeed); switch (x) { case 5: return 250; case 4: return 500; case 3: return 750; case 2: return 1000; case 1: return 1250; default: break; }return 750; }, doNextScrollPoint = function (event) { var e, target, id; e = scrollPointParent(event.target); if (!e) return; while (e && e.nextElementSibling) { e = e.nextElementSibling; if (e.dataset.scrollId) { target = e; id = e.dataset.scrollId; break; } } if (!target || !id) return; if (target.dataset.scrollInvisible == '1') scrollToElement(target, 'smooth', scrollPointSpeed(target)); else location.href = '#' + id; }, doPreviousScrollPoint = function (e) { var e, target, id; e = scrollPointParent(event.target); if (!e) return; while (e && e.previousElementSibling) { e = e.previousElementSibling; if (e.dataset.scrollId) { target = e; id = e.dataset.scrollId; break; } } if (!target || !id) return; if (target.dataset.scrollInvisible == '1') scrollToElement(target, 'smooth', scrollPointSpeed(target)); else location.href = '#' + id; }, doFirstScrollPoint = function (e) { var e, target, id; e = scrollPointParent(event.target); if (!e) return; while (e && e.previousElementSibling) { e = e.previousElementSibling; if (e.dataset.scrollId) { target = e; id = e.dataset.scrollId; } } if (!target || !id) return; if (target.dataset.scrollInvisible == '1') scrollToElement(target, 'smooth', scrollPointSpeed(target)); else location.href = '#' + id; }, doLastScrollPoint = function (e) { var e, target, id; e = scrollPointParent(event.target); if (!e) return; while (e && e.nextElementSibling) { e = e.nextElementSibling; if (e.dataset.scrollId) { target = e; id = e.dataset.scrollId; } } if (!target || !id) return; if (target.dataset.scrollInvisible == '1') scrollToElement(target, 'smooth', scrollPointSpeed(target)); else location.href = '#' + id; }, doNextSection = function () { var section; section = $('#main > .inner > section.active').nextElementSibling; if (!section || section.tagName != 'SECTION') return; location.href = '#' + section.id.replace(/-section$/, ''); }, doPreviousSection = function () { var section; section = $('#main > .inner > section.active').previousElementSibling; if (!section || section.tagName != 'SECTION') return; location.href = '#' + (section.matches(':first-child') ? '' : section.id.replace(/-section$/, '')); }, doFirstSection = function () { var section; section = $('#main > .inner > section:first-of-type'); if (!section || section.tagName != 'SECTION') return; location.href = '#' + section.id.replace(/-section$/, ''); }, doLastSection = function () { var section; section = $('#main > .inner > section:last-of-type'); if (!section || section.tagName != 'SECTION') return; location.href = '#' + section.id.replace(/-section$/, ''); }, resetSectionChangeElements = function (section) { var ee, e, x; ee = section.querySelectorAll('[data-reset-on-section-change="1"]'); for (e of ee) { x = e ? e.tagName : null; switch (x) { case 'FORM': e.reset(); break; default: break; } } }, activateSection = function (section, scrollPoint) { var sectionHeight, currentSection, currentSectionHeight, name, hideHeader, hideFooter, disableAutoScroll, ee, k; if (!section.classList.contains('inactive')) { name = (section ? section.id.replace(/-section$/, '') : null); disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false; if (scrollPoint) scrollToElement(scrollPoint, 'smooth', scrollPointSpeed(scrollPoint)); else if (!disableAutoScroll) scrollToElement(null); return false; } else { locked = true; if (location.hash == '#back') history.replaceState(null, null, '#'); name = (section ? section.id.replace(/-section$/, '') : null); hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false; hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false; disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false; if (header && hideHeader) { header.classList.add('hidden'); header.style.display = 'none'; } if (footer && hideFooter) { footer.classList.add('hidden'); footer.style.display = 'none'; } currentSection = $('#main > .inner > section:not(.inactive)'); currentSection.classList.add('inactive'); currentSection.classList.remove('active'); currentSection.style.display = 'none'; unloadElements(currentSection); resetSectionChangeElements(currentSection); if (header && !hideHeader) { header.style.display = ''; header.classList.remove('hidden'); } if (footer && !hideFooter) { footer.style.display = ''; footer.classList.remove('hidden'); } section.classList.remove('inactive'); section.classList.add('active'); section.style.display = ''; trigger('resize'); loadElements(section); if (scrollPoint) scrollToElement(scrollPoint, 'instant'); else if (!disableAutoScroll) scrollToElement(null, 'instant'); locked = false; } }, sections = {}; window._nextScrollPoint = doNextScrollPoint; window._previousScrollPoint = doPreviousScrollPoint; window._firstScrollPoint = doFirstScrollPoint; window._lastScrollPoint = doLastScrollPoint; window._nextSection = doNextSection; window._previousSection = doPreviousSection; window._firstSection = doFirstSection; window._lastSection = doLastSection; window._scrollToTop = function () { var section, id; scrollToElement(null); if (!!(section = $('section.active'))) { id = section.id.replace(/-section$/, ''); if (id == 'back') id = ''; history.pushState(null, null, '#' + id); } }; if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; header = $('#header'); footer = $('#footer'); h = thisHash(); if (h && !h.match(/^[a-zA-Z0-9\-]+$/)) h = null; if (e = $('[data-scroll-id="' + h + '"]')) { initialScrollPoint = e; initialSection = initialScrollPoint.parentElement; initialId = initialSection.id; } else if (e = $('#' + (h ? h : 'back') + '-section')) { initialScrollPoint = null; initialSection = e; initialId = initialSection.id; } if (!initialSection) { initialScrollPoint = null; initialSection = $('#' + 'back' + '-section'); initialId = initialSection.id; history.replaceState(undefined, undefined, '#'); } name = (h ? h : 'back'); hideHeader = name ? ((name in sections) && ('hideHeader' in sections[name]) && sections[name].hideHeader) : false; hideFooter = name ? ((name in sections) && ('hideFooter' in sections[name]) && sections[name].hideFooter) : false; disableAutoScroll = name ? ((name in sections) && ('disableAutoScroll' in sections[name]) && sections[name].disableAutoScroll) : false; if (header && hideHeader) { header.classList.add('hidden'); header.style.display = 'none'; } if (footer && hideFooter) { footer.classList.add('hidden'); footer.style.display = 'none'; } ee = $$('#main > .inner > section:not([id="' + initialId + '"])'); for (k = 0; k < ee.length; k++) { ee[k].className = 'inactive'; ee[k].style.display = 'none'; } initialSection.classList.add('active'); loadElements(initialSection); if (header) loadElements(header); if (footer) loadElements(footer); if (!disableAutoScroll) scrollToElement(null, 'instant'); on('load', function () { if (initialScrollPoint) scrollToElement(initialScrollPoint, 'instant'); }); on('hashchange', function (event) { var section, scrollPoint, h, e; if (locked) return false; h = thisHash(); if (h && !h.match(/^[a-zA-Z0-9\-]+$/)) return false; if (e = $('[data-scroll-id="' + h + '"]')) { scrollPoint = e; section = scrollPoint.parentElement; } else if (e = $('#' + (h ? h : 'back') + '-section')) { scrollPoint = null; section = e; } else { scrollPoint = null; section = $('#' + 'back' + '-section'); history.replaceState(undefined, undefined, '#'); } if (!section) return false; activateSection(section, scrollPoint); return false; }); on('click', function (event) { var t = event.target, tagName = t.tagName.toUpperCase(), scrollPoint, section; switch (tagName) { case 'IMG': case 'SVG': case 'USE': case 'U': case 'STRONG': case 'EM': case 'CODE': case 'S': case 'MARK': case 'SPAN': while (!!(t = t.parentElement)) if (t.tagName == 'A') break; if (!t) return; break; default: break; }if (t.tagName == 'A' && t.getAttribute('href') !== null && t.getAttribute('href').substr(0, 1) == '#') { if (!!(scrollPoint = $('[data-scroll-id="' + t.hash.substr(1) + '"][data-scroll-invisible="1"]'))) { event.preventDefault(); section = scrollPoint.parentElement; if (section.classList.contains('inactive')) { history.pushState(null, null, '#' + section.id.replace(/-section$/, '')); activateSection(section, scrollPoint); } else { scrollToElement(scrollPoint, 'smooth', scrollPointSpeed(scrollPoint)); } } else if (t.hash == window.location.hash) { event.preventDefault(); history.replaceState(undefined, undefined, '#'); location.replace(t.hash); } } }); })(); var style, sheet, rule; style = document.createElement('style'); style.appendChild(document.createTextNode('')); document.head.appendChild(style); sheet = style.sheet; if (client.mobile) { (function () { if (client.flags.lsdUnits) { document.documentElement.style.setProperty('--viewport-height', '100svh'); document.documentElement.style.setProperty('--background-height', '100lvh'); } else { var f = function () { document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px'); document.documentElement.style.setProperty('--background-height', (window.innerHeight + 250) + 'px'); }; on('load', f); on('orientationchange', function () { setTimeout(function () { (f)(); }, 100); }); } })(); } if (client.os == 'android') { (function () { sheet.insertRule('body::after { }', 0); rule = sheet.cssRules[0]; var f = function () { rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px'; }; on('load', f); on('orientationchange', f); on('touchmove', f); })(); $body.classList.add('is-touch'); } else if (client.os == 'ios') { if (client.osVersion <= 11) (function () { sheet.insertRule('body::after { }', 0); rule = sheet.cssRules[0]; rule.style.cssText = '-webkit-transform: scale(1.0)'; })(); if (client.osVersion <= 11) (function () { sheet.insertRule('body.ios-focus-fix::before { }', 0); rule = sheet.cssRules[0]; rule.style.cssText = 'height: calc(100% + 60px)'; on('focus', function (event) { $body.classList.add('ios-focus-fix'); }, true); on('blur', function (event) { $body.classList.remove('ios-focus-fix'); }, true); })(); $body.classList.add('is-touch'); } var scrollEvents = { items: [], add: function (o) { this.items.push({ element: o.element, triggerElement: (('triggerElement' in o && o.triggerElement) ? o.triggerElement : o.element), enter: ('enter' in o ? o.enter : null), leave: ('leave' in o ? o.leave : null), mode: ('mode' in o ? o.mode : 4), threshold: ('threshold' in o ? o.threshold : 0.25), offset: ('offset' in o ? o.offset : 0), initialState: ('initialState' in o ? o.initialState : null), state: false, }); }, handler: function () { var height, top, bottom, scrollPad; if (client.os == 'ios') { height = document.documentElement.clientHeight; top = document.body.scrollTop + window.scrollY; bottom = top + height; scrollPad = 125; } else { height = document.documentElement.clientHeight; top = document.documentElement.scrollTop; bottom = top + height; scrollPad = 0; } scrollEvents.items.forEach(function (item) { var elementTop, elementBottom, viewportTop, viewportBottom, bcr, pad, state, a, b; if (!item.enter && !item.leave) return true; if (!item.triggerElement) return true; if (item.triggerElement.offsetParent === null) { if (item.state == true && item.leave) { item.state = false; (item.leave).apply(item.element); if (!item.enter) item.leave = null; } return true; } bcr = item.triggerElement.getBoundingClientRect(); elementTop = top + Math.floor(bcr.top); elementBottom = elementTop + bcr.height; if (item.initialState !== null) { state = item.initialState; item.initialState = null; } else { switch (item.mode) { case 1: default: state = (bottom > (elementTop - item.offset) && top < (elementBottom + item.offset)); break; case 2: a = (top + (height * 0.5)); state = (a > (elementTop - item.offset) && a < (elementBottom + item.offset)); break; case 3: a = top + (height * (item.threshold)); if (a - (height * 0.375) <= 0) a = 0; b = top + (height * (1 - item.threshold)); if (b + (height * 0.375) >= document.body.scrollHeight - scrollPad) b = document.body.scrollHeight + scrollPad; state = (b > (elementTop - item.offset) && a < (elementBottom + item.offset)); break; case 4: pad = height * item.threshold; viewportTop = (top + pad); viewportBottom = (bottom - pad); if (Math.floor(top) <= pad) viewportTop = top; if (Math.ceil(bottom) >= (document.body.scrollHeight - pad)) viewportBottom = bottom; if ((viewportBottom - viewportTop) >= (elementBottom - elementTop)) { state = ((elementTop >= viewportTop && elementBottom <= viewportBottom) || (elementTop >= viewportTop && elementTop <= viewportBottom) || (elementBottom >= viewportTop && elementBottom <= viewportBottom)); } else state = ((viewportTop >= elementTop && viewportBottom <= elementBottom) || (elementTop >= viewportTop && elementTop <= viewportBottom) || (elementBottom >= viewportTop && elementBottom <= viewportBottom)); break; } } if (state != item.state) { item.state = state; if (item.state) { if (item.enter) { (item.enter).apply(item.element); if (!item.leave) item.enter = null; } } else { if (item.leave) { (item.leave).apply(item.element); if (!item.enter) item.leave = null; } } } }); }, init: function () { on('load', this.handler); on('resize', this.handler); on('scroll', this.handler); (this.handler)(); } }; scrollEvents.init(); (function () { var items = $$('.deferred'), loadHandler, enterHandler; loadHandler = function () { var i = this, p = this.parentElement; if (i.dataset.src !== 'done') return; if (Date.now() - i._startLoad < 375) { p.classList.remove('loading'); p.style.backgroundImage = 'none'; i.style.transition = ''; i.style.opacity = 1; } else { p.classList.remove('loading'); i.style.opacity = 1; setTimeout(function () { i.style.backgroundImage = 'none'; i.style.transition = ''; }, 375); } }; enterHandler = function () { var i = this, p = this.parentElement, src; src = i.dataset.src; i.dataset.src = 'done'; p.classList.add('loading'); i._startLoad = Date.now(); i.src = src; }; items.forEach(function (p) { var i = p.firstElementChild; if (!p.classList.contains('enclosed')) { p.style.backgroundImage = 'url(' + i.src + ')'; p.style.backgroundSize = '100% 100%'; p.style.backgroundPosition = 'top left'; p.style.backgroundRepeat = 'no-repeat'; } i.style.opacity = 0; i.style.transition = 'opacity 0.375s ease-in-out'; i.addEventListener('load', loadHandler); scrollEvents.add({ element: i, enter: enterHandler, offset: 250, }); }); })(); var onvisible = { effects: { 'blur-in': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'filter ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.opacity = 0; this.style.filter = 'blur(' + (0.25 * intensity) + 'rem)'; }, play: function () { this.style.opacity = 1; this.style.filter = 'none'; }, }, 'zoom-in': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transform = 'scale(' + (1 - ((alt ? 0.25 : 0.05) * intensity)) + ')'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'zoom-out': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transform = 'scale(' + (1 + ((alt ? 0.25 : 0.05) * intensity)) + ')'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'slide-left': { transition: function (speed, delay) { return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function () { this.style.transform = 'translateX(100vw)'; }, play: function () { this.style.transform = 'none'; }, }, 'slide-right': { transition: function (speed, delay) { return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function () { this.style.transform = 'translateX(-100vw)'; }, play: function () { this.style.transform = 'none'; }, }, 'flip-forward': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transformOrigin = '50% 50%'; this.style.transform = 'perspective(1000px) rotateX(' + ((alt ? 45 : 15) * intensity) + 'deg)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'flip-backward': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transformOrigin = '50% 50%'; this.style.transform = 'perspective(1000px) rotateX(' + ((alt ? -45 : -15) * intensity) + 'deg)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'flip-left': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transformOrigin = '50% 50%'; this.style.transform = 'perspective(1000px) rotateY(' + ((alt ? 45 : 15) * intensity) + 'deg)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'flip-right': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transformOrigin = '50% 50%'; this.style.transform = 'perspective(1000px) rotateY(' + ((alt ? -45 : -15) * intensity) + 'deg)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'tilt-left': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transform = 'rotate(' + ((alt ? 45 : 5) * intensity) + 'deg)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'tilt-right': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity, alt) { this.style.opacity = 0; this.style.transform = 'rotate(' + ((alt ? -45 : -5) * intensity) + 'deg)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'fade-right': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.opacity = 0; this.style.transform = 'translateX(' + (-1.5 * intensity) + 'rem)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'fade-left': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.opacity = 0; this.style.transform = 'translateX(' + (1.5 * intensity) + 'rem)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'fade-down': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.opacity = 0; this.style.transform = 'translateY(' + (-1.5 * intensity) + 'rem)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'fade-up': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.opacity = 0; this.style.transform = 'translateY(' + (1.5 * intensity) + 'rem)'; }, play: function () { this.style.opacity = 1; this.style.transform = 'none'; }, }, 'fade-in': { transition: function (speed, delay) { return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function () { this.style.opacity = 0; }, play: function () { this.style.opacity = 1; }, }, 'fade-in-background': { custom: true, transition: function (speed, delay) { this.style.setProperty('--onvisible-speed', speed + 's'); if (delay) this.style.setProperty('--onvisible-delay', delay + 's'); }, rewind: function () { this.style.removeProperty('--onvisible-background-color'); }, play: function () { this.style.setProperty('--onvisible-background-color', 'rgba(0,0,0,0.001)'); }, }, 'zoom-in-image': { target: 'img', transition: function (speed, delay) { return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function () { this.style.transform = 'scale(1)'; }, play: function (intensity) { this.style.transform = 'scale(' + (1 + (0.1 * intensity)) + ')'; }, }, 'zoom-out-image': { target: 'img', transition: function (speed, delay) { return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.transform = 'scale(' + (1 + (0.1 * intensity)) + ')'; }, play: function () { this.style.transform = 'none'; }, }, 'focus-image': { target: 'img', transition: function (speed, delay) { return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'filter ' + speed + 's ease' + (delay ? ' ' + delay + 's' : ''); }, rewind: function (intensity) { this.style.transform = 'scale(' + (1 + (0.05 * intensity)) + ')'; this.style.filter = 'blur(' + (0.25 * intensity) + 'rem)'; }, play: function (intensity) { this.style.transform = 'none'; this.style.filter = 'none'; }, }, }, regex: new RegExp('([a-zA-Z0-9\.\,\-\_\"\'\?\!\:\;\#\@\#$\%\&\(\)\{\}]+)', 'g'), add: function (selector, settings) { var _this = this, style = settings.style in this.effects ? settings.style : 'fade', speed = parseInt('speed' in settings ? settings.speed : 1000) / 1000, intensity = ((parseInt('intensity' in settings ? settings.intensity : 5) / 10) * 1.75) + 0.25, delay = parseInt('delay' in settings ? settings.delay : 0) / 1000, replay = 'replay' in settings ? settings.replay : false, stagger = 'stagger' in settings ? (parseInt(settings.stagger) >= 0 ? (parseInt(settings.stagger) / 1000) : false) : false, staggerOrder = 'staggerOrder' in settings ? settings.staggerOrder : 'default', staggerSelector = 'staggerSelector' in settings ? settings.staggerSelector : null, threshold = parseInt('threshold' in settings ? settings.threshold : 3), state = 'state' in settings ? settings.state : null, effect = this.effects[style], scrollEventThreshold; if ('CARRD_DISABLE_ANIMATION' in window) { if (style == 'fade-in-background') $$(selector).forEach(function (e) { e.style.setProperty('--onvisible-background-color', 'rgba(0,0,0,0.001)'); }); return; } switch (threshold) { case 1: scrollEventThreshold = 0; break; case 2: scrollEventThreshold = 0.125; break; default: case 3: scrollEventThreshold = 0.25; break; case 4: scrollEventThreshold = 0.375; break; case 5: scrollEventThreshold = 0.475; break; }$$(selector).forEach(function (e) { var children, enter, leave, targetElement, triggerElement; if (stagger !== false && staggerSelector == ':scope > *') _this.expandTextNodes(e); children = (stagger !== false && staggerSelector) ? e.querySelectorAll(staggerSelector) : null; enter = function (staggerDelay = 0) { var _this = this, transitionOrig; if (effect.target) _this = this.querySelector(effect.target); if (!effect.custom) { transitionOrig = _this.style.transition; _this.style.setProperty('backface-visibility', 'hidden'); _this.style.transition = effect.transition(speed, delay + staggerDelay); } else effect.transition.apply(_this, [speed, delay + staggerDelay]); effect.play.apply(_this, [intensity, !!children]); if (!effect.custom) setTimeout(function () { _this.style.removeProperty('backface-visibility'); _this.style.transition = transitionOrig; }, (speed + delay + staggerDelay) * 1000 * 2); }; leave = function () { var _this = this, transitionOrig; if (effect.target) _this = this.querySelector(effect.target); if (!effect.custom) { transitionOrig = _this.style.transition; _this.style.setProperty('backface-visibility', 'hidden'); _this.style.transition = effect.transition(speed); } else effect.transition.apply(_this, [speed]); effect.rewind.apply(_this, [intensity, !!children]); if (!effect.custom) setTimeout(function () { _this.style.removeProperty('backface-visibility'); _this.style.transition = transitionOrig; }, speed * 1000 * 2); }; if (effect.target) targetElement = e.querySelector(effect.target); else targetElement = e; if (children) children.forEach(function (targetElement) { effect.rewind.apply(targetElement, [intensity, true]); }); else effect.rewind.apply(targetElement, [intensity]); triggerElement = e; if (e.parentNode) { if (e.parentNode.dataset.onvisibleTrigger) triggerElement = e.parentNode; else if (e.parentNode.parentNode) { if (e.parentNode.parentNode.dataset.onvisibleTrigger) triggerElement = e.parentNode.parentNode; } } scrollEvents.add({ element: e, triggerElement: triggerElement, initialState: state, threshold: scrollEventThreshold, enter: children ? function () { var staggerDelay = 0, childHandler = function (e) { enter.apply(e, [staggerDelay]); staggerDelay += stagger; }, a; if (staggerOrder == 'default') { children.forEach(childHandler); } else { a = Array.from(children); switch (staggerOrder) { case 'reverse': a.reverse(); break; case 'random': a.sort(function () { return Math.random() - 0.5; }); break; }a.forEach(childHandler); } } : enter, leave: (replay ? (children ? function () { children.forEach(function (e) { leave.apply(e); }); } : leave) : null), }); }); }, expandTextNodes: function (e) { var s, i, w, x; for (i = 0; i < e.childNodes.length; i++) { x = e.childNodes[i]; if (x.nodeType != Node.TEXT_NODE) continue; s = x.nodeValue; s = s.replace(this.regex, function (x, a) { return '<text-node>' + a + '</text-node>'; }); w = document.createElement('text-node'); w.innerHTML = s; x.replaceWith(w); while (w.childNodes.length > 0) { w.parentNode.insertBefore(w.childNodes[0], w); } w.parentNode.removeChild(w); } }, }; onvisible.add('#image01', { style: 'fade-in', speed: 250, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#container01', { style: 'flip-forward', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#buttons01', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#buttons06', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#buttons07', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#buttons05', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#image06', { style: 'fade-down', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#image05', { style: 'focus-image', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#text09', { style: 'slide-right', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#buttons02', { style: 'zoom-out', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#container02', { style: 'flip-forward', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#image03', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#image02', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#image04', { style: 'fade-down', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#buttons04', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); onvisible.add('#image07', { style: 'fade-up', speed: 1000, intensity: 5, threshold: 3, delay: 0, replay: false }); })();