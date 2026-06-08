---
title: "How Device Trust Can Improve Your Patching Strategy"
date: "2024-06-01"
year: "2024"
description: "How we used device trust to achieve near-perfect patching compliance."
---

This year, my organization emphasized enhancing our endpoint patching process. Initially, we attempted to enforce all patches automatically; however, this approach did not provide a good user experience. Consequently, we decided to revisit our strategy and explore alternative solutions.

In addition to enhancing our patching process, we focused on increasing the adoption of device trust. This involved enrolling it with additional applications and implementing enhanced security criteria for authentication.

This prompted an intriguing question: Can we utilize device trust to enhance our patching strategy?

## What is Device Trust?

Device trust ensures that only devices meeting specific security criteria — like up-to-date OS versions, enabled disk encryption, and installed endpoint protection — can access company applications. It acts as a gatekeeper, ensuring only trusted devices can access your critical data.

## How We Enforced Patching With Device Trust

We utilize Kolide as our device trust solution, which initially required only fundamental security checks for authentication. To ensure that operating system and application patches were enforced, we developed custom checks that required our managed devices to be patched to authenticate successfully.

We update these checks every patching cycle, and the end-user has seven days to update their device before being blocked from authenticating.

## The Results

Integrating device trust into our patching process was a game-changer. Here's how it helped us achieve near-perfect patching compliance:

### Real-Time Visibility

Device trust provided us with detailed insights into the security posture of every endpoint. We could instantly identify devices running outdated software or missing critical updates.

### Improved User Experience

Automatically enforcing patches can lock users out of their computers or cause unexpected restarts during important Zoom calls. Device trust allows users a seven-day window to apply patches, with restricted access to critical applications until updates are completed.

### Seamless Integration

Device trust seamlessly integrated with our existing infrastructure, including endpoint management and identity platforms. This ensured a smooth rollout and minimal disruption to day-to-day operations.

Since implementing device trust, we have witnessed a remarkable improvement in our patching compliance rate, resulting in significantly fewer unpatched vulnerabilities across our fleet. This newfound peace of mind, stemming from the assurance that our devices are secure, has empowered our team to concentrate more on innovation rather than constantly addressing security issues.

## Conclusion

Device trust reinforces the importance of endpoint security and sets a strong foundation for our broader zero-trust strategy. Device trust is an invaluable investment for companies looking to tighten their security posture and improve the user experience of patching.
