export function JsonLd({
  data,
}: {
  data:
    | Record<string, unknown>
    | null
    | undefined
    | Array<Record<string, unknown> | null | undefined>
}) {
  const graphs = (Array.isArray(data) ? data : [data]).filter(
    (g): g is Record<string, unknown> => Boolean(g)
  )
  if (!graphs.length) return null
  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={`jsonld-${i}-${String(graph["@type"] ?? "graph")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  )
}
