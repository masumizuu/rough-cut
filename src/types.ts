export interface LoadingScreenProps {
  percentage?: string
  fadeOut?: boolean
}

export interface TitleOverlayProps {
  fadeOut?: boolean
}

export type Phase = 'start' | 'vhs' | 'tv-closeup' | 'tv-content'

export interface ExperienceProps {
  phase: Phase
}