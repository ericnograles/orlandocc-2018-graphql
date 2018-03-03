module.exports = {
  source: { 
    '**/README.md': true,
    '**/*.js': true,
    '**/*.json': true,
    '**/*.java': true,
    '**/*.yml': true,
    '**/*.yaml': true,
    '**/*.sh': true,
    '**/.vscode/*.json': true,
    '**/Dockerfile': true
  },
  ingredients: [
    {
      type: 'input',
      name: 'localPortPostgres',
      message: 'Please specify the local port on which to expose the Postgres instance from Docker',
      default: '60000',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    },
    {
      type: 'input',
      name: 'localPortRedis',
      message: 'Please specify the local port on which to expose the Redis instance from Docker',
      default: '60001',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    },
    {
      type: 'input',
      name: 'localPortWebApp',
      message: 'Please specify the local port on which to expose the WebApp from Docker',
      default: '60002',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    },
    {
      type: 'input',
      name: 'localPortNodeDebugger',
      message: 'Please specify the local port on which to expose the Redis instance from Docker',
      default: '60003',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    },
    {
      type: 'input',
      name: 'localPortReactDevServer',
      message: 'Please specify the local port on which to expose the React Dev Server from Docker',
      default: '60004',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
    }
  ],
  env: [
    {
      type: 'input',
      name: 'JWT_SECRET',
      message: 'Please specify a value for the JWT_SECRET environment variable. This is how we will sign JSON Web Tokens.',
      default: 'shhh_its_a_secret',
    }
  ]
}
