const app = require('./app');
const db = require('./storage/database');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Endpoints:`);
  console.log(`   GET  /api/tasks`);
  console.log(`   POST /api/tasks`);
  console.log(`   GET  /health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  try {
    db.close();
    console.log('Database closed.');
  } catch (err) {
    console.error('DB close error:', err);
  }
  process.exit(0);
});
