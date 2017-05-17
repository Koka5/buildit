const _ = require(process.cwd()+'/_internal/mockObject').client(),
  testApi = require(process.cwd()+'/_internal/testApi');

var testData = [
  [
    'root',
    ['/','GET'],
    [
      [[],{_:''}]
    ]
  ]
];

testData.forEach(testApi.bind(null,exports,_));
