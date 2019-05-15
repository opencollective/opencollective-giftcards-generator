import nextRoutes from 'next-routes';
import { renderMany, testFixture } from './controllers';
import { maxAge } from './middlewares';

const router = nextRoutes();

export default (server, app) => {
  const bindApp = (req, res, next) => {
    req.app = app;
    next();
  };

  /**
   * By default, we cache all GET calls for 30s at the CDN level (cloudflare)
   * note: only for production/staging (NextJS overrides this in development env)
   */
  server.get('*', maxAge(30));

  /**
   * Cache static assets for a longer time
   */
  server.get('/static/*', maxAge(7200));

  /**
   * Prevent all indexation from search engines (this is a private service)
   */
  server.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('User-agent: *\nDisallow: /');
  });

  /**
   * Endpoint to download a pdf
   */
  server.post('/render-many/:filename.:format(pdf|html)', bindApp, renderMany);

  server.get('/__test__/:filename.:format(pdf|html)', bindApp, testFixture);

  return router.getRequestHandler(server.next);
};
