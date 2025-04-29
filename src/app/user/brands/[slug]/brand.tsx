async function getBrandFromSlug(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/brands?slug=${encodeURIComponent(
      slug
    )}`
  );

  if (!response.ok) {
    console.error("Failed to fetch brand:", response.status);
    return undefined;
  }

  const data = await response.json();
  console.log("Data:", data);

  return data;
}

export async function Brand({ slug }: { slug: string }) {
  const brandData = await getBrandFromSlug(slug);

  if (!brandData) {
    return (
      <div>
        <h1>Brand not found</h1>
        <p>
          We couldn't find the brand you're looking for. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>{brandData.name}</h1>
      {brandData.offers && brandData.offers.length > 0 && (
        <div>
          <h2>Offers</h2>
          <ul>
            {brandData.offers.map((offer: any, index: number) => (
              <li key={index}>
                {offer.description} - {offer.commission}%{" "}
                {offer.type === "flat" ? "flat" : "on sale"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
