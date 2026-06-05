---
title: "Investigating Passkeys"
date: "2023-07-01"
year: "2023"
description: "A deep dive into passkey technology and adoption."
---

## Investigation Context

Apple, Google, and 1Password have been gradually introducing support for passkeys, causing confusion in the organization. Adding a third authentication method has been challenging since the organization recently implemented Yubikeys and Device Trust. I decided to research passkeys and evaluate their potential use.

## Investigation Objectives

1. Understand how passkeys work
2. Experiment using passkeys with various sites & services
3. Identify potential challenges of using passkeys
4. Make a recommendation on whether to promote passkey use

## How Do Passkeys Work?

Passkeys provide a passwordless login experience using public-key cryptography. Instead of creating a password, users generate a passkey — a public and private key pair. The passkey can be stored on smartphones, desktops, security keys, or password managers. User verification is typically required through device biometrics, and passkeys are stored securely in vaults like password managers or keychains.

## Using Passkeys

### iCloud Passkeys

Configuring and using iCloud passkeys was straightforward after enabling iCloud Keychain. The setup worked seamlessly across macOS and iOS devices using Touch ID and Face ID. However, the use of iCloud passkeys was limited to certain browsers — Chrome and Safari worked, but Firefox and Arc did not.

### 1Password Passkeys

Configuration was simple when the 1Password browser extension was unlocked. Cross-device synchronization between desktop and mobile had limitations, though the company is working with Apple to address this.

### Chrome Passkeys

Setup was simple when using Chrome exclusively. However, when I had the 1Password browser extension unlocked in Chrome, it often interfered with using my Chrome passkey.

## Passkey Challenges

Three main issues emerged:

1. **Limited Support** — Few sites and services currently support passkeys, though this is expected to change
2. **User Experience** — Multiple passkey services can interfere with each other during authentication
3. **Syncing Passkeys** — Synchronization creates security trade-offs: synced passkeys risk exposure if the account is compromised, while non-synced passkeys could lock users out if their device is lost

Cross-platform synchronization support remains limited, with iCloud working only on Apple devices, Google passkeys syncing only on Android, and inconsistent cross-browser compatibility.

## Conclusion

The recommendation is to delay widespread passkey adoption until broader support is established. I plan to continue using physical security keys due to their stability, though early adopters can experiment with the emerging technology.
