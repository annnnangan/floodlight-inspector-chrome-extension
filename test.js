// const uid = function () {
//   return Date.now().toString(36) + Math.random().toString(36).substring(2);
// }; //m3ea9ceel4tt571w8uj

// console.log(uid());

const transactionRequestURL =
  "https://12345678.fls.doubleclick.net/activityi;src=12345678;type=purc;cat=purc01;qty=1;cost=3400;ord=HK20241112022;npa=0;auiddc=2088102233.1731384606;u5=Sunglasses%20%E5%A4%AA%E9%99%BD%E7%9C%BC%E9%8F%A1%7CWatch%20%E6%89%8B%E9%8C%B6;u6=HKS20432%7CHKW93852;u7=1200%7C2200;u8=1%7C1;u9=HK20241112022;u10=3400;ps=1;pcor=1302370007;uaa=arm;uab=64;uafvl=Not%252FA)Brand%3B8.0.0.0%7CChromium%3B126.0.6478.62%7CGoogle%2520Chrome%3B126.0.6478.62;uamb=0;uam=;uap=macOS;uapv=14.5.0;uaw=0;pscdl=noapi;frm=0;gtm=45fe4b70z89199698002za201zb9199698002;gcd=13l3l3l3l1l1;dma=0;tag_exp=101823848~101925629~102067554~102077854;epver=2;~oref=https%3A%2F%2Fannnnangan.github.io%2Fdemo-page-for-floodlight-inspector-chrome-extension%2F%3Fgtm_debug%3D1731385548856?";
const itemSoldRequestURL =
  "https://12345678.fls.doubleclick.net/activityi;src=12345678;type=purc;cat=purc02;qty=2;cost=3400;ord=HK20241112022;npa=0;auiddc=2088102233.1731384606;u5=Sunglasses%20%E5%A4%AA%E9%99%BD%E7%9C%BC%E9%8F%A1%7CWatch%20%E6%89%8B%E9%8C%B6;u6=HKS20432%7CHKW93852;u7=1200%7C2200;u8=1%7C1;u9=HK20241112022;u10=3400;ps=1;pcor=998479116;uaa=arm;uab=64;uafvl=Not%252FA)Brand%3B8.0.0.0%7CChromium%3B126.0.6478.62%7CGoogle%2520Chrome%3B126.0.6478.62;uamb=0;uam=;uap=macOS;uapv=14.5.0;uaw=0;pscdl=noapi;frm=0;gtm=45fe4b70z89199698002za201zb9199698002;gcd=13l3l3l3l1l1;dma=0;tag_exp=101823848~101925629~102067554~102077854;epver=2;~oref=https%3A%2F%2Fannnnangan.github.io%2Fdemo-page-for-floodlight-inspector-chrome-extension%2F%3Fgtm_debug%3D1731385548856?";

const uniqueRequestURL =
  "https://12345678.fls.doubleclick.net/activityi;src=12345678;type=consi;cat=contact;ord=1;num=7943641807276;npa=0;auiddc=2088102233.1731384606;ps=1;pcor=47659789;uaa=arm;uab=64;uafvl=Not%252FA)Brand%3B8.0.0.0%7CChromium%3B126.0.6478.62%7CGoogle%2520Chrome%3B126.0.6478.62;uamb=0;uam=;uap=macOS;uapv=14.5.0;uaw=0;pscdl=noapi;frm=0;gtm=45fe4b70z89199698002za201zb9199698002;gcd=13l3l3l3l1l1;dma=0;tag_exp=101823848~101925629~102067554~102077854;epver=2;~oref=https%3A%2F%2Fannnnangan.github.io%2Fdemo-page-for-floodlight-inspector-chrome-extension%2F%3Fgtm_debug%3D1731385548856?";

const standardRequestURL =
  "https://12345678.fls.doubleclick.net/activityi;src=12345678;type=consi;cat=blog;ord=6838921844843;npa=0;auiddc=2088102233.1731384606;u1=View%20More;u2=https%3A%2F%2Fsupport.google.com%2Fcampaignmanager%2Fanswer%2F3027419%3Fhl%3Den;u3=What%20is%20Floodlight%20tag%3F;u4=Floodlight%20is%20used%20for%20conversion%20and%20event%20tracking%20across%20Google%20Marketing%20Platform%2C%20including%20Campaign%20Manager%20360%2C%20Display%20%26%20Video%20360%2C%20and%20the%20new%20Search%20Ads%20360.;ps=1;pcor=881917410;uaa=arm;uab=64;uafvl=Not%252FA)Brand%3B8.0.0.0%7CChromium%3B126.0.6478.62%7CGoogle%2520Chrome%3B126.0.6478.62;uamb=0;uam=;uap=macOS;uapv=14.5.0;uaw=0;pscdl=noapi;frm=0;gtm=45fe4b70z89199698002za201zb9199698002;gcd=13l3l3l3l1l1;dma=0;tag_exp=101823848~101925629~102067554~102077854;epver=2;~oref=https%3A%2F%2Fannnnangan.github.io%2Fdemo-page-for-floodlight-inspector-chrome-extension%2F%3Fgtm_debug%3D1731385548856?";

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

function renderCustomFloodlightVariable(floodlightInfoList) {
  if (floodlightInfoList.cfv.length == 0) {
    return "<p>- No custom floodlight variable -</p>";
  }

  let cfvLayout = "";

  for (let variable of floodlightInfoList.cfv) {
    cfvLayout += `<li class="row">
      <p class="col-6">${variable.split("=")[0]}</p>
      <p class="col-6">${decodeURIComponent(variable.split("=")[1])}</p>
    </li>`;
  }

  let finalCFVLayout = "<ul>" + cfvLayout + "</ul>";

  return finalCFVLayout;
}

const floodlightInfoList = generateFloodlightInfoList(standardRequestURL);

// console.log(generateFloodlightInfoList(itemSoldRequestURL));

console.log(renderCustomFloodlightVariable(floodlightInfoList));
