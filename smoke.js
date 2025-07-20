const fetch = require('node-fetch');

async function runSmoke() {
  try {
    const res = await fetch('http://localhost:3000/health');
    const body = await res.json();
    if (res.status === 200 && body.status === 'OK') {
      console.log('✅ Smoke test passed');
      process.exit(0);
    }
    throw new Error('Unexpected response');
  } catch (err) {
    console.error('❌ Smoke test failed:', err);
    process.exit(1);
  }
}

runSmoke();

