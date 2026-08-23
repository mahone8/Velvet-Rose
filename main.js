document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header ---------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.querySelector('.mobile-drawer');
  var backdrop = document.querySelector('.drawer-backdrop');
  function closeDrawer () {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    drawer.classList.toggle('open');
    backdrop.classList.toggle('open');
  });
  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Room tabs ---------- */
  var roomTabs = document.querySelectorAll('.room-tab');
  var roomPanels = document.querySelectorAll('.room-panel');
  roomTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      roomTabs.forEach(function (t) { t.classList.remove('active'); });
      roomPanels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  /* ---------- Gallery filter ---------- */
  var filters = document.querySelectorAll('.gal-filter');
  var items = document.querySelectorAll('.g-item');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.remove('active'); });
      f.classList.add('active');
      var cat = f.dataset.filter;
      items.forEach(function (it) {
        var show = cat === 'all' || it.dataset.cat === cat;
        it.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var galleryImgs = Array.prototype.slice.call(document.querySelectorAll('.g-item img'));
  var current = 0;

  function openLightbox (index) {
    current = index;
    lbImg.src = galleryImgs[current].src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox () {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function step (dir) {
    current = (current + dir + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[current].src;
  }

  galleryImgs.forEach(function (img, i) {
    img.addEventListener('click', function () { openLightbox(i); });
  });
  lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var phone = document.getElementById('f-phone').value.trim();
      var roomType = document.getElementById('f-room').value;
      var message = document.getElementById('f-message').value.trim();

      var text = 'Assalam-o-Alaikum, I would like to enquire about The Velvet Rose Girls Hostel.%0A' +
                  'Name: ' + name + '%0A' +
                  'Phone: ' + phone + '%0A' +
                  'Room Preference: ' + roomType + '%0A' +
                  'Message: ' + message;

      window.open('https://wa.me/923005517412?text=' + text, '_blank');
      form.reset();
    });
  }

});
