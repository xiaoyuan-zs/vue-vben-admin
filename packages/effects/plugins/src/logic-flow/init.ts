import LogicFlow from '@logicflow/core';

import '@logicflow/core/dist/style/index.css';

const lf = new LogicFlow({
  container: document.querySelector('#app') as HTMLElement,
});

function setupVbenLogicFlow() {
  lf.clearData();
}

export { setupVbenLogicFlow };
