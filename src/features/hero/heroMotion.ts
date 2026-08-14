export type HeroViewportProfile = 'desktop' | 'tablet' | 'mobile';

export interface HeroMotionState {
  master: number;
  intro: number;
  paintProgress: number;
  bucketExit: number;
  transition: number;
  houseReveal: number;
  housePaint: number;
  houseBase: number;
  houseBlue: number;
  houseAccent: number;
  houseDetails: number;
  houseLuxury: number;
  luxury: number;
  finalHold: number;
}

export const createHeroMotionState = (): HeroMotionState => ({
  master: 0,
  intro: 0,
  paintProgress: 0,
  bucketExit: 0,
  transition: 0,
  houseReveal: 0,
  housePaint: 0,
  houseBase: 0,
  houseBlue: 0,
  houseAccent: 0,
  houseDetails: 0,
  houseLuxury: 0,
  luxury: 0,
  finalHold: 0,
});

export const getHeroViewportProfile = (width: number): HeroViewportProfile => {
  if (width < 768) return 'mobile';
  if (width < 1180) return 'tablet';
  return 'desktop';
};
