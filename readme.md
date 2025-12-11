# CounterX - Clarity Smart Contract for Stacks

A simple yet unique counter smart contract built with Clarity for the Stacks blockchain. Features increment/decrement functionality with balance tracking and comprehensive error handling.

## 📋 Overview

This Clarity smart contract implements a counter with the following features:
- **Increment**: Increase the counter by 1
- **Decrement**: Decrease the counter by 1 (with underflow protection)
- **Reset**: Reset the counter to 0
- **Balance Query**: Read-only function to get the current balance
- **Custom Increment/Decrement**: Optional functions to increment/decrement by custom amounts

## 🔒 Security Features

- **Underflow Protection**: Prevents the counter from going below 0
- **Clear Error Codes**: Defined error constants for better error handling
- **Public Functions**: All functions are public and can be called by anyone
- **Immutable Logic**: Clarity's design ensures safe, predictable execution

## 📁 Contract Structure

```
counter.clar
├── Constants
│   ├── contract-owner: Contract owner principal
│   ├── ERR-UNAUTHORIZED: Error code for unauthorized access
│   └── ERR-UNDERFLOW: Error code for underflow protection
├── Data Variables
│   └── balance: Stores the current counter value (uint)
└── Functions
    ├── get-balance: Read-only function to get current balance
    ├── increment: Increment counter by 1
    ├── decrement: Decrement counter by 1 (with protection)
    ├── reset: Reset counter to 0
    ├── increment-by: Increment by custom amount
    └── decrement-by: Decrement by custom amount (with protection)
```

## 🚀 Getting Started

### Prerequisites

- [Clarinet](https://docs.hiro.so/clarinet) - Clarity development tool
- [Stacks CLI](https://docs.hiro.so/stacks-cli) - For deployment (optional)

### Installation

1. Install Clarinet (if not already installed):
```bash
# macOS
brew install clarinet

# Linux/Windows - see https://docs.hiro.so/clarinet
```

2. Initialize a Clarinet project (if starting fresh):
```bash
clarinet new counter-project
cd counter-project
```

3. Add the contract to your project:
```bash
# Copy counter.clar to contracts/ directory
cp counter.clar contracts/
```

### Testing the Contract

1. Start a local Clarinet console:
```bash
clarinet console
```

2. Test the functions:
```clarity
;; Get initial balance (should be 0)
(contract-call? .counter get-balance)

;; Increment the counter
(contract-call? .counter increment)

;; Get balance again (should be 1)
(contract-call? .counter get-balance)

;; Decrement the counter
(contract-call? .counter decrement)

;; Try to decrement below 0 (should fail)
(contract-call? .counter decrement)

;; Reset the counter
(contract-call? .counter reset)

;; Increment by custom amount
(contract-call? .counter increment-by u10)

;; Decrement by custom amount
(contract-call? .counter decrement-by u5)
```

### Running Tests

Create test files in the `tests/` directory:

```bash
clarinet test
```

## 📝 Contract Functions

### `get-balance`
- **Type**: Read-only
- **Parameters**: None
- **Returns**: `uint` - Current balance
- **Description**: Returns the current counter balance

### `increment`
- **Type**: Public
- **Parameters**: None
- **Returns**: `(ok uint)` - New balance after increment
- **Description**: Increments the counter by 1

### `decrement`
- **Type**: Public
- **Parameters**: None
- **Returns**: `(ok uint)` - New balance after decrement, or `(err u1002)` if underflow
- **Description**: Decrements the counter by 1, fails if balance is 0

### `reset`
- **Type**: Public
- **Parameters**: None
- **Returns**: `(ok uint)` - Always returns 0
- **Description**: Resets the counter to 0

### `increment-by`
- **Type**: Public
- **Parameters**: `amount uint` - Amount to increment by
- **Returns**: `(ok uint)` - New balance after increment
- **Description**: Increments the counter by a specified amount

### `decrement-by`
- **Type**: Public
- **Parameters**: `amount uint` - Amount to decrement by
- **Returns**: `(ok uint)` - New balance after decrement, or `(err u1002)` if underflow
- **Description**: Decrements the counter by a specified amount, fails if insufficient balance

## 🔐 Environment Variables Protection

The `.env` file is protected and will not be committed to version control. The `.gitignore` includes:
- `.env`
- `.env.local`
- All other `.env` variants

## 🎯 Code Clarity

The contract is designed with maximum clarity:
- **Comprehensive Comments**: Every function and section is documented
- **Clear Function Names**: Self-documenting function names
- **Error Handling**: Defined error constants for better debugging
- **Logical Structure**: Organized with constants, data variables, and functions

## 📚 Clarity Language Notes

- Clarity is a **decidable** language - you can always determine what a program will do
- All functions are **public** - anyone can call them
- **No loops or recursion** - ensures termination
- **Explicit error handling** - uses `asserts!` for safety checks

## 🚢 Deployment

### Deploy to Testnet

1. Configure your deployment settings in `.env`:
```bash
STACKS_NETWORK=testnet
STACKS_PRIVATE_KEY=your_private_key_here
```

2. Deploy using Clarinet:
```bash
clarinet deploy --testnet
```

### Deploy to Mainnet

⚠️ **Warning**: Only deploy to mainnet after thorough testing!

```bash
clarinet deploy --mainnet
```

## 🧪 Example Usage

```clarity
;; Initialize counter (starts at 0)
(contract-call? .counter get-balance)  ;; Returns: u0

;; Increment multiple times
(contract-call? .counter increment)    ;; Returns: (ok u1)
(contract-call? .counter increment)    ;; Returns: (ok u2)
(contract-call? .counter increment)    ;; Returns: (ok u3)

;; Check balance
(contract-call? .counter get-balance)  ;; Returns: u3

;; Decrement
(contract-call? .counter decrement)    ;; Returns: (ok u2)

;; Increment by custom amount
(contract-call? .counter increment-by u5)  ;; Returns: (ok u7)

;; Decrement by custom amount
(contract-call? .counter decrement-by u3)  ;; Returns: (ok u4)

;; Reset
(contract-call? .counter reset)        ;; Returns: (ok u0)
```

## 📄 License

This project is open source and available for use in the Stacks program.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📖 Resources

- [Clarity Language Documentation](https://docs.stacks.co/docs/clarity)
- [Clarinet Documentation](https://docs.hiro.so/clarinet)
- [Stacks Documentation](https://docs.stacks.co)

---

**Built with ❤️ for the Stacks Blockchain Program**
