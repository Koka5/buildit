const _ = require(process.cwd()+'/_internal/mockObject').server(),
  testApi = require(process.cwd()+'/_internal/testApi');

var testData = [
  [
    'not_found',
    [],
    [
      [['_'],'ROUTE_NOT_FOUND']
    ]
  ],
  [
    'api',
    ['/api','GET'],
    [
      [[],{ cod: '400', message: 'Nothing to geocode' }]
    ]
  ],
  [
    'api_with_query',
    ['/api?q=delhi,in','GET'],
    [
      [['city','name'],'Delhi']
    ]
  ]
];

testData.forEach(testApi.bind(null,exports,_));
