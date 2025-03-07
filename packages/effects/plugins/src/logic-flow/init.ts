import type { LFCallbackArgs, LFEventCallback, LFEventName } from './types';

import LogicFlow from '@logicflow/core';

import '@logicflow/core/lib/style/index.css';
import '@logicflow/extension/lib/style/index.css';

export default class LogicFlowController {
  // 默认配置项
  private static defaultOptions: Partial<LogicFlow.Options> = {
    // 仅浏览不可编辑模式，默认不开启
    isSilentMode: false,
    // 禁止缩放画布
    stopZoomGraph: true,
    // 禁止鼠标滚动移动画布
    stopScrollGraph: true,
    // 网格配置
    grid: {
      // 网格样式，目前内置支持点状'dot'和网格'mesh'
      type: 'dot',
      visible: true,
      size: 10,
      config: {
        // 网格颜色
        color: '#eee',
        // 网格线宽
        thickness: 1,
      },
    },
  };
  // 事件监听器
  private eventListeners: Map<LFEventName, LFEventCallback[]> = new Map();
  // LogicFlow 实例
  private lfInstance: LogicFlow | null = null;

  constructor(
    private container: HTMLElement | null,
    private options: Partial<LogicFlow.Options> = {},
  ) {
    this.init();
  }

  // 销毁实例
  public destroy() {
    this.eventListeners.forEach((callbacks, eventName) => {
      callbacks.forEach((callback) => {
        this.lfInstance?.off(eventName, callback);
      });
    });
    this.lfInstance?.destroy();
    this.lfInstance = null;
  }

  // 触发事件
  public emit(eventName: LFEventName, data: LFCallbackArgs) {
    this.lfInstance?.emit(eventName, data);
  }

  // 获取 LogicFlow 实例
  public getLfInstance(): LogicFlow {
    if (!this.lfInstance) {
      throw new Error('LogicFlow instance is not found');
    }
    return this.lfInstance;
  }
  // 删除事件监听
  public off(eventName: LFEventName, callback: LFEventCallback) {
    this.lfInstance?.off(eventName, callback);
    const callbacks = this.eventListeners.get(eventName);
    if (callbacks && callbacks.includes(callback)) {
      callbacks.splice(callbacks.indexOf(callback), 1);
    }
  }

  // 注册事件监听
  public on(eventName: LFEventName, callback: LFEventCallback) {
    this.lfInstance?.on(eventName, callback);
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.eventListeners.get(eventName)?.push(callback);
  }

  // 注册一次性事件监听
  public once(eventName: LFEventName, callback: LFEventCallback) {
    this.lfInstance?.once(eventName, callback);
  }

  private init() {
    // 校验容器元素是否存在
    if (!this.container) {
      throw new Error('LogicFlow container is not found');
    }

    // 合并配置项
    const mergedOptions = {
      ...LogicFlowController.defaultOptions,
      ...this.options,
      container: this.container,
    };

    // 创建并存储 LogicFlow 实例
    // 该实例将承载所有流程图操作和状态管理
    this.lfInstance = new LogicFlow(mergedOptions);
    this.lfInstance.render({});
  }
}
