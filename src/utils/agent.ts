const isMobile = (userAgent: string): boolean => {
  const reg = /(iPhone|iPod|iOS|Android)/i

  return reg.test(userAgent)
}

export default isMobile
