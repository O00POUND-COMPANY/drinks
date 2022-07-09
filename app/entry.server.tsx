import type { EntryContext, HandleDataRequestFunction } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  console.time('handleRequest');
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  );

  responseHeaders.set('Content-Type', 'text/html');

  console.timeEnd('handleRequest');
  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// https://sergiodxa.com/articles/fix-double-data-request-when-prefetching-in-remix
export const handleDataRequest: HandleDataRequestFunction = async (
  response,
  { request },
) => {
  console.time('handleDataRequest');
  const isGet = request.method.toLowerCase() === 'get';
  const purpose =
    request.headers.get('Purpose') ||
    request.headers.get('X-Purpose') ||
    request.headers.get('Sec-Purpose') ||
    request.headers.get('Sec-Fetch-Purpose') ||
    request.headers.get('Moz-Purpose');
  const isPrefetch = purpose === 'prefetch';

  // Cache all prefetch resources in the browser for 10 seconds
  if (isGet && isPrefetch && !response.headers.has('Cache-Control')) {
    response.headers.set('Cache-Control', 'private, max-age=10');
  }

  console.timeEnd('handleDataRequest');
  return response;
};
