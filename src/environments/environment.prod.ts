export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://ec2-3-92-223-165.compute-1.amazonaws.com:8080/",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://p3client-env.eba-ff9ffbt9.us-east-1.elasticbeanstalk.com/',
  },
};
