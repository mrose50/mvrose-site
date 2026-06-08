---
title: "Investigating Passkeys"
date: "2023-09-01"
year: "2023"
description: "An investigation into passkeys and whether organizations should adopt them."
---

## Investigation Context

Apple, Google, and 1Password have been gradually introducing support for passkeys, causing confusion in our organization. Adding a third authentication method has been challenging since we recently implemented Yubikeys and Device Trust.

Therefore, I decided to research passkeys and evaluate their potential use for our organization.

## Investigation Objectives

1. Understand how passkeys work.
2. Experiment using passkeys with various sites & services.
3. Identify potential challenges of using passkeys.
4. Make a recommendation on whether we should promote the use of passkeys.

## How Do Passkeys Work?

It is not within the scope of this investigation to provide a detailed explanation of passkeys. However, I will attempt to provide a high-level overview.

Simply put, passkeys provide a passwordless login experience. This new standard uses _public-key_ cryptography to authenticate you with supported sites and services. Instead of creating a password for your account, you generate a passkey — _a public & private key pair._ The passkey can be stored on your smartphone, desktop, security key, or a supported password manager. The passkey will still require some form of user verification. In most use cases, this is usually some form of device biometrics. Your passkeys are stored securely in a vault, such as your password vault, keychain, or security key.

## Using Passkeys

As part of my investigation, I conducted tests to configure and utilize passkeys for **iCloud**, **1Password**, and **Chrome**.

### iCloud Passkeys

The process of configuring and using iCloud passkeys was simple once I enabled iCloud Keychain. Once the iCloud passkeys were configured, I could seamlessly use them across my macOS and iOS device. This process required me to configure and verify my passkey with device biometrics (Touch ID & Face ID).

The use of iCloud passkeys was limited to certain browsers. _Chrome_ and _Safari_ worked, but _Firefox_ and _Arc_ did not.

### 1Password Passkeys

The process of configuring and using 1Password passkeys was simple when my 1Password browser extension was unlocked; if it was locked, I couldn't configure or use them.

I couldn't use my 1Password passkey on both my desktop and mobile device, but I know that 1Password is currently working with Apple to resolve this issue.

### Chrome Passkeys

The process of setting up and using Chrome passkeys was simple when using Google Chrome exclusively. However, when I had the 1Password browser extension unlocked in Chrome, it often interfered with using my Chrome passkey.

## Passkey Challenges

Throughout my investigation, I have identified **three** main issues with the current implementation of passkeys.

1. _There is a limited amount of sites and services that support passkeys._
2. _The user experience of using passkeys can be confusing._
3. _Syncing passkeys across devices could introduce a security risk._

### Limited Support

Currently, there are few sites and services that support the use of passkeys. However, this is likely to change in the future.

You can view websites, apps, and services that support passkey sign-in at: [Passkeys.directory](https://passkeys.directory).

### User Experience

If you use multiple services like iCloud and 1Password to store your passkeys, they can interfere with each other while authenticating. There have been instances where I have been prompted to use iCloud instead of 1Password and vice versa.

### Syncing Passkeys

The synchronization of passkeys is convenient for users but introduces security risks.

For example, iCloud passkeys offer the ability to sync across your Apple devices. If someone gets access to your iCloud account, they have access to all your passkeys.

On the other hand, if you set up a passkey on a device that does not sync, you may end up being locked out of your account if that device gets lost or stolen.

Passkey syncing support is also limited:

- iCloud passkeys only work on Apple devices.
- Google passkeys only sync between Android devices.
- Cross-browser compatibility doesn't always work.

## Conclusion

My overall recommendation is to hold off on using passkeys until they are more widely supported. Although physical security keys are less convenient, I plan on to continue to use them. However, if you enjoy being a beta tester for new technology, continue to use them. You may encounter some challenges on your journey, but I believe that support will only improve over time.
