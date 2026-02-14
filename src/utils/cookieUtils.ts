/**
 * Cookie and Cache Management Utilities
 * Professional cookie handling with GDPR compliance
 */

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_KEY = 'cookieConsent'
const COOKIE_CONSENT_DATE_KEY = 'cookieConsentDate'
const COOKIE_EXPIRY_DAYS = 365

/**
 * Get cookie preferences from localStorage
 */
export const getCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) return null

    return JSON.parse(stored) as CookiePreferences
  } catch (error) {
    console.error('Error reading cookie preferences:', error)
    return null
  }
}

/**
 * Save cookie preferences to localStorage
 */
export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
    localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString())

    // Apply preferences to actual cookie/tracking services
    applyCookiePreferences(preferences)
  } catch (error) {
    console.error('Error saving cookie preferences:', error)
  }
}

/**
 * Check if user has given consent
 */
export const hasCookieConsent = (): boolean => {
  return getCookiePreferences() !== null
}

/**
 * Get consent date
 */
export const getConsentDate = (): Date | null => {
  if (typeof window === 'undefined') return null

  try {
    const dateStr = localStorage.getItem(COOKIE_CONSENT_DATE_KEY)
    if (!dateStr) return null

    return new Date(dateStr)
  } catch (error) {
    console.error('Error reading consent date:', error)
    return null
  }
}

/**
 * Check if consent has expired (older than expiry days)
 */
export const isConsentExpired = (): boolean => {
  const consentDate = getConsentDate()
  if (!consentDate) return true

  const expiryDate = new Date(consentDate)
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)

  return new Date() > expiryDate
}

/**
 * Clear all cookie preferences
 */
export const clearCookiePreferences = (): void => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(COOKIE_CONSENT_KEY)
  localStorage.removeItem(COOKIE_CONSENT_DATE_KEY)
}

/**
 * Apply cookie preferences to actual services
 * This is where you would integrate with analytics, marketing tools, etc.
 */
export const applyCookiePreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return

  // Analytics (e.g., Google Analytics)
  if (preferences.analytics) {
    // Enable analytics
    // Example: window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    // Example: Enable Google Analytics
    enableAnalytics()
  } else {
    // Disable analytics
    // Example: window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
    disableAnalytics()
  }

  // Marketing (e.g., Facebook Pixel, Google Ads)
  if (preferences.marketing) {
    // Enable marketing cookies
    enableMarketing()
  } else {
    // Disable marketing cookies
    disableMarketing()
  }

  // Functional (e.g., preferences, language settings)
  if (preferences.functional) {
    // Enable functional cookies
    enableFunctional()
  } else {
    // Disable functional cookies
    disableFunctional()
  }
}

/**
 * Set a cookie with proper expiration
 */
export const setCookie = (
  name: string,
  value: string,
  days: number = COOKIE_EXPIRY_DAYS,
  path: string = '/'
): void => {
  if (typeof document === 'undefined') return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`

  document.cookie = `${name}=${value};${expires};path=${path};SameSite=Lax`
}

/**
 * Get a cookie value
 */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }

  return null
}

/**
 * Delete a cookie
 */
export const deleteCookie = (name: string, path: string = '/'): void => {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path};`
}

/**
 * Clear all cookies (except essential ones)
 */
export const clearNonEssentialCookies = (): void => {
  if (typeof document === 'undefined') return

  const cookies = document.cookie.split(';')

  cookies.forEach((cookie) => {
    const name = cookie.split('=')[0].trim()
    // Don't delete essential cookies or your consent cookie
    if (name !== COOKIE_CONSENT_KEY && !name.startsWith('_essential_')) {
      deleteCookie(name)
    }
  })

  // Clear localStorage items related to non-essential cookies
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('_analytics_') || key.startsWith('_marketing_') || key.startsWith('_functional_')) {
      localStorage.removeItem(key)
    }
  })

  // Clear sessionStorage
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.clear()
  }
}

/**
 * Cache management utilities
 */

/**
 * Set cache with expiration
 */
export const setCache = (
  key: string,
  value: any,
  expirationMinutes: number = 60
): void => {
  if (typeof window === 'undefined') return

  try {
    const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000
    const cacheData = {
      value,
      expiration: expirationTime,
    }
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Error setting cache:', error)
  }
}

/**
 * Get cache value if not expired
 */
export const getCache = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(`cache_${key}`)
    if (!cached) return null

    const cacheData = JSON.parse(cached)
    const now = new Date().getTime()

    if (now > cacheData.expiration) {
      // Cache expired, remove it
      localStorage.removeItem(`cache_${key}`)
      return null
    }

    return cacheData.value as T
  } catch (error) {
    console.error('Error getting cache:', error)
    return null
  }
}

/**
 * Clear specific cache
 */
export const clearCache = (key: string): void => {
  if (typeof window === 'undefined') return

  localStorage.removeItem(`cache_${key}`)
}

/**
 * Clear all cache
 */
export const clearAllCache = (): void => {
  if (typeof window === 'undefined') return

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('cache_')) {
      localStorage.removeItem(key)
    }
  })
}

/**
 * Placeholder functions for analytics/marketing enable/disable
 * Replace these with your actual implementation
 */

function enableAnalytics(): void {
  // Example: Initialize Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('consent', 'update', {
  //     analytics_storage: 'granted'
  //   })
  // }
  console.log('Analytics enabled')
}

function disableAnalytics(): void {
  // Example: Disable Google Analytics
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('consent', 'update', {
  //     analytics_storage: 'denied'
  //   })
  // }
  console.log('Analytics disabled')
}

function enableMarketing(): void {
  // Example: Initialize Facebook Pixel, Google Ads, etc.
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('consent', 'grant')
  // }
  console.log('Marketing enabled')
}

function disableMarketing(): void {
  // Example: Disable marketing tools
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('consent', 'revoke')
  // }
  console.log('Marketing disabled')
}

function enableFunctional(): void {
  // Enable functional cookies (preferences, language, etc.)
  console.log('Functional cookies enabled')
}

function disableFunctional(): void {
  // Disable functional cookies
  console.log('Functional cookies disabled')
}




