const result = document.querySelector(".result");
const accordionFloodlight = document.querySelector("#accordion-floodlight");
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
    const floodlight = {
      src: requestURL.split(";")[1],
      type: requestURL.split(";")[2],
      cat: requestURL.split(";")[3],
    };
    let identifier = uid();
    const requestURAccordion = fullRequestURL(requestURL);
    accordionFloodlight.innerHTML += `<div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${identifier}"
            aria-expanded="true"
            aria-controls="collapse-${identifier}"
          >
            <span class="text-bold">Floodlight</span>
            <span class="badge text-bg-primary mx-2">${floodlight.src}</span>
            <span class="badge text-bg-success me-2">${floodlight.type}</span>
            <span class="badge text-bg-info">${floodlight.cat}</span>
          </button>
        </h2>
        <div
          id="collapse-${identifier}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordion-floodlight"
        >
          <div class="accordion-body">
            ${requestURAccordion}
          </div>
        </div>
      </div>`;
  }
});

function fullRequestURL(requestURL) {
  return `<div class="accordion" id="accordion-full-request-url">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Full Request URL
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordion-full-request-url">
      <div class="accordion-body text-break">
        ${requestURL}
      </div>
    </div>
  </div>
</div>`;
}
