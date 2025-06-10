import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface CategoryState {
  activeCategory: string;
  categories: string[];
}

/* ------------------------------------------------------------------ */
/* Local-storage helpers                                               */
/* ------------------------------------------------------------------ */
const STORAGE_KEY = "categoryState";

const loadState = (): CategoryState | null => {
  if (typeof window === "undefined") return null;          // SSR safety
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CategoryState) : null;
  } catch {
    return null;                                           // bad JSON / quota
  }
};

const saveState = (state: CategoryState) => {
  if (typeof window === "undefined") return;               // SSR safety
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / serialisation errors */
  }
};

/* ------------------------------------------------------------------ */
/* Initial state (hydrate from localStorage if present)                */
/* ------------------------------------------------------------------ */
const initialState: CategoryState =
  loadState() || { activeCategory: "", categories: [] };

/* ------------------------------------------------------------------ */
/* Slice                                                               */
/* ------------------------------------------------------------------ */
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      saveState(state);                                    // persist change
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      saveState(state);                                    // persist change
    },
    /** Optional helper to wipe state + storage (e.g. on logout) */
    resetCategoryState: () => {
      const empty: CategoryState = { activeCategory: "", categories: [] };
      saveState(empty);
      return empty;
    },
  },
});

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */
export const {
  setActiveCategory,
  setCategories,
  resetCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;
