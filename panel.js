const floodlightContainer = document.querySelector(".floodlight-list");

chrome.devtools.network.onRequestFinished.addListener(function (request) {
  // Check if the URL includes "fls.doubleclick"

  if (request.request.url.includes("fls.doubleclick") && request.response.status == 200) {
    const requestURL = request.request.url;
    const floodlightInfoList = generateFloodlightInfoList(requestURL);
    const identifier = generateUID();
    const timestamp = new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString();

    const eventDataAccordion = renderEventDataAccordion(floodlightInfoList, identifier);
    const requestURLAccordion = renderFullRequestURLAccordion(requestURL, identifier);
    floodlightContainer.innerHTML += `      <div class="floodlight-wrapper">
        <div class="timestamp mb-1">
          <p class="mb-0">Timestamp: <span>${timestamp}</span></p>
        </div>

        <div class="accordion mb-4 accordion-floodlight" id="accordionFloodlight-${identifier}">
          <div class="accordion-item">
            <!-- wrapper header -->
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFloodlight-${identifier}"
                aria-expanded="false"
                aria-controls="collapseFloodlight-${identifier}">
                <!-- wrapper header - content -->
                <div class="flex-wrap">
                  <span class="fw-bold me-2 mb-1">Floodlight</span>
                  <span class="badge text-bg-primary mb-1">src=${floodlightInfoList.src}</span>
                  <span class="badge text-bg-primary mb-1">type=${floodlightInfoList.type}</span>
                  <span class="badge text-bg-primary mb-1">cat=${floodlightInfoList.cat}</span>
                </div>
              </button>
            </h2>
            <div id="collapseFloodlight-${identifier}" class="accordion-collapse collapse" data-bs-parent="#accordionFloodlight-${identifier}">
              <!-- wrapper body -->
              <div class="accordion-body">
                ${eventDataAccordion}
                ${requestURLAccordion}
            </div>
          </div>
        </div>
      </div>`;
  }
});

function generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateFloodlightInfoList(requestURL) {
  const requestURLParamArray = requestURL.split(";");
  let floodlightDetails = {};
  let customFloodlightVariable = [];
  let floodlightParams = ["src", "type", "cat", "ord", "num", "qty", "cost"];
  for (let i = 0; i < floodlightParams.length; i++) {
    floodlightDetails[floodlightParams[i]] = requestURLParamArray
      .filter((item) => item.includes(`${floodlightParams[i]}=`))
      .map((item) => item.split("=")[1])[0];
  }

  requestURLParamArray.filter((item) => {
    item.match(/u[0-9]{1,}=.*/g) && customFloodlightVariable.push(item);
  });

  floodlightDetails["cfv"] = customFloodlightVariable;
  floodlightDetails["countingMethod"] = defineCountingMethod(floodlightDetails);

  return floodlightDetails;
}

function defineCountingMethod(floodlightInfoList) {
  if (floodlightInfoList.ord && !floodlightInfoList.num && floodlightInfoList.qty !== undefined && floodlightInfoList.cost !== undefined) {
    return "Transactions / Items Sold";
  } else if (floodlightInfoList.ord == "1" && floodlightInfoList.num && !floodlightInfoList.qty && !floodlightInfoList.cost) {
    return "Unique";
  } else if (floodlightInfoList.ord && !floodlightInfoList.num && !floodlightInfoList.qty && !floodlightInfoList.cost) {
    return "Standard / Session";
  } else {
    return "Unable to define a correct counting method";
  }
}

function renderEventDataAccordion(floodlightInfoList, identifier) {
  const customFloodlightVariableLayout = renderCustomFloodlightVariable(floodlightInfoList);
  return `<div class="accordion mb-4 accordion-event-data" id="accordionEventData-${identifier}">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEventData-${identifier}"
                        aria-expanded="false"
                        aria-controls="collapseEventData-${identifier}">
                        Event Data
                      </button>
                    </h2>
                    <div
                      id="collapseEventData-${identifier}"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionEventData-${identifier}">
                      <div class="accordion-body">
                      <div>
                          <p class="fw-bold text-primary">Identify your tag with below identifier</p>
                          <ul>
                            <li class="row">
                              <p class="col-6">Advertiser ID(src)</p>
                              <p class="col-6">${floodlightInfoList.src}</p>
                            </li>
                            <li class="row">
                              <p class="col-6">Activity Type String(cat)</p>
                              <p class="col-6">${floodlightInfoList.cat}</p>
                            </li>
                            <li class="row">
                              <p class="col-6">Group Tag String(type)</p>
                              <p class="col-6">${floodlightInfoList.type}</p>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p class="fw-bold text-primary">Confirm your tag counting method</p>
                          <ul>
                            <li class="row">
                              <p class="col-6">Counting Method</p>
                              <p class="col-6">${floodlightInfoList.countingMethod}</p>
                            </li>
                            <li class="row">
                              <p class="col-6">ord</p>
                              <p class="col-6">${floodlightInfoList.ord}</p>
                            </li>
                            <li class="row">
                              <p class="col-6">num</p>
                              <p class="col-6">${floodlightInfoList.num}</p>
                            </li>
                            <li class="row">
                              <p class="col-6">qty</p>
                              <p class="col-6">${floodlightInfoList.qty}</p>
                            </li>
                            <li class="row">
                              <p class="col-6">cost</p>
                              <p class="col-6">${floodlightInfoList.cost}</p>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p class="fw-bold text-primary">Check if custom Floodlight variables are passing expected values</p>
                            ${customFloodlightVariableLayout}
                        </div>
                     
                      </div>
                    </div>
                  </div>
                </div>`;
}

function renderCustomFloodlightVariable(floodlightInfoList) {
  if (floodlightInfoList.cfv.length == 0) {
    return "<p>- No custom floodlight variable -</p>";
  }

  let cfvLayout = "";

  let cfvList = floodlightInfoList.cfv;

  for (let variable of cfvList) {
    cfvLayout += `<li class="row">
      <p class="col-6">${variable.split("=")[0]}</p>
      <p class="col-6">${decodeURIComponent(variable.split("=")[1])}</p>
    </li>`;
  }

  let finalCFVLayout = "<ul>" + cfvLayout + "</ul>";

  return finalCFVLayout;
}

function renderFullRequestURLAccordion(requestURL, identifier) {
  return `                <div class="accordion accordion-full-request-url" id="accordionFullRequestURL-${identifier}">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFullRequestURL-${identifier}"
                        aria-expanded="false"
                        aria-controls="collapseFullRequestURL-${identifier}">
                        Full Request URL
                      </button>
                    </h2>
                    <div
                      id="collapseFullRequestURL-${identifier}"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFullRequestURL-${identifier}">
                      <div class="accordion-body">
                        <p>
                         ${requestURL}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>`;
}
