module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '@mui/material/(.*)': '<rootDir>/node_modules/@mui/material/$1',
    '@mui/icons-material/(.*)': '<rootDir>/node_modules/@mui/icons-material/$1',
    '@mui/lab/(.*)': '<rootDir>/node_modules/@mui/lab/$1',
    immutable: '<rootDir>/node_modules/immutable',
    '^react$': '<rootDir>/node_modules/react',
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '^react-dom/(.*)': '<rootDir>/node_modules/react-dom/$1',
    '\\.(css|less)$': '<rootDir>/test/styleMock.js',
  },
  resolver: `${__dirname}/test/resolver.js`,
};
