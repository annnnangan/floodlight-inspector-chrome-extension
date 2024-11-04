const accordionFloodlight = document.querySelector("#accordion-floodlight");

function uid() {
  return Date.now().toString(36) + Math.random().toString(36);
}

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
      ord: requestURL.split(";")[4],
    };
    let identifier = uid();
    const requestURAccordion = fullRequestURL(requestURL);
    const eventDataAccordion = renderFloodlightInfo(floodlight, requestURL);
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
            ${eventDataAccordion}
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

function renderFloodlightInfo(floodlight, requestURL) {
  const customFloodlightVariable = renderCustomFloodlightVariable(requestURL);
  return ` <div class="accordion mb-4" id="accordion-floodlight-details">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Event Data
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordion-full-request-url"
                >
                  <div class="accordion-body">
                    <ul>
                      <li class="row">
                        <p class="col-6">Advertiser ID(src)</p>
                        <p class="col-6">${floodlight.src}</p>
                      </li>
                      <li class="row">
                        <p class="col-6">Activity Type String(cat)</p>
                        <p class="col-6">${floodlight.cat}</p>
                      </li>
                      <li class="row">
                        <p class="col-6">Group Tag String(type)</p>
                        <p class="col-6">${floodlight.type}</p>
                      </li>
                      <li class="row">
                        <p class="col-6">Counting Method</p>
                        <p class="col-6">${floodlight.ord}</p>
                      </li>
                      ${customFloodlightVariable}
                    </ul>
                  </div>
                </div>
              </div>
            </div>`;
}

function renderCustomFloodlightVariable(requestURL) {
  let customFloodlightVariable = [];
  let cfvLayout = "";
  requestURL.split(";").filter((item) => {
    item.match(/u[0-9]{1,}=.*/g) && customFloodlightVariable.push(item);
  });

  for (let variable of customFloodlightVariable) {
    cfvLayout += `<li class="row">
      <p class="col-6">${variable.split("=")[0]}</p>
      <p class="col-6">${decodeURIComponent(variable.split("=")[1])}</p>
    </li>`;
  }

  return cfvLayout;
}
