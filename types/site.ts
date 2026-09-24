export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  email: string
  phone: string
  serviceArea: string
  address: string
  social: {
    facebook: string
    instagram: string
  }
}

export interface NavLink {
  href: string
  label: string
}
