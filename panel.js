const result = document.querySelector(".result");
const accordion = document.querySelector(".accordion");
result.innerHTML = "";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  // Check if the URL includes "fls.doubleclick"

  if (
    request.request.url.includes("fls.doubleclick") &&
    request.response.status == 200
  ) {
    const requestURL = request.request.url;
    const src = requestURL.split(";")[1];
    const type = requestURL.split(";")[2];
    const cat = requestURL.split(";")[3];
    let identifier = uid();
    accordion.innerHTML += `<div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${identifier}"
            aria-expanded="true"
            aria-controls="collapse-${identifier}"
          >
            [Floodlight]
            <span class="badge text-bg-primary me-2">${src}</span>
            <span class="badge text-bg-success me-2">${type}</span>
            <span class="badge text-bg-info">${cat}</span>
          </button>
        </h2>
        <div
          id="collapse-${identifier}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is
            shown by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </div>
        </div>
      </div>`;
  }
});
