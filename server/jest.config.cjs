module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest', // Transform TypeScript and JSX files
    // '^.+\\.js?$': 'babel-jest', // Transform JavaScript and JSX files
  },
}