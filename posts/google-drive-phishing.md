---
title: "Google Drive Phishing Attacks"
date: "2025-04-01"
year: "2025"
description: "How attackers abuse Google Drive for phishing campaigns and what to look out for."
---

I have observed a notable increase in phishing emails leveraging Google Drive within my organization. To help prevent anyone from falling victim to these attacks, I would like to share my insights and knowledge on this matter.

## What is happening?

When you share a Google Drive file with a collaborator, they will receive an email notification informing them that a file has been shared with them.

Malicious individuals are exploiting this by sharing documents that lead unsuspecting victims to phishing websites. These deceptive sites are specifically designed to harvest credentials or redirect funds.

Additionally, these Google Drive share links frequently feature urgent subject lines designed to instill a sense of urgency, thereby enticing recipients to engage with the email.

## How does it work?

The attacker registers a custom domain and sets it up with Google Workspace, enabling the creation of multiple accounts. They upload Drive files that contain embedded phishing links and share these documents with the victim, typically accompanied by urgent messages. These documents are often disguised as legitimate files, featuring links to phishing sites designed to capture credentials or facilitate unauthorized fund transfers.

## Example

The attacker is using the legitimate Google Drive service, so the "from" email will be the service email (via Google Drive).

If you select Open in the email it will show you a preview of the file that already looks suspicious.

If you hover over the Download E-Sign button it shows a suspicious looking redirect URL. In this case, it was a fake login page that aimed to capture user credentials.

## What to look out for?

🚩 Receiving a Google Drive share notification from someone unfamiliar or unexpected.

🚩 Fake Documents (often blurred or saying "Click here to view document") and links out to an external site.

🚩 Shared documents that include urgent or threatening language.

🚩 A document that prompts a Google login page that looks off-brand or suspicious.
