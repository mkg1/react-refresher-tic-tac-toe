export default function Log({turnsData}) {

    return (
        <ol id="log">
            {turnsData.map((turn) => 
                <li key={`${turn.square.row}${turn.square.col}`}>player {turn.player} selected row {turn.square.row} and col {turn.square.col}</li>
            )}
        </ol>
    )
}