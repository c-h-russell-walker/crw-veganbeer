process.env.NODE_ENV = 'production';

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../config/webpack.config.prod');

const app = express(),
      DIST_DIR = path.join(__dirname, '/../build'),
      HTML_FILE = path.join(DIST_DIR, 'index.html'),
      DEFAULT_PORT = 3000,
      compiler = webpack(config);

// Getting wild here and being heavy handed while I'm making lots of updates
// TODO - reinstate use of ETag
app.disable('etag');

app.set('port', process.env.PORT || DEFAULT_PORT);

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => res.sendFile(HTML_FILE));

app.listen(app.get('port'));
