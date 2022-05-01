require('dotenv/config');

const markdownIt = require('markdown-it');

module.exports = {
  basedir: 'src',
  locals: {
    googleAnalyticsMeasurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  },
  filters: {
    markdown: (text, _options) => (
      markdownIt({
        linkify: true,
        breaks: true,
        html: true,
        typographer: true,
      }).render(text)
    ),
  },
};
