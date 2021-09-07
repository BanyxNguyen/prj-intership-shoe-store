// import {PERMISSIONS, request, check} from 'react-native-permissions';
import {Share, Platform} from 'react-native';
// import Config from 'react-native-config';
import _, {findIndex} from 'lodash';
import {Config} from '../../appConfig';
import {ELogic, ModelFilterProduct, OptionMenu, Product, PropFilterProduct} from '../models';
export * from './validationControl';

export const Sleep = async (second: number) => {
  await new Promise(resolve => {
    setTimeout(resolve, second);
  });
};

export const SlowFetch = async (func: Promise<any | void>, timing: number = 1200) => {
  const all: [Promise<any>, Promise<void>] = [func, Sleep(timing)];
  return Promise.all(all).then(([res]) => res);
};

export const triggerArray = (arr: any[] = [], item: any) => {
  const indexCheck = _.findIndex(arr, item);
  let temp = arr;
  if (indexCheck < 0) {
    temp = _.concat(temp, item);
  } else {
    _.remove(temp, i => _.isEqual(i, item));
  }
  return temp;
};

export const isExistArrayForId = (arr: Array<any>, id: any) => {
  let isBoolean = findIndex(arr, ['id', id]) > -1;
  return isBoolean;
};

export const keyExtractor = (item: any, index: number) => {
  return index.toString();
};

/**
 * @param str exp: 000,fff
 */
export const parseColorStringToArr = (str: string) => {
  if (_.isEmpty(str)) return [];
  const cls = str.split(',');
  return cls.map(i => i.trim());
};

export const parseImageStringToArr = (str: string) => {
  if (_.isEmpty(str)) return [];
  const images: string[] = JSON.parse(str);
  return images.map(i => Config.API_URL + i);
};

export const parseOptionToModelFilterRequest = (
  options: OptionMenu,
  config?: {amount: number; page: number},
) => {
  const pipeFilters: PropFilterProduct[] = [];

  for (const key in options) {
    const temps = options[key];
    if (key == 'KichThuocs' && temps.length > 0) {
      pipeFilters.push({
        Logic: ELogic.Or,
        FieldName: key as keyof Product,
        Value: JSON.stringify(temps.map(i => i.key)),
      });
    } else if (key == 'Ten' && temps.length > 0) {
      pipeFilters.push({
        Logic: ELogic.Or,
        IsExactly: false,
        FieldName: key as keyof Product,
        Value: temps[0].value,
      });
    } else {
      for (let i = 0; i < temps.length; i++) {
        const elm = temps[i];
        const t: PropFilterProduct = {
          Logic: ELogic.Or,
          FieldName: key as keyof Product,
          Value: elm.key,
        };
        pipeFilters.push(t);
      }
    }
  }

  const filterGetAllProduct: ModelFilterProduct = {
    Amount: config?.amount || 15,
    Page: config?.page || 0,
    PropFilters: pipeFilters,
  };
  return filterGetAllProduct;
};

export const shareApp = () => {
  Share.share(
    {
      title: 'The Cravingz',
      url: 'https://google.com',
    },
    {
      excludedActivityTypes: [
        // 'com.apple.UIKit.activity.PostToWeibo',
        // 'com.apple.UIKit.activity.Print',
        // 'com.apple.UIKit.activity.CopyToPasteboard',
        // 'com.apple.UIKit.activity.AssignToContact',
        // 'com.apple.UIKit.activity.SaveToCameraRoll',
        // 'com.apple.UIKit.activity.AddToReadingList',
        // 'com.apple.UIKit.activity.PostToFlickr',
        // 'com.apple.UIKit.activity.PostToVimeo',
        // 'com.apple.UIKit.activity.PostToTencentWeibo',
        // 'com.apple.UIKit.activity.AirDrop',
        // 'com.apple.UIKit.activity.OpenInIBooks',
        // 'com.apple.UIKit.activity.MarkupAsPDF',
        // 'com.apple.reminders.RemindersEditorExtension',
        // 'com.apple.mobilenotes.SharingExtension',
        // 'com.apple.mobileslideshow.StreamShareService',
        // 'com.linkedin.LinkedIn.ShareExtension',
        // 'pinterest.ShareExtension',
        // 'com.google.GooglePlus.ShareExtension',
        // 'com.tumblr.tumblr.Share-With-Tumblr',
        // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
      ],
    },
  );
};

export default {
  isExistArrayForId,
  keyExtractor,
  Sleep,
};
