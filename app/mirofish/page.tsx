'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { PageHeader } from '@/components/page-header'
import { MetricBar } from '@/components/metric-bar'
import { AIAnalysis } from '@/components/ai-analysis'
import { useDashboard } from '@/lib/dashboard-context'
import { aiAnalysis } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface Agent {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  type: 'positive' | 'negative' | 'neutral'
}

function AgentNetworkVisualization({ positiveRatio }: { positiveRatio: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const agentsRef = useRef<Agent[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize agents
    const numAgents = 60
    const agents: Agent[] = []
    
    for (let i = 0; i < numAgents; i++) {
      const rand = Math.random()
      let type: 'positive' | 'negative' | 'neutral'
      if (rand < positiveRatio * 0.8) {
        type = 'positive'
      } else if (rand < positiveRatio * 0.8 + 0.15) {
        type = 'negative'
      } else {
        type = 'neutral'
      }

      agents.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        type,
      })
    }
    agentsRef.current = agents

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Clear with theme-aware background
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? '#0a0a0a' : '#fafafa'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw agents
      agentsRef.current.forEach((agent, i) => {
        // Update position
        agent.x += agent.vx
        agent.y += agent.vy

        // Bounce off walls
        if (agent.x < 0 || agent.x > canvas.width) agent.vx *= -1
        if (agent.y < 0 || agent.y > canvas.height) agent.vy *= -1

        // Draw connections to nearby agents
        agentsRef.current.slice(i + 1).forEach((other) => {
          const dx = other.x - agent.x
          const dy = other.y - agent.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 60) {
            ctx.beginPath()
            ctx.moveTo(agent.x, agent.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${0.1 * (1 - dist / 60)})`
              : `rgba(0, 0, 0, ${0.08 * (1 - dist / 60)})`
            ctx.stroke()
          }
        })

        // Draw agent
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, 4, 0, Math.PI * 2)
        
        if (agent.type === 'positive') {
          ctx.fillStyle = '#22c55e'
        } else if (agent.type === 'negative') {
          ctx.fillStyle = '#ef4444'
        } else {
          ctx.fillStyle = isDark ? '#525252' : '#a3a3a3'
        }
        ctx.fill()
      })

      // Draw zone labels
      ctx.font = '11px Inter, system-ui, sans-serif'
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
      ctx.fillText('High engagement zone', 20, 30)
      ctx.fillText('Skeptical cluster', canvas.width - 120, canvas.height - 20)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [positiveRatio])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="w-full h-[400px] rounded-lg"
    />
  )
}

function GaugeChart({ value, label, max = 1 }: { value: number; label: string; max?: number }) {
  const percentage = (value / max) * 100
  const rotation = (percentage / 100) * 180 - 90

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20 overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Value arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${percentage * 1.26} 126`}
            className="text-indigo"
          />
          {/* Needle */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground origin-bottom"
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50px 50px' }}
          />
          <circle cx="50" cy="50" r="4" className="fill-foreground" />
        </svg>
      </div>
      <div className="text-center mt-2">
        <p className="text-2xl font-mono font-semibold">{(value * 100).toFixed(0)}%</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function MiroFishContent() {
  const { availableCreatives, selectedCreativeId, setSelectedCreativeId } = useDashboard()
  const [isExplainerOpen, setIsExplainerOpen] = useState(false)

  const selectedCreative = availableCreatives.find(c => c.id === selectedCreativeId) || availableCreatives[0]

  if (!selectedCreative) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        Please select a campaign with creatives
      </div>
    )
  }

  const sentimentMetrics = [
    { label: 'Target Audience Match', value: selectedCreative.mirofish.target_audience_match },
    { label: 'Emotional Resonance', value: selectedCreative.mirofish.emotional_resonance },
    { label: 'Shareability', value: selectedCreative.mirofish.shareability },
    { label: 'Brand Affinity', value: selectedCreative.mirofish.brand_affinity },
  ]

  return (
    <>
      <PageHeader 
        title="Social Simulation Analysis" 
        description="AI agent network simulating real social media reactions to your creative"
      />

      {/* What is MiroFish? */}
      <Collapsible open={isExplainerOpen} onOpenChange={setIsExplainerOpen} className="mb-6">
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-base flex items-center justify-between">
                <span>What is MiroFish?</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isExplainerOpen ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <p className="text-muted-foreground">
                MiroFish simulates how real social media users react to your creative using an AI agent network. 
                Each agent represents a user persona with unique preferences, behaviors, and social connections. 
                The simulation predicts virality, sentiment, and engagement patterns before your creative goes live.
              </p>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Creative selector */}
      <Tabs value={selectedCreativeId || availableCreatives[0]?.id} onValueChange={setSelectedCreativeId} className="mb-6">
        <TabsList>
          {availableCreatives.map((creative) => (
            <TabsTrigger key={creative.id} value={creative.id} className="text-xs">
              {creative.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Agent Network Visualization */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Agent Network Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentNetworkVisualization positiveRatio={selectedCreative.mirofish.positive_sentiment} />
          <div className="flex justify-center gap-8 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Negative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-400" />
              <span className="text-muted-foreground">Neutral</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Sentiment Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Gauge charts */}
          <div className="flex justify-center gap-12 mb-8">
            <GaugeChart value={selectedCreative.mirofish.virality_score} label="Virality Score" />
            <GaugeChart value={selectedCreative.mirofish.positive_sentiment} label="Positive Sentiment" />
          </div>

          {/* Metric bars */}
          <div className="grid gap-4 md:grid-cols-2">
            {sentimentMetrics.map((metric) => (
              <MetricBar
                key={metric.label}
                label={metric.label}
                value={metric.value}
                showPercentage
                colorClass={metric.value >= 0.7 ? 'bg-indigo' : 'bg-amber-500'}
              />
            ))}
          </div>

          {/* Grade badge */}
          <div className="mt-6 pt-6 border-t flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Social Score</p>
              <p className="text-3xl font-mono font-semibold">{(selectedCreative.mirofish.social_score * 100).toFixed(0)}%</p>
            </div>
            <div className="px-4 py-2 bg-indigo/10 rounded-lg border border-indigo/20">
              <span className="text-2xl font-bold text-indigo">{selectedCreative.mirofish.grade}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <AIAnalysis {...aiAnalysis.mirofish} />
    </>
  )
}

export default function MiroFishPage() {
  return (
    <DashboardLayout>
      <MiroFishContent />
    </DashboardLayout>
  )
}
