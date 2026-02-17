"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Settings, Check, AlertCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  getCookiePreferences, 
  saveCookiePreferences, 
  type CookiePreferences 
} from '@/utils/cookieUtils'

const CookieConsent = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const savedPreferences = getCookiePreferences()
    if (savedPreferences) setPreferences(savedPreferences)
    // Show banner only on first visit (no saved preferences)
    if (!savedPreferences) {
      setShowBanner(true)
    }
  }, [mounted])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    savePreferences(allAccepted)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    savePreferences(onlyEssential)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
    setShowSettings(false)
    setShowBanner(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs)
    saveCookiePreferences(prefs)
  }

  const handlePreferenceChange = (category: keyof CookiePreferences) => {
    if (category === 'essential') return
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  // Don't render until we've checked localStorage (client-only)
  if (!mounted) return null

  // Settings button when banner is hidden (user already has preferences saved)
  if (!showBanner && !showSettings) {
    return (
      <button
        type="button"
        className="cookie-settings-btn cookie-settings-fab"
        onClick={() => setShowSettings(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '2px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#111111'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#000000'
        }}
        aria-label="Cookie Settings"
      >
        <Settings style={{ width: '20px', height: '20px' }} className="cookie-settings-fab-icon" />
      </button>
    )
  }

  return (
    <>
      {/* Backdrop - Only for settings modal */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-[9998] transition-opacity duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
            backdropFilter: isDark ? 'blur(8px)' : 'none',
            WebkitBackdropFilter: isDark ? 'blur(8px)' : 'none'
          }}
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Cookie Consent: always-visible bar at bottom, black background, rounded top-left + bottom-right */}
      {showBanner && !showSettings && (
        <div
          className="cookie-banner-wrapper"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 24px 56px 48px',
            pointerEvents: 'none',
          }}
        >
          <div
            className="cookie-banner"
            style={{
              pointerEvents: 'auto',
              width: '100%',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#000000',
              border: '1px solid #ffffff',
              borderTopLeftRadius: '1.75rem',
              borderTopRightRadius: '0',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '1.75rem',
              boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.3)',
              padding: '24px 24px 32px',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                }}>
                  <AlertCircle style={{ width: '22px', height: '22px', color: '#ffffff', flexShrink: 0 }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                    Cookie Consent
                  </h3>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can{' '}
                  <button
                    onClick={() => setShowSettings(true)}
                    className="cookie-banner-text-link"
                    style={{ fontSize: '14px', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', textDecoration: 'underline' }}
                  >
                    customize preferences
                  </button>
                  {' '}or{' '}
                  <Link href="/cookie-policy" className="cookie-banner-text-link" style={{ fontSize: '14px', color: 'inherit', textDecoration: 'underline' }}>
                    learn more
                  </Link>
                  .
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="cookie-banner-pill pill-btn px-6 py-3.5 text-base relative inline-flex items-center justify-center font-bold overflow-hidden rounded-tl-2xl rounded-br-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span className="pill-btn-inner" aria-hidden />
                  <span className="pill-btn-border" aria-hidden />
                  <span className="pill-text font-bold">Reject All</span>
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="cookie-banner-pill pill-btn px-6 py-3.5 text-base relative inline-flex items-center justify-center font-bold overflow-hidden rounded-tl-2xl rounded-br-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span className="pill-btn-inner" aria-hidden />
                  <span className="pill-btn-border" aria-hidden />
                  <span className="pill-text font-bold">Accept All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal – black bg, white foreground, rounded top-left + bottom-right only */}
      {showSettings && (
        <div 
          className="cookie-settings-modal"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            width: 'calc(100% - 32px)',
            maxWidth: '900px',
            padding: '24px',
            borderTopLeftRadius: '1.75rem',
            borderTopRightRadius: 0,
            borderBottomRightRadius: '1.75rem',
            borderBottomLeftRadius: 0,
            backgroundColor: '#000000',
            border: '2px solid #ffffff',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            color: '#ffffff'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0
            }}>
              Cookie Preferences
            </h2>
            <button
              type="button"
              className="cookie-settings-modal-close"
              onClick={() => setShowSettings(false)}
              style={{
                padding: '8px',
                borderRadius: '50%',
                border: '2px solid #ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111111'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000'
              }}
              aria-label="Close"
            >
              <X style={{ width: '20px', height: '20px', color: '#ffffff', stroke: '#ffffff' }} />
            </button>
          </div>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            Manage your cookie preferences. You can enable or disable different types of cookies below. 
            Essential cookies cannot be disabled as they are necessary for the website to function properly.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {/* Essential Cookies */}
            <div style={{
              padding: '16px',
              borderTopLeftRadius: '0.75rem',
              borderBottomRightRadius: '0.75rem',
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#ffffff',
                      margin: 0
                    }}>
                      Essential Cookies
                    </h3>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderTopLeftRadius: '0.5rem',
                      borderBottomRightRadius: '0.5rem',
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                      Always Active
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you such as setting your privacy preferences, 
                    logging in, or filling in forms.
                  </p>
                </div>
                <div style={{
                  padding: '8px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check style={{ width: '20px', height: '20px', color: '#ffffff', stroke: '#ffffff' }} />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div style={{
              padding: '16px',
              borderTopLeftRadius: '0.75rem',
              borderBottomRightRadius: '0.75rem',
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              boxShadow: preferences.analytics ? '0 0 15px rgba(255, 255, 255, 0.2)' : 'none',
              transition: 'box-shadow 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: '0 0 8px 0'
                  }}>
                    Analytics Cookies
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. This helps us improve our website's performance and user experience.
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('analytics')}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '60px',
                    height: '30px',
                    background: preferences.analytics ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      height: '24px',
                      width: '24px',
                      borderRadius: '50%',
                      background: '#000000',
                      transform: preferences.analytics ? 'translateX(32px)' : 'translateX(2px)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div style={{
              padding: '16px',
              borderTopLeftRadius: '0.75rem',
              borderBottomRightRadius: '0.75rem',
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              boxShadow: preferences.marketing ? '0 0 15px rgba(255, 255, 255, 0.2)' : 'none',
              transition: 'box-shadow 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: '0 0 8px 0'
                  }}>
                    Marketing Cookies
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    These cookies are used to deliver personalized advertisements and track your browsing habits across 
                    different websites. They help us show you relevant content and measure the effectiveness of our campaigns.
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('marketing')}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '60px',
                    height: '30px',
                    background: preferences.marketing ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      height: '24px',
                      width: '24px',
                      borderRadius: '50%',
                      background: '#000000',
                      transform: preferences.marketing ? 'translateX(32px)' : 'translateX(2px)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Functional Cookies */}
            <div style={{
              padding: '16px',
              borderTopLeftRadius: '0.75rem',
              borderBottomRightRadius: '0.75rem',
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              boxShadow: preferences.functional ? '0 0 15px rgba(255, 255, 255, 0.2)' : 'none',
              transition: 'box-shadow 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: '0 0 8px 0'
                  }}>
                    Functional Cookies
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences, 
                    language settings, and login information. They may be set by us or by third-party providers.
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('functional')}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '60px',
                    height: '30px',
                    background: preferences.functional ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      height: '24px',
                      width: '24px',
                      borderRadius: '50%',
                      background: '#000000',
                      transform: preferences.functional ? 'translateX(32px)' : 'translateX(2px)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <button
              type="button"
              className="cookie-settings-cancel"
              onClick={() => setShowSettings(false)}
              style={{
                padding: '12px 24px',
                borderTopLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #ffffff',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                flex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111111'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              style={{
                padding: '12px 24px',
                borderTopLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #ffffff',
                backgroundColor: '#ffffff',
                color: '#000000',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.color = '#000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'
                e.currentTarget.style.color = '#000000'
              }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieConsent
