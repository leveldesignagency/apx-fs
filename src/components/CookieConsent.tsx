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
        onClick={() => setShowSettings(true)}
        className="cookie-settings-btn"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
          color: isDark ? '#ffffff' : '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.2)' : '#000000'
          e.currentTarget.style.color = isDark ? '#ffffff' : '#ffffff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff'
          e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'
        }}
        aria-label="Cookie Settings"
      >
        <Settings style={{ width: '20px', height: '20px' }} />
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

      {/* Cookie Consent Banner - full-width bar at bottom */}
      {showBanner && !showSettings && (
        <div 
          className="cookie-banner"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            width: '100%',
            padding: '16px 24px',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : '#ffffff',
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #e5e5e5',
            boxShadow: isDark ? '0 -4px 24px rgba(0, 0, 0, 0.4)' : '0 -4px 24px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            maxWidth: '1400px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <AlertCircle style={{ width: '22px', height: '22px', color: isDark ? '#ffffff' : '#000000', flexShrink: 0 }} />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#000000',
                  margin: 0
                }}>
                  Cookie Consent
                </h3>
              </div>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#333333',
                margin: 0
              }}>
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can{' '}
                <button
                  onClick={() => setShowSettings(true)}
                  className="cookie-banner-text-link"
                  style={{
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  customize preferences
                </button>
                {' '}or{' '}
                <Link
                  href="/cookie-policy"
                  className="cookie-banner-text-link"
                  style={{ fontSize: '14px' }}
                >
                  learn more
                </Link>
                .
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              flexShrink: 0
            }}>
              <button
                onClick={handleRejectAll}
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
                  backgroundColor: 'transparent',
                  color: isDark ? '#ffffff' : '#000000',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: isDark ? '1px solid #ffffff' : '1px solid #000000',
                  backgroundColor: isDark ? '#ffffff' : '#000000',
                  color: isDark ? '#000000' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'transparent'
                  e.currentTarget.style.color = isDark ? '#000000' : '#000000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000'
                  e.currentTarget.style.color = isDark ? '#000000' : '#ffffff'
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
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
            borderRadius: '8px',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.85)' : '#ffffff',
            backdropFilter: isDark ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: isDark ? 'blur(20px)' : 'none',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
            boxShadow: isDark ? '0 10px 25px rgba(0, 0, 0, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.3)',
            color: isDark ? '#ffffff' : '#000000'
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
              color: isDark ? '#ffffff' : '#000000',
              margin: 0
            }}>
              Cookie Preferences
            </h2>
            <button
              onClick={() => setShowSettings(false)}
              style={{
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#000000',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
                color: isDark ? '#ffffff' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.3)' : '#f5f5f5'
                e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.2)' : '#000000'
                e.currentTarget.style.color = isDark ? '#ffffff' : '#ffffff'
              }}
              aria-label="Close"
            >
              <X style={{ width: '20px', height: '20px', color: isDark ? '#000000' : '#ffffff', stroke: isDark ? '#000000' : '#ffffff' }} />
            </button>
          </div>

          <p style={{
            fontSize: '14px',
            color: isDark ? '#ffffff' : '#000000',
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
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              boxShadow: isDark ? '0 0 10px rgba(255, 255, 255, 0.2)' : '0 0 10px rgba(0, 0, 0, 0.2)'
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
                      color: isDark ? '#ffffff' : '#000000',
                      margin: 0
                    }}>
                      Essential Cookies
                    </h3>
                    <span style={{
                      fontSize: '12px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                      color: isDark ? '#ffffff' : '#000000',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000'
                    }}>
                      Always Active
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: isDark ? '#ffffff' : '#000000',
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
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check style={{ width: '20px', height: '20px', color: isDark ? '#ffffff' : '#000000' }} />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              boxShadow: preferences.analytics 
                ? (isDark ? '0 0 15px rgba(255, 255, 255, 0.4)' : '0 0 15px rgba(0, 0, 0, 0.4)')
                : 'none',
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
                    color: isDark ? '#ffffff' : '#000000',
                    margin: '0 0 8px 0'
                  }}>
                    Analytics Cookies
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: isDark ? '#ffffff' : '#000000',
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
                    background: preferences.analytics ? (isDark ? '#ffffff' : '#000000') : (isDark ? 'rgba(255, 255, 255, 0.2)' : '#ffffff'),
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
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
                      background: preferences.analytics ? (isDark ? '#000000' : '#ffffff') : (isDark ? '#ffffff' : '#000000'),
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
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              boxShadow: preferences.marketing 
                ? (isDark ? '0 0 15px rgba(255, 255, 255, 0.4)' : '0 0 15px rgba(0, 0, 0, 0.4)')
                : 'none',
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
                    color: isDark ? '#ffffff' : '#000000',
                    margin: '0 0 8px 0'
                  }}>
                    Marketing Cookies
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: isDark ? '#ffffff' : '#000000',
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
                    background: preferences.marketing ? (isDark ? '#ffffff' : '#000000') : (isDark ? 'rgba(255, 255, 255, 0.2)' : '#ffffff'),
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
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
                      background: preferences.marketing ? (isDark ? '#000000' : '#ffffff') : (isDark ? '#ffffff' : '#000000'),
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
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              boxShadow: preferences.functional 
                ? (isDark ? '0 0 15px rgba(255, 255, 255, 0.4)' : '0 0 15px rgba(0, 0, 0, 0.4)')
                : 'none',
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
                    color: isDark ? '#ffffff' : '#000000',
                    margin: '0 0 8px 0'
                  }}>
                    Functional Cookies
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: isDark ? '#ffffff' : '#000000',
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
                    background: preferences.functional ? (isDark ? '#ffffff' : '#000000') : (isDark ? 'rgba(255, 255, 255, 0.2)' : '#ffffff'),
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
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
                      background: preferences.functional ? (isDark ? '#000000' : '#ffffff') : (isDark ? '#ffffff' : '#000000'),
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
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000'
          }}>
            <button
              onClick={() => setShowSettings(false)}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #000000',
                backgroundColor: 'transparent',
                color: isDark ? '#ffffff' : '#000000',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.5)' : '#000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.3)' : '#000000'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: isDark ? '1px solid #ffffff' : '1px solid #000000',
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.9)' : 'transparent'
                e.currentTarget.style.color = isDark ? '#000000' : '#000000'
                e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#000000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000'
                e.currentTarget.style.color = isDark ? '#000000' : '#ffffff'
                e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#000000'
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
