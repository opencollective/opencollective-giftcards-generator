import fs from 'fs-extra';
import path from 'path';
import pdf from 'html-pdf';
import sanitizeHtmlLib from 'sanitize-html';
import { logger } from '../logger';

/**
 * Sanitize HTML with only safe values
 */
const sanitizeHtml = html => {
  return sanitizeHtmlLib(html, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat([
      'img',
      'style',
      'h1',
      'h2',
      'span',
      // SVG
      'svg',
      'path',
      'polyline',
      'line',
    ]),
    allowedSchemes: ['http', 'https', 'data'],
    allowedAttributes: Object.assign(sanitizeHtmlLib.defaults.allowedAttributes, {
      '*': ['style', 'class', 'height', 'width'],
      td: ['width'],
      img: ['src', 'srcset', 'alt'],
      // SVG
      svg: [
        'shape-rendering',

        'viewBox',
        'style',
        'aria-hidden',
        'stroke-linecap',
        'stroke-linejoin',
        'focusable',
        'fill',
        'stroke',
        'color',
      ],
      path: ['fill', 'd'],
      polyline: ['points'],
      line: ['x1', 'x2', 'y1', 'y2'],
    }),
    parser: {
      lowerCaseAttributeNames: false,
    },
  });
};

export const renderMany = async (req, res, next) => {
  const { filename, format } = req.params;

  const hasInvalidFileType = !['pdf', 'html'].includes(format);
  if (hasInvalidFileType || !req.body || !req.body.cards || !Array.isArray(req.body.cards)) {
    res.send({ error: 'Invalid parameters' });
    return;
  }

  const rawHtml = await req.app.renderToHTML(req, res, '/gift-cards');
  const sendRaw = ['1', 'true'].includes(req.query.raw);
  const html = sendRaw ? rawHtml : sanitizeHtml(rawHtml);

  if (format === 'html') {
    res.send(html);
  } else if (format === 'pdf') {
    const pdfOptions = { format: 'A4', renderDelay: 500 };
    res.setHeader('content-type', 'application/pdf');
    res.setHeader('content-disposition', `inline; filename="${filename}.pdf"`); // or attachment?
    pdf.create(html, pdfOptions).toStream((err, stream) => {
      if (err) {
        logger.error('>>> Error while generating pdf at %s', req.url, err);
        return next(err);
      }
      stream.pipe(res);
    });
  }
};

export async function testFixture(req, res, next) {
  const { filename } = req.params;
  try {
    const fixturesPath = '../../../test/__fixtures__/';
    const filePath = path.join(__dirname, fixturesPath, `${path.basename(filename)}.json`);
    const content = await fs.readJson(filePath);
    return renderMany({ ...req, body: content }, res, next);
  } catch (e) {
    logger.error('>>> transactions.transactionInvoice error', e.message);
    logger.debug(e);
    if (e.message.match(/No collective found/)) {
      return res.status(404).send('Not found');
    } else {
      return res.status(500).send(`Internal Server Error: ${e.message}`);
    }
  }
}
