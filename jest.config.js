module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  moduleNameMapper: {
    '@material-ui/core/(.*)':
      '<rootDir>/example/node_modules/@material-ui/core/$1',
    '@material-ui/icons/(.*)':
      '<rootDir>/example/node_modules/@material-ui/icons/$1',
    '@material-ui/lab/(.*)':
      '<rootDir>/example/node_modules/@material-ui/lab/$1',
    '@material-ui/styles': '<rootDir>/example/node_modules/@material-ui/styles',
    immutable: '<rootDir>/node_modules/immutable',
    '^react$': '<rootDir>/example/node_modules/react',
    '^react-dom$': '<rootDir>/example/node_modules/react-dom',
    '^react-dom/(.*)': '<rootDir>/example/node_modules/react-dom/$1',
    '\\.(css|less)$': '<rootDir>/test/styleMock.js',
  },
};
