export const isServer = () => {
  return typeof window === "undefined";
};

export const getFullyQualifiedDeploymentUrl = async (
  path: `/${string}`,
  defaultPort = "3000"
) => {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || defaultPort;
    return { url: `http://localhost:${port}${path}` };
  }

  let host = null;
  let cookie;

  if (isServer()) {
    const getHeaders = (await import("next/headers")).headers;
    const headersList = await getHeaders();
    host =
      headersList.get("host") ||
      process.env.HOST_FALLBACK ||
      process.env.NEXT_PUBLIC_HOST_FALLBACK;
    cookie = headersList.get("cookie");
  }

  return {
    url: host ? getUrlFromHost(host, path) : path,
    headers: cookie ? { cookie } : undefined,
  };
};

export const getUrlFromHost = (host: string | null, path?: `/${string}`) => {
  if (host?.includes("localhost")) {
    return `http://${host}${path}`;
  }

  return `https://${host}${path}`;
};

export const getCookieDomain = (domain: string) => {
  return process.env.NODE_ENV === "development" ? "localhost" : domain;
};
