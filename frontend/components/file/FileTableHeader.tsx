export function FileTableHeader() {
  return (
    <thead>
      <tr className="border-b bg-muted/50">
        <th className="p-2 text-left">Name</th>
        <th className="p-2 text-left">Size</th>
        <th className="p-2 text-left">Type</th>
        <th className="p-2 text-left">Uploaded</th>
        <th className="p-2 text-left">Actions</th>
      </tr>
    </thead>
  );
}