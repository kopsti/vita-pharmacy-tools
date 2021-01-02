const express = require('express');
const app = express();

app.use(express.static('./dist/vita-pharmacy-tools'));

app.use(function (req, res, next) {
  if (process.env.NODE_ENV === 'production' && req.get('X-Forwarded-Proto') !== 'https') {
    res.redirect('https://' + req.get('Host') + req.url);
  } else {
    next();
  }
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/vita-pharmacy-tools/'}
  );
});

app.listen(process.env.PORT || 8080);
