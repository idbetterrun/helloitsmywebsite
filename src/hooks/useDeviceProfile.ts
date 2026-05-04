import { useEffect, useState } from 'react'

type DeviceProfile = 'mobile' | 'tablet' | 'desktop'
type DeviceInput = 'touch' | 'pointer' | 'mixed'

const MOBILE_UA =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i
const TABLET_UA = /iPad|Tablet|PlayBook|Silk/i

function getProfile(): {
  profile: DeviceProfile
  input: DeviceInput
  width: number
  height: number
} {
  if (typeof window === 'undefined') {
    return { profile: 'desktop', input: 'pointer', width: 0, height: 0 }
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const userAgent = navigator.userAgent
  const hasTouch = navigator.maxTouchPoints > 0
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const isMobileUA = MOBILE_UA.test(userAgent)
  const isTabletUA = TABLET_UA.test(userAgent) || (hasTouch && width >= 768 && width <= 1180)

  const profile: DeviceProfile =
    width <= 767 || isMobileUA
      ? 'mobile'
      : width <= 1100 || isTabletUA
        ? 'tablet'
        : 'desktop'

  const input: DeviceInput =
    hasTouch && finePointer ? 'mixed' : hasTouch || coarsePointer ? 'touch' : 'pointer'

  return { profile, input, width, height }
}

export function useDeviceProfile() {
  const [device, setDevice] = useState(getProfile)

  useEffect(() => {
    const update = () => setDevice(getProfile())
    update()

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.visualViewport?.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.deviceProfile = device.profile
    root.dataset.deviceInput = device.input
    root.dataset.viewportWidth = String(device.width)
    root.classList.toggle('mobile-layout', device.profile === 'mobile')
    root.classList.toggle('tablet-layout', device.profile === 'tablet')
    root.classList.toggle('desktop-layout', device.profile === 'desktop')
    root.classList.toggle('touch-layout', device.input !== 'pointer')
  }, [device])

  return device
}
