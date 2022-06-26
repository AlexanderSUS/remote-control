export const showHttpServerStart = (port: number) => {
  console.log(`Start static http server on the ${port} port!`);
};

export const showWssParams = (headers: string[]) => {
  console.log('WSS parameters:\n', headers.join('\n'));
};

export const showWssStart = (port: number) => {
  console.log(`WS server in running on the ${port} port!`);
};

export const showWsConnected = () => {
  console.log('WebSocket connected');
};

export const showWsClosed = () => {
  console.log('WebSocket connection closed');
};
