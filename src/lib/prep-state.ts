import { defaultProfile, type OnboardingProfile } from "@/data/placement-prep";

export const PROFILE_STORAGE_KEY = "placement-prepy-profile";
export const MOCK_STORAGE_KEY = "placement-prepy-mock-history";

export type MockResult = {
  score: number;
  total: number;
  date: string;
};

export type PrepState = {
  profile: OnboardingProfile;
  mockHistory: MockResult[];
};

export function loadStoredProfile(): OnboardingProfile {
  if (typeof window === "undefined") {
    return defaultProfile;
  }

  try {
    const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) {
      return defaultProfile;
    }

    return { ...defaultProfile, ...JSON.parse(saved) } as OnboardingProfile;
  } catch {
    return defaultProfile;
  }
}

export function saveStoredProfile(profile: OnboardingProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function loadMockHistory(): MockResult[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(MOCK_STORAGE_KEY);
    if (!saved) {
      return [];
    }

    return JSON.parse(saved) as MockResult[];
  } catch {
    return [];
  }
}

export function saveMockHistory(history: MockResult[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(history));
}

export function appendMockResult(result: MockResult) {
  const history = loadMockHistory();
  const nextHistory = [...history, result].slice(-5);
  saveMockHistory(nextHistory);
  void fetch("/api/prep-state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mockResult: result }),
  }).catch(() => undefined);
  return nextHistory;
}

export async function loadSyncedPrepState(): Promise<PrepState> {
  const localState = {
    profile: loadStoredProfile(),
    mockHistory: loadMockHistory(),
  };

  try {
    const response = await fetch("/api/prep-state", { cache: "no-store" });
    if (!response.ok) {
      return localState;
    }

    const remote = (await response.json()) as {
      profile: OnboardingProfile | null;
      mockHistory: MockResult[];
    };

    if (!remote.profile || (remote.mockHistory.length === 0 && localState.mockHistory.length > 0)) {
      await fetch("/api/prep-state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(!remote.profile ? { profile: localState.profile } : {}),
          ...(remote.mockHistory.length === 0 && localState.mockHistory.length > 0
            ? { mockHistory: localState.mockHistory }
            : {}),
        }),
      });
    }

    const profile = remote.profile ?? localState.profile;
    const mockHistory = remote.mockHistory.length ? remote.mockHistory : localState.mockHistory;
    saveStoredProfile(profile);
    saveMockHistory(mockHistory);
    return { profile, mockHistory };
  } catch {
    return localState;
  }
}

export function saveSyncedProfile(profile: OnboardingProfile) {
  saveStoredProfile(profile);
  void fetch("/api/prep-state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  }).catch(() => undefined);
}
