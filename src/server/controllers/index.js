import pdf from 'html-pdf';
import sanitizeHtmlLib from 'sanitize-html';

/**
 * Sanitize HTML with only safe values
 */
const sanitizeHtml = html => {
  return sanitizeHtmlLib(html, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat(['img', 'style', 'h1', 'h2', 'span']),
    allowedSchemes: ['https', 'data'],
    allowedAttributes: Object.assign(sanitizeHtmlLib.defaults.allowedAttributes, {
      '*': ['style', 'class'],
      td: ['width'],
    }),
  });
};

export default {
  renderMany: async (req, res, next) => {
    const { filename, format } = req.params;

    if (!req.body || !req.body.cards || !Array.isArray(req.body.cards)) {
      res.send({ error: 'Invalid parameters' });
      return;
    }

    const html = await req.app.renderToHTML(req, res, '/gift-cards');
    const sendRaw = ['1', 'true'].includes(req.query.raw);
    res.send(sendRaw ? html : sanitizeHtml(html));
  },
};
