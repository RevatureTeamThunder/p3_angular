export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://ec2-3-92-223-165.compute-1.amazonaws.com:8080",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://p3-client.s3-website-us-east-1.amazonaws.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  },
};
