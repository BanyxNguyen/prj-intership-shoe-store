import _ from 'lodash';
import {OptionType, Product, FilterOptions, ProductTrend} from '../models';

const driveLink = 'https://drive.google.com/uc?export=view&id=';

export const DefaultOptions: FilterOptions = {
  sort: [
    {value: 'Price [low/high]', key: 'price-ascending'},
    {value: 'Newest', key: 'new'},
    {value: 'Top Sellers', key: 'top'},
    {value: 'Price [high/low]', key: 'price-decrease'},
  ],
  gender: [
    {value: 'Men', key: 'men'},
    {value: 'Women', key: 'women'},
    {value: 'Unisex', key: 'unisex'},
  ],
  types: [
    {value: 'Sneakers', key: 'sneakers'},
    {value: 'T Shirts', key: 't-shirts'},
    {value: 'Pants', key: 'pants'},
    {value: 'Hoodies & Sweatshirts', key: 'hoodies-sweatshirts'},
    {value: 'Shorts', key: 'shorts'},
    {value: 'Boots', key: 'boots'},
  ],
  colors: [
    {value: 'Black', key: '#202020'},
    {value: 'Red', key: '#d50000'},
    {value: 'Green', key: '#00600f'},
  ],
  sizes: [
    {value: '3', key: '3'},
    {value: '3.5', key: '3.5'},
    {value: '4', key: '4'},
    {value: '4.5', key: '3'},
    {value: '5', key: '5'},
    {value: '5.5', key: '5.5'},
    {value: '6', key: '6'},
    {value: '6.5', key: '6.5'},
    {value: '7', key: '7'},
    {value: '7.5', key: '7.5'},
  ],
  brands: [
    {value: 'Adidas', key: 'adidas'},
    {value: 'Nike', key: 'nike'},
    {value: 'Dr.Martens', key: 'dr-martens'},
  ],
  categories: [
    {value: 'Apparel', key: 'apparel'},
    {value: 'Shoes', key: 'shoes'},
    {value: 'Accessories', key: 'accessories'},
  ],
};

export const DefaultOptionsMenu: OptionType[] = [
  {value: 'Sort By', key: 'sort'},
  {value: 'Gender', key: 'gender'},
  {value: 'Category', key: 'categories'},
  {value: 'Product Type', key: 'types'},
  {value: 'Size', key: 'sizes'},
  {value: 'Color', key: 'colors'},
  {value: 'Brand', key: 'brands'},
];

interface DataAllType {
  sneakers: Product[];
  trends: ProductTrend[];
}

//shoe-adidas-daily-3-training-

const temp: Product[] = [
  {
    //https://www.dsw.com/en/us/product/adidas-daily-3-training-shoe---mens/508057?activeColor=400
    name: `DAILY 3 TRAINING SHOE - MEN'S`,
    brand: 'Adidas',
    price: 54.99,
    type: ['school', 'kid', 'men'],
    size: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    color: ['#285199'],
    description: `Workout in some vibrant style in the Daily 3 training shoe by Adidas. Made of washed canvas upper for breathable feel, this low-top sneaker features OrthoLite® sockliner footbed for plush cushioning with every step.\n\nItem # 508057\nUPC # 194830771060`,
    images: [
      `${driveLink}13eg0v9-5-d7lmXi3vzgNHqCV_uboCsRy`,
      `${driveLink}112uxP52_xPiXuT719eLjw1r7HNv1o9iZ`,
      `${driveLink}17kgCJv1H0kfvMSew6PBauNBlWI0xjEPf`,
      `${driveLink}1d0i_HxUgNCTSk87PTf1c8LD6qFHc2u6F`,
      `${driveLink}1_m70asBfmWdp6LhgvPGtcpJjqFxgF7On`,
      `${driveLink}1yei05ASpKfrSe39qA_ysX3ZXv_qgN12Z`,
      `${driveLink}18-mk9AigNOdpfi89xvsyEYeEePSHcXdm`,
    ],
  },
  {
    //https://www.dsw.com/en/us/product/dr.-martens-1460-combat-boot---womens/247425?activeColor=002
    name: `1460 COMBAT BOOT - WOMEN'S`,
    brand: 'Dr.Martens',
    price: 139.99,
    type: ['running', 'school', 'men'],
    size: [
      'UK 3 / US 5',
      'UK 4 / US 6',
      'UK 5 / US 7',
      'UK 6 / US 8',
      'UK 7 / US 9',
      'UK 8 / US 10',
      'UK 9 / US 11',
    ],
    color: ['#4f4f4f'],
    description: `The iconic 1460 8-eye combat boot from Dr. Martens allows you to embrace your inner rebel. With a Goodyear Welt construction for enhanced comfort and durability, this rugged boot emboldens your style.\n\nItem # 247425\nUPC # 800090795776`,
    images: [
      `${driveLink}1A1eCkXi8tTCZ0sQryZoS_GQfsaiOtrMw`,
      `${driveLink}1HNN_APAoy6mxFAjWC_iFLQPWg2b5CI44`,
      `${driveLink}1kYknupu6M-o37KuToCoT7qcxNkTNdSj7`,
      `${driveLink}1uEX0BoG7k-YNnWHR12_L8-hKj9ePMQCL`,
      `${driveLink}16whES5dVqF5sIxbhhYxZdH7G7FiQWxzh`,
      `${driveLink}1yna4d7s45KaebvY2zIkp3_WAQD70dNUz`,
      `${driveLink}1nAv_HhhCJDu_BmMm-zevN_rkI-oBfOCu`,
      `${driveLink}1SUQSL_3x-nk1rI7Lx6TOPlLD0TAHOHlX`,
    ],
  },
];

const productTrends: ProductTrend[] = [
  {
    name: 'Back To School',
    type: 'Style',
    image: `${driveLink}1Odpm359YlXmaAT64lQYduvmX2K3iCcs6`,
  },
  {
    name: 'Goal-Crushing Running',
    type: 'running',
    image: `${driveLink}1f26GjAfQ6X0i_m1EFllDEU3ivivexOjc`,
  },
  {
    name: `WOMEN'S BOOTS`,
    type: 'Style',
    image: `${driveLink}1imdM5qg0_dQlVoaUNLsJv199xxwf_R72`,
  },
];

export const TempData: DataAllType = {
  sneakers: _.concat(temp, temp, temp, temp, temp),
  trends: productTrends,
};
