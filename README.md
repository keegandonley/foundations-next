# @keegancodes/foundations-next

These are my shared Next.js helpers I use in most apps

## Utils

```ts
import { getFullyQualifiedDeploymentUrl } from "@keegancodes/foundations-next";
```

Used to get URLs for sites with deployment protection:

````ts
 const { url, headers } = await getFullyQualifiedDeploymentUrl(
      `/api/cheers?slug=${slug}`,
    );
    const data = await fetch(url, {
      cache: 'no-store',
      headers,
    });
    ```
````
