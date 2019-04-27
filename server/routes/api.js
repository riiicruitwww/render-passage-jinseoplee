'use strict';

const router    = require('express').Router();
const fs        = require('fs');
const path      = require('path');
const jsonPath  = path.resolve(__dirname, '../data/task_container.json');

// 퀴즈 데이터 조회
router.get('/quiz', (req, res) => {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  res.status(200).json(data);
});

module.exports = router;