const stripe = require('stripe')(
  'sk_test_51JdjP5AjDquacJP3WVJfiNiEHhcYAp58I3qRnSY1w5aRVxBdRR2rc7qR37wgCzUoebGXmIMdKWy27noDvBzTzFUi00O7CM13Xf'
);
const express = require('express');
const app = express();
app.use(express.static('public'));

app.listen(4242, () => console.log('Running on port 4242'));
