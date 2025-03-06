import LogicFlow from '@logicflow/core';

import '@logicflow/core/dist/style/index.css';

class LogicFlowController {
  // 默认配置项
  private static defaultOptions: LogicFlow.Options = {
    container: document.querySelector('#app') as HTMLElement,
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
  // LogicFlow 实例
  private lfInstance: LogicFlow | null = null;

  constructor(
    private container: HTMLElement | null,
    private options: Partial<LogicFlow.Options> = {},
  ) {
    this.init();
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
  }
}

export default LogicFlowController;
