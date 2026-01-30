import image1 from '../../assets/images/MainBannerImages/image1.png';
import image2 from '../../assets/images/MainBannerImages/image2.png';
import image3 from '../../assets/images/MainBannerImages/image3.png';
import image4 from '../../assets/images/MainBannerImages/image4.png';

import LobsterAndShrimp from '../../assets/images/MainMenuImages/랍스터&쉬림프.png';
import PulledPorkBarbecue from '../../assets/images/MainMenuImages/풀드포크바비큐.png';
import SpicyItalian from '../../assets/images/MainMenuImages/스파이시이탈리안.png';

import TOSHIBeefandNewMushroomSalad from '../../assets/images/MainMenuImages/토시비프뉴머쉬룸샐러드.png';
import TOSHIBeefSalad from '../../assets/images/MainMenuImages/토시비프샐러드.png';
import MiniRotisserieChickenSalad from '../../assets/images/MainMenuImages/미니로티세리치킨샐러드.png';


import SteakAndCheeseAvocadoWrap from '../../assets/images/MainMenuImages/스테이크치즈아보카도랩.png';
import ShrimpEggMayoWrap from '../../assets/images/MainMenuImages/쉬림프에그마요랩.png';
import ChickenBaconMiniWrap from '../../assets/images/MainMenuImages/치킨베이컨미니랩.png';

export const BANNER_ITEMS = [
  {
    id: 1,
    title: "나만의 서브웨이\n꿀조합을 공유해보세요",
    sub: "다양한 소스와 토핑의 조화를 확인하세요",
    image: image1,
    color: "#009223"
  },
  {
    id: 2,
    title: "오늘의 인기 레시피",
    sub: "사람들이 가장 많이 선택한 조합",
    image: image2,
    color: "#ffc300"
  },


  {
    id: 3,
    title: "당신만의 레시피가\n베스트 메뉴가 됩니다!",
    sub: "지금 바로 나만의 소스 조합을 공유해보세요",
    image: image3,
    color: "#c6ed43ff"
  },


  {
    id: 4,
    title: "쿠키까지 완벽해야\n진짜 서브웨이 조합",
    sub: "세트 구성으로 더 든든하게 즐겨보세요",
    image: image4,
    color: "#ed9354ff"
  }


];


export const HOME_MENU_DATA = {
  sandwich: [
    { id: 1, name: '랍스터&쉬림프', desc: '랍스터와 쉬림프의 환상적인 만남', image: LobsterAndShrimp },
    { id: 2, name: '풀드 포크 바비큐', desc: '7시간 저온 훈연하여 부드러운 맛', image: PulledPorkBarbecue },
    { id: 3, name: '스파이시 이탈리안', desc: '살라미와 페퍼로니의 매콤한 조화', image: SpicyItalian },
  ],
  salad: [
    { id: 4, name: '토시 비프 & New 머쉬룸 샐러드', desc: '진한 풍미의 토시살과 버섯의 만남', image: TOSHIBeefandNewMushroomSalad },
    { id: 5, name: '토시 비프 샐러드', desc: '담백한 토시살이 가득한 건강 샐러드', image: TOSHIBeefSalad },
    { id: 6, name: '로티세리 치킨 샐러드', desc: '오븐에 구워 기름기를 뺀 치킨 샐러드', image: MiniRotisserieChickenSalad },
  ],
  wrap: [
    { id: 7, name: '스테이크 & 치즈 아보카도 랩', desc: '스테이크와 아보카도의 부드러운 조화', image: SteakAndCheeseAvocadoWrap },
    { id: 8, name: '쉬림프 에그마요 랩', desc: '탱글한 새우와 부드러운 에그마요', image: ShrimpEggMayoWrap },
    { id: 9, name: '치킨 베이컨 미니 랩', desc: '간편하게 즐기는 바삭한 베이컨 랩', image: ChickenBaconMiniWrap },
  ]
};


export const MOCK_PRESETS = [
  {
    id: 1,
    name: '새우를 극상으로',
    image: '실제_이미지_경로',
    ingredients: {
      bread: '15cm, 토스팅, 파마산 오레가노',
      cheese: '아메리칸치즈',
      veggies: '양상추, 토마토, 오이, 피망, 양파',
      sauce: '랜치'
    }
  },

  {
    id: 2,
    name: '새우를 극상으로',
    image: '실제_이미지_경로',
    ingredients: {
      bread: '15cm, 토스팅, 파마산 오레가노',
      cheese: '아메리칸치즈',
      veggies: '양상추, 토마토, 오이, 피망, 양파',
      sauce: '랜치'
    }
  },

  {
    id: 3,
    name: '새우를 극상으로',
    image: '실제_이미지_경로',
    ingredients: {
      bread: '15cm, 토스팅, 파마산 오레가노',
      cheese: '아메리칸치즈',
      veggies: '양상추, 토마토, 오이, 피망, 양파',
      sauce: '랜치'
    }
  },

  {
    id: 4,
    name: '새우를 극상으로',
    image: '실제_이미지_경로',
    ingredients: {
      bread: '15cm, 토스팅, 파마산 오레가노',
      cheese: '아메리칸치즈',
      veggies: '양상추, 토마토, 오이, 피망, 양파',
      sauce: '랜치'
    }
  },

  {
    id: 5,
    name: '새우를 극상으로',
    image: '실제_이미지_경로',
    ingredients: {
      bread: '15cm, 토스팅, 파마산 오레가노',
      cheese: '아메리칸치즈',
      veggies: '양상추, 토마토, 오이, 피망, 양파',
      sauce: '랜치'
    }
  },

  {
    id: 6,
    name: '새우를 극상으로',
    image: '실제_이미지_경로',
    ingredients: {
      bread: '15cm, 토스팅, 파마산 오레가노',
      cheese: '아메리칸치즈',
      veggies: '양상추, 토마토, 오이, 피망, 양파',
      sauce: '랜치'
    }
  },
  
];
