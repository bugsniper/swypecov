import {notEmpty} from "./helper";

class MiscService {
  zillowAddress: any = {
    address: '',
    citystatezip: '',
  };

  fullAddress: string ='';

  addressData: any = {
    street_number: '',
    route: '',
    locality: '',
    administrative_area_level_1: '',
    country: '',
    postal_code: '',
    address: '',
  };
  apiData: any = null;
  constructor() {}

  setAddressData = (addressData) => {
    this.fullAddress = addressData;
  };

  setApiData = (data) => {
    this.fullAddress = data;
  };

  getAutoZillowAddress = (addressData, fullAddress) => {
    try {
      this.fullAddress = notEmpty(fullAddress)? fullAddress: '';
      const street_number = addressData.filter(item => item['types'][0] === 'street_number');
      const route = addressData.filter(item => item['types'][0] === 'route');
      const locality = addressData.filter(item => item['types'][0] === 'locality');
      const administrative_area_level_1 = addressData.filter(item => item['types'][0] === 'administrative_area_level_1');
      const country = addressData.filter(item => item['types'][0] === 'country');
      const postal_code = addressData.filter(item => item['types'][0] === 'postal_code');

      this.addressData['street_number'] = notEmpty(street_number) ? street_number[0]['short_name']: '';
      this.addressData["route"] = notEmpty(route) ? route[0]['long_name']: '';
      this.addressData["locality"] = notEmpty(locality) ? locality[0]['long_name']: '';
      this.addressData["administrative_area_level_1"] = notEmpty(administrative_area_level_1) ? administrative_area_level_1[0]['short_name']: '';
      this.addressData["country"] = notEmpty(country) ? country[0]['short_name']: '';
      this.addressData["postal_code"] = notEmpty(postal_code) ? postal_code[0]['short_name']: '';
      this.addressData["address"] = this.addressData['street_number'] + ' ' + this.addressData["route"];
      return this.zillowParams = {
        address: this.addressData["address"],
        citystatezip:
          this.addressData["locality"] + ", " + this.addressData["administrative_area_level_1"] + ", " + this.addressData["postal_code"]
      };

    } catch (e) {
      console.log(e);
      return null;
    }
  }

}
export const Misc = new MiscService();

