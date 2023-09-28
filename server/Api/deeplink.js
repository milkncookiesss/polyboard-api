import deeplink from 'node-deeplink';
import { Router } from 'express';

const deepLinkRouter = Router();

deepLinkRouter.get('/deeplink', function() {
  return async(req, res, next) => {
    const { url } = req.query;
    console.log('sending user to app?');
    return deeplink({
      url,
      fallback: 'fingerclimbing://'
    });
  }
}())

export default deepLinkRouter
