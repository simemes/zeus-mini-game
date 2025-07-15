declare module 'can-autoplay' {
  const canAutoplay: {
    audio: (options?: { timeout?: number; muted?: boolean }) => Promise<{
      result: boolean
      error?: any
    }>
    video: (options?: { timeout?: number; muted?: boolean }) => Promise<{
      result: boolean
      error?: any
    }>
  }

  export default canAutoplay
}
