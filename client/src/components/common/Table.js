import React from 'react'
import { camelToSentence, moneyFormat } from '../../utils/textFormat'
const Table = ({ tableData, headers }) => {
    return (
        <table className="table table-striped table-hover">
            <thead className="thead-dark">
                <tr>
                    {headers.map((header, index) =>
                        <th key={`${header}-${index}`}>{camelToSentence(header)}</th>
                    )}
                </tr>
            </thead>
            <tbody>

                {tableData.map((row, index) =>
                    <tr key={`transaction-${index}`}>
                        {headers.map(col =>
                            <td key={`transaction-${index}-${col}`}>{moneyFormat(tableData[index][col])}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table
