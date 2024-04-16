module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  
  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
  },
}