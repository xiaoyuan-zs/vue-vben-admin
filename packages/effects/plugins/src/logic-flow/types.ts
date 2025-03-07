import type { CallbackArgs, EventArgs, EventCallback } from '@logicflow/core';

// 事件回调类型
export type LFEventCallback = EventCallback<keyof EventArgs>;

// 触发事件参数类型
export type LFCallbackArgs = CallbackArgs<keyof EventArgs>;

// 事件名称类型
export type LFEventName = keyof EventArgs;
