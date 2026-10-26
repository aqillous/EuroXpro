import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { config } from "../config";
import {
  announcements,
  delegates,
  lcs,
  orders,
  products,
  rewards,
  sessions,
  stations,
} from "../data";

const STORAGE_KEY = "euroxpro27";

export function createDefaultState() {
  return {
    lcs,
    delegates,
    sessions,
    products,
    stations,
    rewards,
    announcements,
    orders,
    goals: Object.fromEntries(
      lcs.map((lc) => [lc.id, { goal: lc.goal, approved: lc.approved }]),
    ),
    user: null,
    agenda: [],
    cart: [],
    scans: [],
    claims: [],
    settings: {
      name: config.name,
      dates: config.dates,
      venue: config.venue,
      city: config.city,
      email: config.email,
    },
    logs: [],
  };
}

function loadSavedState() {
  const initialState = createDefaultState();

  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const savedLcs = Array.isArray(savedState.lcs) ? savedState.lcs : [];
    const savedLcsById = new Map(savedLcs.map((lc) => [lc.id, lc]));
    const initialLcIds = new Set(initialState.lcs.map((lc) => lc.id));

    return {
      ...initialState,
      ...savedState,
      lcs: initialState.lcs
        .map((lc) => savedLcsById.get(lc.id) || lc)
        .concat(savedLcs.filter((lc) => !initialLcIds.has(lc.id))),
      goals: { ...initialState.goals, ...(savedState.goals || {}) },
      settings: { ...initialState.settings, ...(savedState.settings || {}) },
    };
  } catch {
    return initialState;
  }
}

const ConferenceContext = createContext(null);

export function ConferenceProvider({ children }) {
  const [state, setState] = useState(loadSavedState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo(
    () => ({
      state,
      updateState: (update) =>
        setState((current) =>
          typeof update === "function"
            ? update(current)
            : { ...current, ...update },
        ),
      resetState: () => setState(createDefaultState()),
    }),
    [state],
  );

  return (
    <ConferenceContext.Provider value={contextValue}>
      {children}
    </ConferenceContext.Provider>
  );
}

export function useConference() {
  const context = useContext(ConferenceContext);

  if (!context) {
    throw new Error("useConference must be used within a ConferenceProvider.");
  }

  return context;
}

export function useStore() {
  const { state: s, updateState: u, resetState: reset } = useConference();
  return { s, u, reset };
}
