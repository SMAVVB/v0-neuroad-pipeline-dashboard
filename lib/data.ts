// Sample data for NeuroAd Pipeline

export const brands = [
  { id: 'apple', name: 'Apple', logo: '🍎' },
  { id: 'yfood', name: 'yfood', logo: '🥤' },
  { id: 'redbull', name: 'Red Bull', logo: '🐂' },
]

export const campaigns = [
  { id: 'apple-samsung-q1', name: 'Apple vs Samsung Q1 2026', brandId: 'apple', date: '2026-03-15' },
  { id: 'yfood-campaign', name: 'yfood Spring Launch', brandId: 'yfood', date: '2026-02-20' },
]

export interface Creative {
  id: string
  name: string
  campaignId: string
  tribe: {
    neural_engagement: number
    emotional_impact: number
    face_response: number
    scene_response: number
    motion_response: number
    language_engagement: number
    temporal_peak: string
    engagement_stability: number
  }
  mirofish: {
    positive_sentiment: number
    virality_score: number
    controversy_risk: number
    social_score: number
    grade: string
    target_audience_match: number
    emotional_resonance: number
    shareability: number
    brand_affinity: number
  }
  clip: {
    brand_match_score: number
    top_label: string
    grade: string
    visual_dimensions: {
      color_consistency: number
      typography_match: number
      imagery_style: number
      tone_alignment: number
      logo_visibility: number
    }
    labels: { name: string; score: number }[]
  }
  vinet: {
    mean_saliency: number
    center_bias: number
    product_attention: number
    brand_attention: number
    cta_attention: number
    temporal_variance: number
  }
  overall_score: number
}

export const creatives: Creative[] = [
  {
    id: 'apple_iphone17pro_ultimate',
    name: 'iPhone 17 Pro Ultimate',
    campaignId: 'apple-samsung-q1',
    tribe: {
      neural_engagement: 0.205,
      emotional_impact: 0.186,
      face_response: 0.217,
      scene_response: 0.200,
      motion_response: 0.192,
      language_engagement: 0.190,
      temporal_peak: '31/36',
      engagement_stability: 0.986,
    },
    mirofish: {
      positive_sentiment: 0.85,
      virality_score: 0.70,
      controversy_risk: 0.20,
      social_score: 0.79,
      grade: 'B',
      target_audience_match: 0.82,
      emotional_resonance: 0.78,
      shareability: 0.71,
      brand_affinity: 0.88,
    },
    clip: {
      brand_match_score: 0.200,
      top_label: 'cinematic storytelling',
      grade: 'C',
      visual_dimensions: {
        color_consistency: 0.75,
        typography_match: 0.68,
        imagery_style: 0.82,
        tone_alignment: 0.71,
        logo_visibility: 0.45,
      },
      labels: [
        { name: 'cinematic storytelling', score: 0.89 },
        { name: 'premium aesthetic', score: 0.76 },
        { name: 'tech innovation', score: 0.72 },
        { name: 'minimalist design', score: 0.65 },
      ],
    },
    vinet: {
      mean_saliency: 0.044,
      center_bias: 1.0,
      product_attention: 0.0,
      brand_attention: 0.0,
      cta_attention: 0.0,
      temporal_variance: 0.12,
    },
    overall_score: 0.78,
  },
  {
    id: 'apple_iphone17_scratch',
    name: 'iPhone 17 Scratch',
    campaignId: 'apple-samsung-q1',
    tribe: {
      neural_engagement: 0.178,
      emotional_impact: 0.165,
      face_response: 0.145,
      scene_response: 0.182,
      motion_response: 0.210,
      language_engagement: 0.155,
      temporal_peak: '22/36',
      engagement_stability: 0.912,
    },
    mirofish: {
      positive_sentiment: 0.72,
      virality_score: 0.58,
      controversy_risk: 0.15,
      social_score: 0.68,
      grade: 'C+',
      target_audience_match: 0.75,
      emotional_resonance: 0.65,
      shareability: 0.62,
      brand_affinity: 0.80,
    },
    clip: {
      brand_match_score: 0.350,
      top_label: 'product durability',
      grade: 'B',
      visual_dimensions: {
        color_consistency: 0.82,
        typography_match: 0.78,
        imagery_style: 0.70,
        tone_alignment: 0.85,
        logo_visibility: 0.72,
      },
      labels: [
        { name: 'product durability', score: 0.91 },
        { name: 'tech specs', score: 0.78 },
        { name: 'quality assurance', score: 0.65 },
      ],
    },
    vinet: {
      mean_saliency: 0.156,
      center_bias: 0.85,
      product_attention: 0.72,
      brand_attention: 0.45,
      cta_attention: 0.28,
      temporal_variance: 0.18,
    },
    overall_score: 0.71,
  },
  {
    id: 'apple_pay_outrun',
    name: 'Apple Pay Outrun',
    campaignId: 'apple-samsung-q1',
    tribe: {
      neural_engagement: 0.195,
      emotional_impact: 0.220,
      face_response: 0.185,
      scene_response: 0.175,
      motion_response: 0.240,
      language_engagement: 0.168,
      temporal_peak: '28/36',
      engagement_stability: 0.945,
    },
    mirofish: {
      positive_sentiment: 0.91,
      virality_score: 0.82,
      controversy_risk: 0.08,
      social_score: 0.88,
      grade: 'A-',
      target_audience_match: 0.89,
      emotional_resonance: 0.92,
      shareability: 0.85,
      brand_affinity: 0.91,
    },
    clip: {
      brand_match_score: 0.420,
      top_label: 'lifestyle integration',
      grade: 'B+',
      visual_dimensions: {
        color_consistency: 0.88,
        typography_match: 0.85,
        imagery_style: 0.79,
        tone_alignment: 0.90,
        logo_visibility: 0.82,
      },
      labels: [
        { name: 'lifestyle integration', score: 0.94 },
        { name: 'convenience', score: 0.87 },
        { name: 'modern living', score: 0.81 },
      ],
    },
    vinet: {
      mean_saliency: 0.234,
      center_bias: 0.72,
      product_attention: 0.65,
      brand_attention: 0.78,
      cta_attention: 0.55,
      temporal_variance: 0.22,
    },
    overall_score: 0.85,
  },
]

export const brandIntelligence = {
  apple: {
    name: 'Apple Inc.',
    foundingYear: 1976,
    headquarters: 'Cupertino, California',
    industry: 'Consumer Electronics & Technology',
    size: 'Enterprise (164,000+ employees)',
    markets: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'],
    competitors: ['Samsung', 'Google', 'Microsoft', 'Huawei', 'Sony'],
    subIndustries: ['Smartphones', 'Computers', 'Wearables', 'Services', 'Software'],
    lastResearchDate: '2026-03-10',
    stormReportUrl: '#',
    historicalPeriods: [
      { year: '1976-1985', label: 'Founding Era' },
      { year: '1985-1997', label: 'Wilderness Years' },
      { year: '1997-2011', label: 'Jobs Renaissance' },
      { year: '2011-Present', label: 'Cook Era' },
    ],
  },
}

export const aiAnalysis = {
  tribe: {
    summary: 'The creative demonstrates strong neural engagement patterns with particularly high face response scores, indicating effective use of human elements. The temporal peak occurring late in the sequence (31/36) suggests a strong recency effect that will aid brand recall.',
    strengths: [
      'Exceptional face response (0.217) indicates strong human connection',
      'High engagement stability (0.986) shows consistent viewer attention',
      'Strong neural engagement above benchmark threshold',
    ],
    weaknesses: [
      'Language engagement slightly below optimal levels',
      'Emotional impact could be enhanced with more dynamic storytelling',
    ],
    recommendations: [
      'Consider adding more emotionally charged moments earlier in the sequence',
      'Optimize language elements for better cognitive processing',
      'Maintain the strong human presence that drives face response',
    ],
  },
  mirofish: {
    summary: 'Social simulation indicates strong positive reception with high virality potential. The creative resonates well with target demographics and shows excellent brand affinity scores.',
    strengths: [
      'High positive sentiment (85%) predicts favorable audience reception',
      'Strong brand affinity suggests effective brand integration',
      'Low controversy risk minimizes potential backlash',
    ],
    weaknesses: [
      'Virality score (0.70) has room for improvement',
      'Shareability could be enhanced with more "meme-able" moments',
    ],
    recommendations: [
      'Add shareable moments that encourage social interaction',
      'Consider including user-generated content elements',
      'Leverage emotional peaks for maximum social impact',
    ],
  },
  clip: {
    summary: 'Brand consistency analysis reveals moderate alignment with established brand guidelines. The cinematic storytelling approach is on-brand but logo visibility needs attention.',
    strengths: [
      'Strong imagery style alignment with brand aesthetic',
      'Effective use of cinematic storytelling techniques',
      'Color palette maintains brand consistency',
    ],
    weaknesses: [
      'Logo visibility significantly below recommended levels',
      'Typography match could be strengthened',
    ],
    recommendations: [
      'Increase logo presence without disrupting creative flow',
      'Ensure typography aligns with brand guidelines',
      'Consider brand element placement optimization',
    ],
  },
  vinet: {
    summary: 'Attention mapping reveals high center bias but limited saliency distribution. The current creative may benefit from more strategic placement of key brand elements.',
    strengths: [
      'Strong center focus ensures primary message delivery',
      'Consistent attention patterns across viewing duration',
    ],
    weaknesses: [
      'Product attention scores at 0% indicate visibility issues',
      'Brand element placement not optimized for attention capture',
      'CTA visibility needs significant improvement',
    ],
    recommendations: [
      'Reposition product elements to high-saliency regions',
      'Add visual anchors to guide attention to brand elements',
      'Implement contrast techniques to highlight CTA',
    ],
  },
  consolidated: {
    executiveSummary: 'Analysis of the Apple vs Samsung Q1 2026 campaign reveals "Apple Pay Outrun" as the strongest performer across all neural, social, brand, and attention metrics. This creative demonstrates superior emotional impact and social virality potential while maintaining brand consistency.',
    crossModuleInsights: [
      'Neural engagement correlates strongly with social sentiment across all creatives',
      'Higher face response scores consistently predict better emotional resonance',
      'Brand consistency gaps in CLIP analysis may explain lower ViNet attention scores',
      'Motion response peaks align with predicted viral moments in MiroFish simulation',
    ],
    finalRecommendation: 'Deploy "Apple Pay Outrun" as the primary creative for maximum campaign impact. Its combination of high emotional engagement, social virality potential, and brand affinity makes it the optimal choice for the target audience.',
  },
}
