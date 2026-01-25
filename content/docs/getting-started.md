---
title: "Getting Started"
description: "Install HoneyBear Folio and set up your first accounts."
weight: 1
---

## Installation

### Linux

Download the `.AppImage` or `.deb` package from the [releases page](https://github.com/honeybearfolio/HoneyBear-Folio/releases/latest).

For AppImage:
```bash
chmod +x HoneyBear-Folio-*.AppImage
./HoneyBear-Folio-*.AppImage
```

For Debian/Ubuntu:
```bash
sudo dpkg -i honeybear-folio_*.deb
```

### Windows

Download the `.msi` installer from the releases page and run it.

### macOS

Download the `.dmg` file from the releases page, open it, and drag HoneyBear Folio to your Applications folder.

## First Steps

### 1. Create Your First Account

When you first open HoneyBear Folio, you'll see an empty dashboard. Click **"Add Account"** in the sidebar to create your first account.

Account types include:
- **Cash** - Bank accounts, savings, cash on hand
- **Brokerage** - Investment accounts with holdings
- **Credit Card** - Credit cards and lines of credit
- **Loan** - Mortgages, auto loans, etc.

### 2. Add Transactions

Click on an account to view its details, then use **"Add Transaction"** to record income and expenses. Each transaction includes:
- Date
- Amount (positive for income, negative for expenses)
- Category
- Payee/Description
- Notes (optional)
- Tags (optional)

### 3. Import Existing Data

If you have transaction data from your bank or another app, use **File → Import** to bring it in. HoneyBear Folio supports:
- CSV files
- JSON files  
- XLSX (Excel) files

The import wizard will help you map columns from your file to the correct fields.

## Data Storage

All your data is stored locally in a SQLite database. The location varies by operating system:

- **Linux:** `~/.local/share/honeybear-folio/honeybear.db`
- **macOS:** `~/Library/Application Support/honeybear-folio/honeybear.db`
- **Windows:** `%APPDATA%\honeybear-folio\honeybear.db`

You can back up this file at any time using **File → Export → Database Backup**.
