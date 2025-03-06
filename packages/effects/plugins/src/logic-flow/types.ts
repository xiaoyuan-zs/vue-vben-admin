import type { EventArgs, EventCallback } from '@logicflow/core';

// 事件回调类型
export type LogicFlowEventCallback = EventCallback<keyof EventArgs>;
// 事件名称类型
export type LogicFlowEventName = keyof EventArgs;
