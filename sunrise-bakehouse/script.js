(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);

  /* ---------- Announcement ---------- */
  const announcement = $("#announcement");
  const announcementClose = $("#announcement-close");

  try {
    if (sessionStorage.getItem("sunrise-announcement") === "dismissed") {
      announcement.hidden = true;
    }
  } catch (error) {
    // Storage may be unavailable in private browsing; the banner still works.
  }

  announcementClose?.addEventListener("click", () => {
    announcement.hidden = true;
    try {
      sessionStorage.setItem("sunrise-announcement", "dismissed");
    } catch (error) {
      // No-op.
    }
  });

  /* ---------- Mobile menu ---------- */
  const menuToggle = $("#menu-toggle");
  const mobileMenu = $("#mobile-menu");
  let menuOpen = false;

  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openMenu() {
    mobileMenu.hidden = false;
    menuOpen = true;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("menu-open");

    const firstLink = mobileMenu.querySelector(focusableSelector);
    firstLink?.focus();
  }

  function closeMenu(returnFocus = true) {
    if (!menuOpen) return;

    mobileMenu.hidden = true;
    menuOpen = false;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");

    if (returnFocus) menuToggle.focus();
  }

  menuToggle?.addEventListener("click", () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (!menuOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = [menuToggle, ...mobileMenu.querySelectorAll(focusableSelector)].filter(
      (element) => !element.hidden && element.offsetParent !== null
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menuOpen) return;
    if (mobileMenu.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && menuOpen) closeMenu(false);
  });

  /* ---------- Order links → store finder ---------- */
  const postalInput = $("#postal");
  const finderIntent = $("#finder-intent");

  function focusFinder() {
    window.setTimeout(() => {
      postalInput?.focus({ preventScroll: true });
    }, 420);
  }

  document.querySelectorAll("[data-focus-finder]").forEach((link) => {
    link.addEventListener("click", focusFinder);
  });

  document.querySelectorAll("[data-order-product]").forEach((link) => {
    link.addEventListener("click", () => {
      const product = link.dataset.orderProduct;
      if (product && finderIntent) {
        finderIntent.textContent = `Choose an outlet for your ${product}.`;
      }
      focusFinder();
    });
  });

  /* ---------- Store finder ---------- */
  const outlets = [
    {
      id: "bugis",
      name: "Bugis",
      address: "231 Victoria Street, #01-02",
      postal: "188021",
      lat: 1.3005,
      lng: 103.8555,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "tiong-bahru",
      name: "Tiong Bahru",
      address: "18 Kim Tian Road, #01-05",
      postal: "168732",
      lat: 1.286,
      lng: 103.828,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "novena",
      name: "Novena",
      address: "10 Sinaran Drive, #B1-24",
      postal: "307506",
      lat: 1.3205,
      lng: 103.8438,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "holland-village",
      name: "Holland Village",
      address: "44 Lorong Mambong, #01-01",
      postal: "277697",
      lat: 1.3115,
      lng: 103.796,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "tampines",
      name: "Tampines",
      address: "10 Tampines Central 1, #01-12",
      postal: "529536",
      lat: 1.3536,
      lng: 103.944,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "punggol",
      name: "Punggol",
      address: "83 Punggol Central, #01-08",
      postal: "828761",
      lat: 1.405,
      lng: 103.902,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "jurong-east",
      name: "Jurong East",
      address: "50 Jurong Gateway Road, #01-20",
      postal: "608549",
      lat: 1.333,
      lng: 103.743,
      hours: "7:00am–7:00pm daily"
    },
    {
      id: "bedok",
      name: "Bedok",
      address: "311 New Upper Changi Road, #01-15",
      postal: "467360",
      lat: 1.324,
      lng: 103.93,
      hours: "7:00am–7:00pm daily"
    }
  ];

  // Singapore postal sectors are approximate here, which is enough to sort
  // outlets by distance without asking for precise location data.
  const postalOverrides = {
    16: { lat: 1.286, lng: 103.828 },
    18: { lat: 1.3005, lng: 103.8555 },
    27: { lat: 1.3115, lng: 103.796 },
    30: { lat: 1.3205, lng: 103.8438 },
    46: { lat: 1.324, lng: 103.93 },
    52: { lat: 1.3536, lng: 103.944 },
    60: { lat: 1.333, lng: 103.743 },
    82: { lat: 1.405, lng: 103.902 }
  };

  const postalSectors = [
    { max: 8, lat: 1.284, lng: 103.851 },
    { max: 16, lat: 1.301, lng: 103.857 },
    { max: 24, lat: 1.287, lng: 103.827 },
    { max: 32, lat: 1.311, lng: 103.797 },
    { max: 40, lat: 1.319, lng: 103.843 },
    { max: 48, lat: 1.324, lng: 103.93 },
    { max: 56, lat: 1.353, lng: 103.945 },
    { max: 64, lat: 1.37, lng: 103.845 },
    { max: 72, lat: 1.349, lng: 103.749 },
    { max: 80, lat: 1.438, lng: 103.789 },
    { max: 82, lat: 1.398, lng: 103.907 }
  ];

  const storeForm = $("#store-form");
  const postalError = $("#postal-error");
  const resultsTitle = $("#results-title");
  const resultsStatus = $("#results-status");
  const outletResults = $("#outlet-results");
  const locateButton = $("#use-location");
  const locateLabel = locateButton?.querySelector("span");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function haversine(origin, destination) {
    const earthRadiusKm = 6371;
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const dLat = toRadians(destination.lat - origin.lat);
    const dLng = toRadians(destination.lng - origin.lng);
    const lat1 = toRadians(origin.lat);
    const lat2 = toRadians(destination.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function formatDistance(km) {
    if (km < 0.2) return "At this postcode";
    return `${km.toFixed(1)} km away`;
  }

  function singaporeHour() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Singapore",
      hour: "2-digit",
      hour12: false
    }).formatToParts(new Date());
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
    return hour === 24 ? 0 : hour;
  }

  function isOpenNow() {
    const hour = singaporeHour();
    return hour >= 7 && hour < 19;
  }

  function outletDirectionsUrl(outlet) {
    const query = `${outlet.name} outlet, ${outlet.address}, Singapore ${outlet.postal}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function renderOutlets(list, origin) {
    const open = isOpenNow();
    const statusLabel = open ? "Open now" : "Closed now";
    const statusClass = open ? "outlet-status outlet-status--open" : "outlet-status";

    outletResults.innerHTML = list
      .map((outlet) => {
        const distance = origin ? haversine(origin, outlet) : null;
        return `
          <article class="outlet-card">
            <div class="outlet-top">
              <h4 class="outlet-name">${escapeHtml(outlet.name)}</h4>
              <span class="${statusClass}">${statusLabel}</span>
            </div>
            <p class="outlet-address">${escapeHtml(outlet.address)}<br>Singapore ${escapeHtml(outlet.postal)}</p>
            <div class="outlet-meta">
              <span>
                <svg class="icon" aria-hidden="true"><use href="#icon-clock"></use></svg>
                ${escapeHtml(outlet.hours)}
              </span>
            </div>
            <div class="outlet-footer">
              <span class="distance${distance === null ? " distance--muted" : ""}">${
                distance === null ? "Islandwide pickup" : formatDistance(distance)
              }</span>
              <a class="outlet-link" href="${outletDirectionsUrl(outlet)}" target="_blank" rel="noopener noreferrer" aria-label="Get directions to the ${escapeHtml(outlet.name)} outlet">
                Directions
                <svg class="icon" aria-hidden="true"><use href="#icon-external"></use></svg>
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function nearestOutlets(origin) {
    return outlets
      .map((outlet) => ({ ...outlet, distance: haversine(origin, outlet) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }

  function clearPostalError() {
    postalError.hidden = true;
    postalError.textContent = "";
    postalInput.removeAttribute("aria-invalid");
  }

  function showPostalError(message) {
    postalError.textContent = message;
    postalError.hidden = false;
    postalInput.setAttribute("aria-invalid", "true");
    postalInput.focus();
  }

  function originFromPostal(postal) {
    const prefix = Number(postal.slice(0, 2));
    if (!Number.isFinite(prefix) || prefix < 1 || prefix > 82) return null;
    return (
      postalOverrides[prefix] ??
      postalSectors.find((sector) => prefix <= sector.max) ??
      null
    );
  }

  renderOutlets(outlets.slice(0, 3), null);

  postalInput?.addEventListener("input", () => {
    postalInput.value = postalInput.value.replace(/\D/g, "").slice(0, 6);
    clearPostalError();
  });

  storeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const postal = postalInput.value.trim();

    if (!/^\d{6}$/.test(postal)) {
      showPostalError("Enter a 6-digit Singapore postal code, for example 188021.");
      return;
    }

    const origin = originFromPostal(postal);
    if (!origin) {
      showPostalError("We couldn't match that postal code. Try another 6-digit code.");
      return;
    }

    clearPostalError();
    const nearest = nearestOutlets(origin);
    renderOutlets(nearest, origin);
    resultsTitle.textContent = `Closest to ${postal}`;
    resultsStatus.textContent = "3 outlets found · distances are approximate.";
  });

  locateButton?.addEventListener("click", () => {
    clearPostalError();

    if (!navigator.geolocation) {
      showPostalError("Location is not available in this browser. Enter a postal code instead.");
      return;
    }

    locateButton.disabled = true;
    if (locateLabel) locateLabel.textContent = "Locating…";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        locateButton.disabled = false;
        if (locateLabel) locateLabel.textContent = "Use my location";

        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const nearest = nearestOutlets(origin);
        renderOutlets(nearest, origin);
        postalInput.value = "";
        resultsTitle.textContent = "Closest to you";
        resultsStatus.textContent =
          nearest[0].distance > 50
            ? "You're outside Singapore, but these are our nearest outlets."
            : "3 outlets found · distances are approximate.";
      },
      () => {
        locateButton.disabled = false;
        if (locateLabel) locateLabel.textContent = "Use my location";
        showPostalError("We couldn't access your location. Enter a postal code instead.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  });

  /* ---------- Newsletter ---------- */
  const newsletterForm = $("#newsletter-form");
  const emailInput = $("#email");
  const consentInput = $("#consent");
  const emailError = $("#email-error");
  const consentError = $("#consent-error");
  const newsletterSuccess = $("#newsletter-success");

  function clearFieldError(input, errorElement) {
    errorElement.hidden = true;
    errorElement.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  function showFieldError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.hidden = false;
    input.setAttribute("aria-invalid", "true");
  }

  emailInput?.addEventListener("input", () => {
    clearFieldError(emailInput, emailError);
  });

  consentInput?.addEventListener("change", () => {
    clearFieldError(consentInput, consentError);
  });

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    clearFieldError(emailInput, emailError);
    clearFieldError(consentInput, consentError);

    if (!emailPattern.test(email)) {
      showFieldError(emailInput, emailError, "Enter a valid email address, for example you@example.com.");
      firstInvalid = emailInput;
    }

    if (!consentInput.checked) {
      showFieldError(consentInput, consentError, "Please agree to receive emails before joining the list.");
      firstInvalid = firstInvalid ?? consentInput;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Joining…";

    window.setTimeout(() => {
      newsletterForm.querySelector(".form-fields").hidden = true;
      newsletterSuccess.hidden = false;
      newsletterSuccess.focus();
    }, 500);
  });

  /* ---------- Footer ---------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
