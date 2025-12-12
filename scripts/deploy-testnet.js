#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

let deployerSecretKey = null;
for (const line of envLines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('DEPLOYER_SECRET_KEY=')) {
    deployerSecretKey = trimmed.split('=')[1].trim().replace(/^["']|["']$/g, '');
    break;
  }
}

if (!deployerSecretKey) {
  console.error('Error: DEPLOYER_SECRET_KEY not found in .env.local!');
  process.exit(1);
}

// Read Testnet.toml template
const testnetTomlPath = path.join(__dirname, '..', 'settings', 'Testnet.toml');
let testnetToml = fs.readFileSync(testnetTomlPath, 'utf8');

// Replace the mnemonic placeholder
testnetToml = testnetToml.replace('REPLACE_WITH_MNEMONIC_FROM_ENV', deployerSecretKey);

// Write updated Testnet.toml
fs.writeFileSync(testnetTomlPath, testnetToml);

console.log('✓ Updated settings/Testnet.toml with deployer mnemonic');

// Generate deployment plan
console.log('\n📋 Generating deployment plan...');
try {
  execSync('clarinet deployments generate --testnet --medium-cost', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✓ Deployment plan generated\n');
} catch (error) {
  console.error('Error generating deployment plan:', error.message);
  process.exit(1);
}

// Apply deployment
console.log('🚀 Deploying to testnet...');
try {
  execSync('clarinet deployments apply --testnet', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('\n✓ Deployment completed successfully!');
} catch (error) {
  console.error('Error deploying:', error.message);
  process.exit(1);
}

