import Intropg1 from '../screens/Intro/Intropg1';
import Intropg2 from '../screens/Intro/Intropg2';
import UserStart from '../screens/User/UserStart/UserStart';
import RiderStart from '../screens/Rider/RiderStart/RiderStart';
import UserSignUp from '../screens/User/UserLoginSignUp/UserSignUp';
import UserLogin from '../screens/User/UserLoginSignUp/UserLogin';
import RiderLogin from '../screens/Rider/RiderLogin/RiderLogin';
import RiderHome from '../screens/Rider/RiderHome/RiderHome';
import UserHome from '../screens/User/UserHome/UserHome';

export const screens = {
  Intropg1: {
    component: Intropg1,
    options: {headerShown: false},
  },
  Intropg2: {
    component: Intropg2,
    options: {headerShown: false},
  },
  UserStart: {
    component: UserStart,
    options: {headerShown: false},
  },
  RiderStart: {
    component: RiderStart,
    options: {headerShown: false},
  },
  UserSignUp: {
    component: UserSignUp,
    options: {headerShown: false},
  },
  UserLogin: {
    component: UserLogin,
    options: {headerShown: false},
  },
  RiderLogin: {
    component: RiderLogin,
    options: {headerShown: false},
  },
  RiderHome: {
    component: RiderHome,
    options: {headerShown: false},
  },
  UserHome: {
    component: UserHome,
    options: {headerShown: false},
  },
};
