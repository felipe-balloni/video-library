module.exports = ({ env }) => ({
  'duplicate-button': true,
  graphql: {
    enabled: true,
    shadowCRUD: true,
    config: {
      cd: false,
      defaultLimit: 50
    }
  }
});
