import { ScenarioScene } from './scenario-scene'
import { MarketsScene } from './markets-scene'
import { ProductScene } from './product-scene'
import { KpiScene } from './kpi-scene'
import { TenderScene } from './tender-scene'
import type { SceneProps } from './scene-primitives'

const SCENES = { scenario: ScenarioScene, markets: MarketsScene, product: ProductScene, kpi: KpiScene, tender: TenderScene }
export function CaseStory(props: SceneProps) {
  if (props.item.type === 'model') return null
  const Scene = SCENES[props.item.type]
  return <Scene {...props}/>
}
