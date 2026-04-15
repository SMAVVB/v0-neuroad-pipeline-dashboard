'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { PageHeader } from '@/components/page-header'
import { useDashboard } from '@/lib/dashboard-context'
import { brandIntelligence } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Globe, Users, Calendar, ExternalLink, RefreshCw } from 'lucide-react'

function BrandIntelligenceContent() {
  const { selectedBrandId } = useDashboard()
  const brand = selectedBrandId ? brandIntelligence[selectedBrandId as keyof typeof brandIntelligence] : null

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        Please select a brand from the sidebar
      </div>
    )
  }

  return (
    <>
      <PageHeader 
        title="Brand Intelligence" 
        description="Comprehensive brand context and competitive landscape"
        showCampaignInfo={false}
      />

      {/* Brand Profile Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
              <Building2 className="h-5 w-5 text-background" />
            </div>
            {brand.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-sm text-muted-foreground">Founded</span>
              <p className="font-mono font-medium text-lg">{brand.foundingYear}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Headquarters</span>
              <p className="font-medium">{brand.headquarters}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Industry</span>
              <p className="font-medium">{brand.industry}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Size</span>
              <p className="font-medium">{brand.size}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Row */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-3xl font-mono font-semibold">{brand.markets.length}</p>
                <p className="text-sm text-muted-foreground">Active Markets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-3xl font-mono font-semibold">{brand.competitors.length}</p>
                <p className="text-sm text-muted-foreground">Key Competitors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-3xl font-mono font-semibold">{brand.subIndustries.length}</p>
                <p className="text-sm text-muted-foreground">Sub-Industries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Historical Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Historical Periods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-4">
                {brand.historicalPeriods.map((period, i) => (
                  <div key={i} className="flex items-center gap-4 pl-6 relative">
                    <div className="absolute left-0 w-4 h-4 rounded-full bg-background border-2 border-foreground" />
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">{period.year}</p>
                      <p className="font-medium">{period.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Markets & Competitors */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {brand.markets.map((market) => (
                  <Badge key={market} variant="secondary">{market}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Competitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {brand.competitors.map((competitor) => (
                  <Badge key={competitor} variant="outline">{competitor}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sub-Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {brand.subIndustries.map((sub) => (
                  <Badge key={sub} variant="secondary">{sub}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Freshness & STORM Report */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Last research run: <span className="font-mono text-foreground">{brand.lastResearchDate}</span>
          </span>
        </div>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View Full STORM Report
        </Button>
      </div>
    </>
  )
}

export default function BrandIntelligencePage() {
  return (
    <DashboardLayout>
      <BrandIntelligenceContent />
    </DashboardLayout>
  )
}
