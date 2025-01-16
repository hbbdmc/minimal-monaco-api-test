// main.ts
import './style.css'
import * as monaco from 'monaco-editor';
// importing installed services
import { initialize } from 'vscode/services'
import getLanguagesServiceOverride from "@codingame/monaco-vscode-languages-service-override";
import getThemeServiceOverride from "@codingame/monaco-vscode-theme-service-override";
import getTextMateServiceOverride from "@codingame/monaco-vscode-textmate-service-override";
import '@codingame/monaco-vscode-python-default-extension';//用于 Python
import "@codingame/monaco-vscode-theme-defaults-default-extension";//用于默认 VSCode 主题
import getConfigurationServiceOverride, { updateUserConfiguration } from '@codingame/monaco-vscode-configuration-service-override'
import { initWebSocketAndStartClient } from './lsp-client'
import { initServices, type VscodeApiConfig } from 'monaco-languageclient/vscode/services';
// import "vscode/localExtensionHost";


// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
export async function useMonacoEditor(monacoEditorRef: HTMLElement | null): Promise<void> {
  if (!monacoEditorRef) {
    console.error('Editor container is not available');
    return;
  }

  type WorkerLoader = () => Worker;
  const workerLoaders: Partial<Record<string, WorkerLoader>> = {
    TextEditorWorker: () => new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module' }),
    TextMateWorker: () => new Worker(new URL('@codingame/monaco-vscode-textmate-service-override/worker', import.meta.url), { type: 'module' })
    // })
  }

  window.MonacoEnvironment = {
    getWorker: function (_workerId, label) {
      const workerFactory = workerLoaders[label]
      if (workerFactory != null) {
        return workerFactory()
      }
      throw new Error(`Worker ${label} not found`)
    }
  }//todo:报错提示

  // adding services
  // await initialize({
  //   ...getConfigurationServiceOverride(),
  //   ...getTextMateServiceOverride(),//添加高亮支持
  //   ...getThemeServiceOverride(),
  //   ...getLanguagesServiceOverride(),
  // });
  // setTimeout(async()=>{
  await initServices({
    // enableModelService: true,
    // enableThemeService: true,
    // enableTextmateService: true,
    // enableLanguagesService: true,
    serviceOverrides: {
      ...getConfigurationServiceOverride(),
      ...getTextMateServiceOverride(),
      ...getThemeServiceOverride(),
      ...getLanguagesServiceOverride(),

    },
    userConfiguration: {
      json: JSON.stringify({
        'workbench.colorTheme': 'Default Dark Modern',
        'editor.guides.bracketPairsHorizontal': 'active',
        'editor.wordBasedSuggestions': 'off',
        'editor.experimental.asyncTokenization': true
      })
    },
  } as VscodeApiConfig,
    {
      htmlContainer: monacoEditorRef,
      // logger:logger
    })
  // },1000)
  initWebSocketAndStartClient('ws://127.0.0.1:5007')

  monaco.editor.create(monacoEditorRef!, {
    value: "print('Hello world!')",
    language: "python"
  });

}

