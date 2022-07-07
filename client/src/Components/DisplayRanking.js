import { Table } from 'react-bootstrap'

function DisplayRanking(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {props.topScores.map((score) => {
          return (
            <tr>
              <td>
                {score.rank}
              </td>
              <td>
                {score.name}
              </td>
              <td>
                {score.score}
              </td>
            </tr>
          );
        })
        }
      </tbody>
    </Table>
  );
}




export default DisplayRanking;