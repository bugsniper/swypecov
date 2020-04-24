import React, { useEffect, useRef } from "react";
import {Misc} from "./misc";

export const debounce = (func, wait) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const notEmpty = (data) => {
  const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

  switch (type) {
    case 'null':
    case 'undefined':
      return false;
    case 'object':
      return Object.keys(data).length > 0;
    case 'array':
    case 'string':
      return data !== 'undefined' && data !== 'null' && data.length > 0;
    case 'boolean':
      return !!data;
    default:
      return true;
  }
};

export const commafy = (num) => {
  if (num == '' || num == undefined) {
    return '';
  }
  const str = num.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
};

export const getPricingForDemo = (type, total_data) => {
  let arr = [];
  let stillwater = 0, universal = 0, plymouthAry = [], lowest_price, medium_price, highest_price,
    plymouth_low_price, plymouth_lowest_price;
  const insuranceTypes = ['demo_homeowner_data', 'demo_condo_data'];
  if (total_data) {
    const apiData = total_data[insuranceTypes[type]];
    try {
      let plymouthData = apiData["plymouth"];
      const plymouthKeys = Object.keys(plymouthData);
      for (let key in plymouthKeys) {
        let plymouthChoice = plymouthData[plymouthKeys[key]].pricing;
        let plymouth = parseFloat(plymouthChoice.replace(',', '')) * 12;
        plymouthAry.push(plymouth)
      }
      plymouth_low_price = (plymouthAry[0] - 25 + 65 + 50) * .8;
      plymouth_lowest_price = (plymouthAry[0] - 25 - 10) * .75;
      arr.push(plymouth_low_price);
      arr.push(plymouth_lowest_price);
    } catch (e) {
    }
    try {

      if (apiData['universal']) {
        if (apiData["universal"]["QuoteWrapper"]["Message"] == 'OK') {
          universal = apiData["universal"]["QuoteWrapper"]['Premium'];
        }
      }
    } catch (e) {
      universal = 0;
    }
    arr.push(universal);
    try {
      if (apiData["stillwater"]["ACORD"]['InsuranceSvcRs']['HomePolicyQuoteInqRs']
        ['MsgStatus']['MsgStatusCd'] == 'Success') {
        stillwater = apiData["stillwater"]["ACORD"]['InsuranceSvcRs']
          ['HomePolicyQuoteInqRs']['PolicySummaryInfo']["FullTermAmt"]["Amt"];
      }
    } catch (e) {
      stillwater = 0;
    }
    arr.push(stillwater);
  }
  arr = arr.concat(plymouthAry);
  try {
    lowest_price = arr.filter(function (x) {
      return parseFloat(x) !== 0 && Boolean(parseFloat(x));
    })
      .reduce(function (a, b) {
        return Math.min(a, b);
      });
    try {

      medium_price = arr.filter(function (x) {
        return parseFloat(x) !== 0 && Boolean(parseFloat(x));
      })
        .sort(function (a, b) {
          return a - b
        })[1];
    } catch (e) {
      medium_price = lowest_price;
    }
    highest_price = arr.filter(function (x) {
      return parseFloat(x) !== 0 && Boolean(parseFloat(x));
    })
      .reduce(function (a, b) {
        return Math.max(a, b);
      });
  } catch (e) {
  }
  if (medium_price == undefined) medium_price = lowest_price;
  // Misc.setApiData({
  //   plymouthAry, stillwater, universal
  // });
  return {
    lowest_price,
    medium_price,
    highest_price
  }
}
