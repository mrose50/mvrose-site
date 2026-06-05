---
title: "Google Drive Phishing Attacks"
date: "2025-03-01"
year: "2025"
description: "How attackers abuse Google Drive for phishing campaigns."
---

## Overview

I've been observing an increase in phishing emails leveraging Google Drive within my organization. Here's what's happening and how to recognize it.

## What is Happening?

When files are shared through Google Drive, recipients receive email notifications. Threat actors exploit this legitimate feature by sharing documents containing malicious links that direct victims to credential-harvesting websites or payment fraud pages. These messages often include urgent language to encourage engagement.

## How Does It Work?

Attackers register custom domains configured with Google Workspace to create multiple accounts. They upload Drive files with embedded phishing links and share them with targets, typically using time-sensitive messaging. The documents appear legitimate but contain links designed to steal credentials or facilitate unauthorized financial transfers.

## Example Attack

A real phishing email in the wild:

- The "from" address shows Google Drive as the service provider (legitimate-looking)
- Opening the file displays a suspicious blurred preview
- A deceptive "Download E-Sign" button redirects to a fake login page
- The redirect URL appears suspicious upon inspection

## Red Flags to Recognize

🚩 Unexpected Google Drive share notifications from unknown contacts

🚩 Suspicious documents (blurred, containing "Click here to view") linking elsewhere

🚩 Shared files using urgent or threatening language

🚩 Login prompts that appear off-brand or visually unusual

## What To Do

- Don't click links in unexpected Drive share notifications
- Go directly to drive.google.com rather than clicking email links
- Report suspicious shares using the "Report abuse" option in Google Drive
- Enable Google Workspace phishing protections if you're an admin
