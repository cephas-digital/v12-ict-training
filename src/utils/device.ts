export const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 // Adjust this breakpoint as needed
    }
    return false
  }