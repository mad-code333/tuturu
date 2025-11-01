'use client';

import NotificationPreferencesTable from '@/components/notifications/notification-preferences-table';
import BrowserNotificationPermission from '@/components/notifications/browser-notification-permission';
import AdvancedNotificationSettings from '@/components/notifications/advanced-notification-settings';
import { useUpdateAccountNotificationPreferences } from '@/hooks/useAccountNotificationPreferences';
import { useAccountNotificationPreferences } from '@/hooks/useAccountNotificationPreferences';
import type { DigestFrequency } from '@/hooks/useAccountNotificationPreferences';

export default function NotificationsCard() {
  const { data: preferences } = useAccountNotificationPreferences();
  const updatePreferences = useUpdateAccountNotificationPreferences();

  // Extract advanced settings from preferences
  const digestFrequency =
    (preferences?.[0]?.digest_frequency as DigestFrequency) || 'immediate';
  const quietHoursStart = preferences?.[0]?.quiet_hours_start || null;
  const quietHoursEnd = preferences?.[0]?.quiet_hours_end || null;
  const timezone = preferences?.[0]?.timezone || 'UTC';

  const handleAdvancedUpdate = async (settings: {
    digestFrequency?: DigestFrequency;
    quietHoursStart?: string;
    quietHoursEnd?: string;
    timezone?: string;
  }) => {
    // Update all account preferences with the new advanced settings
    await updatePreferences.mutateAsync({
      preferences: [], // Empty array since we're only updating advanced settings
      ...settings,
    });
  };

  return (
    <div className="space-y-6">
      {/* Browser Permission */}
      <BrowserNotificationPermission />

      {/* Notification Preferences Table */}
      <NotificationPreferencesTable scope="account" />

      {/* Advanced Settings */}
      <AdvancedNotificationSettings
        digestFrequency={digestFrequency}
        quietHoursStart={quietHoursStart}
        quietHoursEnd={quietHoursEnd}
        timezone={timezone}
        onUpdate={handleAdvancedUpdate}
      />
    </div>
  );
}
