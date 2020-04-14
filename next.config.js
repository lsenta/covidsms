module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      POSTGRESQL_HOST: '127.0.0.1',
      POSTGRESQL_PORT: '5432',
      POSTGRESQL_DB: 'activity',
      POSTGRESQL_USER: 'activity',
      POSTGRESQL_PASSWORD: 'helloworld',
    }
  }
}
