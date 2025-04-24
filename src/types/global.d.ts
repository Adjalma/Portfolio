declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'react-use-websocket' {
  const useWebSocket: any;
  export default useWebSocket;
}

declare module 'msw' {
  export const rest: any;
  export const setupServer: any;
}

declare module '@testing-library/react' {
  export const render: any;
  export const screen: any;
  export const fireEvent: any;
  export const waitFor: any;
}
