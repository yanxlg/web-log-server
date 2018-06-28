// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import BuriedPoint from '../../../app/controller/buriedPoint';
import Home from '../../../app/controller/home';
import Log from '../../../app/controller/log';

declare module 'egg' {
  interface IController {
    buriedPoint: BuriedPoint;
    home: Home;
    log: Log;
  }
}
