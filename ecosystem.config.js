module.exports = {
  apps: [
    {
      name: 'WELLETS',
      script: './dist/Shared/Infra/Http/index.js',
      exec_mode: 'fork',
      instances: 1,
      max_memory_restart: '200M'
    }
  ]
};
