export {}

declare global {
  interface Window {
    /** Dev-only helper from homepage quote form styling */
    toggleFormDarkMode?: () => void
  }
}
