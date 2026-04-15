'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { brands, campaigns, creatives, type Creative } from './data'

interface DashboardContextType {
  selectedBrandId: string | null
  selectedCampaignId: string | null
  selectedCreativeId: string | null
  setSelectedBrandId: (id: string | null) => void
  setSelectedCampaignId: (id: string | null) => void
  setSelectedCreativeId: (id: string | null) => void
  selectedBrand: typeof brands[0] | undefined
  selectedCampaign: typeof campaigns[0] | undefined
  selectedCreative: Creative | undefined
  availableCampaigns: typeof campaigns
  availableCreatives: Creative[]
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>('apple')
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>('apple-samsung-q1')
  const [selectedCreativeId, setSelectedCreativeId] = useState<string | null>('apple_iphone17pro_ultimate')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const selectedBrand = brands.find(b => b.id === selectedBrandId)
  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId)
  const selectedCreative = creatives.find(c => c.id === selectedCreativeId)
  
  const availableCampaigns = campaigns.filter(c => c.brandId === selectedBrandId)
  const availableCreatives = creatives.filter(c => c.campaignId === selectedCampaignId)

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newValue
    })
  }

  return (
    <DashboardContext.Provider
      value={{
        selectedBrandId,
        selectedCampaignId,
        selectedCreativeId,
        setSelectedBrandId,
        setSelectedCampaignId,
        setSelectedCreativeId,
        selectedBrand,
        selectedCampaign,
        selectedCreative,
        availableCampaigns,
        availableCreatives,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
