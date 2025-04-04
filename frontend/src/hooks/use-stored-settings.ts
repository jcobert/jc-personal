import { useLocalStorage } from 'usehooks-ts'

import { LayoutType } from '@/components/general/layout-toggle'

export type StoredSettings = {
  collectionLayout?: LayoutType
}

const storedSettingsKey = 'jc-prefs'

const defaultSettings = { collectionLayout: 'list' } satisfies StoredSettings

type UseStoredSettingsProps = {
  initialSettings?: StoredSettings
}

export const useStoredSettings = ({
  initialSettings,
}: UseStoredSettingsProps = {}) => {
  const [settings, updateSettings, clearSettings] =
    useLocalStorage<StoredSettings>(
      storedSettingsKey,
      initialSettings ?? defaultSettings,
    )

  return { settings, updateSettings, clearSettings }
}
