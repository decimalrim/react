export default function Grid({ cols, bodys }) {
  return (
    <Table>
      <Table.Header>
        {cols.map((title, index) => (
          <th key={index}>{title}</th>
        ))}
      </Table.Header>
      <Table.Body>
        {bodys.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
}

function Table({ children }) {
  return <table>{children}</table>;
}

// 컴포넌트 합성
Table.Header = THead;
Table.Body = TBody;

function THead({ children }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

function TBody({ children }) {
  return <tbody>{children}</tbody>;
}
