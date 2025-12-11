#!/bin/bash

# Deploy Counter contract to Stacks testnet
# This script reads DEPLOYER_SECRET_KEY from .env.local and deploys the contract

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment to Stacks testnet...${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Error: .env.local file not found${NC}"
    exit 1
fi

# Read DEPLOYER_SECRET_KEY from .env.local
DEPLOYER_SECRET_KEY=$(grep "^DEPLOYER_SECRET_KEY=" .env.local | cut -d '=' -f2- | tr -d '"' | tr -d "'" | xargs)

if [ -z "$DEPLOYER_SECRET_KEY" ]; then
    echo -e "${RED}❌ Error: DEPLOYER_SECRET_KEY not found in .env.local${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Found DEPLOYER_SECRET_KEY${NC}"

# Update settings/Testnet.toml with the mnemonic
cat > settings/Testnet.toml <<EOF
[network]
name = "testnet"
stacks_node_rpc_address = "https://api.testnet.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "$DEPLOYER_SECRET_KEY"
derivation = "m/44'/5757'/0'/0/0"
EOF

echo -e "${GREEN}✓ Updated settings/Testnet.toml${NC}"

# Check if clarinet is installed
if ! command -v clarinet &> /dev/null; then
    echo -e "${RED}❌ Error: clarinet is not installed${NC}"
    echo -e "${YELLOW}Install it with: brew install clarinet${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Clarinet is installed${NC}"

# Generate deployment plan
echo -e "${YELLOW}📋 Generating deployment plan...${NC}"
clarinet deployments generate --testnet --medium-cost

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error: Failed to generate deployment plan${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Deployment plan generated${NC}"

# Apply deployment
echo -e "${YELLOW}🚀 Deploying contract to testnet...${NC}"
clarinet deployments apply --testnet

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error: Deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment successful!${NC}"

# Try to extract contract address from deployment output
echo -e "${GREEN}📝 Deployment complete. Check the output above for the contract address.${NC}"
echo -e "${YELLOW}💡 Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local with the deployed contract address${NC}"
