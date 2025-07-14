function UniversityTable({ universities, selected, onToggle }) {
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Назва</th>
          <th>Країна</th>
          <th>Домен</th>
          <th>Код</th>
          <th>Сайт</th>
          <th>Обране</th>
        </tr>
      </thead>
      <tbody>
        {universities.map((uni, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{uni.name}</td>
            <td>{uni.country}</td>
            <td>{uni.domains?.[0]}</td>
            <td>{uni.alpha_two_code}</td>
            <td>
              <a href={uni.web_pages[0]} target="_blank" rel="noreferrer">
                Перейти
              </a>
            </td>
            <td>
              <input
                type="checkbox"
                checked={selected[index] || false}
                onChange={() => onToggle(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UniversityTable;
