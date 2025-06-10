// src/app/settings/security-policy/content.tsx

export function PolicyContent() {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">1. Data Security</h2>
          <p>
            We ensure that all your store data including purchases, suppliers, and customer information is stored securely.
            Our cloud storage uses end-to-end encryption to protect your data.
          </p>
        </section>
  
        <section>
          <h2 className="text-base font-semibold text-foreground">2. User Authentication</h2>
          <p>
            You can secure your app using biometric authentication or a passcode. Session timeouts are enforced after
            periods of inactivity.
          </p>
        </section>
  
        <section>
          <h2 className="text-base font-semibold text-foreground">3. Data Sharing</h2>
          <p>
            We do not share your personal or store-related data with third-party services unless required for core features
            like cloud backup or printing integrations. Your consent will always be requested beforehand.
          </p>
        </section>
  
        <section>
          <h2 className="text-base font-semibold text-foreground">4. Permissions</h2>
          <p>
            The app may request permission to access Bluetooth, storage, or camera solely to enable essential features like
            printing receipts or scanning barcodes. These permissions are never misused.
          </p>
        </section>
  
        <section>
          <h2 className="text-base font-semibold text-foreground">5. Your Rights</h2>
          <p>
            You may export your data or delete your account at any time by contacting our support. We are committed to
            providing transparency and full control over your data.
          </p>
        </section>
  
        <section>
          <h2 className="text-base font-semibold text-foreground">6. Contact Us</h2>
          <p>
            For questions or concerns, reach out at{" "}
            <a href="mailto:support@groceryapp.com" className="underline text-foreground">
              support@groceryapp.com
            </a>
            .
          </p>
        </section>
      </div>
    );
  }
  