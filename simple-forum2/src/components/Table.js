export function Table({ textArray }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {textArray.map((text, index) => (
          <tr key={index}>
            <td>{text.name}</td>
            <td>{text.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
