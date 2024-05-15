const express = require('express');

const router = require('router');

app.get('/',(req, res) => {
    res.send('Hello World');
});

module.exports = router;