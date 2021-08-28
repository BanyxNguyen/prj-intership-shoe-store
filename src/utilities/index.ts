// import {PERMISSIONS, request, check} from 'react-native-permissions';
import {Share, Platform} from 'react-native';
// import Config from 'react-native-config';
import _, {findIndex} from 'lodash';
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
