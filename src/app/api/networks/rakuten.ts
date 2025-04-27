/**
 * All Rakuten Advertising API endpoints require an access token. To create one,
 * we need to provide a client_id and client_secret. For this reason, we've
 * created a dedicated utility function to handle this.
 *
 * @returns The access token
 */
export async function getAccessToken(): Promise<string> {
  const response = await fetch("https://api.linksynergy.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${process.env.RAKUTEN_BEARER_TOKEN}`,
    },
    body: new URLSearchParams({
      scope: process.env.RAKUTEN_SCOPE as string,
    }),
  });

  if (!response.ok) {
    console.error("Failed to get access token:", response.body + " " + response.status);
    
    throw new Error("Failed to get access token");
  }

  const data = await response.json();

  console.log("Data", data);

  if (!data.access_token) {
    console.error(data);
    throw new Error("Failed to get access token");
  }

  return data.access_token;
}
