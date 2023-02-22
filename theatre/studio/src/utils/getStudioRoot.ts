import * as globalVariableNames from '@theatre/shared/globalVariableNames'
import type UI from '@theatre/studio/UI'

export function getStudioDocument() {
  // @ts-ignore
  const ui = window[globalVariableNames.studioBundle]?._studio.ui as UI
  if (!ui?._windowUIIsRenderedIn) {
    throw new Error('ui._windowUIIsRenderedIn is undefined')
  }
  return ui._windowUIIsRenderedIn?.document
}

export function getStudioWindow() {
  // @ts-ignore
  const ui = window[globalVariableNames.studioBundle]?._studio.ui as UI
  if (!ui?._windowUIIsRenderedIn) {
    throw new Error('ui._windowUIIsRenderedIn is undefined')
  }
  return ui._windowUIIsRenderedIn
}
