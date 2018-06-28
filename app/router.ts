import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/favicon.png',controller.log.index);
  router.get('/', controller.home.index);
};
