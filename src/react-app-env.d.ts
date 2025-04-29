/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'react-use-websocket' {
  const useWebSocket: any;
  export default useWebSocket;
} 